import React from 'react';
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
import ThemeToggle from './components/ThemeToggle';
import CustomCursor from './components/CustomCursor';
import Reveal from './components/Reveal';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <ThemeProvider>
            <div className="App transition-colors duration-300 bg-white dark:bg-[#111] overflow-x-hidden">
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left shadow-md shadow-primary/50"
                    style={{ scaleX }}
                />
                <ThemeToggle />
                <ScrollUpBtn />
                <Navbar />
                <Hero />
                <Reveal><About /></Reveal>
                <Reveal><Experience /></Reveal>
                <Reveal><Projects /></Reveal>
                <Reveal><Tools /></Reveal>
                <Reveal><Education /></Reveal>
                <Reveal><GithubStats /></Reveal>
                <Reveal><Contact /></Reveal>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
