import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default Reveal;
