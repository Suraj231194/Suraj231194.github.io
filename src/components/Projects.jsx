import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaExternalLinkAlt, FaDocker, FaAws, FaBootstrap, FaNodeJs, FaGitAlt, FaTimes, FaArrowRight } from 'react-icons/fa';
import { SiNextdotjs, SiVite, SiPrisma, SiTailwindcss, SiPostgresql, SiRedux, SiMongodb, SiExpress, SiChakraui, SiTypescript, SiSupabase, SiVercel, SiFramer } from 'react-icons/si';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { CARD_VARIANTS, EASE, GRID_VARIANTS, VIEWPORT } from '../constants/motion';
import SectionHeading from './SectionHeading';

const FILTERS = ['All', 'Full Stack', 'Frontend', 'MERN'];

const getTechIcon = (tech) => {
    switch (tech.toLowerCase().replaceAll('.', '').replaceAll(' ', '')) {
        case 'html': return <FaHtml5 className="text-orange-600" aria-hidden="true" />;
        case 'css': return <FaCss3Alt className="text-blue-600" aria-hidden="true" />;
        case 'javascript': return <FaJs className="text-yellow-500" aria-hidden="true" />;
        case 'react': return <FaReact className="text-cyan-500" aria-hidden="true" />;
        case 'nextjs': return <SiNextdotjs aria-hidden="true" />;
        case 'vite': return <SiVite className="text-purple-500" aria-hidden="true" />;
        case 'prisma': return <SiPrisma className="text-teal-600" aria-hidden="true" />;
        case 'tailwindcss': return <SiTailwindcss className="text-cyan-500" aria-hidden="true" />;
        case 'postgresql': return <SiPostgresql className="text-blue-500" aria-hidden="true" />;
        case 'docker': return <FaDocker className="text-blue-500" aria-hidden="true" />;
        case 'aws': return <FaAws className="text-orange-500" aria-hidden="true" />;
        case 'redux': return <SiRedux className="text-purple-500" aria-hidden="true" />;
        case 'nodejs': return <FaNodeJs className="text-green-600" aria-hidden="true" />;
        case 'mongodb': return <SiMongodb className="text-green-600" aria-hidden="true" />;
        case 'express': return <SiExpress aria-hidden="true" />;
        case 'chakraui': return <SiChakraui className="text-teal-500" aria-hidden="true" />;
        case 'typescript': return <SiTypescript className="text-blue-600" aria-hidden="true" />;
        case 'bootstrap': return <FaBootstrap className="text-purple-600" aria-hidden="true" />;
        case 'supabase': return <SiSupabase className="text-emerald-500" aria-hidden="true" />;
        case 'vercel': return <SiVercel aria-hidden="true" />;
        case 'framermotion': return <SiFramer className="text-pink-500" aria-hidden="true" />;
        case 'git': return <FaGitAlt className="text-red-500" aria-hidden="true" />;
        default: return null;
    }
};

const TechList = ({ project, expanded = false }) => (
    <ul className="flex flex-wrap gap-2" aria-label={`Technologies used for ${project.title}`}>
        {project.techStack.map((tech, index) => (
            <li
                key={tech}
                className={`${!expanded && index >= 5 ? 'hidden sm:inline-flex' : 'inline-flex'} items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200`}
            >
                {getTechIcon(tech)}
                {tech}
            </li>
        ))}
        {!expanded && project.techStack.length > 5 && (
            <li className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-800 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-300 sm:hidden">
                +{project.techStack.length - 5} more
            </li>
        )}
    </ul>
);

