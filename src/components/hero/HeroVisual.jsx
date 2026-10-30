import React, { useEffect, useRef, useState } from 'react';
import { Database } from 'lucide-react';
import { SiJavascript, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { MOTION_OK, gsap } from '../motion/scroll';

/*
 * The hero's 3D scene: the layers of a web product as four glass panels stacked in perspective,
 * from the database at the bottom to the interface on top, with beams of light carrying data up
 * between them. A ring of technology chips orbits the stack, passing behind it, and code glyphs
 * circle the other way. One layer at a time, from the interface down, lifts and glows while the
 * caption below names it.
 * It is CSS 3D (see .scene in index.css), so the text on it stays sharp, it follows the light and
 * dark themes, and it needs no WebGL.
 *
 * Motion: the orbit turns and the stack sways and breathes; hovering slows it, dragging sideways
 * spins it, and the pointer tilts it and moves the light on the glass. The page's scroll joins
 * the layers into one block and the opening assembles it (Hero.jsx, through the data attributes
 * below). With reduced motion it is a still picture and the caption is changed by its buttons.
 */

// Bottom first: the order the layers stack in. `tint` colours the glass and its lit edges.
const LAYERS = [
    { id: 'data', tint: '45 212 191' },
    { id: 'server', tint: '34 211 238' },
    { id: 'motion', tint: '56 152 255' },
    { id: 'interface', tint: '96 128 255' },
];

// The outer ring: the technologies, evenly spaced. Next.js takes the ink colour, so it reads in both themes.
const CHIPS = [
    { id: 'react', Icon: SiReact, brand: '#3FC4E8', spin: true },
    { id: 'next', Icon: SiNextdotjs, brand: 'rgb(var(--ink))' },
    { id: 'typescript', Icon: SiTypescript, brand: '#3178C6' },
    { id: 'javascript', Icon: SiJavascript, brand: '#E8C500' },
    { id: 'node', Icon: SiNodedotjs, brand: '#5FA04E' },
    { id: 'tailwind', Icon: SiTailwindcss, brand: '#22A6E0' },
    { id: 'postgres', Icon: SiPostgresql, brand: '#4F7FC0' },
];

// The inner ring: code glyphs, turning the other way and faster.
const GLYPHS = ['</>', '{ }', '=>'];

// Light beams between the layers, where they run through the stack.
const BEAMS = [
    { x: '18%', y: '22%', delay: '0s' },
    { x: '78%', y: '34%', delay: '-0.9s' },
    { x: '46%', y: '82%', delay: '-1.8s' },
];

// How long each layer is shown before the next.
const STEP_MS = 2800;

const Bar = ({ className }) => <span className={`block rounded-full ${className}`} />;

const InterfaceFace = () => (
    <div className="flex h-full flex-col p-[1.1em]">
        <div className="flex items-center gap-[0.35em]">
            <span className="size-[0.5em] rounded-full bg-[#FF8FA3]" />
            <span className="size-[0.5em] rounded-full bg-[#FFC857]" />
            <span className="size-[0.5em] rounded-full bg-[#5FD69C]" />
            <span className="ml-[0.6em] h-[1.1em] flex-1 rounded-full bg-ink/10" />
        </div>
        <Bar className="mt-[1.1em] h-[1em] w-[58%] bg-[linear-gradient(90deg,#38BDF8,#1E66F5)]" />
        <Bar className="mt-[0.6em] h-[0.5em] w-[82%] bg-ink/25" />
        <Bar className="mt-[0.4em] h-[0.5em] w-[64%] bg-ink/15" />
        <div className="mt-[0.9em] flex gap-[0.5em]">
            <span className="h-[1.4em] w-[4.6em] rounded-[0.45em] bg-[linear-gradient(100deg,#22D3EE,#2DD4BF)] shadow-[0_0_14px_rgb(34_211_238/0.5)]" />
            <span className="h-[1.4em] w-[4em] rounded-[0.45em] border border-ink/25" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-[0.5em]">
            {['#22D3EE', '#2DD4BF', '#4D8DFF'].map((color) => (
                <span key={color} className="flex h-[4.4em] flex-col justify-end gap-[0.3em] rounded-[0.6em] border border-ink/10 bg-ink/[0.05] p-[0.45em]">
                    <span className="h-[1.4em] rounded-[0.35em]" style={{ background: `linear-gradient(135deg, ${color}, transparent)` }} />
                    <Bar className="h-[0.35em] w-[70%] bg-ink/25" />
                </span>
            ))}
        </div>
    </div>
);

// A few lines of the scroll animation this page runs, coloured like an editor.
const CODE = [
    [['k', 'const '], ['v', 'tl'], ['p', ' = '], ['v', 'gsap'], ['p', '.'], ['f', 'timeline'], ['p', '({']],
    [['p', '  scrollTrigger: { '], ['v', 'pin'], ['p', ': '], ['n', 'true'], ['p', ', '], ['v', 'scrub'], ['p', ': '], ['n', '0.6'], ['p', ' },']],
    [['p', '});']],
    [['v', 'tl'], ['p', '.'], ['f', 'to'], ['p', '('], ['s', "'.layer'"], ['p', ', { '], ['v', 'z'], ['p', ': '], ['n', '0'], ['p', ' });']],
    [],
    [['k', 'export const '], ['f', 'Hero'], ['p', ' = () => (']],
    [['p', '  <'], ['t', 'Scene'], ['v', ' layers'], ['p', '={'], ['v', 'stack'], ['p', '} />']],
    [['p', ');']],
];
const CODE_COLOR = { k: '#82AAFF', v: '#E2E8F5', f: '#7DD3FC', p: '#A3B1CC', n: '#FDBA74', s: '#86EFAC', t: '#67E8F9' };

const CodeFace = () => (
    <div className="flex h-full flex-col">
        <div className="flex items-center gap-[0.6em] border-b border-white/10 px-[1em] py-[0.55em] text-[0.8em]">
            <span className="rounded-[0.35em] bg-white/10 px-[0.6em] py-[0.15em] text-[#E2E8F5]">Hero.jsx</span>
            <span className="text-[#A3B1CC]/70">scroll.js</span>
        </div>
        <pre className="flex-1 overflow-hidden px-[1em] py-[0.8em] font-mono text-[0.78em] leading-[1.75]">
            {CODE.map((line, index) => (
                <div key={index} className="flex gap-[0.9em] whitespace-pre">
                    <span className="w-[1em] text-right text-white/25">{index + 1}</span>
                    <span>
                        {line.map(([kind, text], part) => (
                            <span key={part} style={{ color: CODE_COLOR[kind] }}>
                                {text}
                            </span>
                        ))}
                    </span>
                </div>
            ))}
        </pre>
    </div>
);

const REQUESTS = [
    ['GET', '/api/projects', '200'],
    ['POST', '/api/contact', '201'],
    ['GET', '/api/projects/:id', '200'],
];

const ServerFace = () => (
    <div className="flex h-full flex-col p-[1.1em]">
        <div className="flex items-center justify-between text-[0.8em] text-pencil">
            <span className="font-semibold text-ink">Node.js API</span>
            <span className="flex items-center gap-[0.35em]">
                <span className="size-[0.55em] rounded-full bg-[#34C98A] shadow-[0_0_8px_#34C98A]" />
                live
            </span>
        </div>
        <svg viewBox="0 0 120 34" className="mt-[0.8em] h-[3.6em] w-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="scene-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3B82F6" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d="M0 26 L12 22 L24 24 L36 15 L48 18 L60 9 L72 13 L84 6 L96 10 L108 4 L120 7 L120 34 L0 34 Z" fill="url(#scene-area)" />
            <path d="M0 26 L12 22 L24 24 L36 15 L48 18 L60 9 L72 13 L84 6 L96 10 L108 4 L120 7" fill="none" stroke="#4D8DFF" strokeWidth="1.4" />
        </svg>
        <div className="mt-auto space-y-[0.45em] font-mono text-[0.74em]">
            {REQUESTS.map(([method, path, status]) => (
                <div key={path} className="flex items-center gap-[0.6em] rounded-[0.45em] bg-ink/[0.06] px-[0.6em] py-[0.35em]">
                    <span className={`w-[3em] font-semibold ${method === 'GET' ? 'text-[#0EA5E9]' : 'text-[#3B82F6]'}`}>{method}</span>
                    <span className="flex-1 truncate text-ink/80">{path}</span>
                    <span className="text-[#21A872]">{status}</span>
                </div>
            ))}
        </div>
    </div>
);

const DataFace = () => (
    <div className="flex h-full flex-col p-[1.1em]">
        <div className="flex items-center gap-[0.5em] text-[0.8em] font-semibold text-ink">
            <Database className="size-[1.3em] text-[#06B6D4]" aria-hidden="true" />
            projects
        </div>
        <div className="mt-[0.8em] grid flex-1 grid-cols-[1.2fr_2fr_1.6fr] content-start gap-px overflow-hidden rounded-[0.6em] border border-ink/10 bg-ink/10 text-[0.72em]">
            {['id', 'name', 'stack'].map((heading) => (
                <span key={heading} className="bg-[#06B6D4]/15 px-[0.6em] py-[0.45em] font-semibold text-ink/85">
                    {heading}
                </span>
            ))}
            {Array.from({ length: 5 }, (_, row) => (
                <React.Fragment key={row}>
                    <span className="bg-sheet/90 px-[0.6em] py-[0.5em] font-mono text-ink/45">{row + 1}</span>
                    <span className="bg-sheet/90 px-[0.6em] py-[0.62em]">
                        <Bar className="h-[0.42em] bg-ink/25" />
                    </span>
                    <span className="bg-sheet/90 px-[0.6em] py-[0.62em]">
                        <Bar className={`h-[0.42em] ${row % 2 ? 'w-[60%] bg-[#3B82F6]/60' : 'w-[80%] bg-[#06B6D4]/55'}`} />
                    </span>
                </React.Fragment>
            ))}
        </div>
    </div>
);

const FACES = { data: DataFace, server: ServerFace, motion: CodeFace, interface: InterfaceFace };

const HeroVisual = ({ layers: names, className = '' }) => {
    const sceneRef = useRef(null);
    // Index into LAYERS (bottom first) of the layer being shown; the tour starts at the top and
    // works down, the same order as the caption's steps.
    const [active, setActive] = useState(LAYERS.length - 1);
    // The tour pauses while the pointer or focus is on the scene, and stops once someone picks a layer.
    const paused = useRef(false);
    const stopped = useRef(false);
    const info = names[names.length - 1 - active];

    // The idle motion, the orbit, the pointer and dragging. Not with reduced motion.
    useEffect(() => {
        const scene = sceneRef.current;
        const media = gsap.matchMedia();
        media.add({ motion: MOTION_OK, fine: '(hover: hover) and (pointer: fine)' }, (context) => {
            if (!context.conditions.motion) return undefined;

            const orbit = gsap.to(scene, { '--orbit': '360deg', duration: 56, ease: 'none', repeat: -1 });
            const sway = gsap.fromTo(scene, { '--sway': '-5deg' }, { '--sway': '5deg', duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
            const breathe = gsap.fromTo(scene, { '--breathe': 0.94 }, { '--breathe': 1.06, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
            const loops = [orbit, sway, breathe];

            // Off screen, everything stops.
            const observer = new IntersectionObserver(([entry]) => {
                scene.toggleAttribute('data-paused', !entry.isIntersecting);
                loops.forEach((loop) => (entry.isIntersecting ? loop.resume() : loop.pause()));
            });
            observer.observe(scene);

            // Hovering slows the orbit to a drift.
            const slow = () => gsap.to(orbit, { timeScale: 0.2, duration: 0.6 });
            const resume = () => gsap.to(orbit, { timeScale: 1, duration: 0.8 });
            scene.addEventListener('pointerenter', slow);
            scene.addEventListener('pointerleave', resume);

            // Dragging sideways spins the scene; letting go springs it back. Vertical drags still scroll.
            let dragX = null;
            const toTwist = gsap.quickTo(scene, '--twist', { duration: 0.4, ease: 'power3.out', unit: 'deg' });
            const down = (event) => {
                dragX = event.clientX;
            };
            const move = (event) => {
                if (dragX !== null) toTwist(Math.max(-70, Math.min(70, (event.clientX - dragX) * 0.35)));
            };
            const up = () => {
                if (dragX === null) return;
                dragX = null;
                gsap.to(scene, { '--twist': '0deg', duration: 1.6, ease: 'elastic.out(1, 0.45)', overwrite: true });
            };
            scene.addEventListener('pointerdown', down);
            window.addEventListener('pointermove', move, { passive: true });
            window.addEventListener('pointerup', up);
            window.addEventListener('pointercancel', up);

            // The pointer tilts the rig and moves the light (mouse and pen only).
            let tilt = null;
            if (context.conditions.fine) {
                const toX = gsap.quickTo(scene, '--mx', { duration: 1.1, ease: 'power3.out' });
                const toY = gsap.quickTo(scene, '--my', { duration: 1.1, ease: 'power3.out' });
                tilt = (event) => {
                    toX((event.clientX / window.innerWidth) * 2 - 1);
                    toY((event.clientY / window.innerHeight) * 2 - 1);
                };
                window.addEventListener('pointermove', tilt, { passive: true });
            }

            return () => {
                observer.disconnect();
                scene.removeAttribute('data-paused');
                scene.removeEventListener('pointerenter', slow);
                scene.removeEventListener('pointerleave', resume);
                scene.removeEventListener('pointerdown', down);
                window.removeEventListener('pointermove', move);
                window.removeEventListener('pointerup', up);
                window.removeEventListener('pointercancel', up);
                if (tilt) window.removeEventListener('pointermove', tilt);
            };
        });
        return () => media.revert();
    }, []);

    // The tour: each layer in turn, from the interface down. Off screen it waits.
    useEffect(() => {
        if (!window.matchMedia(MOTION_OK).matches) return undefined;
        const timer = window.setInterval(() => {
            if (stopped.current || paused.current || sceneRef.current?.hasAttribute('data-paused')) return;
            setActive((index) => (index + LAYERS.length - 1) % LAYERS.length);
        }, STEP_MS);
        return () => window.clearInterval(timer);
    }, []);

    // The shown layer lifts out of the stack.
    useEffect(() => {
        const layers = sceneRef.current.querySelectorAll('[data-layer]');
        const still = !window.matchMedia(MOTION_OK).matches;
        layers.forEach((layer, index) => {
            gsap.to(layer, { '--lift': index === active ? 0.09 : 0, duration: still ? 0 : 0.8, ease: 'power3.out', overwrite: 'auto' });
        });
    }, [active]);

    const show = (index) => {
        stopped.current = true;
        setActive(index);
    };
    const hold = (value) => () => {
        paused.current = value;
    };

    return (
        <figure
            className={`relative flex flex-col ${className}`}
            onPointerEnter={hold(true)}
            onPointerLeave={hold(false)}
            onFocus={hold(true)}
            onBlur={hold(false)}
        >
            <ul className="sr-only">
                {names.map((layer) => (
                    <li key={layer.name}>
                        {layer.name}: {layer.tools}
                    </li>
                ))}
            </ul>

            <div ref={sceneRef} data-scene className="scene min-h-0 w-full flex-1 [container-type:size]" aria-hidden="true">
                <div className="scene-rig">
                    <div className="scene-floor" />

                    {/* Both rings lie flat on the rig's plane, so fading them as a group cannot flatten anything. */}
                    <div data-rings className="absolute inset-0">
                        <div className="scene-ring" style={{ '--r': 'calc(var(--size) * 1.02 * var(--spread))' }} />
                        <div className="scene-ring scene-ring--inner" style={{ '--r': 'calc(var(--size) * 0.82 * var(--spread))' }} />
                    </div>

                    {LAYERS.map((layer, index) => {
                        const Face = FACES[layer.id];
                        return (
                            <div
                                key={layer.id}
                                data-layer={layer.id}
                                data-active={index === active || undefined}
                                className="scene-layer"
                                style={{ '--i': index, '--tint': layer.tint, '--drop': '0px', '--lift': 0 }}
                            >
                                <span className="scene-edge scene-edge--front" />
                                <span className="scene-edge scene-edge--side" />
                                <div
                                    className={`scene-face text-[calc(var(--size)/26)] leading-normal text-ink ${layer.id === 'motion' ? 'scene-face--code' : ''}`}
                                >
                                    <Face />
                                </div>
                            </div>
                        );
                    })}

                    {BEAMS.map((beam) => (
                        <span key={beam.x} data-beam className="scene-beam" style={{ '--x': beam.x, '--y': beam.y, '--grow': 1 }}>
                            <span className="scene-pulse" style={{ '--delay': beam.delay }} />
                        </span>
                    ))}

                    {CHIPS.map(({ id, Icon, brand, spin }, index) => (
                        <div
                            key={id}
                            data-orbiter
                            className="scene-orbiter"
                            style={{ '--phase': `${(360 / CHIPS.length) * index}deg`, '--r': 'calc(var(--size) * 1.02 * var(--spread))' }}
                        >
                            {/* Plain wrappers take the scroll's fade and the opening's scale, so the chip keeps its own centring. */}
                            <div data-orbit-fade>
                                <div data-chip>
                                    <div className="scene-chip" style={{ '--brand': brand, '--chip': 'calc(var(--size) * 0.17)' }}>
                                        <Icon className={spin ? 'scene-spin' : undefined} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {GLYPHS.map((glyph, index) => (
                        <div
                            key={glyph}
                            data-orbiter
                            className="scene-orbiter"
                            style={{
                                '--phase': `${(360 / GLYPHS.length) * index + 40}deg`,
                                '--rate': -1.6,
                                '--r': 'calc(var(--size) * 0.82 * var(--spread))',
                                '--lift': 0.35,
                            }}
                        >
                            <div data-orbit-fade>
                                <div data-chip>
                                    <span className="scene-glyph">{glyph}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* The caption names the layer being shown; its steps pick a layer. The outer box takes the
                scroll's fade, the inner one the opening's. */}
            <div data-caption-fade className="relative z-[1] mx-auto max-w-[calc(100%-2.5rem)] sm:mt-2 sm:max-w-full">
                <div
                    data-caption
                    className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-sheet/60 py-1.5 pl-3.5 pr-2 shadow-[0_14px_34px_-20px_rgb(var(--accent)/0.6)] backdrop-blur-md sm:gap-3 sm:py-2 sm:pl-4 sm:pr-2.5"
                >
                    <span className="min-w-0">
                        <span className="block font-display text-[0.875rem] font-semibold leading-tight text-ink sm:text-[0.95rem]">{info.name}</span>
                        <span className="block truncate text-[0.72rem] leading-snug text-pencil sm:text-[0.78rem]">{info.tools}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1" role="group" aria-label="Show a layer">
                        {[...LAYERS].reverse().map((layer, step) => {
                            const index = LAYERS.length - 1 - step;
                            return (
                                <button
                                    key={layer.id}
                                    type="button"
                                    onClick={() => show(index)}
                                    aria-label={`Show the ${names[step].name} layer`}
                                    aria-pressed={index === active}
                                    className="grid size-7 place-items-center rounded-full"
                                >
                                    <span
                                        className={`block h-1.5 rounded-full transition-all duration-300 ${index === active ? 'w-4 bg-gradient-to-r from-accent to-accent-2' : 'w-1.5 bg-ink/25'}`}
                                    />
                                </button>
                            );
                        })}
                    </span>
                </div>
            </div>
        </figure>
    );
};

export default HeroVisual;
