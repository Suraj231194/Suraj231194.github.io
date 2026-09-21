import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

/**
 * A fixed field of geometry that lives behind every section. Each shape is anchored to
 * a point along the page (`anchor`, 0..1 of the scrollable height) and drifts with a
 * depth-based parallax factor, so the page reads as a stack of planes in a 3D space.
 *
 * side: -1 left / 1 right   lane: distance from centre (0..1 of half the viewport width)
 * parallax: 1 moves with the page, lower values sit further back and move slower
 */
const SHAPES = [
    { kind: 'icosahedron', args: [1.35, 0], side: -1, lane: 0.82, anchor: 0.1, parallax: 0.55, spin: [0.12, 0.08], solid: true },
    { kind: 'torus', args: [1.0, 0.28, 10, 40], side: 1, lane: 0.8, anchor: 0.19, parallax: 0.8, spin: [0.06, 0.1] },
    { kind: 'octahedron', args: [0.95, 0], side: 1, lane: 0.58, anchor: 0.3, parallax: 0.45, spin: [0.1, 0.14] },
    { kind: 'dodecahedron', args: [0.8, 0], side: -1, lane: 0.64, anchor: 0.39, parallax: 0.7, spin: [0.08, 0.06], solid: true },
    { kind: 'torusKnot', args: [0.55, 0.16, 96, 10], side: 1, lane: 0.86, anchor: 0.49, parallax: 0.6, spin: [0.1, 0.12] },
    { kind: 'icosahedron', args: [0.5, 1], side: -1, lane: 0.9, anchor: 0.57, parallax: 0.95, spin: [0.14, 0.1] },
    { kind: 'box', args: [1.1, 1.1, 1.1], side: 1, lane: 0.7, anchor: 0.67, parallax: 0.5, spin: [0.07, 0.09], solid: true },
    { kind: 'tetrahedron', args: [0.85, 0], side: -1, lane: 0.74, anchor: 0.77, parallax: 0.75, spin: [0.12, 0.05] },
    { kind: 'torus', args: [0.7, 0.2, 10, 36], side: 1, lane: 0.62, anchor: 0.88, parallax: 0.6, spin: [0.09, 0.11] },
    { kind: 'octahedron', args: [0.6, 0], side: -1, lane: 0.55, anchor: 0.96, parallax: 0.85, spin: [0.1, 0.1], solid: true },
];

const PALETTE = {
    dark: { wire: '#fb923c', wireOpacity: 0.22, solid: '#fa5b0f', solidOpacity: 0.09 },
    light: { wire: '#ea580c', wireOpacity: 0.3, solid: '#fa5b0f', solidOpacity: 0.11 },
};

const createGeometry = ({ kind, args }) => {
    switch (kind) {
        case 'torus': return new THREE.TorusGeometry(...args);
        case 'torusKnot': return new THREE.TorusKnotGeometry(...args);
        case 'octahedron': return new THREE.OctahedronGeometry(...args);
        case 'dodecahedron': return new THREE.DodecahedronGeometry(...args);
        case 'tetrahedron': return new THREE.TetrahedronGeometry(...args);
        case 'box': return new THREE.BoxGeometry(...args);
        default: return new THREE.IcosahedronGeometry(...args);
    }
};

const Shape = ({ shape, palette }) => {
    const group = useRef(null);
    const { viewport } = useThree();
    const geometry = useMemo(() => createGeometry(shape), [shape]);

    useEffect(() => () => geometry.dispose(), [geometry]);

    useFrame((_, delta) => {
        const g = group.current;
        if (!g) return;

        const innerHeight = window.innerHeight || 1;
        const scrollY = window.scrollY || 0;
        const maxScroll = Math.max(document.documentElement.scrollHeight - innerHeight, 1);

        // Where this shape lives on the page, in pixels, then how far that is from the viewport centre.
        const anchorPx = shape.anchor * maxScroll + innerHeight / 2;
        const screenDy = anchorPx - (scrollY + innerHeight / 2);
        const unitsPerPx = viewport.height / innerHeight;
        const targetY = -screenDy * shape.parallax * unitsPerPx;

        // Narrow screens: smaller shapes pushed to the very edge so they never sit on top of the copy.
        const narrow = viewport.width < 6.5;
        const lane = narrow ? Math.max(shape.lane, 1.0) : shape.lane;
        const scale = narrow ? 0.5 : Math.min(1, viewport.width / 10);

        g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 9, delta);
        g.position.x = shape.side * lane * (viewport.width / 2);
        g.position.z = -(1 - shape.parallax) * 5;
        g.rotation.x += delta * shape.spin[0];
        g.rotation.y += delta * shape.spin[1];
        g.scale.setScalar(scale);
    });

    return (
        <group ref={group}>
            {shape.solid && (
                <mesh geometry={geometry}>
                    <meshStandardMaterial
                        color={palette.solid}
                        transparent
                        opacity={palette.solidOpacity}
                        flatShading
                        roughness={0.6}
                        metalness={0.2}
                        depthWrite={false}
                    />
                </mesh>
            )}
            <mesh geometry={geometry}>
                <meshBasicMaterial color={palette.wire} wireframe transparent opacity={palette.wireOpacity} depthWrite={false} />
            </mesh>
        </group>
    );
};

const ScrollWorld = () => {
    const { theme } = useTheme();
    const [active, setActive] = useState(false);
    const palette = PALETTE[theme] ?? PALETTE.dark;

    // The hero is opaque and has its own scene, so this canvas only runs once the hero has scrolled away.
    useEffect(() => {
        const handleScroll = () => setActive(window.scrollY > window.innerHeight * 0.55);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
            <Canvas
                dpr={1}
                frameloop={active ? 'always' : 'never'}
                camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 50 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'low-power', stencil: false, depth: true }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[3, 5, 6]} intensity={1.2} />
                {SHAPES.map((shape, index) => (
                    <Shape key={`${shape.kind}-${index}`} shape={shape} palette={palette} />
                ))}
            </Canvas>
        </div>
    );
};

export default ScrollWorld;
