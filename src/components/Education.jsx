import React from 'react';
import { EDUCATION } from '../constants';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <section id="education" className="py-24 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu"
                >
                    My Education
                    <span className="block w-44 h-1 bg-primary absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-bg-light dark:bg-bg-dark px-2 text-xl font-bold transition-colors duration-300">what i studied</span>
                </motion.h2>

                <div className="flex flex-nowrap overflow-x-auto gap-8 justify-start md:justify-center py-4 scrollbar-hide">
                    {EDUCATION.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="min-w-[300px] bg-white dark:bg-[#1e1c1c] rounded-lg p-8 text-center transition-all duration-300 hover:bg-primary group hover:-translate-y-2 shadow-lg border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={edu.image}
                                    alt={edu.title}
                                    className="h-[150px] w-[150px] object-cover rounded-full border-[5px] border-primary transition-all duration-300 group-hover:border-white mb-4"
                                />
                                <div className="text-2xl font-medium mb-2 group-hover:text-white transition-colors">{edu.title}</div>
                                <p className="text-lg mb-1 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors">{edu.subtitle}</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors">{edu.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
