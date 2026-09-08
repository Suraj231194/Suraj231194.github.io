import React, { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa';

const ScrollUpBtn = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 500);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            tabIndex={show ? 0 : -1}
            className={`safe-bottom fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-primary text-xl text-slate-950 shadow-lg transition-[opacity,transform,background-color] duration-200 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:right-6 ${show ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
                }`}
        >
            <FaAngleUp aria-hidden="true" />
        </button>
    );
};

export default ScrollUpBtn;
