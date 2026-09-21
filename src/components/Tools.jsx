import React, { Suspense, lazy, useRef, useState } from 'react';
import { TOOLS } from '../constants';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';
import { revealMotion } from '../constants/motion';
import SectionHeading from './SectionHeading';
import Scroll3D from './Scroll3D';
import useWebGLSupport from '../hooks/useWebGLSupport';
import useTilt from '../hooks/useTilt';

const ToolsGlobe = lazy(() => import('./three/ToolsGlobe'));

const ToolCard = ({ tool, fluid = false }) => {
    const tilt = useTilt({ max: 12, perspective: 600 });

    return (
        <motion.li
            {...tilt}
            whileHover={{ y: -4 }}
            className={`group flex min-h-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-orange-300 hover:shadow-md dark:border-white/10 dark:bg-[#151515] dark:hover:border-orange-500/50 sm:min-h-36 ${fluid ? 'w-full' : 'w-40 sm:w-44'}`}
        >
            {/* The icon sits on its own plane in front of the card, so the tilt reads as depth rather than a flat skew. */}
            <span className="mb-3 block" style={{ transform: 'translateZ(28px)' }}>
                <tool.icon className={`text-4xl transition-transform duration-200 group-hover:scale-110 ${tool.color}`} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-text-light dark:text-text-dark sm:text-base">
                {tool.name}
            </span>
        </motion.li>
    );
};

const Tools = () => {
    const reduceMotion = useReducedMotion();
    const webgl = useWebGLSupport();
    const globeWrapper = useRef(null);
    const globeInView = useInView(globeWrapper, { amount: 0.1 });
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
                        {webgl && (
                            <div ref={globeWrapper} className="-mt-6 mb-6 sm:-mt-8">
                                <Suspense fallback={<div className="h-[340px] sm:h-[420px] lg:h-[480px]" aria-hidden="true" />}>
                                    <ToolsGlobe tools={TOOLS} active={globeInView && !manualPaused} />
                                </Suspense>
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                    Move your cursor over the globe to tilt it
                                </p>
                            </div>
                        )}

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

                        <Scroll3D angle={20} distance={40} end={0.78}>
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
                        </Scroll3D>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Tools;
