import React, { useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Expand, Lock, Smartphone } from 'lucide-react';
import { Github } from './ui/BrandIcons';
import BrowserFrame from './ui/BrowserFrame';
import TechList from './ui/TechList';
import BulletList from './ui/BulletList';
import { buttonClasses } from './ui/buttonStyles';
import ScreenshotViewer from './ScreenshotViewer';
import { SCRUB, gsap, useScrollMotion, viewportWindow } from './motion/scroll';
import useTilt from '../hooks/useTilt';

/**
 * Every view of a project, in one list: the desktop screenshots (top of the home page first),
 * then the home page on a phone.
 */
// Every strip has the same number of slots, so two cards side by side line up.
const THUMB_SLOTS = 6;

const galleryItems = (project) => [
    ...project.screenshots.map((shot) => ({
        full: `${shot.src}-1440.webp`,
        small: `${shot.src}-720.webp`,
        srcSet: `${shot.src}-720.webp 720w, ${shot.src}-1440.webp 1440w`,
        caption: shot.caption,
        alt: shot.alt,
        phone: false,
    })),
    {
        full: project.phone.src,
        small: project.phone.src,
        srcSet: undefined,
        caption: 'Home page on a phone',
        alt: project.phone.alt,
        phone: true,
    },
];

/**
 * The screenshot is plotted onto the window from the top down as it scrolls into view: a clip
 * opens behind an orange scan line while the image settles from a slight zoom. It runs from the
 * screen's top entering the viewport to it reaching 60% of the way up, a little after the card
 * itself has joined, and is scrubbed by the scroll, so it plays back in reverse when scrolling up.
 */
