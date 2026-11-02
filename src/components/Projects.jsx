import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import SectionHeading from './SectionHeading';
import ProjectCaseStudy from './ProjectCaseStudy';
import Assemble from './motion/Assemble';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';

const FILTERS = ['All', 'Full Stack', 'Frontend', 'MERN'];
// How many projects "All" shows before "Show all": the first two rows.
const INITIAL_COUNT = 4;

const countFor = (filter) =>
    filter === 'All' ? PROJECTS.length : PROJECTS.filter((project) => project.category.includes(filter)).length;

/**
 * Every case study, with the filters. `initialCount` is how many "All" shows before "Show all"
 * (the projects page shows them all); `headingLevel` 1 makes the title the page's heading.
 */
const Projects = ({ initialCount = INITIAL_COUNT, headingLevel = 2 }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [showAll, setShowAll] = useState(false);

    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category.includes(activeFilter));
    const visibleProjects = activeFilter === 'All' && !showAll ? filteredProjects.slice(0, initialCount) : filteredProjects;

    const selectFilter = (filter) => {
        setActiveFilter(filter);
        setShowAll(filter !== 'All');
    };

    const toggleShowAll = () => {
        // Collapsing jumps back to the list's top, so the reader is not left far below it.
        if (showAll) document.getElementById('projects')?.scrollIntoView({ block: 'start' });
        setShowAll((visible) => !visible);
    };

    return (
        <section id="projects" aria-labelledby="projects-title" className="screen wash py-16 sm:py-20 lg:py-24">
            <Container wide>
                <SectionHeading
                    id="projects-title"
                    title="Projects"
                    lead="Live sites, each with its screens, what it does, and the stack behind it."
                    level={headingLevel}
                />

                <Assemble from="up" distance={0.4} className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-16">
                    <div className="inline-flex max-w-full flex-wrap gap-1 self-start rounded-lg border border-rule bg-sheet p-1" role="group" aria-label="Filter projects">
                        {FILTERS.map((filter) => {
                            const pressed = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    type="button"
                                    aria-pressed={pressed}
                                    onClick={() => selectFilter(filter)}
                                    className={`relative min-h-10 whitespace-nowrap rounded-md px-3.5 text-sm font-semibold transition-colors duration-200 sm:px-4 ${
                                        pressed ? 'text-paper' : 'text-pencil hover:text-ink'
                                    }`}
                                >
                                    {pressed && (
                                        <motion.span
                                            layoutId="project-filter"
                                            className="absolute inset-0 rounded-md bg-ink"
                                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="relative">
                                        {filter} <span className="tabular-nums opacity-70">{countFor(filter)}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-sm text-pencil" aria-live="polite">
                        Showing {visibleProjects.length} of {filteredProjects.length} projects
                    </p>
                </Assemble>

                {/* Two side by side on wide screens; each joins from its own side as it scrolls in. */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                    {visibleProjects.map((project, index) => (
                        <Assemble
                            key={project.id}
                            from={index % 2 === 0 ? 'left' : 'right'}
                            distance={0.8}
                            className="min-w-0 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0"
                        >
                            <ProjectCaseStudy project={project} number={PROJECTS.indexOf(project) + 1} total={PROJECTS.length} />
                        </Assemble>
                    ))}
                </div>

                {activeFilter === 'All' && PROJECTS.length > initialCount && (
                    <div className="mt-14 flex justify-center">
                        <button
                            type="button"
                            aria-expanded={showAll}
                            onClick={toggleShowAll}
                            className={buttonClasses({ variant: 'secondary', size: 'lg' })}
                        >
                            {showAll ? 'Show fewer projects' : `Show all ${PROJECTS.length} projects`}
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default Projects;
