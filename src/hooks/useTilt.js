import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Pointer-driven 3D tilt for a card. Spread the returned handlers onto a motion element
 * and pass `style` to it. `max` is the tilt in degrees at the card's edge.
 * Does nothing for touch pointers, coarse pointers or reduced-motion users.
 */
const useTilt = ({ max = 8, perspective = 900 } = {}) => {
    const reduceMotion = useReducedMotion();
    const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

    const onPointerMove = (event) => {
        if (reduceMotion || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateX.set((0.5 - py) * max * 2);
        rotateY.set((px - 0.5) * max * 2);
        event.currentTarget.style.setProperty('--px', px.toFixed(3));
        event.currentTarget.style.setProperty('--py', py.toFixed(3));
    };

    const onPointerLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return {
        style: { rotateX, rotateY, transformPerspective: perspective },
        onPointerMove,
        onPointerLeave,
    };
};

export default useTilt;
