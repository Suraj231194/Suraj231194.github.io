import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { FaBriefcase, FaCode, FaDownload } from 'react-icons/fa';
import { ABOUT_CONTENT, EXPERIENCE } from '../constants';
import SectionHeading from './SectionHeading';
import AnimatedStat from './AnimatedStat';
import MagneticLink from './MagneticLink';
import Scroll3D from './Scroll3D';

/** Portrait with real depth: the frame tilts toward the cursor and the chips float at different z-planes. */
const Portrait = ({ reduceMotion }) => {
    const rotateX = useSpring(useMotionValue(0), { stiffness: 170, damping: 22 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 170, damping: 22 });
    const currentRole = EXPERIENCE[0];

    const handlePointerMove = (event) => {
        if (reduceMotion || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rotateX.set(((rect.height / 2 - y) / rect.height) * 10);
        rotateY.set(((x - rect.width / 2) / rect.width) * 12);
    };

    const resetTilt = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            className="relative mx-auto max-w-sm md:mx-0"
            style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
        >
            <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-transparent blur-xl"
                style={{ transform: 'translateZ(-60px)' }}
                aria-hidden="true"
            />
            <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[3px] border-primary/40"
                style={{ transform: 'translateZ(-30px)' }}
                aria-hidden="true"
            />
            <div
                className="absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-primary/15 blur-md"
                style={{ transform: 'translateZ(-20px)' }}
                aria-hidden="true"
            />

            <img
                src={ABOUT_CONTENT.image}
                alt={`${ABOUT_CONTENT.name}, full stack web developer`}
                width="1000"
                height="1250"
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-2xl border border-orange-200/40 object-cover object-top shadow-2xl shadow-orange-950/15 dark:border-white/10"
            />

            <div
                className="absolute bottom-6 left-2 flex max-w-[calc(100%-1rem)] items-center gap-3 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-[#151515]/95 sm:-left-8 sm:bottom-8 sm:max-w-none"
                style={{ transform: 'translateZ(60px)' }}
            >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-text dark:text-primary-text-dark">
                    <FaBriefcase aria-hidden="true" />
                </span>
                <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Currently</span>
                    <span className="block truncate text-sm font-bold text-text-light dark:text-text-dark">{currentRole.role}</span>
                    <span className="block truncate text-xs text-gray-600 dark:text-gray-300">{currentRole.company}</span>
                </span>
            </div>

            <div
                className="absolute right-2 top-4 flex max-w-[calc(100%-1rem)] items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-bold text-orange-800 shadow-lg dark:border-orange-400/20 dark:bg-[#1c1410] dark:text-orange-300 sm:-right-6 sm:top-6 sm:max-w-none"
                style={{ transform: 'translateZ(90px)' }}
            >
                <FaCode aria-hidden="true" />
                {ABOUT_CONTENT.role}
            </div>
        </motion.div>
    );
};

const About = () => {
    const reduceMotion = useReducedMotion();

    return (
        <section id="about" className="relative overflow-hidden bg-bg-light/75 py-16 transition-colors duration-300 dark:bg-bg-dark/70 sm:py-20 lg:py-24">
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.05] dark:opacity-[0.08]"
                style={{ backgroundImage: "url('/images/about-bg.webp')" }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title={ABOUT_CONTENT.title} eyebrow="Who I am" />

                <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    <Scroll3D from="left" angle={16} end={0.7} className="px-4 py-6 sm:px-8 md:py-4 md:pl-9 md:pr-8">
                        <Portrait reduceMotion={reduceMotion} />
                    </Scroll3D>

                    <Scroll3D from="right" angle={12} end={0.66}>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-text dark:text-primary-text-dark">
                            Full Stack Developer
                        </p>
                        <h3 className="mb-5 font-ubuntu text-2xl font-bold leading-tight text-text-light dark:text-text-dark sm:text-3xl">
                            I build fast, accessible web products that solve real business problems.
                        </h3>
                        <p className="mb-7 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg">
                            {ABOUT_CONTENT.description}
                        </p>

                        <div className="mb-8 grid grid-cols-3 gap-3" aria-label="Professional highlights">
                            {[
                                { value: 30, suffix: '+', label: 'Components' },
                                { value: 10, suffix: '+', label: 'Products' },
                                { value: 40, suffix: '%', label: 'Code reuse' },
                            ].map((stat) => (
                                <AnimatedStat key={stat.label} {...stat} />
                            ))}
                        </div>

                        <MagneticLink
                            href={ABOUT_CONTENT.resumeLink}
                            download
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary px-7 py-3 text-base font-bold text-slate-950 shadow-md transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-lg"
                        >
                            <FaDownload aria-hidden="true" />
                            {ABOUT_CONTENT.resumeButton}
                        </MagneticLink>
                    </Scroll3D>
                </div>
            </div>
        </section>
    );
};

export default About;
