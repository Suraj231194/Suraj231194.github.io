import React, { useRef } from 'react';
import { SCRUB, gsap, useScrollMotion, viewportWindow } from './motion/scroll';

const TITLE = 'font-display text-[clamp(2.25rem,1.55rem+2.4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-ink md:col-span-6';
const LEAD = 'max-w-[34rem] text-lg leading-relaxed text-pencil md:col-span-6 md:pt-2';
const HEADER = 'relative mb-10 grid gap-4 pt-6 sm:mb-14 md:grid-cols-12 md:gap-8';

/**
 * The opening of every section: a ruled line, the title, and one sentence on what follows.
 * `id` goes on the heading so the section can point to it with aria-labelledby.
 *
 * As it scrolls in, the rule draws in from both ends until the halves meet, the title's words
 * rise and tip forward into line one after another, and the lead slides in. All of it is
 * scrubbed by the scroll. Without motion it is simply the finished heading.
 */
const SectionHeading = ({ id, title, lead }) => {
    const ref = useRef(null);
    const words = title.split(' ');

    useScrollMotion(ref, () => {
        const header = ref.current;
        const q = gsap.utils.selector(header);
        const wordCount = q('[data-word]').length;

        gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: header, ...viewportWindow(header, 1, 0.6), scrub: SCRUB },
        })
            .fromTo(q('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 0.75 }, 0)
            .fromTo(q('[data-tick]'), { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, 0.6)
            .fromTo(
                q('[data-word]'),
                { y: 38, rotationX: 65, transformPerspective: 600, transformOrigin: '50% 100%' },
                { y: 0, rotationX: 0, duration: 0.6, stagger: 0.35 / wordCount },
                0
            )
            .fromTo(q('[data-word]'), { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.35 / wordCount }, 0)
            .fromTo(q('[data-lead]'), { x: 60 }, { x: 0, duration: 0.8 }, 0.2)
            .fromTo(q('[data-lead]'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2);
    });

    return (
        <header ref={ref} className={HEADER}>
            <span data-rule className="absolute left-0 top-0 h-px w-1/2 origin-left bg-rule" aria-hidden="true" />
            <span data-rule className="absolute right-0 top-0 h-px w-1/2 origin-right bg-rule" aria-hidden="true" />
            <span data-tick className="absolute -top-px left-0 h-[3px] w-12 origin-left bg-ink" aria-hidden="true" />
            <h2 id={id} className={TITLE}>
                <span className="sr-only">{title}</span>
                <span aria-hidden="true">
                    {words.map((word, index) => (
                        <React.Fragment key={`${word}-${index}`}>
                            <span data-word className="inline-block">
                                {word}
                            </span>
                            {index < words.length - 1 && ' '}
                        </React.Fragment>
                    ))}
                </span>
            </h2>
            {lead && (
                <p data-lead className={LEAD}>
                    {lead}
                </p>
            )}
        </header>
    );
};

export default SectionHeading;
