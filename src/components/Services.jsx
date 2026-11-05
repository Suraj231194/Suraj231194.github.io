import React, { useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { HERO_CONTENT, PROJECTS, PROJECTS_PAGE, SERVICES } from '../constants';
import MagneticLink from './MagneticLink';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import { gsap, SCRUB, useScrollMotion, viewportWindow } from './motion/scroll';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';
import { pad } from './ui/projectText';

const DIRECTIONS = ['left', 'up', 'up', 'right'];
const PROJECT_BY_ID = new Map(PROJECTS.map((project) => [project.id, project]));

// How far a card leans toward the pointer, in degrees, on each axis.
const MAX_TILT = 8;
const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/*
 * The card leans toward the pointer and its light follows it (mouse and pen only, and never with
 * reduced motion). The position is measured on the list item, which does not tilt, so the lean
 * never feeds back into itself.
 */
const tiltToward = (event) => {
    if (event.pointerType === 'touch' || !window.matchMedia(FINE_POINTER).matches || window.matchMedia(REDUCED_MOTION).matches) return;
    const card = event.currentTarget;
    const rect = card.parentElement.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    card.style.setProperty('--rx', `${((0.5 - py) * MAX_TILT * 2).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${((px - 0.5) * MAX_TILT * 2).toFixed(2)}deg`);
    card.style.setProperty('--px', px.toFixed(3));
    card.style.setProperty('--py', py.toFixed(3));
};

const settle = (event) => {
    const card = event.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
};

/*
 * As each card arrives, its top edge draws in, the icon spins up out of the card, and the list and
 * the project links follow one by one. All of it is scrubbed by the scroll, like the rest of the
 * page, and the grid floor drifts toward the viewer as the section passes.
 */
const useServicesMotion = (sectionRef) => {
    useScrollMotion(sectionRef, () => {
        const section = sectionRef.current;
        const q = gsap.utils.selector(section);

        q('[data-service]').forEach((item) => {
            const part = gsap.utils.selector(item);
            gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: { trigger: item, ...viewportWindow(item, 0.95, 0.5), scrub: SCRUB },
            })
                .fromTo(part('[data-service-edge]'), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0)
                .fromTo(
                    part('[data-service-icon]'),
                    { scale: 0.35, rotationY: -120, rotationZ: -18, opacity: 0, transformPerspective: 500 },
                    { scale: 1, rotationY: 0, rotationZ: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
                    0.1
                )
                .fromTo(part('[data-service-num]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.2)
                .fromTo(part('[data-service-point]'), { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, stagger: 0.1 }, 0.35)
                .fromTo(part('[data-service-proof]'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.08 }, 0.6);
        });

        gsap.fromTo(
            q('[data-services-floor]'),
            { backgroundPosition: '0px 0px' },
            {
                backgroundPosition: '0px 256px',
                ease: 'none',
                scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
            }
        );
    });
};

const ServiceCard = ({ service, index }) => {
    const proof = service.proof.map((id) => PROJECT_BY_ID.get(id)).filter(Boolean);

    return (
        <div
            className="service-card spotlight"
            style={{ '--from': service.from, '--to': service.to, '--deep': service.deep, '--i': index }}
            onPointerMove={tiltToward}
            onPointerLeave={settle}
        >
            <span data-service-edge className="service-edge" aria-hidden="true" />
            <span className="pointer-glare service-glare" aria-hidden="true" />

            <div className="service-layer flex items-start justify-between gap-3" style={{ '--z': '44px' }}>
                <span data-service-icon className="service-icon">
                    <service.icon className="size-6" aria-hidden="true" />
                </span>
                <span data-service-num className="service-num" aria-hidden="true">
                    {pad(index + 1)}
                </span>
            </div>

            <div className="service-layer mt-6" style={{ '--z': '28px' }}>
                <h3 id={`service-${service.id}`} className="font-display text-xl font-semibold leading-snug text-ink sm:text-[1.375rem]">
                    {service.title}
                </h3>
                <p className="mt-2 text-pencil">{service.description}</p>
            </div>

            <ul className="service-layer mt-5 space-y-2.5" style={{ '--z': '18px' }}>
                {service.includes.map((item) => (
                    <li key={item} data-service-point className="flex items-start gap-2.5 text-[0.95rem] text-ink/90">
                        <span className="service-check" aria-hidden="true">
                            <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                    </li>
                ))}
            </ul>

            <div className="service-layer mt-auto pt-7" style={{ '--z': '24px' }}>
                <p className="service-seen">Seen in</p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                    {proof.map((project) => (
                        <li key={project.id} data-service-proof>
                            <a href={`${PROJECTS_PAGE}#project-${project.id}`} className="service-chip group/chip">
                                <span className="service-chip-dot" aria-hidden="true" />
                                {project.name}
                                <ArrowUpRight
                                    className="size-3.5 -translate-x-0.5 opacity-60 transition-[opacity,transform] duration-200 group-hover/chip:translate-x-0 group-hover/chip:opacity-100"
                                    aria-hidden="true"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

/**
 * What a visitor can hire me for: four kinds of work, each with what it includes and the live
 * projects that show it, linked to their case studies. It follows the site theme (light or dark). The cards stand on a
 * perspective grid, lean toward the pointer, and their contents lift off the card on hover. It
 * closes with an invitation to get in touch.
 */
const Services = () => {
    const sectionRef = useRef(null);
    useServicesMotion(sectionRef);

    return (
        <section
            ref={sectionRef}
            id="services"
            aria-labelledby="services-title"
            className="relative overflow-clip py-16 sm:py-20 lg:py-24"
        >
            <div data-services-floor className="services-floor" aria-hidden="true" />
            <div className="services-halo" aria-hidden="true" />

            <Container className="relative">
                <SectionHeading
                    id="services-title"
                    title="What I can help with"
                    lead="Four kinds of work I take on, each backed by live projects you can open on this site."
                />

                <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {SERVICES.map((service, index) => (
                        <Assemble
                            as="li"
                            key={service.id}
                            data-service
                            from={DIRECTIONS[index % DIRECTIONS.length]}
                            distance={0.8}
                            aria-labelledby={`service-${service.id}`}
                            className="flex"
                        >
                            <ServiceCard service={service} index={index} />
                        </Assemble>
                    ))}
                </ul>

                <Assemble from="near" distance={0.7} className="service-cta mt-10">
                    <div className="relative">
                        <p className="inline-flex items-center gap-2.5 text-sm font-medium text-accent-ink">
                            <span className="relative flex size-2.5" aria-hidden="true">
                                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                                <span className="relative size-2.5 rounded-full bg-emerald-400" />
                            </span>
                            {HERO_CONTENT.status}
                        </p>
                        <p className="mt-2 font-display text-2xl font-semibold leading-tight text-ink sm:text-[1.75rem]">
                            Have a project in <span className="text-gradient">mind?</span>
                        </p>
                        <p className="mt-1.5 text-pencil">I'm open to full-time roles and freelance work. Tell me what you need.</p>
                    </div>
                    <MagneticLink href="#contact" className={buttonClasses({ size: 'lg', className: 'relative shrink-0' })}>
                        Start a conversation
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </MagneticLink>
                </Assemble>
            </Container>
        </section>
    );
};

export default Services;
