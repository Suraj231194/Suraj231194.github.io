import { useState } from 'react';

let cachedSupport = null;

/**
 * Detects once whether the browser can create a WebGL context.
 * The 3D scenes are optional decoration, so anything that fails here
 * simply falls back to the existing 2D layout.
 */
export const supportsWebGL = () => {
    if (cachedSupport !== null) return cachedSupport;

    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        cachedSupport = Boolean(context);
    } catch {
        cachedSupport = false;
    }

    return cachedSupport;
};

const useWebGLSupport = () => {
    const [supported] = useState(() => typeof window !== 'undefined' && supportsWebGL());
    return supported;
};

export default useWebGLSupport;
