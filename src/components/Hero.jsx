import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { HERO_CONTENT } from '../constants';

const Hero = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: HERO_CONTENT.roles,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            cursorChar: '|',
            autoInsertCss: true,
        });

        return () => typed.destroy();
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat font-ubuntu before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/40 before:to-black/80 pt-20">
            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="text-white">
                    <div className="text-3xl font-medium mb-3 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>{HERO_CONTENT.greeting}</div>
                    <div className="text-6xl md:text-7xl font-bold mb-4 text-white opacity-0 animate-fade-in-down" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        {HERO_CONTENT.name}
                    </div>
                    <div className="text-3xl md:text-5xl font-medium mb-12 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        {HERO_CONTENT.title} <span className="text-primary font-bold" ref={el}></span>
                    </div>
                    <a
                        href={HERO_CONTENT.link}
                        className="inline-block px-10 py-3 text-2xl font-medium text-white bg-primary rounded-lg transition-all duration-300 hover:bg-orange-600 border-2 border-primary hover:border-orange-600 shadow-lg hover:shadow-orange-600/50 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                    >
                        {HERO_CONTENT.buttonText}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
