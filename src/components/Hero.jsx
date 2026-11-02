import React, { useRef } from 'react';
import { ArrowRight, BriefcaseBusiness, CalendarClock, Download, Handshake, Mail, MapPin } from 'lucide-react';
import { SplitText } from 'gsap/SplitText';
import { HERO_CONTENT, SOCIAL_LINKS } from '../constants';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';
import { Github, Linkedin } from './ui/BrandIcons';
import MagneticLink from './MagneticLink';
import HeroVisual from './hero/HeroVisual';
import HeroParticles from './hero/HeroParticles';
import { MOTION_OK, SCRUB, gsap, useScrollMotion } from './motion/scroll';

gsap.registerPlugin(SplitText);

const SOCIALS = [
    { label: 'GitHub', href: SOCIAL_LINKS.github, icon: Github, external: true },
    { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: Linkedin, external: true },
    { label: 'Email', href: `mailto:${SOCIAL_LINKS.email}`, icon: Mail, external: false },
];

const FACT_ICONS = { Role: BriefcaseBusiness, Experience: CalendarClock, 'Based in': MapPin, 'Open to': Handshake };

// Dividers in the facts strip: two columns on phones, four in a row on wide screens. (Below 420px
// it is one fact per row, with its own dividers: .facts-strip in index.css.)
const FACT_DIVIDERS = [
    '',
    'before:inset-y-4 before:left-0 before:w-px before:bg-gradient-to-b',
    'after:inset-x-4 after:top-0 after:h-px after:bg-gradient-to-r lg:after:hidden lg:before:inset-y-4 lg:before:left-0 lg:before:w-px lg:before:bg-gradient-to-b',
    'before:inset-y-4 before:left-0 before:w-px before:bg-gradient-to-b after:inset-x-4 after:top-0 after:h-px after:bg-gradient-to-r lg:after:hidden',
];

/*
 * The opening, once on load: the name rises letter by letter out of its line, the role and
 * summary resolve word by word, then the buttons and the strip settle while the 3D scene
 * assembles, layers dropping in from the bottom up and the orbits arriving. Split text is put back afterwards, so what
 * remains is plain text.
 */
const useHeroOpening = (sectionRef) =>
    useScrollMotion(sectionRef, () => {
        const q = gsap.utils.selector(sectionRef.current);
        const name = SplitText.create(q('[data-hero-name]'), { type: 'chars', mask: 'chars' });
        const summary = SplitText.create(q('[data-hero-summary]'), { type: 'words' });

        // Each step names its end state and clears its inline styles when done: some of these
        // elements have CSS transitions and hover transforms of their own, which must win afterwards.
        const rise = (distance, extra = {}) => [
            { y: distance, opacity: 0, ...extra.from },
            { y: 0, opacity: 1, clearProps: 'transform,opacity,filter', ...extra.to },
        ];
        const timeline = gsap.timeline({
            defaults: { ease: 'expo.out' },
            onComplete: () => {
                name.revert();
                summary.revert();
            },
        });
        timeline
            .fromTo(q('[data-intro="status"]'), ...rise(14, { to: { duration: 0.8 } }), 0.1)
            .fromTo(name.chars, { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.035 }, 0.15)
            .fromTo(q('[data-intro="role"]'), ...rise(18, { from: { filter: 'blur(8px)' }, to: { filter: 'blur(0px)', duration: 1 } }), 0.55)
            .fromTo(summary.words, ...rise(12, { from: { filter: 'blur(6px)' }, to: { filter: 'blur(0px)', duration: 0.8, stagger: 0.014 } }), 0.65)
            .fromTo(q('[data-intro="actions"] > *'), ...rise(18, { to: { duration: 0.8, stagger: 0.08 } }), 0.85)
            .fromTo(q('[data-intro="socials"] > *, [data-intro="cue"]'), ...rise(12, { to: { duration: 0.6, stagger: 0.06 } }), 1)
            .fromTo(q('[data-intro="strip"]'), ...rise(26, { to: { duration: 1 } }), 1.05)
            // The scene: lights up, then the layers drop in from the bottom up, the beams grow
            // between them, and the chips and labels arrive.
            .fromTo(q('[data-scene]'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.4, clearProps: 'transform,opacity' }, 0.2)
            .fromTo(q('[data-layer]'), { '--drop': '160px' }, { '--drop': '0px', duration: 1.2, stagger: 0.12, ease: 'power4.out' }, 0.35)
            // Fade each layer's faces, not the layer: opacity on a 3D layer would flatten its edges.
            .fromTo(
                q('[data-layer] > *'),
                { opacity: 0 },
                { opacity: 1, duration: 0.8, stagger: (index) => Math.floor(index / 3) * 0.12, clearProps: 'opacity' },
                0.35
            )
            .fromTo(q('[data-beam]'), { '--grow': 0 }, { '--grow': 1, duration: 0.9, stagger: 0.1, ease: 'power2.out' }, 1)
            .fromTo(q('[data-chip]'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'back.out(1.8)', clearProps: 'transform,opacity' }, 1.05)
            .fromTo(q('[data-caption]'), ...rise(14, { to: { duration: 0.8 } }), 1.35);

        return () => {
            name.revert();
            summary.revert();
        };
    });

