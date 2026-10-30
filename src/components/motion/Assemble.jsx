import React, { useRef } from 'react';
import { SCRUB, gsap, useScrollMotion, viewportWindow } from './scroll';

/*
 * Scroll-linked assembly: a piece starts scattered in 3D (pushed out to one side, tipped and set
 * back in depth) and joins its place as it scrolls up into view, finishing when its top reaches
 * 62% of the screen. It is scrubbed by the scroll position, so scrolling back up takes it apart
 * again. With reduced motion the piece simply sits in place.
 *
 * `from` is a direction preset or a custom { x, y, z, rotateX, rotateY, rotateZ } vector;
 * `distance` scales the travel. Travel also shrinks on narrow screens.
 */
const PRESETS = {
    left: { x: -150, y: 40, z: 160, rotateY: 26, rotateZ: -3 },
    right: { x: 150, y: 40, z: 160, rotateY: -26, rotateZ: 3 },
    up: { y: 130, z: 200, rotateX: 34 },
    down: { y: -80, z: 160, rotateX: -22 },
    near: { y: 60, z: -260, rotateX: 12 },
};

// Join window, as fractions of the viewport: starts as the piece's top enters, done at 62%.
const START_AT = 1;
const END_AT = 0.62;

const travelScale = () => Math.min(1, Math.max(0.45, window.innerWidth / 1100));

const Assemble = ({ as: Tag = 'div', from = 'up', distance = 1, children, ...props }) => {
    const ref = useRef(null);

    useScrollMotion(ref, () => {
        const element = ref.current;
        const vector = typeof from === 'string' ? PRESETS[from] ?? PRESETS.up : from;
        // Function values are re-read on every refresh, so travel follows the window width.
        const travel = (value = 0) => () => value * distance * travelScale();

        gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: element, ...viewportWindow(element, START_AT, END_AT), scrub: SCRUB },
        })
            .fromTo(
                element,
                {
                    x: travel(vector.x),
                    y: travel(vector.y),
                    z: travel(-(vector.z ?? 0)),
                    rotationX: vector.rotateX ?? 0,
                    rotationY: vector.rotateY ?? 0,
                    rotationZ: vector.rotateZ ?? 0,
                    transformPerspective: 1200,
                },
                { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, duration: 1 },
                0
            )
            .fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
    });

    return (
        <Tag ref={ref} {...props}>
            {children}
        </Tag>
    );
};

export default Assemble;
