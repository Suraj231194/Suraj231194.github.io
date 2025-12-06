import React from 'react';
import { TOOLS } from '../constants';
import { motion } from 'framer-motion';

const Tools = () => {
    return (
        <section id="tools" className="py-24 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu"
                >
                    Tools I Use
                    <span className="block w-44 h-1 bg-primary absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-surface-light dark:bg-surface-dark px-2 text-xl font-bold transition-colors duration-300">what i know</span>
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {TOOLS.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="flex flex-col items-center justify-center p-6 w-full bg-white dark:bg-[#111] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-transparent hover:border-primary/30 group"
                        >
                            <div className={`text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 ${tool.color}`}>
                                <tool.icon />
                            </div>
                            <h1 className="text-xl font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">{tool.name}</h1>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tools;
