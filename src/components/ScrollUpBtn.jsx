import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollUpBtn = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 600);
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
            aria-hidden={!show}
            className={`safe-bottom fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-md border border-rule bg-sheet text-xl text-ink shadow-[0_12px_24px_-16px_rgb(var(--ink)/0.6)] transition-[opacity,transform,border-color] duration-200 hover:border-ink/40 sm:right-6 ${
                show ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <ArrowUp aria-hidden="true" />
        </button>
    );
};

export default ScrollUpBtn;
