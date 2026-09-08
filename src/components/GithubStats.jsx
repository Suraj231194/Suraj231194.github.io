import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { revealMotion } from '../constants/motion';
import SectionHeading from './SectionHeading';

const GithubStats = () => {
    const { theme } = useTheme();
    const reduceMotion = useReducedMotion();
    const [failedImages, setFailedImages] = useState([]);
    const username = 'Suraj231194';
    const profileUrl = `https://github.com/${username}`;
    const statsTheme = theme === 'dark' ? 'tokyonight' : 'default';
    const calendarColor = theme === 'dark' ? 'fb923c' : 'c2410c';

    const markImageAsFailed = (imageName) => {
        setFailedImages((images) => images.includes(imageName) ? images : [...images, imageName]);
    };

    return (
        <section id="github-stats" className="bg-surface-light/60 py-16 text-text-light transition-colors duration-300 dark:bg-surface-dark/30 dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="GitHub Activity" eyebrow="How I keep building" />

                <motion.div
                    {...revealMotion(reduceMotion, 0.05, 20)}
                    className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#151515] sm:p-6"
                >
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-xl text-white dark:bg-white dark:text-slate-950">
                                <FaGithub aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-ubuntu text-lg font-bold sm:text-xl">@{username}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Open-source work and coding activity</p>
                            </div>
                        </div>
                        <a
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold text-gray-800 transition-colors hover:border-orange-400 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-white/20 dark:text-white dark:hover:text-orange-400 dark:ring-offset-[#151515]"
                        >
                            View GitHub profile
                            <FaExternalLinkAlt aria-hidden="true" />
                        </a>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-black/20">
                            {failedImages.includes('streak') ? (
                                <p className="px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    GitHub activity preview is temporarily unavailable. Visit the profile for current activity.
                                </p>
                            ) : (
                                <img
                                    src={`https://streak-stats.demolab.com/?user=${username}&theme=${statsTheme}&hide_border=true&background=00000000`}
                                    alt={`${username}'s GitHub contribution streak`}
                                    width="495"
                                    height="195"
                                    loading="lazy"
                                    decoding="async"
                                    onError={() => markImageAsFailed('streak')}
                                    className="h-auto w-full"
                                />
                            )}
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-black/20">
                            <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">Contribution calendar</h3>
                            {failedImages.includes('calendar') ? (
                                <p className="flex min-h-36 items-center justify-center px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Contribution calendar is temporarily unavailable. Visit the profile for current activity.
                                </p>
                            ) : (
                                <div className="overflow-x-auto pb-2" tabIndex="0" aria-label="Scrollable GitHub contribution calendar">
                                    <img
                                        src={`https://ghchart.rshah.org/${calendarColor}/${username}`}
                                        alt={`${username}'s GitHub contribution calendar`}
                                        width="663"
                                        height="104"
                                        loading="lazy"
                                        decoding="async"
                                        onError={() => markImageAsFailed('calendar')}
                                        className="h-auto min-w-[650px] rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GithubStats;
