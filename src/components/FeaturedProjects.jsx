import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROJECTS, PROJECTS_PAGE } from '../constants';
import SectionHeading from './SectionHeading';
import Container from './ui/Container';
import BrowserFrame from './ui/BrowserFrame';
import { buttonClasses } from './ui/buttonStyles';
import { blurbFor, pad } from './ui/projectText';
import { MOTION_OK, SCRUB, ScrollTrigger, gsap, useScrollMotion } from './motion/scroll';

/*
 * The home page's projects: the first four as cards on the rim of a huge wheel whose centre lies
 * far below the screen. The section is pinned while you scroll, and the scroll turns the wheel,
 * so the cards travel in from the right, rise to the middle and sink away to the left, each one
 * tilted along the rim. The last card is "Show all projects", which stops in the middle. Every
 * card opens its case study on the projects page.
 *
 * Without motion (reduced motion, or before the script runs) the cards are a plain row that
 * scrolls sideways. So they are on screens too short to hold a card on the pinned stage: phones
 * held sideways.
 */

// How many projects ride the arc before the "Show all" card.
const FEATURED_COUNT = 4;
const FEATURED = PROJECTS.slice(0, FEATURED_COUNT);
// The next few sites, as thumbnails on the "Show all" card.
const MORE = PROJECTS.slice(FEATURED.length, FEATURED.length + 4);

// The wheel's radius in window widths: larger on narrow screens, where a card is wide relative to
// the screen, so the arc stays gentle there too.
const radiusFor = (width) => width * (width < 640 ? 4.2 : width < 1024 ? 3.2 : 2.4);

// How far the pinned stretch scrolls for each card, in screen heights.
const SCREENS_PER_CARD = 0.7;

// The wheel needs room for the navigation bar, the smallest card and the counter below it.
const ARC_FITS = `${MOTION_OK} and (min-height: 520px)`;

