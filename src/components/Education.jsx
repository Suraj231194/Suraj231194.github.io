import React from 'react';
import { EDUCATION } from '../constants';

const Education = () => {
    return (
        <section id="education" className="py-24 bg-light dark:bg-dark text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-medium text-center mb-16 relative font-ubuntu text-dark dark:text-white">
                    My Education
                    <span className="block w-44 h-1 bg-dark dark:bg-white absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-light dark:bg-dark px-2 text-xl font-bold">what i studied</span>
                </h2>

                <div className="flex flex-nowrap overflow-x-auto gap-8 justify-start md:justify-center py-4 scrollbar-hide">
                    {EDUCATION.map((edu, index) => (
                        <div key={index} className="min-w-[300px] bg-white dark:bg-[#1e1c1c] rounded-lg p-8 text-center transition-all duration-300 hover:bg-primary group hover:-translate-y-2 shadow-lg">
                            <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={edu.image}
                                    alt={edu.title}
                                    className="h-[150px] w-[150px] object-cover rounded-full border-[5px] border-primary transition-all duration-300 group-hover:border-white mb-4"
                                />
                                <div className="text-2xl font-medium mb-2 text-dark dark:text-white group-hover:text-white">{edu.title}</div>
                                <p className="text-lg mb-1 text-gray-600 dark:text-gray-300 group-hover:text-white">{edu.subtitle}</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-white">{edu.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
