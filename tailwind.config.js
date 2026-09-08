/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#fa5b0f",
                'primary-text': '#c2410c',
                'primary-text-dark': '#fb923c',
                dark: "#111111", // Deep black for dark mode
                light: "#f3f4f6", // Light gray for light mode

                // Semantic Colors
                'bg-dark': '#0a0a0a',
                'bg-light': '#ffffff',
                'surface-dark': '#171717',
                'surface-light': '#f3f4f6',
                'text-dark': '#f3f4f6',
                'text-light': '#1f2937',
            },
            fontFamily: {
                ubuntu: ["Ubuntu", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
            backgroundImage: {
                'hero-pattern': "url('/images/hero-bg.webp')",
            }
        },
    },
    plugins: [],
}