const useArc = (sectionRef) =>
    useScrollMotion(sectionRef, ({ swipe }) => {
        const section = sectionRef.current;
        const cards = gsap.utils.toArray('[data-arc-card]', section);
        const count = section.querySelector('[data-arc-count]');
        const fill = section.querySelector('[data-arc-fill]');
        const last = cards.length - 1;
        section.classList.add('is-arc');

        // Cards follow each other along the rim one card width (and a gap) apart. The track runs from
        // the first card peeking in at the right edge to the last card in the middle.
        const spacing = () => cards[0].offsetWidth * 1.1;
        const first = () => -(window.innerWidth / 2 + cards[0].offsetWidth * 0.32) / spacing();

        // How much taller than the screen the section is: 0 wherever it fits, more on phones and
        // short laptops.
        const overflow = () => Math.max(0, section.offsetHeight - window.innerHeight);

        const place = (track) => {
            const radius = radiusFor(window.innerWidth);
            const step = spacing();
            cards.forEach((card, index) => {
                const angle = ((index - track) * step) / radius;
                gsap.set(card, {
                    x: Math.sin(angle) * radius,
                    y: (1 - Math.cos(angle)) * radius,
                    rotation: (angle * 180) / Math.PI,
                });
            });
            const current = Math.min(last, Math.max(0, Math.round(track)));
            count.textContent = current === last ? 'All projects' : `${pad(current + 1)} / ${pad(FEATURED.length)}`;
        };

        gsap.set(cards, { xPercent: -50, yPercent: -50 });
        const state = { track: first() };
        const tween = gsap.fromTo(
            state,
            { track: first },
            {
                track: last,
                ease: 'none',
                // A plain function: GSAP calls it with the tween as `this`, also during the first
                // render, before `tween` below is assigned.
                onUpdate() {
                    place(state.track);
                    fill.style.transform = `scaleX(${this.progress()})`;
                },
                scrollTrigger: {
                    trigger: section,
                    // When the section is taller than the screen (phones, short laptops), the pin
                    // waits until its bottom reaches the screen's: the heading scrolls up out of the
                    // way and the cards and the counter stay in view.
                    start: () => `top+=${overflow()} top`,
                    end: () => `+=${window.innerHeight * SCREENS_PER_CARD * cards.length}`,
                    pin: true,
                    scrub: SCRUB,
                    invalidateOnRefresh: true,
                    onRefresh: () => place(state.track),
                },
            }
        );
        place(state.track);

        // Where the section is taller than the screen, the top of the screen would cut through the
        // heading while the cards are pinned, so the heading fades out over the scroll into the pin
        // (and back in on the way up). Where the section fits, it stays.
        gsap.fromTo(
            section.querySelector('header'),
            { opacity: 1 },
            {
                opacity: () => (overflow() > 0 ? 0 : 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: () => `top+=${Math.max(0, overflow() - window.innerHeight * 0.2)} top`,
                    end: () => `top+=${overflow()} top`,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );

        // Tabbing to a card that is still off screen scrolls to the point where it is in the middle.
        const onFocus = (event) => {
            const index = cards.findIndex((card) => card.contains(event.target));
            const trigger = tween.scrollTrigger;
            if (index < 0 || !trigger) return;
            const start = first();
            window.scrollTo({ top: trigger.start + ((index - start) / (last - start)) * (trigger.end - trigger.start) });
        };
        section.addEventListener('focusin', onFocus);

        // Phones and small tablets: a sideways swipe on the cards turns the wheel as well. The wheel
        // stays driven by the scroll position, so the swipe moves the page: the cards follow the
        // finger, and on release the wheel settles on the next or previous card. Vertical swipes
        // scroll the page as usual, and a tap still opens a card.
        const stopSwipe = swipe ? attachSwipe({ section, tween, state, first, last, spacing }) : () => {};

        return () => {
            stopSwipe();
            section.removeEventListener('focusin', onFocus);
            section.classList.remove('is-arc');
            count.textContent = '';
            fill.style.transform = '';
        };
    }, { motion: ARC_FITS, swipe: '(pointer: coarse) and (max-width: 1023px)' });

// How far a swipe has to travel, as a share of the card spacing, to move on by one card.
const SWIPE_STEP = 0.12;
// A flick this fast (px per ms) moves on by one card however short it is.
const SWIPE_FLICK = 0.3;
// Movement under this many pixels is still a tap.
const SWIPE_SLOP = 8;

/** Attaches the touch swipe to the arc's stage; returns the function that removes it. */
function attachSwipe({ section, tween, state, first, last, spacing }) {
    const stage = section.querySelector('.arc-stage');

    // The scroll position at which the wheel stands at `track`.
    const scrollFor = (track) => {
        const trigger = tween.scrollTrigger;
        const start = first();
        return trigger.start + ((track - start) / (last - start)) * (trigger.end - trigger.start);
    };

    // Moves the page so the wheel stands at `track` now, skipping the scrub's catch-up, so the
    // cards keep up with the finger.
    const follow = (track) => {
        window.scrollTo({ top: scrollFor(track), behavior: 'instant' });
        ScrollTrigger.update();
        tween.scrollTrigger.getTween()?.progress(1);
    };

    let drag = null;
    let swallowClick = false;

    const onDown = (event) => {
        if (event.pointerType !== 'touch' || !event.isPrimary) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, track: state.track, at: performance.now(), moved: false };
    };

    const onMove = (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        const dx = event.clientX - drag.x;
        if (!drag.moved) {
            // Mostly vertical: leave it to the page's own scrolling.
            if (Math.abs(dx) < SWIPE_SLOP || Math.abs(dx) < Math.abs(event.clientY - drag.y)) return;
            drag.moved = true;
        }
        follow(gsap.utils.clamp(first(), last, drag.track - dx / spacing()));
    };

    const onUp = (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        const { x, track, at, moved } = drag;
        drag = null;
        if (!moved) return;

        // The swipe ends a drag, not a tap: the card under the finger must not open.
        swallowClick = true;
        window.setTimeout(() => {
            swallowClick = false;
        }, 400);

        const dx = event.clientX - x;
        const from = Math.round(track);
        const travelled = Math.abs(dx) / spacing();
        const fast = Math.abs(dx) / Math.max(1, performance.now() - at) > SWIPE_FLICK;
        let to = Math.round(track - dx / spacing());
        if (to === from && (fast || travelled > SWIPE_STEP)) to = from + (dx < 0 ? 1 : -1);
        window.scrollTo({ top: scrollFor(gsap.utils.clamp(0, last, to)), behavior: 'smooth' });
    };

    const onCancel = () => {
        drag = null;
    };

    const onClick = (event) => {
        if (!swallowClick) return;
        event.preventDefault();
        event.stopPropagation();
        swallowClick = false;
    };

    // Sideways movement on the stage comes to the script; up and down stays the page's.
    stage.style.touchAction = 'pan-y';
    stage.addEventListener('pointerdown', onDown, { passive: true });
    stage.addEventListener('pointermove', onMove, { passive: true });
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onCancel);
    stage.addEventListener('click', onClick, true);

    return () => {
        stage.style.touchAction = '';
        stage.removeEventListener('pointerdown', onDown);
        stage.removeEventListener('pointermove', onMove);
        stage.removeEventListener('pointerup', onUp);
        stage.removeEventListener('pointercancel', onCancel);
        stage.removeEventListener('click', onClick, true);
    };
}

const CARD = 'group flex h-full flex-col rounded-2xl border border-rule bg-sheet p-3 shadow-[0_40px_70px_-50px_rgb(var(--ink)/0.6)] transition-[border-color,box-shadow] duration-300 hover:border-accent/60 hover:shadow-[0_40px_80px_-40px_rgb(var(--accent)/0.55)] focus-visible:border-accent sm:p-3.5';

