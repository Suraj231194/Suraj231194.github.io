import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const GithubStats = () => {
    const { theme } = useTheme();
    const username = "Suraj2320";
    const statsTheme = theme === 'dark' ? 'tokyonight' : 'default';
    // Use a blueish color for dark mode (visible on dark bg) and standard green for light mode
    const calendarColor = theme === 'dark' ? '00f2ea' : '196127';

    return (
        <section id="github-stats" className="py-24 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu"
                >
                    Github Stats
                    <span className="block w-44 h-1 bg-primary absolute bottom-[-10px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-primary bg-surface-light dark:bg-surface-dark px-2 text-xl font-bold transition-colors duration-300">my code life</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12 justify-items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="github-stat w-full max-w-lg hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800"
                    >
                        <img
                            className="w-full"
                            src={`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=${theme === 'dark' ? '00000000' : 'ffffff'}`}
                            alt="Github Top Languages"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="github-stat w-full max-w-lg hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800"
                    >
                        <img
                            className="w-full"
                            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en&theme=${statsTheme}&hide_border=true&bg_color=${theme === 'dark' ? '00000000' : 'ffffff'}`}
                            alt="Github User Stats"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="github-stat w-full max-w-lg lg:col-span-2 hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800"
                    >
                        <img
                            className="w-full"
                            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${statsTheme}&hide_border=true&background=${theme === 'dark' ? '00000000' : 'ffffff'}`}
                            alt="Github Streak"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="github-stat w-full lg:col-span-2 mt-8 flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1e1c1c] rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
                    >
                        <h4 className="text-xl font-bold mb-6 text-text-light dark:text-text-dark">Suraj Santosh Pawar's contribution calendar</h4>
                        {/* Fallback to ghchart image as it is more stable than react-github-calendar in this build setup */}
                        <img
                            src={`https://ghchart.rshah.org/${calendarColor}/${username}`}
                            alt="Contribution Calendar"
                            className="w-full h-auto rounded-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
