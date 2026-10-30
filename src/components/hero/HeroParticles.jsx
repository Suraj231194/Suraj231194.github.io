import React, { useEffect, useRef } from 'react';

// Pale blue and cyan light on midnight; deeper blue and cyan on the light theme's ice.
const COLORS = {
    dark: ['191 219 254', '96 165 250', '34 211 238', '125 175 255'],
    light: ['30 102 245', '2 132 199', '6 182 212', '37 99 235'],
};

/**
 * Faint points of light drifting up through the hero, a little faster the nearer they are, and
 * twinkling, in colours for the current theme. One canvas, about one point per 14,000 px² (fewer
 * on phones), at most 2x pixel density. It only animates while the hero is on screen and the tab
 * is visible; with reduced motion it draws one still frame, redrawn when the theme changes.
 */
const HeroParticles = ({ className = '' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let points = [];
        let frame = 0;
        let visible = true;

        const seed = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            const count = Math.round(Math.min(110, (width * height) / (width < 640 ? 22000 : 14000)));
            points = Array.from({ length: count }, () => {
                const depth = Math.random();
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: 0.5 + depth * 1.4,
                    speed: 0.06 + depth * 0.22,
                    sway: Math.random() * Math.PI * 2,
                    alpha: 0.18 + depth * 0.5,
                    twinkle: 0.4 + Math.random() * 1.2,
                    tone: Math.floor(Math.random() * COLORS.dark.length),
                };
            });
        };

        const draw = (time = 0) => {
            context.clearRect(0, 0, width, height);
            const palette = document.documentElement.classList.contains('dark') ? COLORS.dark : COLORS.light;
            for (const point of points) {
                if (!still) {
                    point.y -= point.speed;
                    point.x += Math.sin(time / 2400 + point.sway) * 0.12;
                    if (point.y < -4) {
                        point.y = height + 4;
                        point.x = Math.random() * width;
                    }
                }
                const glow = still ? 1 : 0.65 + 0.35 * Math.sin(time / 1000 * point.twinkle + point.sway);
                context.beginPath();
                context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
                context.fillStyle = `rgb(${palette[point.tone]} / ${(point.alpha * glow).toFixed(3)})`;
                context.fill();
            }
        };

        const loop = (time) => {
            draw(time);
            frame = window.requestAnimationFrame(loop);
        };
        const start = () => {
            if (still || frame || !visible || document.hidden) return;
            frame = window.requestAnimationFrame(loop);
        };
        const stop = () => {
            window.cancelAnimationFrame(frame);
            frame = 0;
        };

        seed();
        draw();
        start();

        const resize = new ResizeObserver(() => {
            seed();
            draw();
        });
        resize.observe(canvas);
        const onScreen = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });
        onScreen.observe(canvas);
        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);
        const onTheme = new MutationObserver(() => frame || draw());
        onTheme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            stop();
            resize.disconnect();
            onScreen.disconnect();
            onTheme.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
};

export default HeroParticles;
