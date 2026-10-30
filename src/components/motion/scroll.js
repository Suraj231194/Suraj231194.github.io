import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/*
 * One scroll engine for the page: GSAP ScrollTrigger drives everything linked to the scroll
 * position (pieces joining, headings, screenshot reveals, the pinned hero, the progress bar).
 * Framer Motion keeps the interface transitions: tabs, filters, menu, dialogs and hover effects.
 * Scrolling itself stays native.
 */

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Scroll motion runs only for people who have not asked for reduced motion.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

// How long a scrubbed animation takes to catch up with the scroll, in seconds. It smooths the
// motion the way the springs used to.
export const SCRUB = 0.6;

/**
 * An element's top on the page from layout alone, ignoring transforms. ScrollTrigger measures
 * with transforms applied, and a piece that is itself flying in would be measured mid-flight.
 */
export const layoutTop = (element) => {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
    return top;
};

/**
 * Scroll positions for a ScrollTrigger: the moments the element's top reaches `startAt` and
 * `endAt` of the viewport height (1 = bottom edge, 0 = top edge).
 */
export const viewportWindow = (element, startAt, endAt) => ({
    start: () => layoutTop(element) - window.innerHeight * startAt,
    end: () => layoutTop(element) - window.innerHeight * endAt,
    invalidateOnRefresh: true,
});

/**
 * Runs a component's scroll animations, scoped to `scope`. `setup` receives the matching media
 * conditions (by default only `motion`) and runs again whenever they change. Everything it
 * creates (tweens, ScrollTriggers, pins and inline styles) is undone on unmount, and when motion
 * is turned off, so the page falls back to its plain layout. `setup` may return a function to
 * undo anything else it changed.
 */
export const useScrollMotion = (scope, setup, conditions = { motion: MOTION_OK }) => {
    // Set up once, on mount; the latest callback and conditions are read at that point.
    const setupRef = useRef(setup);
    const conditionsRef = useRef(conditions);

    useLayoutEffect(() => {
        const media = gsap.matchMedia(scope.current);
        media.add(conditionsRef.current, (context) => (context.conditions.motion ? setupRef.current(context.conditions) : undefined));
        return () => media.revert();
    }, [scope]);
};

/**
 * ScrollTrigger measures positions when it refreshes: on load and resize by default. Content
 * that grows or shrinks (showing all projects, switching a tab, a filter) moves everything
 * below it, so a change in the page's height triggers a refresh too.
 */
export const useRefreshOnLayoutChange = () => {
    useEffect(() => {
        let timer;
        const observer = new ResizeObserver(() => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
        });
        observer.observe(document.body);
        return () => {
            observer.disconnect();
            window.clearTimeout(timer);
        };
    }, []);
};
