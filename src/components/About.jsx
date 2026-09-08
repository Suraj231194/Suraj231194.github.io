import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { ABOUT_CONTENT } from '../constants';
import { revealMotion } from '../constants/motion';
import SectionHeading from './SectionHeading';
import AnimatedStat from './AnimatedStat';
import MagneticLink from './MagneticLink';

const About = () => {
    const reduceMotion = useReducedMotion();

    return (
        <section id="about" className="relative overflow-hidden bg-bg-light py-16 transition-colors duration-300 dark:bg-bg-dark sm:py-20 lg:py-24">
            <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.05] dark:opacity-[0.08]"
                style={{ backgroundImage: "url('/images/about-bg.webp')" }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title={ABOUT_CONTENT.title} eyebrow="Who I am" />

                <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    <motion.div {...revealMotion(reduceMotion, 0.05)}>
                        <div className="relative mx-auto max-w-sm md:mx-0">
                            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/25 to-transparent blur-xl" aria-hidden="true" />
                            <img
                                src={ABOUT_CONTENT.image}
                                alt={`${ABOUT_CONTENT.name}, full stack web developer`}
                                width="1000"
                                height="1250"
                                loading="lazy"
                                decoding="async"
                                className="relative aspect-[4/5] w-full rounded-2xl border border-orange-200/40 object-cover object-top shadow-2xl shadow-orange-950/15 dark:border-white/10"
                            />
                        </div>
                    </motion.div>

                    <motion.div {...revealMotion(reduceMotion, 0.12)}>
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
