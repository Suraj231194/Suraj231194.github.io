import React from 'react';
import { FaAws, FaBootstrap, FaCss3Alt, FaDocker, FaGitAlt, FaGlobe, FaHtml5, FaJs, FaNodeJs, FaReact, FaTasks } from 'react-icons/fa';
import {
    SiChakraui,
    SiExpress,
    SiFramer,
    SiGreensock,
    SiLaravel,
    SiMongodb,
    SiNextdotjs,
    SiPhp,
    SiPostgresql,
    SiPrisma,
    SiRedux,
    SiSupabase,
    SiTailwindcss,
    SiThreedotjs,
    SiTypescript,
    SiVercel,
    SiVite,
    SiWebgl,
} from 'react-icons/si';

// Keyed by the technology name lowercased, without dots or spaces ("Next.js" -> "nextjs").
const ICONS = {
    html: [FaHtml5, 'text-orange-600'],
    css: [FaCss3Alt, 'text-blue-600'],
    javascript: [FaJs, 'text-yellow-500'],
    react: [FaReact, 'text-cyan-500'],
    reactjs: [FaReact, 'text-cyan-500'],
    nextjs: [SiNextdotjs, 'text-ink'],
    vite: [SiVite, 'text-purple-500'],
    prisma: [SiPrisma, 'text-teal-600'],
    tailwindcss: [SiTailwindcss, 'text-cyan-500'],
    postgresql: [SiPostgresql, 'text-blue-500'],
    docker: [FaDocker, 'text-blue-500'],
    aws: [FaAws, 'text-orange-500'],
    redux: [SiRedux, 'text-purple-500'],
    nodejs: [FaNodeJs, 'text-green-600'],
    mongodb: [SiMongodb, 'text-green-600'],
    express: [SiExpress, 'text-ink'],
    chakraui: [SiChakraui, 'text-teal-500'],
    typescript: [SiTypescript, 'text-blue-600'],
    bootstrap: [FaBootstrap, 'text-purple-600'],
    supabase: [SiSupabase, 'text-emerald-500'],
    vercel: [SiVercel, 'text-ink'],
    framermotion: [SiFramer, 'text-pink-500'],
    gsap: [SiGreensock, 'text-lime-600'],
    threejs: [SiThreedotjs, 'text-ink'],
    webgl: [SiWebgl, 'text-red-600'],
    php: [SiPhp, 'text-indigo-500'],
    laravel: [SiLaravel, 'text-red-500'],
    git: [FaGitAlt, 'text-red-500'],
    agile: [FaTasks, 'text-blue-500'],
    restapis: [FaGlobe, 'text-green-600'],
};

export const getTechIcon = (tech) => {
    const entry = ICONS[tech.toLowerCase().replaceAll('.', '').replaceAll(' ', '')];
    if (!entry) return null;
    const [Icon, color] = entry;
    return <Icon className={`shrink-0 ${color}`} aria-hidden="true" />;
};
