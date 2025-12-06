import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Education from './components/Education';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollUpBtn from './components/ScrollUpBtn';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
    return (
        <ThemeProvider>
            <div className="App transition-colors duration-300 bg-white dark:bg-[#111]">
                <ThemeToggle />
                <ScrollUpBtn />
                <Navbar />
                <Hero />
                <About />
                <Projects />
                <Tools />
                <Education />
                <GithubStats />
                <Contact />
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
