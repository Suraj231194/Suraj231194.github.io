import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const PRIMARY = '#fa5b0f';
const PRIMARY_LIGHT = '#fdba74';
const COOL_RIM = '#7dd3fc';

const Orb = () => {
    const group = useRef(null);

    useFrame((state, delta) => {
        const g = group.current;
        if (!g) return;
        // The orb turns with the scrollbar and breathes gently on its own.
        const target = (window.scrollY || 0) * 0.0016;
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target, 4, delta);
        g.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.18;
    });

    return (
        <group ref={group}>
            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8} floatingRange={[-0.1, 0.1]}>
                <mesh>
                    <icosahedronGeometry args={[1.05, 6]} />
                    <MeshDistortMaterial color={PRIMARY} metalness={0.78} roughness={0.2} distort={0.36} speed={1.6} envMapIntensity={1.3} />
                </mesh>
            </Float>
            <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
                <torusGeometry args={[1.7, 0.02, 8, 128]} />
                <meshBasicMaterial color={PRIMARY_LIGHT} transparent opacity={0.55} />
            </mesh>
            <mesh rotation={[Math.PI / 3.2, -0.5, 0.4]}>
                <torusGeometry args={[1.95, 0.012, 8, 128]} />
                <meshBasicMaterial color={COOL_RIM} transparent opacity={0.35} />
            </mesh>
        </group>
    );
};

const ContactOrb = ({ active = true }) => (
    <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
    >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.8} />
        <pointLight position={[-4, -2, 3]} intensity={12} color={COOL_RIM} distance={14} />
        <Environment resolution={128} frames={1}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -3]} scale={[8, 6, 1]} color="#ffffff" />
            <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-6, 0, 0]} scale={[6, 2, 1]} color={COOL_RIM} />
            <Lightformer intensity={3} rotation-y={-Math.PI / 2} position={[6, -1, 0]} scale={[6, 2, 1]} color={PRIMARY_LIGHT} />
        </Environment>
        <Orb />
        <Sparkles count={28} scale={[5, 3.5, 3]} size={2} speed={0.3} opacity={0.6} color={PRIMARY_LIGHT} />
    </Canvas>
);

export default ContactOrb;
