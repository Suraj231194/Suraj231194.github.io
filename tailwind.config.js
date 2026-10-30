/** @type {import('tailwindcss').Config} */

// Every colour is a CSS variable (see src/index.css), so one class serves both themes and the
// midnight bands: midnight navy and cool slate, with electric blue and cyan as accents.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                paper: token('paper'),
                sheet: token('sheet'),
                ink: token('ink'),
                pencil: token('pencil'),
                rule: token('rule'),
                grid: token('grid'),
                accent: token('accent'),
                'accent-strong': token('accent-strong'),
                'accent-ink': token('accent-ink'),
                'accent-2': token('accent-2'),
                glow: token('glow'),
                'on-accent': token('on-accent'),
                'on-cta': token('on-cta'),
            },
            fontFamily: {
                sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
                display: ['"Bricolage Grotesque"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
            },
            screens: {
                // Laptops with short screens (1366x768, 1280x800): the first screen tightens up so
                // the facts strip still fits above the fold.
                short: { raw: '(min-width: 1024px) and (max-height: 860px)' },
            },
        },
    },
    plugins: [],
}
