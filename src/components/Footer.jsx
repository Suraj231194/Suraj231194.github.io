import React from 'react';
import { FOOTER_TEXT } from '../constants';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-bg-light px-4 py-8 text-center font-poppins text-text-light transition-colors duration-300 dark:border-gray-800 dark:bg-bg-dark dark:text-text-dark sm:py-10">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                {FOOTER_TEXT}
            </p>
        </footer>
    );
};

export default Footer;
