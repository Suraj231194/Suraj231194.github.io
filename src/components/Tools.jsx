import React from 'react';
import { TOOLS } from '../constants';

const Tools = () => {
    return (
        <section id="tools" className="py-24 bg-light dark:bg-dark text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-medium text-center mb-16 relative font-ubuntu text-dark dark:text-white">
                    Tools I Use
                    <span className="block w-44 h-1 bg-dark dark:bg-white absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-light dark:bg-dark px-2 text-xl font-bold">what i know</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {TOOLS.map((tool, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-6 w-full bg-white dark:bg-[#111] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/30 group">
                            <div className={`text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 ${tool.color}`}>
                                <tool.icon />
                            </div>
                            <h1 className="text-xl font-bold text-dark dark:text-white group-hover:text-primary transition-colors">{tool.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tools;