const ProjectCard = ({ project, number }) => {
    const shot = project.screenshots[0];

    return (
        <a href={`${PROJECTS_PAGE}#project-${project.id}`} className={CARD}>
            <BrowserFrame url={project.liveLink}>
                <img
                    src={`${shot.src}-720.webp`}
                    srcSet={`${shot.src}-720.webp 720w, ${shot.src}-1440.webp 1440w`}
                    sizes="(min-width: 2200px) 48rem, (min-width: 1700px) 36rem, (min-width: 1024px) 30rem, 80vw"
                    width="720"
                    height="450"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </BrowserFrame>
            <span className="flex flex-1 flex-col px-1.5 pt-4">
                <span className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-display font-semibold tabular-nums text-accent-ink">{pad(number)}</span>
                    {project.year && <span className="text-pencil">{project.year}</span>}
                </span>
                <span className="mt-1 font-display text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.65rem]">{project.name}</span>
                <span className="mt-1 truncate text-[0.95rem] text-pencil">{project.kind}</span>
                <span className="mt-2.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink/80">{blurbFor(project)}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent-ink">
                    Read the case study
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
            </span>
        </a>
    );
};

/** The last card: the next few sites as thumbnails and the way to every case study. */
const ShowAllCard = () => (
    <a href={PROJECTS_PAGE} className={`${CARD} bg-[linear-gradient(160deg,rgb(var(--accent)/0.1),rgb(var(--glow)/0.08)),rgb(var(--sheet))]`}>
        <BrowserFrame url="">
            <span className="relative grid aspect-[16/10] grid-cols-2 grid-rows-2 gap-1 bg-paper p-1">
                {MORE.map((project) => (
                    <img
                        key={project.id}
                        src={`${project.screenshots[0].src}-720.webp`}
                        width="720"
                        height="450"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full rounded-sm object-cover object-top"
                    />
                ))}
                <span className="absolute inset-0 grid place-items-center bg-paper/55 backdrop-blur-[2px]">
                    <span className="font-display text-[clamp(2.5rem,1.5rem+3vw,3.75rem)] font-bold leading-none text-gradient">
                        +{PROJECTS.length - FEATURED.length}
                    </span>
                </span>
            </span>
        </BrowserFrame>
        <span className="flex flex-1 flex-col px-1.5 pt-4">
            <span className="text-sm font-semibold text-accent-ink">All projects</span>
            <span className="mt-1 font-display text-[1.5rem] font-semibold leading-tight text-ink sm:text-[1.65rem]">
                Show all {PROJECTS.length} projects
            </span>
            <span className="mt-1 text-[0.95rem] text-pencil">Every case study, filterable by stack.</span>
            <span className="mt-2.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink/80">
                Screenshots, features, contributions and the stack behind each live site.
            </span>
            <span className={buttonClasses({ size: 'sm', className: 'mt-auto self-start' })}>
                Show all projects
                <ArrowRight className="size-4" aria-hidden="true" />
            </span>
        </span>
    </a>
);

const FeaturedProjects = () => {
    const sectionRef = useRef(null);
    useArc(sectionRef);

    return (
        <section
            ref={sectionRef}
            id="projects"
            aria-labelledby="projects-title"
            className="arc-section wash relative flex flex-col overflow-clip pb-6 pt-20 sm:pt-24"
        >
            <Container>
                <SectionHeading
                    id="projects-title"
                    title="Featured projects"
                    lead="Four recent live sites, from storefronts to company sites. Open one for its case study, or see them all."
                />
            </Container>

            <div className="arc-stage relative flex-1">
                <ul className="arc-track" aria-label="Featured projects">
                    {FEATURED.map((project, index) => (
                        <li key={project.id} data-arc-card className="arc-card">
                            <ProjectCard project={project} number={index + 1} />
                        </li>
                    ))}
                    <li data-arc-card className="arc-card">
                        <ShowAllCard />
                    </li>
                </ul>
            </div>

            {/* Where the wheel is: the card in the middle and a bar for the whole stretch. */}
            {/* On phones its right end stays clear of the back-to-top button (right-4, 2.75rem wide). */}
            <Container className="arc-hud mt-4 items-center gap-4 pr-16 text-sm text-pencil sm:pr-8 lg:pr-10" aria-hidden="true">
                <span data-arc-count className="min-w-[6.5rem] font-display font-semibold tabular-nums text-ink" />
                <span className="relative h-px flex-1 bg-rule">
                    <span data-arc-fill className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2" />
                </span>
                <span className="sm:hidden">Swipe or scroll</span>
                <span className="hidden sm:inline">Scroll to move through the projects</span>
            </Container>
        </section>
    );
};

export default FeaturedProjects;