/*
 * Scrolling on joins the scene's layers into one stack (and scrolling back takes them apart).
 * On wide screens the hero is pinned while that happens: it holds still for 70% of a screen of
 * scrolling while the orbits widen and fade, the caption goes, and the grid and the copy move at
 * different depths. Then, as it scrolls away, the sheet sinks back and fades under the projects
 * coming up. On narrower screens nothing is pinned: the layers join as the scene scrolls away.
 */
const useHeroScroll = (sectionRef) =>
    useScrollMotion(
        sectionRef,
        ({ wide }) => {
            const section = sectionRef.current;
            const q = gsap.utils.selector(section);
            const scene = q('[data-scene]')[0];
            // Every step names both ends, and none touches what the opening animates, so neither
            // can pick up the other's values.
            const join = (timeline) =>
                timeline
                    .fromTo(scene, { '--open': 1, '--spin': '-42deg', '--spread': 1 }, { '--open': 0.24, '--spin': '-30deg', '--spread': 1.5, duration: 1 }, 0)
                    .fromTo(q('[data-orbit-fade], [data-rings]'), { opacity: 1 }, { opacity: 0, duration: 0.7 }, 0.15)
                    .fromTo(q('[data-caption-fade]'), { opacity: 1 }, { opacity: 0, duration: 0.45 }, 0);

            if (!wide) {
                join(
                    gsap.timeline({
                        defaults: { ease: 'none' },
                        // The scene sits first on phones, so the join runs as it scrolls up and away.
                        scrollTrigger: { trigger: scene, start: 'top 8%', end: 'bottom 15%', scrub: SCRUB },
                    })
                );
                return;
            }

            const pinned = join(
                gsap.timeline({
                    defaults: { ease: 'none' },
                    // Pinned once its bottom edge is on screen, so a hero taller than the window is seen whole first.
                    scrollTrigger: { trigger: section, start: 'bottom bottom', end: '+=70%', pin: true, scrub: SCRUB },
                })
            )
                .fromTo(q('[data-depth="grid"]'), { yPercent: 0 }, { yPercent: -5, duration: 1 }, 0)
                .fromTo(q('[data-depth="copy"]'), { y: 0 }, { y: -32, duration: 1 }, 0);

            gsap.fromTo(
                q('[data-depth="sheet"]'),
                { scale: 1, opacity: 1 },
                {
                    scale: 0.95,
                    opacity: 0.35,
                    ease: 'none',
                    transformOrigin: '50% 100%',
                    scrollTrigger: {
                        trigger: section,
                        start: () => pinned.scrollTrigger.end,
                        end: () => pinned.scrollTrigger.end + section.offsetHeight,
                        scrub: SCRUB,
                        invalidateOnRefresh: true,
                    },
                }
            );
        },
        { motion: MOTION_OK, wide: '(min-width: 1024px)' }
    );

