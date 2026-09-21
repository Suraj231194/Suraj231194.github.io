import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/', // Base '/' for User Pages (username.github.io)
    build: {
        // Three.js is loaded lazily in its own chunk, so a large chunk here is expected.
        chunkSizeWarningLimit: 1500,
    },
})
