import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/', // Base '/' for User Pages (username.github.io)
    build: {
        rollupOptions: {
            // Three pages: the home page, every case study at /projects/ (a plain folder with its
            // own index.html, so GitHub Pages serves it without a router), and 404.html, which
            // GitHub Pages serves for any address that does not exist.
            input: {
                main: fileURLToPath(new URL('./index.html', import.meta.url)),
                projects: fileURLToPath(new URL('./projects/index.html', import.meta.url)),
                notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
            },
            output: {
                // The libraries change far less often than the site, so they load in parallel and stay cached between deploys.
                manualChunks(id) {
                    if (!id.includes('node_modules')) return undefined;
                    if (/[\\/]node_modules[\\/](gsap|framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion';
                    if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
                    return undefined;
                },
            },
        },
    },
})
