import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuActive(!menuActive);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 font-ubuntu ${sticky ? 'bg-black/80 backdrop-blur-md py-4 border-b border-primary/20 shadow-lg shadow-primary/10' : 'bg-transparent py-8'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="text-3xl font-semibold text-white">
                    <a href="#" className='group relative'>
                        Suraj <span className="text-primary transition-all duration-300 group-hover:text-cyan-400">Pawar</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8">
                    {NAV_LINKS.map(link => (
                        <li key={link.id}>
                            <a
                                href={link.href || `#${link.id}`}
                                target={link.download ? '_blank' : '_self'}
                                download={link.download}
                                className="text-lg font-medium text-white hover:text-primary transition-colors duration-300 relative group"
                            >
                                {link.title}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden text-white text-2xl cursor-pointer hover:text-primary transition-colors" onClick={toggleMenu}>
                    {menuActive ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden ${menuActive ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {NAV_LINKS.map(link => (
                    <a
                        key={link.id}
                        href={link.href || `#${link.id}`}
                        onClick={() => setMenuActive(false)}
                        className="text-2xl font-medium text-white hover:text-primary transition-colors"
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
