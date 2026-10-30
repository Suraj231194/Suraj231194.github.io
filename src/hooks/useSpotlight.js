import { useEffect } from 'react';

/**
 * Feeds the pointer's position to the `.spotlight` panel under it, as --spot-x / --spot-y in
 * pixels from its corner, for the light that follows the pointer round its edge (index.css).
 * One listener for the whole page; mouse and pen only.
 */
const useSpotlight = () => {
    useEffect(() => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

        const onPointerMove = (event) => {
            const panel = event.target instanceof Element ? event.target.closest('.spotlight') : null;
            if (!panel) return;
            const rect = panel.getBoundingClientRect();
            panel.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
            panel.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
        };

        document.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => document.removeEventListener('pointermove', onPointerMove);
    }, []);
};

export default useSpotlight;
