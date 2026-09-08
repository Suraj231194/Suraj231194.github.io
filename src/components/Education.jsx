import React from 'react';
import { EDUCATION } from '../constants';
import { motion, useReducedMotion } from 'framer-motion';
import { revealMotion } from '../constants/motion';
import SectionHeading from './SectionHeading';

const Education = () => {
    const reduceMotion = useReducedMotion();

    const handleImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = '/images/programmer-icon.png';
    };

    return (
        <section id="education" className="bg-bg-light py-16 text-text-light transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="Education" eyebrow="My learning journey" />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                    {EDUCATION.map((education, index) => (
                        <motion.article
                            key={`${education.title}-${education.date}`}
                            {...revealMotion(reduceMotion, index * 0.07, 18)}
                            whileHover={reduceMotion ? undefined : { y: -4 }}
                            className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-orange-300 hover:shadow-lg dark:border-white/10 dark:bg-[#151515] dark:hover:border-orange-500/50 sm:p-7"
                        >
                            <img
                                src={education.image}
                                alt={`${education.title} logo`}
                                width="96"
                                height="96"
                                loading="lazy"
                                decoding="async"
                                onError={handleImageError}
                                className="mb-5 h-24 w-24 rounded-2xl border border-gray-200 object-cover shadow-sm dark:border-white/10"
                            />
                            <h3 className="font-ubuntu text-xl font-bold text-text-light dark:text-text-dark sm:text-2xl">
                                {education.title}
                            </h3>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                                {education.subtitle}
                            </p>
                            <p className="mt-3 text-sm font-semibold text-primary-text dark:text-primary-text-dark">
                                {education.date}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
