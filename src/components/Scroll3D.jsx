import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const ORIGIN = {
    bottom: 'center bottom',
    left: 'left center',
    right: 'right center',
};

/**
 * Scroll-scrubbed 3D entrance.
 *
 * Progress is tied to the scrollbar rather than a one-shot trigger: it runs from the
 * element entering the viewport (0) to its top reaching `end` of the viewport height (1),
 * so scrolling back replays the motion in reverse. `from` picks the hinge:
 *   bottom -> lies back on the X axis and stands up
 *   left / right -> swings in around a vertical hinge on that edge
 */
const Scroll3D = ({
    children,
    className,
    style,
    from = 'bottom',
    angle = 14,
    distance = 48,
    end = 0.62,
    as = 'div',
}) => {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', `start ${end}`] });
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.5 });

    const rotateX = useTransform(progress, [0, 1], [from === 'bottom' ? angle : 0, 0]);
    const rotateY = useTransform(progress, [0, 1], [from === 'left' ? -angle : from === 'right' ? angle : 0, 0]);
    const x = useTransform(progress, [0, 1], [from === 'left' ? -distance * 0.6 : from === 'right' ? distance * 0.6 : 0, 0]);
    const y = useTransform(progress, [0, 1], [from === 'bottom' ? distance : distance * 0.4, 0]);
    const opacity = useTransform(progress, [0, 1], [0.3, 1]);
    const scale = useTransform(progress, [0, 1], [0.96, 1]);

    if (reduceMotion) {
        const Plain = as;
        return (
            <Plain ref={ref} className={className} style={style}>
                {children}
            </Plain>
        );
    }

    const Component = motion[as] ?? motion.div;

    return (
        <Component
            ref={ref}
            className={className}
            style={{
                ...style,
                x,
                y,
                rotateX,
                rotateY,
                opacity,
                scale,
                transformPerspective: 1200,
                transformOrigin: ORIGIN[from] ?? ORIGIN.bottom,
            }}
        >
            {children}
        </Component>
    );
};

export default Scroll3D;
