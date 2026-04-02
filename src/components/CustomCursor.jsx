import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Spring configuration for smooth movement
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.classList.contains('cursor-pointer') ||
                e.target.closest('.group') // For our project card / tech card hovers
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Outer Ring / Aura */}
            <motion.div
                className="fixed top-0 left-0 rounded-full border-2 border-primary z-[9998] pointer-events-none transition-colors duration-300"
                animate={{
                    width: isHovering ? 60 : 35,
                    height: isHovering ? 60 : 35,
                    opacity: isHovering ? 0.6 : 0.3,
                    backgroundColor: isHovering ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
};

export default CustomCursor;
