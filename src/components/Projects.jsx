import React from 'react';
import { PROJECTS } from '../constants';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaExternalLinkAlt, FaDocker, FaAws, FaBootstrap, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiVite, SiPrisma, SiTailwindcss, SiPostgresql, SiRedux, SiMongodb, SiExpress, SiChakraui, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';

const Projects = () => {

    const getTechIcon = (tech) => {
        switch (tech.toLowerCase().replace('.', '').replace(' ', '')) {
            case 'html': return <FaHtml5 className="text-orange-500" />;
            case 'css': return <FaCss3Alt className="text-blue-500" />;
            case 'javascript': return <FaJs className="text-yellow-400" />;
            case 'react': return <FaReact className="text-cyan-400" />;
            case 'nextjs': return <SiNextdotjs className="text-black dark:text-white" />;
            case 'vite': return <SiVite className="text-purple-500" />;
            case 'prisma': return <SiPrisma className="text-teal-500" />;
            case 'tailwindcss': return <SiTailwindcss className="text-cyan-400" />;
            case 'postgresql': return <SiPostgresql className="text-blue-400" />;
            case 'docker': return <FaDocker className="text-blue-500" />;
            case 'aws': return <FaAws className="text-orange-500" />;
            case 'redux': return <SiRedux className="text-purple-500" />;
            case 'nodejs': return <FaNodeJs className="text-green-500" />;
            case 'mongodb': return <SiMongodb className="text-green-500" />;
            case 'express': return <SiExpress className="text-gray-400" />;
            case 'chakraui': return <SiChakraui className="text-teal-500" />;
            case 'typescript': return <SiTypescript className="text-blue-600" />;
            case 'bootstrap': return <FaBootstrap className="text-purple-600" />;
            default: return null;
        }
    };

    return (
        <section id="projects" className="py-24 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu"
                >
                    My Projects
                    <span className="block w-44 h-1 bg-primary absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-bg-light dark:bg-bg-dark px-2 text-xl font-bold transition-colors duration-300">what i provide</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-[#1e1c1c] rounded-lg p-6 text-center transition-all duration-300 hover:bg-primary hover:text-white group cursor-default shadow-lg hover:shadow-primary/40 dark:shadow-none border border-gray-100 dark:border-gray-800"
                        >
                            <div className="overflow-hidden rounded-md mb-4 bg-gray-100 dark:bg-black/50 h-48 flex items-center justify-center">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="text-2xl font-medium mb-2 group-hover:text-white transition-colors">{project.title}</div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 group-hover:text-white line-clamp-4">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 mb-6 text-xl">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} title={tech} className="transition-transform hover:-translate-y-1 bg-gray-100 dark:bg-white/10 p-1.5 rounded-full group-hover:bg-white/20">
                                        {getTechIcon(tech)}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-auto px-4">
                                <button
                                    onClick={() => window.open(project.liveLink, '_blank')}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow-md transition-all duration-300 hover:bg-white hover:text-primary text-sm font-bold border border-transparent hover:border-primary"
                                >
                                    <FaExternalLinkAlt /> Live
                                </button>
                                <button
                                    onClick={() => window.open(project.sourceLink, '_blank')}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow-md transition-all duration-300 hover:bg-white hover:text-primary text-sm font-bold border border-transparent hover:border-primary"
                                >
                                    <FaGithub /> Code
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
