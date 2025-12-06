import React from 'react';
import { FOOTER_TEXT } from '../constants';
import { FaCopyright } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-12 text-center font-poppins border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <span className="flex items-center justify-center gap-2 text-lg text-gray-500 dark:text-gray-400 font-medium">
                {FOOTER_TEXT}
            </span>
        </footer>
    );
};

export default Footer;
