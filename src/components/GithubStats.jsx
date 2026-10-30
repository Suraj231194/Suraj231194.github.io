import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Github } from './ui/BrandIcons';
import { useTheme } from '../context/ThemeContext';
import { SOCIAL_LINKS } from '../constants';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';

const GithubStats = () => {
    const { theme } = useTheme();
    const [failedImages, setFailedImages] = useState([]);
    const username = 'Suraj231194';
    const profileUrl = SOCIAL_LINKS.github;
    const statsTheme = theme === 'dark' ? 'tokyonight' : 'default';
    const calendarColor = theme === 'dark' ? '4084ff' : '1e66f5';

    const markImageAsFailed = (imageName) => {
        setFailedImages((images) => (images.includes(imageName) ? images : [...images, imageName]));
    };

    return (
        <section id="github-stats" aria-labelledby="github-title" className="screen py-16 sm:py-20 lg:py-24">
            <Container>
                <SectionHeading id="github-title" title="GitHub activity" lead="My contribution streak and calendar, loaded live from GitHub." />

                <Assemble from="near" className="spotlight rounded-lg border border-rule bg-sheet p-4 sm:p-6">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-ink text-xl text-paper">
                                <Github aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">@{username}</h3>
                                <p className="text-sm text-pencil">Open-source work and coding activity</p>
                            </div>
                        </div>
                        <a
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View my GitHub profile (opens in a new tab)"
                            className={buttonClasses({ variant: 'secondary' })}
                        >
                            View GitHub profile
                            <ArrowUpRight className="text-xs" aria-hidden="true" />
                        </a>
                    </div>

                    {/* minmax(0, ...) tracks stop the 650px calendar from forcing the grid wider than a phone screen. */}
                    <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                        <div className="flex min-h-48 min-w-0 items-center justify-center overflow-hidden rounded-md border border-rule bg-paper p-3">
                            {failedImages.includes('streak') ? (
                                <p className="px-4 text-center text-sm text-pencil">
                                    The streak preview did not load. The profile shows current activity.
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

                        <div className="min-w-0 rounded-md border border-rule bg-paper p-3">
                            <h4 className="mb-3 text-sm font-medium text-ink">Contribution calendar</h4>
                            {failedImages.includes('calendar') ? (
                                <p className="flex min-h-36 items-center justify-center px-4 text-center text-sm text-pencil">
                                    The contribution calendar did not load. The profile shows current activity.
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
                                        className="h-auto min-w-[650px] rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Assemble>
            </Container>
        </section>
    );
};

export default GithubStats;
