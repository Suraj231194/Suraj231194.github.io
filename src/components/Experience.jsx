import React, { useRef } from 'react';
import { EXPERIENCE } from '../constants';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGlobe, FaTasks, FaBootstrap, FaMapMarkerAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Scroll3D from './Scroll3D';
import useTilt from '../hooks/useTilt';

const getTechIcon = (tech) => {
    const normalizedTech = tech.toLowerCase().replaceAll('.', '').replaceAll(' ', '');
    switch (normalizedTech) {
        case 'reactjs': return <FaReact className="text-cyan-500" aria-hidden="true" />;
        case 'nextjs': return <SiNextdotjs aria-hidden="true" />;
        case 'html': return <FaHtml5 className="text-orange-600" aria-hidden="true" />;
        case 'css': return <FaCss3Alt className="text-blue-600" aria-hidden="true" />;
        case 'javascript': return <FaJs className="text-yellow-500" aria-hidden="true" />;
        case 'tailwindcss': return <SiTailwindcss className="text-cyan-500" aria-hidden="true" />;
        case 'bootstrap': return <FaBootstrap className="text-purple-600" aria-hidden="true" />;
        case 'agile': return <FaTasks className="text-blue-500" aria-hidden="true" />;
        case 'restapis': return <FaGlobe className="text-green-600" aria-hidden="true" />;
        case 'git': return <FaGitAlt className="text-red-500" aria-hidden="true" />;
        case 'nodejs': return <FaNodeJs className="text-green-600" aria-hidden="true" />;
        case 'typescript': return <SiTypescript className="text-blue-600" aria-hidden="true" />;
        default: return null;
    }
};

const ExperienceCard = ({ experience, reduceMotion }) => {
    // Wide cards only need a couple of degrees to feel like a physical panel.
    const tilt = useTilt({ max: 3, perspective: 1400 });

    return (
        <motion.article
            {...tilt}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="group relative grid overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-orange-300 hover:shadow-lg dark:border-white/10 dark:bg-[#151515] dark:hover:border-orange-500/50 sm:p-7 md:grid-cols-[0.75fr_1.25fr] md:gap-8"
        >
            <span className="absolute inset-y-0 left-0 w-1 bg-primary" aria-hidden="true" />
            <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(520px circle at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.5) * 100%), rgba(250, 91, 15, 0.09), transparent 60%)' }}
                aria-hidden="true"
            />

            <header className="relative mb-5 md:mb-0">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-text dark:text-primary-text-dark">
                    {experience.duration}
                </p>
                <h3 className="font-ubuntu text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {experience.role}
                </h3>
                <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {experience.company}
                </p>
                {experience.location && (
                    <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="mt-1 shrink-0 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                        {experience.location}
                    </p>
                )}
            </header>

            <div className="relative">
                <ul className="ml-5 list-disc space-y-2 text-sm leading-6 text-gray-600 marker:text-orange-600 dark:text-gray-300 sm:text-base sm:leading-7">
                    {experience.description.map((description) => (
                        <li key={description}>{description}</li>
                    ))}
                </ul>

                {experience.technologies.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies used at ${experience.company}`}>
                        {experience.technologies.map((tech) => (
                            <li key={tech} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
                                {getTechIcon(tech)}
                                {tech}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.article>
    );
};

const Experience = () => {
    const reduceMotion = useReducedMotion();
    const timeline = useRef(null);

    // The rail fills and the marker travels down it as the reader scrolls through the roles.
    const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 0.72', 'end 0.72'] });
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 });
    const markerTop = useTransform(progress, (value) => `${Math.min(Math.max(value, 0), 1) * 100}%`);

    return (
        <section id="experience" className="bg-bg-light/75 py-16 text-text-light transition-colors duration-300 dark:bg-bg-dark/70 dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="Professional Experience" eyebrow="Where I have worked" />

                <div ref={timeline} className="relative mx-auto max-w-5xl pl-8 sm:pl-12">
                    <span className="absolute bottom-0 left-2 top-0 w-px bg-gray-200 dark:bg-white/10 sm:left-3" aria-hidden="true" />
                    <motion.span
                        className="absolute bottom-0 left-2 top-0 w-px origin-top bg-gradient-to-b from-primary via-orange-400 to-orange-200 sm:left-3"
                        style={{ scaleY: reduceMotion ? 1 : progress }}
                        aria-hidden="true"
                    />
                    <motion.span
                        className="absolute left-2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_6px_rgba(250,91,15,0.18),0_0_28px_rgba(250,91,15,0.75)] sm:left-3"
                        style={{ top: reduceMotion ? '0%' : markerTop }}
                        aria-hidden="true"
                    />

                    <div className="flex flex-col gap-6">
                        {EXPERIENCE.map((experience, index) => (
                            <div key={`${experience.company}-${experience.duration}`} className="relative">
                                <span
                                    className="absolute -left-[30px] top-8 h-3 w-3 rounded-full border-2 border-primary bg-white dark:bg-[#151515] sm:-left-[42px]"
                                    aria-hidden="true"
                                />

                                <Scroll3D from={index % 2 === 0 ? 'left' : 'right'} angle={12} distance={40} end={0.7}>
                                    <ExperienceCard experience={experience} reduceMotion={reduceMotion} />
                                </Scroll3D>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
