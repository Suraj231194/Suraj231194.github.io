import React, { useRef } from 'react';
import { PROCESS } from '../constants';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import { gsap, MOTION_OK, SCRUB, useScrollMotion } from './motion/scroll';
import Container from './ui/Container';
import { pad } from './ui/projectText';

/*
 * The timeline draws itself as the steps scroll past: the rail fills with the brand gradient
 * (across the top on wide screens, down the left on narrow ones) and each numbered stop lights up
 * as the fill reaches it. Without motion the timeline is simply drawn.
 */
const useTimelineMotion = (sectionRef) => {
    useScrollMotion(
        sectionRef,
        ({ wide }) => {
            const q = gsap.utils.selector(sectionRef.current);
            const list = q('[data-process-list]')[0];
            const nodes = q('[data-process-node]');
            const last = Math.max(1, nodes.length - 1);

            // Wide: the rail fills across the top while the row rises into view, and the stops
            // light one after another, the last as the cards finish assembling (top at 55%), so
            // no card sits beside an unlit stop. Narrow: the fill's tip follows a line 60% down
            // the screen, so each stop lights as it passes that line.
            const timeline = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: list,
                    start: wide ? 'top 90%' : 'top 60%',
                    end: wide ? 'top 55%' : 'bottom 60%',
                    scrub: SCRUB,
                },
            });

            timeline.fromTo(q('[data-process-fill]'), wide ? { scaleX: 0 } : { scaleY: 0 }, wide ? { scaleX: 1, duration: 1 } : { scaleY: 1, duration: 1 }, 0);
            nodes.forEach((node, index) => {
                const at = wide ? (index / last) * 0.94 : Math.min(0.9, node.parentElement.offsetTop / list.offsetHeight);
                timeline.fromTo(node, { scale: 0.55, opacity: 0.25 }, { scale: 1, opacity: 1, duration: 0.08, ease: 'back.out(2)' }, at);
            });
        },
        { motion: MOTION_OK, wide: '(min-width: 1024px)' }
    );
};

/**
 * How I work: four steps from the first conversation to launch, on a timeline. Each step is a
 * card with its icon, what happens and what it involves.
 */
const Process = () => {
    const sectionRef = useRef(null);
    useTimelineMotion(sectionRef);

    return (
        <section ref={sectionRef} id="process" aria-labelledby="process-title" className="wash py-16 sm:py-20 lg:py-24">
            <Container>
                <SectionHeading
                    id="process-title"
                    title="How I work"
                    lead="Four steps from the first conversation to launch, with the habit of checking before release built in."
                />

                <div data-process-list className="process">
                    <div className="process-rail" aria-hidden="true">
                        <span data-process-fill className="process-fill" />
                    </div>

                    <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
                        {PROCESS.map((step, index) => (
                            <li key={step.id} className="process-step">
                                <span data-process-node className="process-node" aria-hidden="true">
                                    {pad(index + 1)}
                                </span>

                                <Assemble
                                    from="up"
                                    distance={0.6}
                                    className="spotlight group/step flex flex-1 flex-col rounded-lg border border-rule bg-sheet p-5 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgb(var(--accent)/0.55)] sm:p-6"
                                >
                                    <span
                                        className="inline-grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent-ink ring-1 ring-inset ring-accent/20 transition-transform duration-300 group-hover/step:-rotate-6 group-hover/step:scale-110"
                                        aria-hidden="true"
                                    >
                                        <step.icon className="size-5" />
                                    </span>
                                    <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink">
                                        <span className="sr-only">{`Step ${index + 1}: `}</span>
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-pencil">{step.description}</p>
                                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                                        {step.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className="rounded-full border border-accent/25 bg-accent/[0.07] px-2.5 py-1 text-xs font-medium text-accent-ink"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </Assemble>
                            </li>
                        ))}
                    </ol>
                </div>
            </Container>
        </section>
    );
};

export default Process;
