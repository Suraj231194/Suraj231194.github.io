import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { FaUser, FaEnvelope, FaCommentAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import { revealMotion } from '../constants/motion';
import SectionHeading from './SectionHeading';

const Contact = () => {
    const reduceMotion = useReducedMotion();
    const fieldClassName = 'h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-text-light shadow-sm transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-white/15 dark:bg-white/5 dark:text-text-dark dark:hover:border-white/30';

    return (
        <section id="contact" className="bg-bg-light py-16 text-text-light transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading title="Let's Work Together" eyebrow="Get in touch" />

                <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                    <motion.aside
                        {...revealMotion(reduceMotion, 0.05, 20)}
                        className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl sm:p-8"
                    >
                        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-semibold text-emerald-300">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
                            Available for opportunities
                        </span>
                        <h3 className="font-ubuntu text-2xl font-bold sm:text-3xl">Have a project in mind?</h3>
                        <p className="mt-4 leading-7 text-slate-300">
                            I am available for full-time roles and selected freelance work. Send a message and I will get back to you as soon as possible.
                        </p>

                        <ul className="mt-8 space-y-5">
                            <li>
                                <a className="group flex items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" target="_blank" rel="noopener noreferrer" href={SOCIAL_LINKS.github}>
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400 transition-colors group-hover:bg-white/15">
                                        <FaGithub aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-sm text-slate-400">GitHub</span>
                                        <span className="font-semibold group-hover:text-orange-300">github.com/Suraj231194</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a className="group flex items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" target="_blank" rel="noopener noreferrer" href={SOCIAL_LINKS.linkedin}>
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400 transition-colors group-hover:bg-white/15">
                                        <FaLinkedin aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-sm text-slate-400">LinkedIn</span>
                                        <span className="font-semibold group-hover:text-orange-300">linkedin.com/in/surajpawar2311</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a className="group flex items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" href={`mailto:${SOCIAL_LINKS.email}`}>
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400 transition-colors group-hover:bg-white/15">
                                        <FaEnvelope aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm text-slate-400">Email</span>
                                        <span className="break-all font-semibold group-hover:text-orange-300">{SOCIAL_LINKS.email}</span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </motion.aside>

                    <motion.div
                        {...revealMotion(reduceMotion, 0.12, 20)}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#151515] sm:p-8"
                    >
                        <h3 className="mb-6 font-ubuntu text-2xl font-bold">Send me a message</h3>
                        <form action="https://formsubmit.co/el/yinuze" method="POST" className="space-y-5">
                            <input type="hidden" name="_subject" value="New portfolio enquiry" />
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">Name</label>
                                    <div className="relative">
                                        <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                                        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required className={`${fieldClassName} pl-11`} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                                        <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" required className={`${fieldClassName} pl-11`} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold">Subject</label>
                                <input id="contact-subject" name="subject" type="text" placeholder="How can I help?" required className={fieldClassName} />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">Message</label>
                                <div className="relative">
                                    <FaCommentAlt className="pointer-events-none absolute left-4 top-4 text-gray-400" aria-hidden="true" />
                                    <textarea id="contact-message" name="message" rows="6" placeholder="Tell me about your project or opportunity..." required className={`${fieldClassName} h-auto resize-y py-3 pl-11`} />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={reduceMotion ? undefined : { y: -2 }}
                                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary px-7 py-3 text-base font-bold text-slate-950 shadow-md transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
                            >
                                Send message
                                <FaPaperPlane aria-hidden="true" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
