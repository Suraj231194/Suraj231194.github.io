import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
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
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-medium mb-3"
                    >
                        {HERO_CONTENT.greeting}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-6xl md:text-7xl font-bold mb-4 text-white"
                    >
                        {HERO_CONTENT.name}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-3xl md:text-5xl font-medium mb-12"
                    >
                        {HERO_CONTENT.title} <span className="text-primary font-bold" ref={el}></span>
                    </motion.div>

                    <motion.a
                        href={HERO_CONTENT.link}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-10 py-3 text-2xl font-medium text-white bg-primary rounded-lg transition-all duration-300 hover:bg-orange-600 border-2 border-primary hover:border-orange-600 shadow-lg hover:shadow-orange-600/50"
                    >
                        {HERO_CONTENT.buttonText}
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
