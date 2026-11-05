import React from 'react';
import SiteShell from './components/SiteShell';
import Hero from './components/Hero';
import ProjectWall from './components/ProjectWall';
import FeaturedProjects from './components/FeaturedProjects';
import Services from './components/Services';
import Process from './components/Process';
import Experience from './components/Experience';
import Tools from './components/Tools';
import About from './components/About';
import Education from './components/Education';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';

// The home page. Every case study lives on the projects page (ProjectsPage.jsx); the home page
// shows the first few on the scroll-driven arc and links there.
function App() {
    return (
        <SiteShell page="home">
            <Hero />
            <ProjectWall />
            <FeaturedProjects />
            <Services />
            <Process />
            <Experience />
            <Tools />
            <About />
            <Education />
            <GithubStats />
            <Contact />
        </SiteShell>
    );
}

export default App;
