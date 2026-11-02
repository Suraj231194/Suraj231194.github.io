import React from 'react';
import { EDUCATION } from '../constants';
import SectionHeading from './SectionHeading';
import Container from './ui/Container';
import Assemble from './motion/Assemble';

const DIRECTIONS = ['left', 'up', 'right'];

const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = '/images/programmer-icon.png';
};

const Education = () => {
    // Natural height, not a full screen: three short cards would sit in a screen of empty space.
    return (
        <section id="education" aria-labelledby="education-title" className="py-14 sm:py-16 lg:py-20">
            <Container>
                <SectionHeading id="education-title" title="Education" lead="From engineering college to full stack training." />

                <ul className="grid gap-4 sm:grid-cols-3">
                    {EDUCATION.map((education, index) => (
                        <Assemble
                            as="li"
                            key={`${education.title}-${education.date}`}
                            from={DIRECTIONS[index % DIRECTIONS.length]}
                            distance={0.8}
                            className="spotlight flex items-center gap-4 rounded-lg border border-rule bg-sheet p-5 sm:flex-col sm:items-start sm:p-6"
                        >
                            <img
                                src={education.image}
                                alt={`${education.title} logo`}
                                width="56"
                                height="56"
                                loading="lazy"
                                decoding="async"
                                onError={handleImageError}
                                className="h-14 w-14 shrink-0 rounded-md border border-rule bg-white object-cover"
                            />
                            <div>
                                <h3 className="font-display text-xl font-semibold leading-snug text-ink">{education.title}</h3>
                                <p className="text-pencil">{education.subtitle}</p>
                                <p className="mt-1 text-sm tabular-nums text-pencil">{education.date}</p>
                            </div>
                        </Assemble>
                    ))}
                </ul>
            </Container>
        </section>
    );
};

export default Education;
