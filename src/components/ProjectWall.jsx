import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECTS_PAGE } from '../constants';
import SectionHeading from './SectionHeading';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';
import { blurbFor, pad } from './ui/projectText';
import { MOTION_OK, SCRUB, ScrollTrigger, gsap, useScrollMotion } from './motion/scroll';
import { FRAME_WIDTH, PORTRAIT_FRAME_WIDTH, PORTRAIT_SLOTS, SLOTS } from './wall/wallLayout';

/*
 * The project stage, between the hero and the featured case studies: every live site as a screen
 * in an amphitheatre around a lit floor (geometry in wall/wallLayout.js). In the middle of the
 * floor, a panel holds the site the visitor is pointing at or has focused: its number, name, one
 * line on it, its live site and its case study, with buttons to step through every site and a
 * link to the projects page, which lists them all.
 *
 * When the stage first comes into view it assembles itself: the floor rings light, the screens
 * rise into place far row first, each tipping up and sharpening with a small overshoot, then the
 * panel and the corner captions arrive. After that the screens float gently, the whole stage
 * leans with the pointer (the nearest screens most), a screen under the pointer comes forward
 * while the others ease back, and on wide screens the stage holds still for a stretch of scroll
 * while it draws slightly nearer. With reduced motion the stage is simply there.
 */

const SITES = PROJECTS.slice(0, SLOTS.length);

// The captions in the stage's corners.
const CAPTIONS = {
    title: 'Live sites',
    kinds: ['Storefronts', 'Dashboards', 'Web apps', 'Company sites'],
    hint: ['Scroll', 'Explore', 'Open'],
    proof: ['Real projects', 'Live online'],
    reach: ['From database', 'to deployment'],
};

// Card positions as custom properties, in hundredths of the stage's width (cqw).
const slotStyle = (index) => {
    const slot = SLOTS[index];
    const portrait = PORTRAIT_SLOTS.get(index);
    const toWide = (value) => (value * 100) / FRAME_WIDTH;
    const toPortrait = (value) => (value * 100) / PORTRAIT_FRAME_WIDTH;
    // A card turned toward the centre pivots on its outer edge; the far row on its middle.
    const pivot = (turn, small) => (small ? '50%' : turn > 0 ? '0%' : turn < 0 ? '100%' : '50%');
    return {
        '--ox': pivot(slot.turnY, slot.w < 200),
        '--x': toWide(slot.x),
        '--y': toWide(slot.y),
        '--w': toWide(slot.w),
        '--d': slot.depth,
        '--ry': `${slot.turnY}deg`,
        '--rx': `${slot.tiltX}deg`,
        '--rz': `${slot.roll}deg`,
        '--i': index,
        ...(portrait && {
            '--px': toPortrait(portrait.x),
            '--py': toPortrait(portrait.y),
            '--pw': toPortrait(portrait.w),
            '--pry': `${portrait.turnY}deg`,
            '--pox': pivot(portrait.turnY, false),
        }),
    };
};

// A caption's lines: stacked in the corners, run together on one line in the portrait column.
const Lines = ({ items }) =>
    items.map((item) => (
        <span key={item} className="wall-line">
            {item}
        </span>
    ));

