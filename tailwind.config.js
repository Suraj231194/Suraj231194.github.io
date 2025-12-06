/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#fa5b0f",
                dark: "#111",
                light: "#f1f1f1",
            },
            fontFamily: {
                ubuntu: ["Ubuntu", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
            },
            backgroundImage: {
                'hero-pattern': "url('/images/hero.png')",
            }
        },
    },
    plugins: [],
}
