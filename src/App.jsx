import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Education from './components/Education';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollUpBtn from './components/ScrollUpBtn';
import { ThemeProvider } from './context/ThemeContext';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
            <div className="App transition-colors duration-300 bg-white dark:bg-[#111] overflow-x-hidden">
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
                    style={{ scaleX }}
                    aria-hidden="true"
                />
                <a
                    href="#main-content"
                    className="sr-only fixed left-4 top-4 z-[110] rounded-lg bg-white px-4 py-3 font-semibold text-slate-900 shadow-xl focus:not-sr-only"
                >
                    Skip to main content
                </a>
                <ScrollUpBtn />
                <Navbar />
                <main id="main-content">
                    <Hero />
                    <About />
                    <Projects />
                    <Experience />
                    <Tools />
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
