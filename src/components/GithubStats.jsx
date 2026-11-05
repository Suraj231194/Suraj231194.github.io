import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Github } from './ui/BrandIcons';
import { useTheme } from '../context/ThemeContext';
import { SOCIAL_LINKS } from '../constants';
import SectionHeading from './SectionHeading';
import Assemble from './motion/Assemble';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';

// The images come from free services that can hang for a minute before failing (the streak
// service has answered 503 after 55 seconds). Once an image is near the screen it gets this
// long to arrive before the fallback text replaces it.
const LOAD_TIMEOUT = 12000;

/**
 * Tracks one live image: `loaded` turns true when it arrives (per src, so a theme change shows
 * the placeholder again), and `onFail` runs if it has not arrived LOAD_TIMEOUT after it first
 * comes near the screen. The images are lazy, so the clock starts then, not on page load.
 */
const useLiveImage = (src, onFail) => {
    const ref = useRef(null);
    const [loadedSrc, setLoadedSrc] = useState(null);
    const loaded = loadedSrc === src;

    useEffect(() => {
        const image = ref.current;
        if (!image || loaded) return undefined;
        const arrived = () => image.complete && image.naturalWidth > 0;
        if (arrived()) {
            setLoadedSrc(src);
            return undefined;
        }
        let timer;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                timer = window.setTimeout(() => {
                    if (!arrived()) onFail();
                }, LOAD_TIMEOUT);
            },
            { rootMargin: '600px 0px' }
        );

        observer.observe(image);
        return () => {
            observer.disconnect();
            window.clearTimeout(timer);
        };
    }, [src, loaded, onFail]);

    return { ref, loaded, onLoad: () => setLoadedSrc(src) };
};

// Shown in an image's place until it arrives.
const ImagePlaceholder = ({ className = 'inset-3' }) => (
    <span aria-hidden="true" className={`pointer-events-none absolute rounded bg-rule/40 motion-safe:animate-pulse ${className}`} />
);

const GithubStats = () => {
    const { theme } = useTheme();
    const [failedImages, setFailedImages] = useState([]);
    const username = 'Suraj231194';
    const profileUrl = SOCIAL_LINKS.github;
    const statsTheme = theme === 'dark' ? 'tokyonight' : 'default';
    const calendarColor = theme === 'dark' ? '4084ff' : '1e66f5';

    const markImageAsFailed = useCallback((imageName) => {
        setFailedImages((images) => (images.includes(imageName) ? images : [...images, imageName]));
    }, []);
    const streakSrc = `https://streak-stats.demolab.com/?user=${username}&theme=${statsTheme}&hide_border=true&background=00000000`;
    const calendarSrc = `https://ghchart.rshah.org/${calendarColor}/${username}`;
    const streak = useLiveImage(streakSrc, useCallback(() => markImageAsFailed('streak'), [markImageAsFailed]));
    const calendar = useLiveImage(calendarSrc, useCallback(() => markImageAsFailed('calendar'), [markImageAsFailed]));

    // Natural height, not a full screen, so no empty band sits above and below the card.
    return (
        <section id="github-stats" aria-labelledby="github-title" className="py-14 sm:py-16 lg:py-20">
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
                        <div className="relative flex min-h-48 min-w-0 items-center justify-center overflow-hidden rounded-md border border-rule bg-paper p-3">
                            {failedImages.includes('streak') ? (
                                <p className="px-4 text-center text-sm text-pencil">
                                    The streak preview did not load. The profile shows current activity.
                                </p>
                            ) : (
                                <>
                                    {!streak.loaded && <ImagePlaceholder />}
                                    <img
                                        ref={streak.ref}
                                        src={streakSrc}
                                        alt={`${username}'s GitHub contribution streak`}
                                        width="495"
                                        height="195"
                                        loading="lazy"
                                        decoding="async"
                                        onLoad={streak.onLoad}
                                        onError={() => markImageAsFailed('streak')}
                                        className={`h-auto w-full transition-opacity duration-500 ${streak.loaded ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                </>
                            )}
                        </div>

                        <div className="min-w-0 rounded-md border border-rule bg-paper p-3">
                            <h4 className="mb-3 text-sm font-medium text-ink">Contribution calendar</h4>
                            {failedImages.includes('calendar') ? (
                                <p className="flex min-h-36 items-center justify-center px-4 text-center text-sm text-pencil">
                                    The contribution calendar did not load. The profile shows current activity.
                                </p>
                            ) : (
                                <div className="relative overflow-x-auto pb-2" tabIndex="0" aria-label="Scrollable GitHub contribution calendar">
                                    {!calendar.loaded && <ImagePlaceholder className="inset-x-0 bottom-2 top-0" />}
                                    <img
                                        ref={calendar.ref}
                                        src={calendarSrc}
                                        alt={`${username}'s GitHub contribution calendar`}
                                        width="663"
                                        height="104"
                                        loading="lazy"
                                        decoding="async"
                                        onLoad={calendar.onLoad}
                                        onError={() => markImageAsFailed('calendar')}
                                        // The chart draws empty days light grey in either theme. In the dark
                                        // theme inverting it and turning the hue back makes those days dark,
                                        // keeps the blue, and makes busier days brighter, as GitHub's dark theme does.
                                        className={`h-auto min-w-[650px] rounded transition-opacity duration-500 dark:hue-rotate-180 dark:invert ${calendar.loaded ? 'opacity-100' : 'opacity-0'}`}
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