const useStageMotion = (sectionRef, playedRef) =>
    useScrollMotion(
        sectionRef,
        ({ hold, fine }) => {
            const q = gsap.utils.selector(sectionRef.current);
            const stage = q('[data-wall-stage]')[0];
            const deck = q('[data-wall-deck]')[0];
            const focal = q('[data-wall-focal]')[0];
            const moves = q('[data-wall-move]');
            let live = false;

            const goLive = () => {
                live = true;
                playedRef.current = true;
                stage.classList.add('is-live');
            };

            // The assembly: far row first, nearest last, each screen rising from below.
            const byDepth = [...moves].sort((a, b) => Number(b.dataset.depth) - Number(a.dataset.depth));
            const intro = gsap.timeline({ paused: true, onComplete: goLive });
            intro.fromTo(
                q('[data-wall-ring]'),
                { scale: 0.6, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.15 },
                0
            );
            byDepth.forEach((move, rank) => {
                const at = 0.35 + (rank / Math.max(1, byDepth.length - 1)) * 1.2;
                intro
                    .fromTo(
                        move,
                        {
                            y: () => window.innerHeight * 0.42,
                            rotationX: -24,
                            rotationZ: rank % 2 ? 3.5 : -3.5,
                            scale: 0.84,
                            filter: 'blur(7px)',
                        },
                        { y: 0, rotationX: 0, rotationZ: 0, scale: 1, filter: 'blur(0px)', duration: 0.95, ease: 'back.out(1.35)', clearProps: 'filter' },
                        at
                    )
                    .fromTo(move, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, at);
            });
            intro.fromTo(focal, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 1.55);
            intro.fromTo(q('[data-wall-hud]'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.14 }, 2);

            // It plays once, as the stage comes into view. If it already has (the motion settings
            // changed, or the window crossed a breakpoint), the stage is shown finished.
            if (playedRef.current) {
                intro.progress(1);
            } else {
                // Its range runs to the page's end, so a page opened below the stage (at a later
                // section) plays it at once rather than leaving the screens hidden.
                const trigger = ScrollTrigger.create({ trigger: stage, start: 'top 80%', end: 'max', once: true, onEnter: () => intro.play() });
                if (trigger.isActive) intro.play();
            }

            // Wide screens: the stage holds still for a stretch of scroll and draws slightly nearer.
            if (hold) {
                gsap.fromTo(
                    deck,
                    { scale: 1 },
                    {
                        scale: 1.045,
                        ease: 'none',
                        scrollTrigger: { trigger: stage, start: 'center 55%', end: '+=60%', pin: true, scrub: SCRUB, invalidateOnRefresh: true },
                    }
                );
            }

            if (!fine) return () => stage.classList.remove('is-live');

            // The pointer: the stage leans a couple of degrees, each screen drifts by its depth (the
            // nearest most), and the panel counters gently.
            const follow = { duration: 0.8, ease: 'power3' };
            const cards = [...moves].map((move) => ({
                strength: 6 + (1 - Number(move.dataset.depth)) * 26,
                x: gsap.quickTo(move, 'x', follow),
                y: gsap.quickTo(move, 'y', follow),
            }));
            const lean = { y: gsap.quickTo(deck, 'rotationY', follow), x: gsap.quickTo(deck, 'rotationX', follow) };
            const counter = { x: gsap.quickTo(focal, 'x', follow), y: gsap.quickTo(focal, 'y', follow) };

            const aim = (px, py) => {
                const scale = stage.offsetWidth / FRAME_WIDTH;
                cards.forEach((card) => {
                    card.x(px * card.strength * scale);
                    card.y(py * card.strength * 0.55 * scale);
                });
                lean.y(px * 2.1);
                lean.x(-py * 1.4);
                counter.x(px * -9 * scale);
                counter.y(py * -5 * scale);
            };

            const onMove = (event) => {
                if (!live) return;
                const box = stage.getBoundingClientRect();
                aim(((event.clientX - box.left) / box.width) * 2 - 1, ((event.clientY - box.top) / box.height) * 2 - 1);
            };
            const onLeave = () => {
                if (live) aim(0, 0);
            };

            stage.addEventListener('pointermove', onMove, { passive: true });
            stage.addEventListener('pointerleave', onLeave);
            return () => {
                stage.removeEventListener('pointermove', onMove);
                stage.removeEventListener('pointerleave', onLeave);
                stage.classList.remove('is-live');
            };
        },
        {
            motion: MOTION_OK,
            hold: '(min-width: 1024px) and (min-height: 600px) and (min-aspect-ratio: 81/100)',
            fine: '(hover: hover) and (pointer: fine)',
        }
    );

