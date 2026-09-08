import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealMotion } from '../constants/motion';

const SectionHeading = ({ title, eyebrow }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.header
            {...revealMotion(reduceMotion)}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary-text dark:text-primary-text-dark">
                {eyebrow}
            </p>
            <h2 className="font-ubuntu text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-primary" aria-hidden="true" />
        </motion.header>
    );
};

export default SectionHeading;
