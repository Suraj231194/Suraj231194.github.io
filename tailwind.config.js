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
                'hero-pattern': "url('https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80')",
            }
        },
    },
    plugins: [],
}
