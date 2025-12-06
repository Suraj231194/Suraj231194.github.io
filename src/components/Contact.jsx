import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { FaUser, FaEnvelope, FaCommentAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = `mailto:${SOCIAL_LINKS.email}`;
    };

    return (
        <section id="contact" className="py-24 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-medium text-center mb-16 relative font-ubuntu"
                >
                    Contact Me
                    <span className="block w-44 h-1 bg-primary absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-bg-light dark:bg-bg-dark px-2 text-xl font-bold transition-colors duration-300">get in touch</span>
                </motion.h2>

                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="text-2xl font-semibold mb-6">Get in Touch</div>
                        <p className="text-justify text-gray-600 dark:text-gray-300 mb-8">
                            I am available for freelance work. Connect with me via email or social media.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 group">
                                <FaGithub className="text-2xl text-primary transition-colors group-hover:text-amber-500" />
                                <div>
                                    <div className="font-medium">Github</div>
                                    <a className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noreferrer" href={SOCIAL_LINKS.github}>github.com/Suraj2320</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <FaLinkedin className="text-2xl text-primary transition-colors group-hover:text-amber-500" />
                                <div>
                                    <div className="font-medium">LinkedIn</div>
                                    <a className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noreferrer" href={SOCIAL_LINKS.linkedin}>linkedin.com/in/suraj-pawar</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <FaEnvelope className="text-2xl text-primary transition-colors group-hover:text-amber-500" />
                                <div>
                                    <div className="font-medium">Email</div>
                                    <div className="text-gray-500 dark:text-gray-400 hover:text-primary cursor-pointer transition-colors" onClick={handleEmailClick}>{SOCIAL_LINKS.email}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="text-2xl font-semibold mb-6">Message me</div>
                        <form action="https://formsubmit.co/el/yinuze" method="POST" className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                                    <input type="text" placeholder="Name" required className="w-full h-12 pl-12 pr-4 bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-text-light dark:text-text-dark" />
                                </div>
                                <div className="flex-1 relative">
                                    <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                                    <input type="email" placeholder="Email" required className="w-full h-12 pl-12 pr-4 bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-text-light dark:text-text-dark" />
                                </div>
                            </div>
                            <div className="relative">
                                <input type="text" placeholder="Subject" required className="w-full h-12 pl-4 pr-4 bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-text-light dark:text-text-dark" />
                            </div>
                            <div className="relative">
                                <FaCommentAlt className="absolute top-4 left-4 text-gray-500" />
                                <textarea cols="30" rows="6" placeholder="Message.." required className="w-full pl-12 pr-4 pt-4 bg-transparent border border-gray-400 dark:border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-text-light dark:text-text-dark resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-auto self-start px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-300 shadow-md hover:shadow-primary/30">
                                Send message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
