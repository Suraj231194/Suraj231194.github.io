import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const INTRO_SECONDS = 1.6;
/** Overshoots slightly then settles, so the object "lands" rather than just growing. */
const easeOutBack = (t) => {
    const c1 = 1.4;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const PRIMARY = '#fa5b0f';
const PRIMARY_LIGHT = '#fdba74';
const COOL_RIM = '#7dd3fc';

/**
 * Shared pointer state, normalised to -1..1 and read inside the render loop.
 * The canvas itself never receives pointer events (it sits behind the hero copy),
 * so we listen on the window instead.
 */
const usePointer = () => {
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (event) => {
            if (event.pointerType === 'touch') return;
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        return () => window.removeEventListener('pointermove', handleMove);
    }, []);

    return pointer;
};

const Satellite = ({ radius, speed, offset, size, color, metalness = 1, roughness = 0.12 }) => {
    const mesh = useRef(null);

    useFrame(({ clock }) => {
        if (!mesh.current) return;
        const t = clock.elapsedTime * speed + offset;
        mesh.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.8) * radius * 0.35, Math.sin(t) * radius);
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[size, 48, 48]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
        </mesh>
    );
};

/** Phones and low-core devices get lighter geometry and fewer particles. Decided once per load. */
const detectLowPower = () => {
    if (typeof window === 'undefined') return false;
    const small = window.matchMedia('(max-width: 640px)').matches;
    const fewCores = (navigator.hardwareConcurrency || 8) <= 4;
    const saveData = navigator.connection?.saveData === true;
    return small || fewCores || saveData;
};

const Signature = ({ pointer, lowPower }) => {
    const group = useRef(null);
    const knot = useRef(null);
    const shell = useRef(null);
    const shellMaterial = useRef(null);
    const intro = useRef(0);
    const { viewport } = useThree();

    // On wide screens the object sits to the right of the headline. On narrow
    // screens it moves behind the copy, smaller and slightly higher.
    const wide = viewport.width > 8.5;
    const targetX = wide ? viewport.width * 0.24 : 0;
    const targetScale = wide ? 1 : Math.max(0.55, viewport.width / 9);

    useFrame((state, delta) => {
        if (!group.current || !knot.current || !shell.current) return;
        const t = state.clock.elapsedTime;

        // Page-load intro: the knot spins in from nothing and lands with a slight overshoot,
        // the wire shell fades up behind it. Runs once, then hands over to the idle motion.
        if (intro.current < 1) intro.current = Math.min(1, intro.current + delta / INTRO_SECONDS);
        const introEase = easeOutBack(intro.current);
        const spinIn = (1 - intro.current) * 2.2;

        knot.current.rotation.x = t * 0.16 + spinIn * 0.6;
        knot.current.rotation.y = t * 0.22 + spinIn;
        shell.current.rotation.y = -t * 0.07 - spinIn * 0.4;
        shell.current.rotation.z = t * 0.04;
        if (shellMaterial.current) shellMaterial.current.opacity = 0.16 * Math.min(1, intro.current * 1.4);

        const scroll = Math.min((window.scrollY || 0) / Math.max(window.innerHeight, 1), 1);
        const g = group.current;

        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.22 + scroll * 0.6, 3, delta);
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.3, 3, delta);
        g.position.x = THREE.MathUtils.damp(g.position.x, targetX + pointer.current.x * 0.15, 4, delta);
        g.position.y = THREE.MathUtils.damp(g.position.y, (wide ? 0 : 0.6) - scroll * 2.6 + pointer.current.y * 0.1, 4, delta);

        const restingScale = targetScale * (1 - scroll * 0.15);
        if (intro.current < 1) {
            g.scale.setScalar(Math.max(0.001, restingScale * introEase));
        } else {
            g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, restingScale, 4, delta));
        }
    });

    return (
        <group ref={group} position={[targetX, wide ? 0 : 0.6, 0]} scale={0.001}>
            <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9} floatingRange={[-0.15, 0.15]}>
                <mesh ref={knot}>
                    <torusKnotGeometry args={lowPower ? [1.25, 0.4, 160, 28] : [1.25, 0.4, 320, 48]} />
                    <meshStandardMaterial color={PRIMARY} metalness={0.92} roughness={0.16} envMapIntensity={1.4} />
                </mesh>
            </Float>

            <mesh ref={shell}>
                <icosahedronGeometry args={[3.1, 1]} />
                <meshBasicMaterial ref={shellMaterial} color={PRIMARY_LIGHT} wireframe transparent opacity={0} />
            </mesh>

            <Satellite radius={3.3} speed={0.45} offset={0} size={0.14} color="#cbd5e1" metalness={0.7} roughness={0.42} />
            <Satellite radius={3.6} speed={0.32} offset={2.1} size={0.1} color={PRIMARY_LIGHT} roughness={0.3} />
            <Satellite radius={2.9} speed={0.6} offset={4.2} size={0.08} color={COOL_RIM} roughness={0.25} />
        </group>
    );
};

const Rig = () => {
    const { camera } = useThree();

    useFrame((_, delta) => {
        const scroll = Math.min((window.scrollY || 0) / Math.max(window.innerHeight, 1), 1);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 9 + scroll * 1.5, 4, delta);
        camera.lookAt(0, 0, 0);
    });

    return null;
};

const StudioLighting = () => (
    <>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 6]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-6, -2, 4]} intensity={18} color={COOL_RIM} distance={20} />
        <pointLight position={[4, -4, -4]} intensity={14} color={PRIMARY_LIGHT} distance={18} />

        {/* Procedural studio environment: no HDR download, renders once, gives the metal real reflections. */}
        <Environment resolution={256} frames={1}>
            <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 6, -4]} scale={[12, 8, 1]} color="#ffffff" />
            <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-8, 1, 0]} scale={[8, 3, 1]} color={COOL_RIM} />
            <Lightformer intensity={4} rotation-y={-Math.PI / 2} position={[8, -1, 0]} scale={[8, 2, 1]} color={PRIMARY_LIGHT} />
            <Lightformer form="ring" intensity={2.5} position={[0, 0, 8]} scale={5} color="#ffffff" />
        </Environment>
    </>
);

const HeroScene = ({ active = true }) => {
    const pointer = usePointer();
    const lowPower = useMemo(detectLowPower, []);
    const sparkleScale = useMemo(() => [16, 9, 6], []);

    return (
        // Fades up once the Three.js chunk has loaded, so the scene never pops in over the dimmed photo.
        <motion.div className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }}>
            <Canvas
                dpr={[1, lowPower ? 1.25 : 1.6]}
                frameloop={active ? 'always' : 'never'}
                camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 60 }}
                gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance', stencil: false }}
                style={{ pointerEvents: 'none' }}
                aria-hidden="true"
            >
                <StudioLighting />
                <Rig />
                <Signature pointer={pointer} lowPower={lowPower} />
                <Sparkles count={lowPower ? 60 : 140} scale={sparkleScale} size={2.4} speed={0.25} opacity={0.55} color={PRIMARY_LIGHT} />
            </Canvas>
        </motion.div>
    );
};

export default HeroScene;
