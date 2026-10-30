import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { DARK_FROM, LIGHT_FROM, formatHour } from '../constants/theme';

// The tooltip says how the theme is chosen: by the clock, or by the toggle for this visit.
const SCHEDULE = `dark from ${formatHour(DARK_FROM)} to ${formatHour(LIGHT_FROM)}`;

const ThemeToggle = () => {
    const { theme, toggleTheme, followsClock } = useTheme();
    const reduceMotion = useReducedMotion();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const hint = followsClock ? `The theme follows the time of day: ${SCHEDULE}.` : 'Your choice lasts for this visit.';

    // The new theme spreads out in a circle from the button (View Transitions API where supported).
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
            title={`Switch to ${nextTheme} theme. ${hint}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rule bg-sheet/60 text-ink transition-[color,border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-[0_0_18px_-6px_rgb(var(--accent)/0.8)]"
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
            {theme === 'dark' ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
        </motion.button>
    );
};

export default ThemeToggle;
