import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Education from './components/Education';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollUpBtn from './components/ScrollUpBtn';

function App() {
    return (
        <div className="App">
            <ScrollUpBtn />
            <Navbar />
            <Home />
            <About />
            <Projects />
            <Tools />
            <Education />
            <GithubStats />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
