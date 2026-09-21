import React from 'react';
import { EDUCATION } from '../constants';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Scroll3D from './Scroll3D';
import useTilt from '../hooks/useTilt';

const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = '/images/programmer-icon.png';
};

const EducationCard = ({ education, reduceMotion }) => {
    const tilt = useTilt({ max: 9 });

    return (
        <motion.article
            {...tilt}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-orange-300 hover:shadow-lg dark:border-white/10 dark:bg-[#151515] dark:hover:border-orange-500/50 sm:p-7"
        >
            <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(360px circle at calc(var(--px, 0.5) * 100%) calc(var(--py, 0.5) * 100%), rgba(250, 91, 15, 0.12), transparent 60%)' }}
                aria-hidden="true"
            />
            <img
                src={education.image}
                alt={`${education.title} logo`}
                width="96"
                height="96"
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="relative mb-5 h-24 w-24 rounded-2xl border border-gray-200 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-white/10"
            />
            <h3 className="relative font-ubuntu text-xl font-bold text-text-light dark:text-text-dark sm:text-2xl">
                {education.title}
            </h3>
            <p className="relative mt-2 text-base text-gray-600 dark:text-gray-300">
                {education.subtitle}
            </p>
            <p className="relative mt-3 text-sm font-semibold text-primary-text dark:text-primary-text-dark">
                {education.date}
            </p>
        </motion.article>
    );
};

const Education = () => {
    const reduceMotion = useReducedMotion();

    return (
        <section id="education" className="bg-bg-light/75 py-16 text-text-light transition-colors duration-300 dark:bg-bg-dark/70 dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="Education" eyebrow="My learning journey" />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                    {EDUCATION.map((education, index) => (
                        // Each card stands up from a deeper tilt, left to right, as the row scrolls in.
                        <Scroll3D
                            key={`${education.title}-${education.date}`}
                            angle={28}
                            distance={56}
                            end={0.8 - index * 0.07}
                            className="h-full"
                        >
                            <EducationCard education={education} reduceMotion={reduceMotion} />
                        </Scroll3D>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
