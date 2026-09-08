import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { HERO_CONTENT } from '../constants';
import { EASE, enterMotion } from '../constants/motion';
import MagneticLink from './MagneticLink';

const Hero = () => {
    const roleElement = useRef(null);
    const heroSection = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroSection,
        offset: ['start start', 'end start'],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        if (!roleElement.current) return undefined;

        if (reduceMotion) {
            roleElement.current.textContent = HERO_CONTENT.roles[0];
            return undefined;
        }

        const typed = new Typed(roleElement.current, {
            strings: HERO_CONTENT.roles,
            typeSpeed: 55,
            backSpeed: 35,
            backDelay: 1800,
            loop: true,
            cursorChar: '|',
            autoInsertCss: true,
        });

        return () => typed.destroy();
    }, [reduceMotion]);

    return (
        <section
            ref={heroSection}
            id="home"
            className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pb-16 pt-24 font-ubuntu"
        >
            <motion.div
                className="absolute -inset-[8%] bg-hero-pattern bg-cover bg-center bg-no-repeat"
                style={{ y: reduceMotion ? 0 : backgroundY }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
                <motion.div className="max-w-4xl text-white" style={{ opacity: reduceMotion ? 1 : contentOpacity }}>
                    <motion.p
                        {...enterMotion(reduceMotion)}
                        className="mb-3 text-lg font-medium text-white/85 sm:text-2xl md:text-3xl"
                    >
                        {HERO_CONTENT.greeting}
                    </motion.p>

                    <div className="mb-4 overflow-hidden pb-1">
                        <motion.h1
                            initial={reduceMotion ? false : { y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.08, ease: EASE }}
                            className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
                        >
                            {HERO_CONTENT.name}
                        </motion.h1>
                    </div>

                    <motion.p
                        {...enterMotion(reduceMotion, 0.2)}
                        className="mb-9 min-h-[4rem] text-xl font-medium leading-snug sm:min-h-0 sm:text-3xl md:text-5xl"
                    >
                        {HERO_CONTENT.title}{' '}
                        <span className="block text-orange-400 sm:inline" aria-hidden="true">
                            <span ref={roleElement} />
                        </span>
                        <span className="sr-only">{HERO_CONTENT.roles[0]}</span>
                    </motion.p>

                    <motion.div
                        {...enterMotion(reduceMotion, 0.3)}
                        className="flex flex-col gap-3 sm:flex-row sm:items-center"
                    >
                        <MagneticLink
                            href={HERO_CONTENT.link}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary px-7 py-3 text-lg font-bold text-slate-950 shadow-lg shadow-orange-950/20 transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
                        >
                            {HERO_CONTENT.buttonText}
                            <FaArrowRight aria-hidden="true" />
                        </MagneticLink>
                        <MagneticLink
                            href={HERO_CONTENT.secondaryLink}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-7 py-3 text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
                        >
                            <FaEnvelope aria-hidden="true" />
                            {HERO_CONTENT.secondaryButtonText}
                        </MagneticLink>
                    </motion.div>
                </motion.div>
            </div>

            {!reduceMotion && (
                <motion.a
                    href="#about"
                    aria-label="Scroll to About section"
                    className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:flex"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    Scroll
                    <span className="h-8 w-px bg-gradient-to-b from-orange-400 to-transparent" aria-hidden="true" />
                </motion.a>
            )}
        </section>
    );
};

export default Hero;
