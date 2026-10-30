import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/', // Base '/' for User Pages (username.github.io)
    build: {
        rollupOptions: {
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