const ProjectWall = () => {
    const sectionRef = useRef(null);
    const playedRef = useRef(false);
    const [active, setActive] = useState(0);
    useStageMotion(sectionRef, playedRef);

    const site = SITES[active];
    const step = (direction) => setActive((current) => (current + direction + SITES.length) % SITES.length);

    return (
        <section ref={sectionRef} id="work" aria-labelledby="work-title" className="screen relative py-16 sm:py-20 lg:py-24">
            {/* A plain block between the full-screen flex section and the stage: the pin's spacer
                does not make room for the pinned scroll when its parent is a flex container. */}
            <div>
                <Container>
                    <SectionHeading
                        id="work-title"
                        title={`${SITES.length} live sites`}
                        lead="Storefronts, company sites, dashboards and web apps, each one online. Open any of them, or scroll on for the featured case studies."
                    />
                </Container>

                <Container wide>
                    <div data-wall-stage className="wall-stage">
                        <div className="wall-frame">
                            <div className="wall-world">
                                <span data-wall-ring className="wall-ring wall-ring--halo" aria-hidden="true" />
                                <span data-wall-ring className="wall-ring wall-ring--floor" aria-hidden="true" />
                                <span data-wall-ring className="wall-ring wall-ring--inner" aria-hidden="true" />

                                <ul data-wall-deck className="wall-deck">
                                    {SITES.map((project, index) => (
                                        <li
                                            key={project.id}
                                            className="wall-slot"
                                            data-portrait={PORTRAIT_SLOTS.has(index) ? '' : undefined}
                                            style={slotStyle(index)}
                                        >
                                            <div data-wall-move data-depth={SLOTS[index].depth} className="wall-move">
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="wall-card"
                                                    data-active={index === active ? '' : undefined}
                                                    aria-label={`${project.name}: open the live site (opens in a new tab)`}
                                                    onPointerEnter={() => setActive(index)}
                                                    onFocus={() => setActive(index)}
                                                >
                                                    <span className="wall-bar" aria-hidden="true">
                                                        <i />
                                                        <i />
                                                        <i />
                                                        <b className="wall-index">{pad(index + 1)}</b>
                                                    </span>
                                                    <img
                                                        src={`${project.screenshots[0].src}-720.webp`}
                                                        srcSet={`${project.screenshots[0].src}-720.webp 720w, ${project.screenshots[0].src}-1440.webp 1440w`}
                                                        sizes={`(max-aspect-ratio: 4/5), (max-width: 639px), (max-height: 499px) ${Math.round(((PORTRAIT_SLOTS.get(index)?.w ?? 450) * 100) / PORTRAIT_FRAME_WIDTH)}vw, ${Math.ceil((SLOTS[index].w * 100) / FRAME_WIDTH)}vw`}
                                                        alt=""
                                                        width="720"
                                                        height="450"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                    <span className="wall-label" aria-hidden="true">
                                                        {project.name}
                                                    </span>
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p data-wall-hud className="wall-hud wall-hud--title" aria-hidden="true">
                                {CAPTIONS.title}
                            </p>
                            <p data-wall-hud className="wall-hud wall-hud--kinds" aria-hidden="true">
                                <Lines items={CAPTIONS.kinds.slice(0, -1)} />
                                <strong className="wall-line">{CAPTIONS.kinds.at(-1)}</strong>
                            </p>
                            <p data-wall-hud className="wall-hud wall-hud--hint" aria-hidden="true">
                                <Lines items={CAPTIONS.hint} />
                            </p>
                            <p data-wall-hud className="wall-hud wall-hud--proof" aria-hidden="true">
                                <Lines items={CAPTIONS.proof} />
                            </p>
                            <p data-wall-hud className="wall-hud wall-hud--reach" aria-hidden="true">
                                <Lines items={CAPTIONS.reach} />
                            </p>
                            <span data-wall-hud className="wall-num" aria-hidden="true">
                                {pad(active + 1)}
                            </span>
                        </div>

                        <div
                            data-wall-focal
                            className="wall-focal rounded-2xl border border-rule bg-sheet/85 p-4 shadow-[0_24px_48px_-28px_rgb(var(--accent)/0.55)] backdrop-blur-md sm:p-5"
                            role="group"
                            aria-label="Selected site"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-accent-ink">
                                    {pad(active + 1)} / {pad(SITES.length)}
                                </p>
                                <div className="flex gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => step(-1)}
                                        className={buttonClasses({ variant: 'secondary', size: 'sm', className: 'w-10 !px-0' })}
                                        aria-label="Previous site"
                                    >
                                        <ArrowLeft className="size-4" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => step(1)}
                                        className={buttonClasses({ variant: 'secondary', size: 'sm', className: 'w-10 !px-0' })}
                                        aria-label="Next site"
                                    >
                                        <ArrowRight className="size-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="mt-2 font-display text-[clamp(1.05rem,0.7rem+0.9vw,1.4rem)] font-semibold leading-tight text-ink">{site.name}</h3>
                            <p className="wall-focal-blurb mt-1.5 text-sm leading-relaxed text-pencil">{blurbFor(site)}</p>
                            <div className="wall-actions mt-3 flex flex-wrap gap-2">
                                <a
                                    href={site.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={buttonClasses({ variant: 'primary', size: 'sm' })}
                                >
                                    Open live site
                                    <ArrowUpRight className="size-4" aria-hidden="true" />
                                    <span className="sr-only">(opens in a new tab)</span>
                                </a>
                                <a href={`${PROJECTS_PAGE}#project-${site.id}`} className={buttonClasses({ variant: 'secondary', size: 'sm' })}>
                                    Case study
                                </a>
                            </div>
                            <a
                                href={PROJECTS_PAGE}
                                className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent-ink transition-colors hover:text-ink"
                            >
                                View all {PROJECTS.length} projects
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default ProjectWall;
