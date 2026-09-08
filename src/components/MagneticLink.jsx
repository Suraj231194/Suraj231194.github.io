import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const MagneticLink = ({ children, className, ...props }) => {
    const reduceMotion = useReducedMotion();
    const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
    const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });

    const handlePointerMove = (event) => {
        if (reduceMotion || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
    };

    const resetPosition = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            {...props}
            className={className}
            style={{ x, y }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPosition}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
            {children}
        </motion.a>
    );
};

export default MagneticLink;
