import React, { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa';

const ScrollUpBtn = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            onClick={scrollToTop}
            className={`fixed right-8 bottom-8 w-12 h-12 bg-primary text-white text-2xl flex items-center justify-center rounded transition-all duration-300 cursor-pointer hover:brightness-90 z-50 shadow-lg ${show ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'
                }`}
        >
            <FaAngleUp />
        </div>
    );
};

export default ScrollUpBtn;
