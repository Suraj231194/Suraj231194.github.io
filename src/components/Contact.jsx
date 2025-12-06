import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { FaUser, FaEnvelope, FaCommentAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = `mailto:${SOCIAL_LINKS.email}`;
    };

    return (
        <section id="contact" className="py-24 bg-dark text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-medium text-center mb-16 relative font-ubuntu">
                    Contact Me
                    <span className="block w-44 h-1 bg-white absolute bottom-[-16px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 text-primary bg-dark px-2 text-xl font-bold">get in touch</span>
                </h2>

                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    <div className="lg:w-1/2">
                        <div className="text-2xl font-semibold mb-6">Get in Touch</div>
                        <p className="text-justify text-gray-300 mb-8">
                            I am available for freelance work. Connect with me via email or social media.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 group">
                                <FaGithub className="text-2xl text-primary transition-colors group-hover:text-white" />
                                <div>
                                    <div className="font-medium">Github</div>
                                    <a className="text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noreferrer" href={SOCIAL_LINKS.github}>github.com/Suraj2320</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <FaLinkedin className="text-2xl text-primary transition-colors group-hover:text-white" />
                                <div>
                                    <div className="font-medium">LinkedIn</div>
                                    <a className="text-gray-400 hover:text-primary transition-colors" target="_blank" rel="noreferrer" href={SOCIAL_LINKS.linkedin}>linkedin.com/in/suraj-pawar</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <FaEnvelope className="text-2xl text-primary transition-colors group-hover:text-white" />
                                <div>
                                    <div className="font-medium">Email</div>
                                    <div className="text-gray-400 hover:text-primary cursor-pointer transition-colors" onClick={handleEmailClick}>{SOCIAL_LINKS.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="text-2xl font-semibold mb-6">Message me</div>
                        <form action="https://formsubmit.co/el/yinuze" method="POST" className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                                    <input type="text" placeholder="Name" required className="w-full h-12 pl-12 pr-4 bg-transparent border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-white" />
                                </div>
                                <div className="flex-1 relative">
                                    <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                                    <input type="email" placeholder="Email" required className="w-full h-12 pl-12 pr-4 bg-transparent border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-white" />
                                </div>
                            </div>
                            <div className="relative">
                                <input type="text" placeholder="Subject" required className="w-full h-12 pl-4 pr-4 bg-transparent border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-white" />
                            </div>
                            <div className="relative">
                                <FaCommentAlt className="absolute top-4 left-4 text-gray-500" />
                                <textarea cols="30" rows="6" placeholder="Message.." required className="w-full pl-12 pr-4 pt-4 bg-transparent border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors text-white resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-auto self-start px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-300 shadow-md hover:shadow-primary/30">
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
