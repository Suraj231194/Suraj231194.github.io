import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MOTION_OK, gsap, useRefreshOnLayoutChange } from './motion/scroll';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollUpBtn from './ScrollUpBtn';
import FluidLayer from './FluidLayer';
import useSpotlight from '../hooks/useSpotlight';
import { ThemeProvider } from '../context/ThemeContext';

/**
 * Where a jump to a section should land. A pinned section (the hero, the featured projects) moves
 * down inside its pin spacer once the page has scrolled past it, so aiming at the section itself
 * would land part of the way through its pinned scroll. The spacer's top is where it starts.
 */
const anchorFor = (section) => (section.parentElement?.classList.contains('pin-spacer') ? section.parentElement : section);

/**
 * Everything around a page's sections, shared by the home page and the projects page: the theme,
 * the reading progress bar, the fluid layer, the skip link, the navigation bar and the footer.
 * `page` tells the navigation which page it is on ("home", "projects" or "not-found").
 */
const SiteShell = ({ page = 'home', children }) => {
    const progressRef = useRef(null);
    useRefreshOnLayoutChange();
    useSpotlight();

    // Reading progress: the bar along the top fills from the page's top to its end. It is
    // information rather than decoration, so it also runs with reduced motion, unsmoothed.
    useLayoutEffect(() => {
        const smooth = window.matchMedia(MOTION_OK).matches;
        const tween = gsap.fromTo(
            progressRef.current,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: smooth ? 0.3 : true } }
        );
        return () => {
            tween.scrollTrigger.kill();
            tween.kill();
        };
    }, []);

    // Opening the page at /#section (or /projects/#project-…) lands on that section once it has rendered.
    useEffect(() => {
        const scrollToHash = () => {
            const sectionId = decodeURIComponent(window.location.hash.slice(1));
            if (!sectionId) return;

            window.requestAnimationFrame(() => {
                const section = document.getElementById(sectionId);
                if (section) anchorFor(section).scrollIntoView({ block: 'start' });
            });
        };

        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
        return () => window.removeEventListener('hashchange', scrollToHash);
    }, []);

    // In-page links to a pinned section (the logo, "Back to top", "Projects") go to its spacer's
    // top; the browser's own jump would stop part of the way through the pinned scroll. Links to
    // every other section keep the browser's jump.
    useEffect(() => {
        const onClick = (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = event.target.closest?.('a[href^="#"]');
            const section = link && document.getElementById(decodeURIComponent(link.hash.slice(1)));
            if (!section || anchorFor(section) === section) return;

            event.preventDefault();
            window.history.pushState(null, '', link.hash);
            // After the click has closed the phone menu.
            window.requestAnimationFrame(() => anchorFor(section).scrollIntoView({ block: 'start' }));
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <ThemeProvider>
            {/* A column at least a screen tall, so on a short page (the 404 page) the footer still
                reaches the bottom of the screen. */}
            <div className="App flex min-h-screen flex-col overflow-x-clip bg-paper text-ink transition-colors duration-300">
                <div ref={progressRef} className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left scale-x-0 bg-accent" aria-hidden="true" />
                {/* Under the navigation bar, over everything else. */}
                <FluidLayer className="fixed inset-0 z-[45]" />
                <a
                    href="#main-content"
                    className="sr-only fixed left-4 top-4 z-[110] rounded-md bg-sheet px-4 py-3 font-semibold text-ink shadow-xl focus:not-sr-only"
                >
                    Skip to main content
                </a>
                <ScrollUpBtn />
                <Navbar page={page} />
                <main id="main-content" tabIndex="-1" className="relative z-[1] flex-1 focus:outline-none">
                    {children}
                </main>
                <Footer topHref={page === 'home' ? '#home' : '#main-content'} />
            </div>
        </ThemeProvider>
    );
};

export default SiteShell;
