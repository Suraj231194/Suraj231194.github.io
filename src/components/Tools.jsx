import React, { useState } from 'react';
import { TOOLS } from '../constants';
import { motion, useReducedMotion } from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';
import { revealMotion } from '../constants/motion';
import SectionHeading from './SectionHeading';

const ToolCard = ({ tool, fluid = false }) => (
    <li className={`group flex min-h-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md dark:border-white/10 dark:bg-[#151515] dark:hover:border-orange-500/50 sm:min-h-36 ${fluid ? 'w-full' : 'w-40 sm:w-44'}`}>
        <tool.icon className={`mb-3 text-4xl transition-transform duration-200 group-hover:scale-105 ${tool.color}`} aria-hidden="true" />
        <span className="text-sm font-semibold text-text-light dark:text-text-dark sm:text-base">
            {tool.name}
        </span>
    </li>
);

const Tools = () => {
    const reduceMotion = useReducedMotion();
    const [manualPaused, setManualPaused] = useState(false);
    const [hoverPaused, setHoverPaused] = useState(false);
    const paused = manualPaused || hoverPaused;

    return (
        <section id="tools" className="overflow-hidden bg-surface-light/60 py-16 text-text-light transition-colors duration-300 dark:bg-surface-dark/30 dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="Tools and Technologies" eyebrow="My technical toolkit" />

                {reduceMotion ? (
                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5" aria-label="Technologies I use">
                        {TOOLS.map((tool) => (
                            <ToolCard key={tool.name} tool={tool} fluid />
                        ))}
                    </ul>
                ) : (
                    <motion.div {...revealMotion(false, 0.05, 16)}>
                        <div className="mb-5 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setManualPaused((current) => !current)}
                                aria-pressed={manualPaused}
                                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-orange-400 hover:text-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/15 dark:bg-[#151515] dark:text-gray-200 dark:hover:text-orange-300"
                            >
                                {manualPaused ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
                                {manualPaused ? 'Play animation' : 'Pause animation'}
                            </button>
                        </div>

                        <div className="marquee-mask overflow-hidden py-2" onMouseEnter={() => setHoverPaused(true)} onMouseLeave={() => setHoverPaused(false)}>
                            <div className={`tools-marquee-track flex w-max gap-4 ${paused ? 'marquee-paused' : ''}`}>
                                <ul className="flex shrink-0 gap-4" aria-label="Technologies I use">
                                    {TOOLS.map((tool) => (
                                        <ToolCard key={tool.name} tool={tool} />
                                    ))}
                                </ul>
                                <ul className="flex shrink-0 gap-4" aria-hidden="true">
                                    {TOOLS.map((tool) => (
                                        <ToolCard key={`duplicate-${tool.name}`} tool={tool} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Tools;
