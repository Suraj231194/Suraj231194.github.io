import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MOTION_OK, gsap, useRefreshOnLayoutChange } from './components/motion/scroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectWall from './components/ProjectWall';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Tools from './components/Tools';
import About from './components/About';
import Education from './components/Education';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollUpBtn from './components/ScrollUpBtn';
import FluidLayer from './components/FluidLayer';
import useSpotlight from './hooks/useSpotlight';
import { ThemeProvider } from './context/ThemeContext';

function App() {
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

    // Opening the page at /#section lands on that section once it has rendered.
    useEffect(() => {
        const scrollToHash = () => {
            const sectionId = decodeURIComponent(window.location.hash.slice(1));
            if (!sectionId) return;

            window.requestAnimationFrame(() => {
                document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
            });
        };

        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
        return () => window.removeEventListener('hashchange', scrollToHash);
    }, []);

    return (
        <ThemeProvider>
            <div className="App overflow-x-clip bg-paper text-ink transition-colors duration-300">
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
                <Navbar />
                <main id="main-content" tabIndex="-1" className="relative z-[1] focus:outline-none">
                    <Hero />
                    <ProjectWall />
                    <Projects />
                    <Experience />
                    <Tools />
                    <About />
                    <Education />
                    <GithubStats />
                    <Contact />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
