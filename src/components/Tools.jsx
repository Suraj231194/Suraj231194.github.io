import React from 'react';
import { SKILL_GROUPS, TOOLS } from '../constants';
import SectionHeading from './SectionHeading';
import Container from './ui/Container';
import Assemble from './motion/Assemble';

const DIRECTIONS = ['left', 'up', 'up', 'right'];

// Borders between the four columns: one column on phones, two on tablets, four on wide screens.
const columnBorders = (index) =>
    `${index > 0 ? 'border-t' : ''} ${index === 1 ? 'sm:border-l sm:border-t-0' : ''} ${index === 3 ? 'sm:border-l' : ''} ${
        index > 1 ? 'lg:border-l lg:border-t-0' : ''
    }`;

// A wide group (the AI tools) is a row across the bottom: its heading beside its tools on wide screens.
const WIDE = 'border-t bg-gradient-to-r from-accent/[0.07] to-transparent sm:col-span-2 lg:col-span-4 lg:flex lg:items-center lg:gap-10';

/**
 * Skills as a parts list: four columns from interface to delivery, and the AI tools in a row
 * underneath. Every icon is in its brand colour; the one under the pointer grows a little and
 * glows in that colour.
 */
const Tools = () => {
    return (
        <section id="tools" aria-labelledby="tools-title" className="screen py-16 sm:py-20 lg:py-24">
            <Container>
                <SectionHeading
                    id="tools-title"
                    title="Skills"
                    lead="The languages, frameworks, services and AI tools I use to ship, from the interface to hosting."
                />

                <div className="spotlight grid rounded-lg border border-rule bg-sheet sm:grid-cols-2 lg:grid-cols-4">
                    {SKILL_GROUPS.map((group, index) => {
                        const tools = TOOLS.filter((tool) => tool.group === group.id);
                        return (
                            <Assemble
                                as="section"
                                key={group.id}
                                from={group.wide ? 'up' : DIRECTIONS[index % DIRECTIONS.length]}
                                distance={0.8}
                                aria-labelledby={`skills-${group.id}`}
                                className={`border-rule p-5 sm:p-6 ${group.wide ? WIDE : columnBorders(index)}`}
                            >
                                <div className={group.wide ? 'lg:w-72 lg:shrink-0' : undefined}>
                                    <div className="flex items-baseline justify-between gap-3">
                                        <h3 id={`skills-${group.id}`} className="font-display text-xl font-semibold text-ink">
                                            {group.title}
                                        </h3>
                                        <span className="text-sm tabular-nums text-pencil" aria-label={`${tools.length} tools`}>
                                            {tools.length}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-pencil">{group.description}</p>
                                </div>

                                <ul className={`mt-5 grid gap-x-3 ${group.wide ? 'grid-cols-2 sm:grid-cols-4 lg:mt-0 lg:flex-1' : 'grid-cols-2 sm:grid-cols-1'}`}>
                                    {tools.map((tool) => (
                                        <li
                                            key={tool.name}
                                            className="group/skill -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors duration-200 hover:bg-paper"
                                        >
                                            <tool.icon
                                                className={`shrink-0 text-xl transition-[filter,transform] duration-300 [&.lucide]:size-[1em] ${tool.color} group-hover/skill:scale-110 group-hover/skill:[filter:drop-shadow(0_0_8px_currentColor)]`}
                                                aria-hidden="true"
                                            />
                                            <span className="text-[0.95rem] text-ink">{tool.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Assemble>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Tools;