const useScreenReveal = (ref) =>
    useScrollMotion(ref, () => {
        const screen = ref.current;
        const q = gsap.utils.selector(screen);
        const line = q('[data-reveal="line"]');

        gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: screen, ...viewportWindow(screen, 0.95, 0.6), scrub: SCRUB },
        })
            .fromTo(q('[data-reveal="clip"]'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
            .fromTo(q('[data-reveal="zoom"]'), { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
            .fromTo(line, { top: '0%' }, { top: '100%', duration: 1 }, 0)
            .fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0)
            .to(line, { opacity: 0, duration: 0.1 }, 0.9);
    });

/**
 * The full screen of the live site in a browser window, filling the card's width, with a strip
 * of every view below it. The phone view shows the phone screenshot standing in the window.
 */
const Gallery = ({ project }) => {
    const reduceMotion = useReducedMotion();
    const tilt = useTilt({ max: 2.5, perspective: 1800 });
    const screenRef = useRef(null);
    useScreenReveal(screenRef);
    const items = galleryItems(project);
    const [active, setActive] = useState(0);
    const [viewer, setViewer] = useState(null);
    const openerRef = useRef(null);
    const item = items[active];

    const openViewer = (event) => {
        openerRef.current = event.currentTarget;
        setViewer(active);
    };
    const closeViewer = () => {
        setViewer(null);
        openerRef.current?.focus();
    };
    // Stepping through the viewer moves the gallery along with it.
    const changeViewer = (update) => {
        const next = update(viewer ?? active);
        setViewer(next);
        setActive(next);
    };

    return (
        <figure>
            <motion.div {...tilt} className="group relative">
                <BrowserFrame url={project.liveLink} className="shadow-[0_30px_60px_-40px_rgb(var(--ink)/0.55)]">
                    <button
                        ref={screenRef}
                        type="button"
                        onClick={openViewer}
                        aria-label={`View full size: ${item.caption}`}
                        className="drafting-grid relative block aspect-[16/10] w-full overflow-hidden bg-paper"
                    >
                        <span data-reveal="clip" className="absolute inset-0 block">
                            <span data-reveal="zoom" className="absolute inset-0 block bg-paper">
                                <AnimatePresence initial={false}>
                                    <motion.span
                                        key={item.full}
                                        className={`absolute inset-0 ${item.phone ? 'drafting-grid flex items-center justify-center py-[4%]' : ''}`}
                                        initial={reduceMotion ? false : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: reduceMotion ? 0 : 0.35 }}
                                    >
                                        {item.phone ? (
                                            <span className="block h-full overflow-hidden rounded-[1.25rem] border-[5px] border-[#0d141d] bg-[#0d141d] shadow-[0_24px_48px_-28px_rgb(var(--ink)/0.6)]">
                                                <img src={item.full} alt={item.alt} width="480" height="1039" loading="lazy" decoding="async" className="block h-full w-auto object-cover object-top" />
                                            </span>
                                        ) : (
                                            <img
                                                src={item.full}
                                                srcSet={item.srcSet}
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                                alt={item.alt}
                                                width="1440"
                                                height="900"
                                                loading="lazy"
                                                decoding="async"
                                                className="block h-full w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]"
                                            />
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </span>
                        <span
                            data-reveal="line"
                            className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent opacity-0 shadow-[0_0_12px_rgb(var(--accent)/0.7)]"
                            aria-hidden="true"
                        />
                        <span className="pointer-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                        <span
                            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-[#08111c]/80 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                            aria-hidden="true"
                        >
                            <Expand />
                            View full size
                        </span>
                    </button>
                </BrowserFrame>
            </motion.div>

            <figcaption className="mt-3 text-sm text-pencil" aria-live="polite">
                {item.caption}
            </figcaption>

            <ul
                className="mt-3 grid gap-2"
                style={{ gridTemplateColumns: `repeat(${Math.max(items.length, THUMB_SLOTS)}, minmax(0, 1fr))` }}
                aria-label={`${project.name} screenshots`}
            >
                {items.map((thumb, index) => (
                    <li key={thumb.full}>
                        <button
                            type="button"
                            onClick={() => setActive(index)}
                            aria-pressed={index === active}
                            aria-label={`Show screenshot ${index + 1}: ${thumb.caption}`}
                            className={`relative block w-full overflow-hidden rounded-md border-2 bg-paper transition-[border-color,opacity] duration-200 ${
                                index === active ? 'border-accent' : 'border-rule opacity-70 hover:opacity-100'
                            }`}
                        >
                            {thumb.phone ? (
                                <span className="flex aspect-[16/10] w-full items-center justify-center gap-1 text-xs font-medium text-pencil">
                                    <Smartphone aria-hidden="true" />
                                    <span className="hidden sm:inline">Phone</span>
                                </span>
                            ) : (
                                <img src={thumb.small} alt="" width="720" height="450" loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            {createPortal(
                <ScreenshotViewer title={project.name} screenshots={items} index={viewer} onChange={changeViewer} onClose={closeViewer} />,
                document.body
            )}
        </figure>
    );
};

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Key features' },
    { id: 'built', label: 'What I built' },
];

/**
 * Overview, key features and what I built, as tabs, so two cards side by side stay even.
 * "What I built" only shows when there is something verified to say there.
 */
const Details = ({ project }) => {
    const reduceMotion = useReducedMotion();
    const [tab, setTab] = useState('overview');
    const baseId = useId();
    const tabs = TABS.filter((item) => item.id !== 'built' || project.contributions.length > 0);
    const facts = project.year ? [...project.facts, { label: 'Year', value: project.year }] : project.facts;

    // Arrow keys move between tabs, as in any tab list.
    const onKeyDown = (event) => {
        const index = tabs.findIndex((item) => item.id === tab);
        const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const next = tabs[(index + step + tabs.length) % tabs.length];
        setTab(next.id);
        document.getElementById(`${baseId}-${next.id}-tab`)?.focus();
    };

    return (
        <div className="mt-8">
            <div role="tablist" aria-label={`${project.name} details`} className="flex gap-3 border-b border-rule sm:gap-6" onKeyDown={onKeyDown}>
                {tabs.map((item) => {
                    const selected = tab === item.id;
                    return (
                        <button
                            key={item.id}
                            id={`${baseId}-${item.id}-tab`}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            aria-controls={`${baseId}-${item.id}-panel`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setTab(item.id)}
                            className={`relative -mb-px min-h-11 whitespace-nowrap text-[0.8125rem] font-semibold sm:text-[0.95rem] transition-colors duration-200 ${
                                selected ? 'text-ink' : 'text-pencil hover:text-ink'
                            }`}
                        >
                            {item.label}
                            {selected && (
                                <motion.span
                                    layoutId={`${baseId}-tab-line`}
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={tab}
                    id={`${baseId}-${tab}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${baseId}-${tab}-tab`}
                    className="pt-5"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                >
                    {tab === 'overview' && (
                        <>
                            <p className="text-[1.0625rem] leading-relaxed text-ink">{project.summary}</p>
                            <dl className="mt-5 border-t border-rule">
                                {facts.map((fact) => (
                                    <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
                                        <dt className="shrink-0 text-sm text-pencil">{fact.label}</dt>
                                        <dd className="text-right text-sm font-medium text-ink">{fact.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </>
                    )}
                    {tab === 'features' && <BulletList items={project.features} marker="bg-pencil" className="space-y-3" />}
                    {tab === 'built' && <BulletList items={project.contributions} marker="bg-accent" className="space-y-3" />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

/**
 * One project as a card: its number, what it is and its links, the full-screen gallery, the
 * details tabs, and the stack. Two cards sit side by side on wide screens. The number is the
 * project's place in the full list, like a detail bubble on a drawing, so it stays the same
 * under every filter.
 */
const ProjectCaseStudy = ({ project, number, total }) => (
    // On wide screens the card's four parts (header, gallery, details, stack) sit on rows shared
    // with the card beside it, so the two screens and tab rows line up whatever the text lengths.
    <article
        id={`project-${project.id}`}
        aria-labelledby={`project-${project.id}-title`}
        className="flex h-full scroll-mt-24 flex-col rounded-xl border border-rule bg-sheet p-4 shadow-[0_40px_80px_-60px_rgb(var(--ink)/0.5)] sm:p-6 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0 lg:p-7"
    >
        <div className="mb-6 flex items-start gap-3.5 sm:gap-4 lg:self-end">
            <span
                className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink font-display text-[0.95rem] font-semibold tabular-nums text-ink sm:size-12"
                aria-hidden="true"
            >
                {String(number).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] text-pencil">{project.kind}</p>
                {/* Title and links side by side in a full-width card; stacked in the two-up cards. */}
                <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start">
                    <h3 className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
                        <span className="sr-only">{`Project ${number} of ${total}: `}</span>
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/title decoration-accent decoration-2 underline-offset-[0.18em] hover:underline"
                        >
                            {/* The card is named by the project name alone. */}
                            <span id={`project-${project.id}-title`}>{project.name}</span>
                            <ArrowUpRight
                                className="ml-1.5 inline-block size-[0.6em] align-[0.35em] text-pencil transition-transform duration-200 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-accent"
                                aria-hidden="true"
                            />
                            <span className="sr-only"> (live site, opens in a new tab)</span>
                        </a>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit the ${project.name} live site (opens in a new tab)`}
                            className={buttonClasses({ size: 'sm' })}
                        >
                            Live site
                            <ArrowUpRight aria-hidden="true" />
                        </a>
                        {project.sourceLink ? (
                            <a
                                href={project.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View the ${project.name} source code on GitHub (opens in a new tab)`}
                                className={buttonClasses({ variant: 'secondary', size: 'sm' })}
                            >
                                <Github aria-hidden="true" />
                                Source
                            </a>
                        ) : (
                            <span className="inline-flex min-h-10 items-center gap-1.5 text-sm text-pencil">
                                <Lock className="size-3.5" aria-hidden="true" />
                                {project.sourceNote}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <Gallery project={project} />
        <Details project={project} />

        <TechList items={project.stack} label={`Technologies used for ${project.name}`} className="mt-auto pt-6" />
    </article>
);

export default ProjectCaseStudy;