const Hero = () => {
    const sectionRef = useRef(null);
    useHeroOpening(sectionRef);
    useHeroScroll(sectionRef);
    const [firstName, ...lastName] = HERO_CONTENT.name.split(' ');

    return (
        <section
            ref={sectionRef}
            id="home"
            aria-labelledby="hero-title"
            className="relative isolate flex flex-col overflow-hidden pt-20 sm:pt-24 lg:min-h-[100svh] lg:pt-[5.75rem] short:pt-20"
        >
            {/* Layered light, a grid only around the scene, drifting points of light and fine grain.
                (The fluid the pointer stirs lies over the whole page: FluidLayer in App.jsx.) */}
            <div className="hero-backdrop absolute inset-0 -z-10" aria-hidden="true" />
            <div data-depth="grid" className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
            <HeroParticles className="absolute inset-0 -z-10 h-full w-full" />
            <div className="grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

            <div data-depth="sheet" className="relative flex flex-1 flex-col">
                <Container className="relative grid flex-1 items-center gap-4 pb-8 lg:grid-cols-12 lg:gap-4 lg:pb-5">
                    <div data-depth="copy" className="relative z-[1] lg:col-span-6 xl:col-span-5">
                        <p
                            data-intro="status"
                            className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-sheet/60 py-1.5 pl-3 pr-4 text-sm font-medium text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-sm"
                        >
                            <span className="relative flex size-2.5" aria-hidden="true">
                                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                                <span className="relative size-2.5 rounded-full bg-emerald-400" />
                            </span>
                            {HERO_CONTENT.status}
                        </p>

                        <h1
                            id="hero-title"
                            data-hero-name
                            className="mt-5 font-display text-[clamp(3.6rem,1.9rem+7vw,8.25rem)] font-bold leading-[0.9] tracking-[-0.04em] text-ink lg:text-[min(1.9rem+7vw,8.25rem,13.5svh)] short:mt-3 short:text-[min(1.9rem+7vw,8.25rem,12.5svh)] dark:[text-shadow:0_0_70px_rgb(37_99_235/0.4)]"
                        >
                            <span className="block">{firstName}</span>{' '}
                            <span className="block">{lastName.join(' ')}</span>
                        </h1>

                        {/* Each part of the role stays on one line, so a narrow screen breaks it at the dot
                            ("React & Next.js" together) rather than after "React". */}
                        <p data-intro="role" className="text-gradient mt-5 short:mt-3 font-display text-[clamp(1.3rem,1.05rem+0.9vw,1.75rem)] font-semibold leading-tight">
                            {HERO_CONTENT.role.split(' · ').map((part, index) => (
                                <React.Fragment key={part}>
                                    {index > 0 && ' · '}
                                    <span className="whitespace-nowrap">{part}</span>
                                </React.Fragment>
                            ))}
                        </p>
                        <p data-hero-summary className="mt-3 max-w-[33rem] text-lg leading-relaxed text-pencil sm:text-[1.1875rem] lg:text-[1.0625rem] xl:text-[1.125rem]">
                            {HERO_CONTENT.summary}
                        </p>

                        <div data-intro="actions" className="mt-7 short:mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <MagneticLink href={HERO_CONTENT.primaryCta.href} className={buttonClasses({ size: 'lg', className: 'group' })}>
                                {HERO_CONTENT.primaryCta.label}
                                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                            </MagneticLink>
                            <a href={HERO_CONTENT.secondaryCta.href} download className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
                                <Download aria-hidden="true" />
                                {HERO_CONTENT.secondaryCta.label}
                            </a>
                        </div>

                        <div className="mt-6 flex items-center gap-6 short:mt-4">
                            <ul data-intro="socials" className="flex items-center gap-2.5" aria-label="Find me online">
                                {SOCIALS.map((social) => (
                                    <li key={social.label}>
                                        <a
                                            href={social.href}
                                            {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            aria-label={social.external ? `${social.label} (opens in a new tab)` : `${social.label} ${SOCIAL_LINKS.email}`}
                                            className="inline-flex size-11 items-center justify-center rounded-xl border border-ink/10 bg-sheet/60 text-[1.15rem] text-pencil backdrop-blur-sm transition-[color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink hover:shadow-[0_0_22px_-4px_rgb(var(--accent)/0.7)]"
                                        >
                                            <social.icon aria-hidden="true" />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Scroll cue: a dot running down a track, beside the links on wide screens. */}
                            <a
                                href="#projects"
                                data-intro="cue"
                                className="group hidden items-center gap-3 border-l border-ink/10 pl-6 text-sm font-medium text-pencil transition-colors hover:text-ink lg:inline-flex"
                            >
                                <span className="flex h-9 w-6 justify-center rounded-full border border-ink/25 pt-1.5 transition-colors group-hover:border-accent/70" aria-hidden="true">
                                    <span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_8px_rgb(var(--glow))]" />
                                </span>
                                Scroll to explore
                            </a>
                        </div>
                    </div>

                    <HeroVisual
                        layers={HERO_CONTENT.layers}
                        className="-mx-5 order-first h-[19rem] sm:mx-0 sm:h-[28rem] lg:order-none lg:col-span-6 lg:h-[clamp(28rem,calc(100svh-15rem),44rem)] xl:col-span-7"
                    />
                </Container>

                {/* The facts strip: who, how long, where, and what for. */}
                <div data-intro="strip" className="relative">
                    <Container className="pb-6 short:pb-4">
                        <dl className="facts-strip grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-sheet/55 shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_30px_60px_-34px_rgb(var(--accent)/0.55)] backdrop-blur-md lg:grid-cols-4">
                            {HERO_CONTENT.facts.map((fact, index) => {
                                const Icon = FACT_ICONS[fact.label];
                                return (
                                    <div
                                        key={fact.label}
                                        className={`relative flex items-start gap-3 px-4 py-4 before:absolute before:from-transparent before:via-ink/15 before:to-transparent after:absolute after:from-transparent after:via-ink/15 after:to-transparent sm:gap-3.5 sm:px-6 sm:py-5 lg:py-4 ${FACT_DIVIDERS[index]}`}
                                    >
                                        {Icon && (
                                            <span
                                                className="mt-0.5 hidden size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,rgb(var(--accent)/0.16),rgb(var(--glow)/0.14))] text-accent-ink ring-1 ring-inset ring-ink/10 sm:grid"
                                                aria-hidden="true"
                                            >
                                                <Icon className="size-[1.15rem]" />
                                            </span>
                                        )}
                                        <div className="fact-text min-w-0">
                                            <dt className="text-[0.8125rem] text-pencil">{fact.label}</dt>
                                            <dd className="mt-0.5 font-display text-[1.02rem] font-semibold leading-snug text-ink sm:text-[1.0625rem]">{fact.value}</dd>
                                        </div>
                                    </div>
                                );
                            })}
                        </dl>
                    </Container>
                </div>
            </div>
            {/* A hairline of light where the hero meets the next section. */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" aria-hidden="true" />
        </section>
    );
};

export default Hero;
