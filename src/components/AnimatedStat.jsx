import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '../constants/motion';
import useTilt from '../hooks/useTilt';

const AnimatedStat = ({ value, suffix, label }) => {
    const element = useRef(null);
    const inView = useInView(element, { once: true, amount: 0.5 });
    const reduceMotion = useReducedMotion();
    const tilt = useTilt({ max: 7 });
    const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

    useEffect(() => {
        if (!inView) return undefined;

        if (reduceMotion) {
            setDisplayValue(value);
            return undefined;
        }

        const controls = animate(0, value, {
            duration: 0.8,
            ease: EASE,
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        });

        return () => controls.stop();
    }, [inView, reduceMotion, value]);

    return (
        <motion.div
            ref={element}
            {...tilt}
            className="rounded-xl border border-gray-200 bg-white/80 p-3 text-center shadow-sm transition-colors hover:border-orange-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-orange-500/40 sm:p-4"
        >
            <strong className="block font-ubuntu text-xl text-primary-text dark:text-primary-text-dark sm:text-2xl">
                {displayValue}{suffix}
            </strong>
            <span className="mt-1 block text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
                {label}
            </span>
        </motion.div>
    );
};

export default AnimatedStat;
