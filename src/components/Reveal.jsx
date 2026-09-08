import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { revealMotion } from '../constants/motion';

const Reveal = ({ children, delay = 0 }) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            {...revealMotion(reduceMotion, delay)}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
