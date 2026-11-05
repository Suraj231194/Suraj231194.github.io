import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { NAV_LINKS, PROJECTS_PAGE, RESUME_LINK } from '../constants';
import ThemeToggle from './ThemeToggle';
import Container from './ui/Container';
import { buttonClasses } from './ui/buttonStyles';
import useModal from '../hooks/useModal';
import Logo from './ui/Logo';

// Home-page sections without a link of their own mark the link they belong with. The rest
// (the hero, What I can help with, How I work) mark none, so the bar never names a section
// the reader has already left.
const SECTION_LINK = { work: 'projects', education: 'about', 'github-stats': 'about' };

// On the home page the links scroll to their sections. On the other pages (projects, not found)
// they lead back to the home page's sections, and Projects is the projects page.
const linkFor = (page, id) => {
    if (page === 'home') return `#${id}`;
    return id === 'projects' ? PROJECTS_PAGE : `/#${id}`;
};

const Navbar = ({ page = 'home' }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // Projects is marked as the current page on the projects page; on the not-found page no link is.
    const [activeSection, setActiveSection] = useState(page === 'projects' ? 'projects' : 'home');
    const currentFor = (active) => (active ? (page === 'home' ? 'location' : 'page') : undefined);
    const navRef = useRef(null);
    const menuButtonRef = useRef(null);
    const firstMenuLinkRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // The section crossing the middle band of the screen is the current one.
    useEffect(() => {
        if (page !== 'home') return undefined;
        // Every section is watched, not only the linked ones, so the mark is the same whichever
        // way the page is scrolled.
        const sections = [...document.querySelectorAll('section[id]')];
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible) setActiveSection(SECTION_LINK[visible.target.id] ?? visible.target.id);
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [page]);

    const closeMenu = useCallback((returnFocus = true) => {
        setMenuOpen(false);
        if (returnFocus) window.setTimeout(() => menuButtonRef.current?.focus(), 0);
    }, []);

    useModal({ open: menuOpen, onClose: closeMenu, containerRef: navRef, initialFocusRef: firstMenuLinkRef });

    // Growing the window to desktop width closes the phone menu.
    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 1024px)');
        const handleChange = (event) => {
            if (event.matches) setMenuOpen(false);
        };

        desktop.addEventListener('change', handleChange);
        return () => desktop.removeEventListener('change', handleChange);
    }, []);

    const solid = scrolled || menuOpen;

    return (
        <nav ref={navRef} aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-50">
            {/* The bar carries the blur; the menu below is its sibling so the blur cannot trap it. */}
            <div
                className={`relative z-50 border-b transition-[background-color,border-color] duration-300 ${
                    menuOpen
                        ? 'border-rule bg-paper'
                        : solid
                            ? 'border-rule/70 bg-paper/95 backdrop-blur-xl'
                            : 'border-transparent bg-transparent'
                }`}
            >
                <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
                    <a href={page === 'home' ? '#home' : '/'} aria-label={page === 'home' ? 'Suraj Pawar, back to the top' : 'Suraj Pawar, home page'} className="group flex items-center gap-3 text-ink">
                        <Logo className="size-9 shrink-0 drop-shadow-[0_6px_16px_rgb(30_102_245/0.45)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
                        <span className="font-display text-[1.15rem] font-semibold tracking-[-0.01em]">Suraj Pawar</span>
                    </a>

                    <div className="hidden items-center gap-7 lg:flex">
                        <ul className="flex items-center gap-6 xl:gap-7">
                            {NAV_LINKS.map((link) => {
                                const active = activeSection === link.id;
                                return (
                                    <li key={link.id}>
                                        <a
                                            href={linkFor(page, link.id)}
                                            aria-current={currentFor(active)}
                                            className={`group relative block py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
                                                active ? 'text-ink' : 'text-pencil hover:text-ink'
                                            }`}
                                        >
                                            {link.title}
                                            {/* Hover: a gradient line grows from the middle. Current: it slides to the link. */}
                                            <span
                                                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-accent to-accent-2 opacity-60 transition-transform duration-300 group-hover:scale-x-100"
                                                aria-hidden="true"
                                            />
                                            {active && (
                                                <motion.span
                                                    layoutId="nav-active"
                                                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent via-accent-2 to-glow shadow-[0_0_10px_rgb(var(--accent)/0.7)]"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="flex items-center gap-2">
                            <a
                                href={RESUME_LINK}
                                download
                                className={buttonClasses({
                                    variant: 'secondary',
                                    size: 'sm',
                                    // A gradient border: the fill on the padding box, the gradient on the border box.
                                    className:
                                        'border-transparent [background:linear-gradient(rgb(var(--paper)),rgb(var(--paper)))_padding-box,linear-gradient(100deg,rgb(var(--accent)),rgb(var(--accent-2)))_border-box] hover:border-transparent',
                                })}
                            >
                                <Download className="text-xs" aria-hidden="true" />
                                Résumé
                            </a>
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <ThemeToggle />
                        <button
                            ref={menuButtonRef}
                            type="button"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => (menuOpen ? closeMenu(false) : setMenuOpen(true))}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-sheet/60 text-ink transition-colors hover:border-accent/60"
                        >
                            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                        </button>
                    </div>
                </Container>
            </div>

            <div
                id="mobile-menu"
                aria-hidden={!menuOpen}
                inert={!menuOpen || undefined}
                className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper transition-[opacity,transform] duration-300 sm:top-[4.5rem] lg:hidden ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
            >
                <Container className="pb-10 pt-4">
                    <ul className="divide-y divide-rule border-y border-rule">
                        {NAV_LINKS.map((link, index) => {
                            const active = activeSection === link.id;
                            return (
                                <li key={link.id}>
                                    <a
                                        ref={index === 0 ? firstMenuLinkRef : undefined}
                                        href={linkFor(page, link.id)}
                                        tabIndex={menuOpen ? 0 : -1}
                                        aria-current={currentFor(active)}
                                        onClick={() => closeMenu(false)}
                                        className="flex items-center justify-between py-4 font-display text-[1.75rem] font-semibold text-ink"
                                    >
                                        {link.title}
                                        {active && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <a
                        href={RESUME_LINK}
                        download
                        tabIndex={menuOpen ? 0 : -1}
                        className={buttonClasses({ variant: 'primary', size: 'lg', className: 'mt-8 w-full' })}
                    >
                        <Download aria-hidden="true" />
                        Download résumé
                    </a>
                </Container>
            </div>
        </nav>
    );
};

export default Navbar;
