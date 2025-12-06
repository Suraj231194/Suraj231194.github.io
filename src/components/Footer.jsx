import React from 'react';
import { FOOTER_TEXT } from '../constants';
import { FaCopyright } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-12 text-center font-poppins border-t border-gray-800">
            <span className="flex items-center justify-center gap-2 text-lg text-gray-400 font-medium">
                {FOOTER_TEXT}
            </span>
        </footer>
    );
};

export default Footer;
