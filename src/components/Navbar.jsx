import React, { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../constants';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navigationRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY > 20);

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = NAV_LINKS
            .filter((link) => !link.href)
            .map((link) => document.getElementById(link.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries.find((entry) => entry.isIntersecting);
                if (visibleEntry) setActiveSection(visibleEntry.target.id);
            },
            { rootMargin: '-35% 0px -55% 0px' }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!menuActive) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMenuActive(false);
                window.setTimeout(() => menuButtonRef.current?.focus(), 0);
                return;
            }

            if (event.key === 'Tab') {
                const focusableElements = navigationRef.current
                    ? [...navigationRef.current.querySelectorAll('a, button')].filter((element) => element.getClientRects().length > 0)
                    : [];
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement?.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        const focusTimer = window.setTimeout(() => navigationRef.current?.querySelector('#mobile-menu a')?.focus(), 0);

        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuActive]);

    const getLinkClasses = (link, mobile = false) => {
        const active = activeSection === link.id && !link.href;
        const base = mobile
            ? 'rounded-lg px-5 py-2 text-2xl font-semibold transition-colors'
            : 'group relative py-2 text-base font-semibold transition-colors duration-200';
        const color = mobile
            ? active
                ? 'text-orange-700 dark:text-orange-400'
                : 'text-text-light hover:text-orange-700 dark:text-text-dark dark:hover:text-orange-400'
            : active
                ? 'text-orange-500'
                : sticky
                    ? 'text-text-light hover:text-orange-700 dark:text-text-dark dark:hover:text-orange-400'
                    : 'text-white/90 hover:text-white';

        return `${base} ${color}`;
    };

    return (
        <nav
            ref={navigationRef}
            aria-label="Primary navigation"
            className={`fixed inset-x-0 top-0 z-50 font-ubuntu transition-all duration-300 ${
                sticky || menuActive ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
                <a
                    href="#home"
                    aria-label="Suraj Pawar - Home"
                    className={`whitespace-nowrap text-2xl font-bold tracking-tight sm:text-3xl ${
                        sticky || menuActive ? 'text-text-light dark:text-text-dark' : 'text-white drop-shadow-md'
                    }`}
                >
                    Suraj <span className="text-orange-500">Pawar</span>
                </a>

                <div className="hidden items-center gap-5 lg:flex xl:gap-7">
                    <ul className="flex items-center gap-5 xl:gap-7">
                        {NAV_LINKS.map((link) => {
                            const active = activeSection === link.id && !link.href;
                            return (
                                <li key={link.id}>
                                    <a
                                        href={link.href || `#${link.id}`}
                                        download={link.download}
                                        aria-current={active ? 'page' : undefined}
                                        className={getLinkClasses(link)}
                                    >
                                        {link.title}
                                        {active ? (
                                            <motion.span
                                                layoutId="active-navigation-indicator"
                                                aria-hidden="true"
                                                className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary"
                                                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                            />
                                        ) : (
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-x-100"
                                            />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <ThemeToggle />
                    <button
                        ref={menuButtonRef}
                        type="button"
                        aria-label={menuActive ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuActive}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuActive((active) => !active)}
                        className={`relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full text-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            sticky || menuActive
                                ? 'text-text-light hover:bg-black/5 dark:text-text-dark dark:hover:bg-white/10'
                                : 'text-white hover:bg-white/10'
                        }`}
                    >
                        {menuActive ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                    </button>
                </div>
            </div>

            <div
                id="mobile-menu"
                aria-hidden={!menuActive}
                className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-white/95 px-6 pt-20 backdrop-blur-xl transition-[transform,opacity] duration-300 dark:bg-black/95 lg:hidden ${
                    menuActive
                        ? 'translate-x-0 opacity-100'
                        : 'pointer-events-none translate-x-full opacity-0'
                }`}
            >
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.id}
                        href={link.href || `#${link.id}`}
                        download={link.download}
                        tabIndex={menuActive ? 0 : -1}
                        onClick={() => setMenuActive(false)}
                        className={getLinkClasses(link, true)}
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
