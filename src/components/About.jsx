import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { ABOUT_CONTENT, HERO_CONTENT } from '../constants';

const About = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: HERO_CONTENT.roles,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });

        return () => typed.destroy();
    }, []);

    return (
        <section id="about" className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu text-text-light dark:text-text-dark"
                >
                    {ABOUT_CONTENT.title}
                    <span className="block w-44 h-1 bg-primary absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-bg-light dark:bg-bg-dark px-2 text-xl font-bold transition-colors duration-300">who i am</span>
                </motion.h2>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:w-[45%]"
                    >
                        <img
                            src={ABOUT_CONTENT.image}
                            alt={ABOUT_CONTENT.name}
                            className="w-[400px] h-[450px] object-cover rounded-lg shadow-xl shadow-primary/20 mx-auto md:mx-0 transition-transform duration-300 hover:scale-[1.02]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="md:w-[55%]"
                    >
                        <div className="text-2xl font-semibold mb-4 text-text-light dark:text-text-dark">
                            I'm {ABOUT_CONTENT.name} and I'm a <span ref={el} className="text-primary font-bold"></span>
                        </div>
                        <p className="text-lg text-justify mb-8 leading-relaxed text-gray-600 dark:text-gray-300">
                            {ABOUT_CONTENT.description}
                        </p>
                        <motion.a
                            href={ABOUT_CONTENT.resumeLink}
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-8 py-3 text-xl font-medium text-white bg-primary border-2 border-primary rounded-lg transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-lg hover:shadow-primary/30"
                        >
                            {ABOUT_CONTENT.resumeButton}
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
