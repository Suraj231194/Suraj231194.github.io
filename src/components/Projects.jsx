import React from 'react';
import { PROJECTS } from '../constants';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {

    const getTechIcon = (tech) => {
        switch (tech.toLowerCase()) {
            case 'html': return <FaHtml5 className="text-orange-500" />;
            case 'css': return <FaCss3Alt className="text-blue-500" />;
            case 'javascript': return <FaJs className="text-yellow-400" />;
            case 'react': return <FaReact className="text-cyan-400" />;
            default: return null;
        }
    };

    return (
        <section id="projects" className="py-24 bg-dark text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-medium text-center mb-16 relative font-ubuntu">
                    My Projects
                    <span className="block w-44 h-1 bg-white absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-dark px-2 text-xl font-bold">what i provide</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <div key={index} className="bg-[#1e1c1c] rounded-lg p-6 text-center transition-all duration-300 hover:bg-primary hover:scale-105 group cursor-default shadow-lg hover:shadow-primary/40">
                            <div className="overflow-hidden rounded-md mb-4 bg-black/50 h-48 flex items-center justify-center">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="text-2xl font-medium mb-2 group-hover:text-white transition-colors">{project.title}</div>
                            <p className="text-sm text-gray-300 mb-6 group-hover:text-white line-clamp-4">
                                {project.description}
                            </p>

                            <div className="flex justify-center gap-4 mb-6 text-2xl">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} title={tech} className="transition-transform hover:-translate-y-1 bg-white/10 p-2 rounded-full group-hover:bg-white/20">
                                        {getTechIcon(tech)}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-auto px-4">
                                <button
                                    onClick={() => window.open(project.liveLink, '_blank')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-primary to-primary text-white rounded-md shadow-md transition-all duration-300 hover:bg-white hover:text-primary text-sm font-bold"
                                >
                                    <FaExternalLinkAlt /> Live
                                </button>
                                <button
                                    onClick={() => window.open(project.sourceLink, '_blank')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-primary to-primary text-white rounded-md shadow-md transition-all duration-300 hover:bg-white hover:text-primary text-sm font-bold"
                                >
                                    <FaGithub /> Code
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
