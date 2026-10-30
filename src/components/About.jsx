import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { ABOUT_CONTENT, EXPERIENCE, HIGHLIGHTS } from '../constants';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import { gsap, useScrollMotion } from './motion/scroll';
import MagneticLink from './MagneticLink';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';
import useTilt from '../hooks/useTilt';

/** The portrait tilts towards the pointer; the "currently" card sits on a nearer plane, so it leads. */
const Portrait = () => {
    const tilt = useTilt({ max: 5, perspective: 1000 });
    const current = EXPERIENCE.find((experience) => /present/i.test(experience.duration)) ?? EXPERIENCE[0];

    return (
        <motion.div
            onPointerMove={tilt.onPointerMove}
            onPointerLeave={tilt.onPointerLeave}
            style={{ ...tilt.style, transformStyle: 'preserve-3d' }}
            className="crop-marks relative mx-auto max-w-sm p-3 md:mx-0"
        >
            <img
                src={ABOUT_CONTENT.image}
                alt={`${ABOUT_CONTENT.name}, full stack web developer`}
                width="1000"
                height="1250"
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full rounded-md object-cover object-top"
            />
            <div
                className="absolute -bottom-5 left-6 right-6 rounded-md border border-rule bg-sheet px-4 py-3 shadow-[0_18px_36px_-24px_rgb(var(--ink)/0.6)] sm:-left-4 sm:right-10"
                style={{ transform: 'translateZ(50px)' }}
            >
                <span className="block text-xs text-pencil">Currently</span>
                <span className="block font-display text-base font-semibold text-ink">{current.role}</span>
                <span className="block truncate text-sm text-pencil">{current.company}</span>
            </div>
        </motion.div>
    );
};

/**
 * The numbers at a glance. They count up from zero once, as they come into view (not with
 * reduced motion); screen readers get the final figures throughout.
 */
const AtAGlance = () => {
    const listRef = useRef(null);
    useScrollMotion(listRef, () => {
        const counters = gsap.utils.toArray('[data-count]', listRef.current);
        const show = (element, value) => {
            element.textContent = `${value}${element.dataset.suffix}`;
        };
        const tweens = [];
        counters.forEach((element) => show(element, 0));

        // Counted the first time the row is well in view. An observer, not a scroll trigger: the
        // page's triggers are re-measured and rewound as the page grows, which could leave the
        // numbers at zero.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                counters.forEach((element) => {
                    const tally = { value: 0 };
                    tweens.push(
                        gsap.to(tally, { value: Number(element.dataset.count), duration: 1.6, ease: 'power2.out', onUpdate: () => show(element, Math.round(tally.value)) })
                    );
                });
            },
            { threshold: 0.6 }
        );
        observer.observe(listRef.current);

        return () => {
            observer.disconnect();
            tweens.forEach((tween) => tween.kill());
            counters.forEach((element) => show(element, element.dataset.count));
        };
    });

    return (
        <dl ref={listRef} className="mt-8 grid max-w-[40rem] grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-6 sm:grid-cols-4">
            {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end gap-1.5">
                    <dt className="text-sm leading-snug text-pencil">{item.label}</dt>
                    <dd className="font-display text-[2.25rem] font-bold leading-none tracking-tight">
                        <span data-count={item.value} data-suffix={item.suffix} className="text-gradient tabular-nums" aria-hidden="true">
                            {item.value}
                            {item.suffix}
                        </span>
                        <span className="sr-only">
                            {item.value}
                            {item.suffix}
                        </span>
                    </dd>
                </div>
            ))}
        </dl>
    );
};

const About = () => (
    <section id="about" aria-labelledby="about-title" className="screen wash py-16 sm:py-20 lg:py-24">
        <Container>
            <SectionHeading id="about-title" title={ABOUT_CONTENT.title} lead={ABOUT_CONTENT.lead} />

            <div className="grid items-start gap-14 md:grid-cols-12 md:gap-8">
                <Assemble from="left" className="md:col-span-5 lg:col-span-4">
                    <Portrait />
                </Assemble>

                <Assemble from="right" className="md:col-span-7 lg:col-span-7 lg:col-start-6">
                    <p className="max-w-[40rem] text-xl leading-relaxed text-ink sm:text-[1.375rem]">{ABOUT_CONTENT.story}</p>
                    <p className="mt-5 max-w-[40rem] text-pencil">{ABOUT_CONTENT.description}</p>
                    <AtAGlance />
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <MagneticLink href={ABOUT_CONTENT.resumeLink} download className={buttonClasses({ size: 'lg' })}>
                            <Download className="text-sm" aria-hidden="true" />
                            {ABOUT_CONTENT.resumeButton}
                        </MagneticLink>
                        <a href="#contact" className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
                            Get in touch
                        </a>
                    </div>
                </Assemble>
            </div>
        </Container>
    </section>
);

export default About;
