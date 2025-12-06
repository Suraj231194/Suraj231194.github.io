import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
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
        <section id="about" className="py-24 bg-dark text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-medium text-center mb-16 relative font-ubuntu">
                    {ABOUT_CONTENT.title}
                    <span className="block w-44 h-1 bg-light absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-dark px-2 text-xl font-bold">who i am</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-[45%]">
                        <img
                            src={ABOUT_CONTENT.image}
                            alt={ABOUT_CONTENT.name}
                            className="w-[400px] h-[450px] object-cover rounded-lg shadow-xl shadow-primary/20 mx-auto md:mx-0 transition-transform duration-300 hover:scale-[1.02]"
                        />
                    </div>

                    <div className="md:w-[55%]">
                        <div className="text-2xl font-semibold mb-4">
                            I'm {ABOUT_CONTENT.name} and I'm a <span ref={el} className="text-primary font-bold"></span>
                        </div>
                        <p className="text-lg text-justify mb-8 leading-relaxed text-gray-300">
                            {ABOUT_CONTENT.description}
                        </p>
                        <a
                            href={ABOUT_CONTENT.resumeLink}
                            download
                            className="inline-block px-8 py-3 text-xl font-medium text-white bg-primary border-2 border-primary rounded-lg transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-lg hover:shadow-primary/30"
                        >
                            {ABOUT_CONTENT.resumeButton}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
