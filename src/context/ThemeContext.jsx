import React, { createContext, useContext, useEffect, useState } from 'react';
import { msUntilNextSwitch, themeForTime } from '../constants/theme';

const ThemeContext = createContext();

// A theme picked with the toggle lasts for this visit only: it is kept in the tab's session
// storage, so a new visit follows the clock again.
const CHOICE_KEY = 'theme';

const readChoice = () => {
    try {
        const choice = sessionStorage.getItem(CHOICE_KEY);
        return choice === 'light' || choice === 'dark' ? choice : null;
    } catch {
        // Storage can be unavailable in privacy-restricted browser contexts.
        return null;
    }
};

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [choice, setChoice] = useState(readChoice);
    const [clockTheme, setClockTheme] = useState(() => themeForTime());
    const theme = choice ?? clockTheme;

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.style.colorScheme = theme;
    }, [theme]);

    // While the page is open it keeps following the clock, switching at 8 AM and 7 PM. Timers
    // stall while a computer sleeps, so the clock is read again whenever the tab is shown.
    useEffect(() => {
        let timer = 0;
        const sync = () => {
            window.clearTimeout(timer);
            setClockTheme(themeForTime());
            timer = window.setTimeout(sync, msUntilNextSwitch() + 1000);
        };
        const onVisibility = () => {
            if (!document.hidden) sync();
        };

        sync();
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            window.clearTimeout(timer);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        try {
            sessionStorage.setItem(CHOICE_KEY, next);
        } catch {
            // Keep theme switching functional even when storage is blocked.
        }
        setChoice(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, followsClock: choice === null }}>
            {children}
        </ThemeContext.Provider>
    );
};
