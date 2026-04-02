import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className={`fixed bottom-6 left-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${theme === 'dark'
                    ? 'bg-white text-orange-500 hover:bg-gray-100'
                    : 'bg-slate-900 text-yellow-400 hover:bg-slate-800'
                }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
        </motion.button>
    );
};

export default ThemeToggle;
