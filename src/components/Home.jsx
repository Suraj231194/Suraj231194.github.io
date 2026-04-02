import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Home = () => {
    const el = useRef(null);

    useEffect(() => {
        // Typed.js initialization
        // Original script: strings: ["Full Stack Web Developer", "Developer", "Designer", "Freelancer"],
        const typed = new Typed(el.current, {
            strings: ["Full Stack Web Developer", "Developer", "Designer", "Freelancer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <section className="home" id="home">
            <div className="max-width">
                <div className="home-content">
                    <div className="text-1">Hello, my name is</div>
                    <div className="text-2">Suraj Pawar</div>
                    <div className="text-3">And I'm a <span ref={el} className="typing"></span></div>
                    <a href="#contact">Hire me</a>
                </div>
            </div>
        </section>
    );
};

export default Home;
