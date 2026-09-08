import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useReducedMotion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { flushSync } from 'react-dom';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const reduceMotion = useReducedMotion();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    const handleThemeChange = (event) => {
        if (reduceMotion || !document.startViewTransition) {
            toggleTheme();
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        document.documentElement.style.setProperty('--theme-transition-x', `${rect.left + rect.width / 2}px`);
        document.documentElement.style.setProperty('--theme-transition-y', `${rect.top + rect.height / 2}px`);
        document.startViewTransition(() => flushSync(toggleTheme));
    };

    return (
        <motion.button
            type="button"
            onClick={handleThemeChange}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${theme === 'dark'
                    ? 'border-white/15 bg-white/10 text-orange-300 hover:bg-white/20'
                    : 'border-slate-300 bg-white/90 text-slate-800 hover:bg-white'
                }`}
            whileHover={reduceMotion ? undefined : { scale: 1.05, rotate: 8 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        >
            {theme === 'dark' ? <FaSun size={19} aria-hidden="true" /> : <FaMoon size={18} aria-hidden="true" />}
        </motion.button>
    );
};

export default ThemeToggle;