const ProjectCard = ({ project, featured, lead, onOpen, reduceMotion }) => {
    const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 });

    const handlePointerMove = (event) => {
        if (reduceMotion || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rotateX.set(((rect.height / 2 - y) / rect.height) * 3);
        rotateY.set(((x - rect.width / 2) / rect.width) * 3);
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
    };

    const resetTilt = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.article
            layout
            layoutId={`card-${project.title}`}
            variants={CARD_VARIANTS}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-950/10 dark:bg-[#151515] dark:hover:border-orange-500/50 ${
                featured ? 'border-orange-200 dark:border-orange-500/25' : 'border-gray-200/80 dark:border-white/10'
            } ${lead ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr]' : ''}`}
        >
            <span
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(420px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(250, 91, 15, 0.10), transparent 55%)' }}
                aria-hidden="true"
            />

            <button
                type="button"
                onClick={(event) => onOpen(project, event.currentTarget)}
                aria-label={`View details for ${project.title}`}
                className={`relative z-10 block w-full overflow-hidden bg-gray-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary dark:bg-black/50 ${lead ? 'aspect-video lg:aspect-auto lg:min-h-[360px]' : 'aspect-video'}`}
            >
                <motion.img
                    layoutId={`image-${project.title}`}
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    width="1600"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                        Featured
                    </span>
                )}
                <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-lg bg-black/75 px-3 py-2 text-center text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    View project details
                </span>
            </button>

            <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-3 font-ubuntu text-xl font-bold leading-snug text-text-light dark:text-text-dark sm:text-2xl">
                    {project.title}
                </h3>
                <p className="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {project.description}
                </p>

                <div className="mb-6">
                    <TechList project={project} />
                </div>

                <button
                    type="button"
                    onClick={(event) => onOpen(project, event.currentTarget)}
                    className="mb-4 inline-flex w-fit items-center gap-2 rounded text-sm font-bold text-orange-700 transition-colors hover:text-orange-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-orange-400 dark:hover:text-orange-300"
                >
                    View details
                    <FaArrowRight aria-hidden="true" />
                </button>

                <div className="mt-auto flex flex-wrap gap-3">
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo of ${project.title}`}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:ring-offset-[#151515]"
                    >
                        <FaExternalLinkAlt aria-hidden="true" />
                        Live demo
                    </a>
                    {project.sourceLink && (
                        <a
                            href={project.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View source code of ${project.title} on GitHub`}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-gray-200 dark:ring-offset-[#151515]"
                        >
                            <FaGithub aria-hidden="true" />
                            Source code
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

const ProjectModal = ({ project, onClose, closeButtonRef, reduceMotion }) => (
    <motion.div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
        }}
    >
        <motion.article
            layoutId={`card-${project.title}`}
            transition={{ layout: { duration: reduceMotion ? 0 : 0.28, ease: EASE } }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-white shadow-2xl dark:bg-[#151515]"
        >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#151515]/95 sm:px-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400">Project details</span>
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close project details"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-gray-200 dark:hover:bg-white/10"
                >
                    <FaTimes aria-hidden="true" />
                </button>
            </div>

            <motion.img
                layoutId={`image-${project.title}`}
                src={project.image}
                alt={`${project.title} interface preview`}
                width="1600"
                height="900"
                className="aspect-video w-full bg-gray-100 object-cover object-top dark:bg-black/50"
            />

            <div className="p-5 sm:p-8">
                <h2 id="project-modal-title" className="font-ubuntu text-2xl font-bold text-text-light dark:text-text-dark sm:text-3xl">
                    {project.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
                    {project.description}
                </p>
                <div className="mt-6">
                    <TechList project={project} expanded />
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:ring-offset-[#151515]"
                    >
                        <FaExternalLinkAlt aria-hidden="true" />
                        Open live demo
                    </a>
                    {project.sourceLink && (
                        <a
                            href={project.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-gray-200 dark:ring-offset-[#151515]"
                        >
                            <FaGithub aria-hidden="true" />
                            View source code
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    </motion.div>
);

const Projects = () => {
    const reduceMotion = useReducedMotion();
    const [activeFilter, setActiveFilter] = useState('All');
    const [showAll, setShowAll] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const closeButtonRef = useRef(null);
    const triggerRef = useRef(null);

    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category.includes(activeFilter));
    const featuredProjects = activeFilter === 'All' ? PROJECTS.slice(0, 3) : [];
    const regularProjects = activeFilter === 'All'
        ? PROJECTS.slice(3, showAll ? PROJECTS.length : 6)
        : filteredProjects;
    const visibleCount = featuredProjects.length + regularProjects.length;

    useEffect(() => {
        if (!activeProject) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setActiveProject(null);
                return;
            }

            if (event.key === 'Tab') {
                const dialog = closeButtonRef.current?.closest('[role="dialog"]');
                const focusableElements = dialog
                    ? [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
                    : [];
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement?.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeProject]);

    const openProject = (project, trigger) => {
        triggerRef.current = trigger;
        setActiveProject(project);
    };

    const closeProject = () => {
        setActiveProject(null);
    };

    const selectFilter = (filter) => {
        setActiveFilter(filter);
        setShowAll(filter !== 'All');
    };

    const renderGrid = (projects, featured = false) => (
        <motion.div
            // Keyed on filter only: keying on showAll remounted the grid at opacity 0 while it
            // was scrolled out of view, so whileInView never re-fired and the cards stayed hidden.
            key={`${activeFilter}-${featured ? 'featured' : 'regular'}`}
            variants={GRID_VARIANTS}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={VIEWPORT}
            className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 ${featured ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}
        >
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.title}
                    project={project}
                    featured={featured}
                    lead={featured && index === 0}
                    onOpen={openProject}
                    reduceMotion={reduceMotion}
                />
            ))}
        </motion.div>
    );

    return (
        <section id="projects" className="bg-surface-light/60 py-16 text-text-light transition-colors duration-300 dark:bg-surface-dark/30 dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="Selected Projects" eyebrow="What I have built" />

                <div className="mb-8 flex flex-col items-center gap-4">
                    <div className="flex max-w-full gap-2 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-[#151515]" role="group" aria-label="Filter projects">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                aria-pressed={activeFilter === filter}
                                onClick={() => selectFilter(filter)}
                                className={`min-h-10 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                    activeFilter === filter
                                        ? 'bg-primary text-slate-950'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
                        Showing {visibleCount} of {filteredProjects.length} projects
                    </p>
                </div>

                {featuredProjects.length > 0 && (
                    <div className="mb-6 lg:mb-8">
                        {renderGrid(featuredProjects, true)}
                    </div>
                )}
                {regularProjects.length > 0 && renderGrid(regularProjects)}

                {activeFilter === 'All' && PROJECTS.length > 6 && (
                    <div className="mt-10 text-center">
                        <motion.button
                            type="button"
                            aria-expanded={showAll}
                            onClick={() => setShowAll((visible) => !visible)}
                            whileHover={reduceMotion ? undefined : { y: -2 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-bold text-gray-800 shadow-sm transition-colors hover:border-orange-400 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-white/20 dark:bg-[#151515] dark:text-white dark:hover:border-orange-400 dark:hover:text-orange-300"
                        >
                            {showAll ? 'Show fewer projects' : `Show all ${PROJECTS.length} projects`}
                        </motion.button>
                    </div>
                )}
            </div>

            <AnimatePresence onExitComplete={() => triggerRef.current?.focus()}>
                {activeProject && (
                    <ProjectModal
                        project={activeProject}
                        onClose={closeProject}
                        closeButtonRef={closeButtonRef}
                        reduceMotion={reduceMotion}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
