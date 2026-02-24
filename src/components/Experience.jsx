import React from 'react';
import { EXPERIENCE } from '../constants';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <section id="experience" className="py-24 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu"
                >
                    My Experience
                    <span className="block w-48 h-1 bg-primary absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-bg-light dark:bg-bg-dark px-2 text-xl font-bold transition-colors duration-300">where I have worked</span>
                </motion.h2>

                <div className="flex flex-col gap-8 py-4 items-center">
                    {EXPERIENCE.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="w-full max-w-4xl bg-white dark:bg-[#1e1c1c] rounded-lg p-8 transition-all duration-300 hover:shadow-xl group border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

                            <div className="md:w-1/3 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{exp.role}</h3>
                                <p className="text-xl text-primary font-medium mt-1">{exp.company}</p>
                                <p className="text-md text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                                    {exp.duration}
                                </p>
                            </div>

                            <div className="md:w-2/3 flex flex-col justify-center">
                                {Array.isArray(exp.description) ? (
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {exp.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {exp.description}
                                    </p>
                                )}
                                {exp.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {exp.technologies.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
