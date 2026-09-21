import React from 'react';
import Scroll3D from './Scroll3D';

const SectionHeading = ({ title, eyebrow }) => (
    <Scroll3D as="header" angle={26} distance={36} end={0.72} className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary-text dark:text-primary-text-dark">
            {eyebrow}
        </p>
        <h2 className="font-ubuntu text-3xl font-bold tracking-tight text-text-light dark:text-text-dark sm:text-4xl lg:text-5xl">
            {title}
        </h2>
        <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-primary" aria-hidden="true" />
    </Scroll3D>
);

export default SectionHeading;
