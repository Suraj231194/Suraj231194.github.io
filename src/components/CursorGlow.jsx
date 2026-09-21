import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * A soft orange light that trails the pointer across the page. It sits above the content
 * with a screen blend in dark mode, so cards and glass panels pick up the light as it passes.
 * Only rendered for fine pointers; touch devices and reduced-motion users never see it.
 */
const CursorGlow = () => {
    const { theme } = useTheme();
    const reduceMotion = useReducedMotion();
    const [enabled, setEnabled] = useState(false);
    const x = useSpring(useMotionValue(-2000), { stiffness: 110, damping: 22, mass: 0.7 });
    const y = useSpring(useMotionValue(-2000), { stiffness: 110, damping: 22, mass: 0.7 });
    const opacity = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

    useEffect(() => {
        if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
        setEnabled(true);

        const handleMove = (event) => {
            if (event.pointerType === 'touch') return;
            x.set(event.clientX);
            y.set(event.clientY);
            opacity.set(1);
        };
        const hide = () => opacity.set(0);

        window.addEventListener('pointermove', handleMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', hide);
        window.addEventListener('blur', hide);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            document.documentElement.removeEventListener('pointerleave', hide);
            window.removeEventListener('blur', hide);
        };
    }, [reduceMotion, x, y, opacity]);

    if (!enabled) return null;

    const dark = theme === 'dark';

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] rounded-full"
            style={{
                x,
                y,
                opacity,
                translateX: '-50%',
                translateY: '-50%',
                mixBlendMode: dark ? 'screen' : 'multiply',
                background: dark
                    ? 'radial-gradient(circle, rgba(250, 91, 15, 0.26) 0%, rgba(250, 91, 15, 0.08) 32%, transparent 68%)'
                    : 'radial-gradient(circle, rgba(250, 91, 15, 0.14) 0%, rgba(250, 91, 15, 0.04) 32%, transparent 68%)',
            }}
        />
    );
};

export default CursorGlow;
