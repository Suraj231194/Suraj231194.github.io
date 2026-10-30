import React from 'react';
import { MapPin } from 'lucide-react';
import { EXPERIENCE } from '../constants';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import Container from './ui/Container';
import TechList from './ui/TechList';
import BulletList from './ui/BulletList';

const isCurrent = (experience) => /present/i.test(experience.duration);

/** Roles newest first, one ruled row each: dates and place on the left, the work on the right. */
const Experience = () => (
    <section id="experience" aria-labelledby="experience-title" className="screen py-16 sm:py-20 lg:py-24">
        <Container>
            <SectionHeading
                id="experience-title"
                title="Experience"
                lead="Front-end work since 2022, after nearly five years in manufacturing quality control."
            />

            <ol className="border-b border-rule">
                {EXPERIENCE.map((experience, index) => (
                    <li
                        key={`${experience.company}-${experience.duration}`}
                        className={`grid gap-5 py-8 md:grid-cols-12 md:gap-8 md:py-10 ${index > 0 ? 'border-t border-rule' : 'pt-0 md:pt-0'}`}
                    >
                        <Assemble from="left" distance={0.8} className="md:col-span-3">
                            <p className="font-display text-lg font-medium tabular-nums text-ink">{experience.duration}</p>
                            {experience.location && (
                                <p className="mt-1 flex items-start gap-1.5 text-sm leading-snug text-pencil">
                                    <MapPin className="mt-[0.2em] shrink-0 text-xs" aria-hidden="true" />
                                    {experience.location}
                                </p>
                            )}
                            {isCurrent(experience) && (
                                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent-ink">
                                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                                    Current role
                                </p>
                            )}
                        </Assemble>

                        <Assemble from="right" distance={0.8} className="md:col-span-9">
                            <h3 className="font-display text-[1.625rem] font-semibold leading-tight text-ink sm:text-[1.75rem]">
                                {experience.role}
                            </h3>
                            <p className="mt-1 text-lg text-pencil">{experience.company}</p>
                            <BulletList items={experience.description} className="mt-5 max-w-[46rem] space-y-2.5" />
                            {experience.technologies.length > 0 && (
                                <TechList
                                    items={experience.technologies}
                                    label={`Technologies used at ${experience.company}`}
                                    className="mt-6"
                                />
                            )}
                        </Assemble>
                    </li>
                ))}
            </ol>
        </Container>
    </section>
);

export default Experience;
