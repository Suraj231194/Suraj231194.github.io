import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const RADIUS = 3.2;
const PRIMARY = '#fa5b0f';

/** Evenly spread N points on a sphere (Fibonacci lattice). */
const spherePoints = (count, radius) => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, index) => {
        const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * index;
        return [Math.cos(theta) * ring * radius, y * radius, Math.sin(theta) * ring * radius];
    });
};

const Orbit = ({ tools, pointer, paused }) => {
    const group = useRef(null);
    const chips = useRef([]);
    const positions = useMemo(() => spherePoints(tools.length, RADIUS), [tools.length]);
    const scratch = useMemo(() => new THREE.Vector3(), []);
    const canvasWidth = useThree((state) => state.size.width);
    // Chips keep their CSS size while the globe shrinks with the canvas, so scale them down on small screens.
    const distanceFactor = canvasWidth < 480 ? 4.6 : canvasWidth < 768 ? 5.6 : 6.5;

    useFrame((_, delta) => {
        const g = group.current;
        if (!g) return;

        g.rotation.y += delta * (paused.current ? 0.02 : 0.14);
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.35, 3, delta);
        g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -pointer.current.x * 0.12, 3, delta);
        g.updateMatrixWorld();

        // Fade and shrink chips on the far side of the globe so the front reads clearly.
        positions.forEach((position, index) => {
            const chip = chips.current[index];
            if (!chip) return;
            scratch.set(position[0], position[1], position[2]).applyMatrix4(g.matrixWorld);
            const depth = THREE.MathUtils.clamp((scratch.z + RADIUS) / (RADIUS * 2), 0, 1);
            const eased = depth * depth;
            chip.style.opacity = (0.06 + eased * 0.94).toFixed(3);
            chip.style.transform = `scale(${(0.55 + eased * 0.5).toFixed(3)})`;
        });
    });

    return (
        <group ref={group}>
            <mesh>
                <sphereGeometry args={[RADIUS, 28, 18]} />
                <meshBasicMaterial color={PRIMARY} wireframe transparent opacity={0.09} />
            </mesh>
            <mesh>
                <sphereGeometry args={[RADIUS * 0.32, 48, 48]} />
                <meshStandardMaterial color={PRIMARY} metalness={0.85} roughness={0.2} emissive={PRIMARY} emissiveIntensity={0.35} />
            </mesh>
            <mesh rotation={[Math.PI / 2.6, 0.4, 0]}>
                <torusGeometry args={[RADIUS * 1.12, 0.012, 8, 160]} />
                <meshBasicMaterial color={PRIMARY} transparent opacity={0.45} />
            </mesh>
            <mesh rotation={[Math.PI / 1.7, -0.6, 0.3]}>
                <torusGeometry args={[RADIUS * 1.22, 0.008, 8, 160]} />
                <meshBasicMaterial color="#94a3b8" transparent opacity={0.3} />
            </mesh>

            {tools.map((tool, index) => (
                <Html
                    key={tool.name}
                    position={positions[index]}
                    center
                    distanceFactor={distanceFactor}
                    zIndexRange={[40, 0]}
                    pointerEvents="none"
                    wrapperClass="tools-globe-chip"
                >
                    <div
                        ref={(element) => { chips.current[index] = element; }}
                        className="flex flex-col items-center gap-1 rounded-xl border border-gray-200/80 bg-white/90 px-2.5 py-1.5 shadow-md backdrop-blur-sm dark:border-white/10 dark:bg-[#151515]/90 sm:gap-1.5 sm:px-3 sm:py-2"
                        style={{ willChange: 'opacity, transform' }}
                    >
                        <tool.icon className={`text-xl sm:text-2xl ${tool.color}`} aria-hidden="true" />
                        <span className="whitespace-nowrap text-[10px] font-semibold text-text-light dark:text-text-dark sm:text-[11px]">{tool.name}</span>
                    </div>
                </Html>
            ))}
        </group>
    );
};

const ToolsGlobe = ({ tools, active = true }) => {
    const pointer = useRef({ x: 0, y: 0 });
    const paused = useRef(false);

    const handlePointerMove = (event) => {
        if (event.pointerType === 'touch') return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const resetPointer = () => {
        pointer.current.x = 0;
        pointer.current.y = 0;
        paused.current = false;
    };

    return (
        <div
            className="relative isolate z-0 h-[340px] w-full overflow-hidden sm:h-[420px] lg:h-[480px]"
            onPointerMove={handlePointerMove}
            onPointerEnter={() => { paused.current = true; }}
            onPointerLeave={resetPointer}
            aria-hidden="true"
        >
            <Canvas
                dpr={[1, 1.5]}
                frameloop={active ? 'always' : 'never'}
                camera={{ position: [0, 0, 10.5], fov: 40 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
            >
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 6, 6]} intensity={1.4} />
                <pointLight position={[-5, -3, 4]} intensity={10} color="#7dd3fc" distance={16} />
                <Orbit tools={tools} pointer={pointer} paused={paused} />
            </Canvas>
        </div>
    );
};

export default ToolsGlobe;
