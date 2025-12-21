
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaBootstrap,
    FaAws,
    FaDocker
} from "react-icons/fa";
import { SiMongodb, SiRedux, SiChakraui, SiExpress, SiNextdotjs, SiSupabase, SiTypescript } from "react-icons/si";


export const NAV_LINKS = [
    { id: "home", title: "Home" },
    { id: "about", title: "About" },
    { id: "projects", title: "Projects" },
    { id: "tools", title: "Tools" },
    { id: "contact", title: "Contact" },
    { id: "resume", title: "Resume", href: "Downloads/SURAJ_PAWAR_RESUME.pdf", download: true },
];

export const HERO_CONTENT = {
    greeting: "Hello, my name is",
    name: "Suraj Pawar",
    title: "And I'm a",
    roles: ["Full Stack Web Developer", "Developer", "Designer", "Freelancer"],
    buttonText: "Hire me",
    link: "#contact"
};

export const ABOUT_CONTENT = {
    title: "About me",
    image: "images/surapawar.jpeg",
    name: "Suraj Pawar",
    role: "Full Stack Web Developer",
    description: "Passionate Full Stack Web Developer with a specialization in MERN stack. Skilled, collaborative and attentive developer with a drive to develop the most relevant products. Always looking forward to learning something new to strengthen skills learned.",
    resumeButton: "Download CV",
    resumeLink: "Downloads/SURAJ_PAWAR_RESUME.pdf"
};

export const PROJECTS = [
    {
        title: "SurajHub - Full Stack Ecommerce Platform",
        image: "images/surajhub.png",
        description: "E-commerce Platform: A comprehensive online shopping solution for businesses and individuals, providing a seamless user experience and robust features for managing products, orders, and customer relationships.",
        techStack: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Vite", "Prisma", "Tailwind CSS", "PostgreSQL", "Docker", "AWS"],
        liveLink: "http://3.233.229.217:3000/",
        sourceLink: "https://github.com/Suraj231194/surajEcommerce"
    },

     {
        title: "ShareBox",
        image: "images/ShareBox.png",
        description: "A full-stack file management system featuring secure file upload, download, preview, and shareable public links using AWS S3. Supports multi-file upload, access control, and seamless cloud storage integration.",
        techStack: ["JavaScript", "React", "Tailwind CSS", "Node", "Express", "MongoDB", "AWS"],
        liveLink: "https://share-box-orcin.vercel.app/",
        sourceLink: "https://github.com/Suraj231194/ShareBox"
    },

    
 {
        title: "Revenue OS Next",
        image: "images/Nexus.png",
        description: "Revenue OS Next is a modern, production-ready Next.js application designed to manage and visualize revenue data with a strong focus on performance, scalability, UI clarity, and SEO.It follows a dark-first professional design system, suitable for SaaS dashboards and enterprise products.",
        techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
        liveLink: "https://nexus-crm-six.vercel.app/",
        sourceLink: "https://github.com/Suraj231194/Nexus-CRM"
    },
    
    {
        title: "UrbanServices",
        image: "images/UrbanServices.png",
        description: "UrbanServices is a cutting-edge web application designed to connect homeowners with trusted service providers, making it easy to find and book reliable services for home maintenance and repair.",
        techStack: ["JavaScript", "React", "Tailwind CSS", "PostgreSQL", "Supabase"],
        liveLink: "https://secure-file-hub-7lbt.vercel.app/",
        sourceLink: "https://github.com/Suraj231194/UrbanServices"
    },
    {
        title: "Real-time Campaign Performance Dashboard",
        image: "images/MixoAnalytics.png",
        description: "AboutA high-performance admin dashboard using Vite + React + Tailwind v4. Features charts, theme switcher, toast notifications, and campaign management screens",
        techStack: ["React", "Next.js", "Vite", "Tailwind CSS"],
        liveLink: "https://mixo-analytics.vercel.app/",
        sourceLink: "https://github.com/Suraj231194/Mixo-Analytics"
    },
    {
        title: "AI-Model-Prototype",
        image: "images/AIModelPrototype.png",
        description: "A polished, frontend-only prototype of an AI chat interface built with React, TypeScript, and Tailwind CSS.",
        techStack: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
        liveLink: "https://ai-model-prototype-jihu.vercel.app/",
        sourceLink: "https://github.com/Suraj231194/AI-Model-Prototype"
    }
];

export const TOOLS = [
    { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
    { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Redux", icon: SiRedux, color: "text-purple-500" },
    { name: "Node JS", icon: FaNodeJs, color: "text-green-500" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Git", icon: FaGitAlt, color: "text-red-500" },
    { name: "Chakra UI", icon: SiChakraui, color: "text-teal-500" },
    { name: "Express", icon: SiExpress, color: "text-gray-400" },
    { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-600" },
    { name: "Next JS", icon: SiNextdotjs, color: "text-black dark:text-white" },
    { name: "Supabase", icon: SiSupabase, color: "text-emerald-500" },
    { name: "AWS", icon: FaAws, color: "text-orange-500" },
    { name: "Docker", icon: FaDocker, color: "text-blue-500" },
    { name: "typescript", icon: SiTypescript, color: "text-blue-600" },
];

export const EDUCATION = [
    {
        title: "Masai School",
        subtitle: "Full-Stack Web Development",
        date: "Feb 2022 - Nov 2022",
        image: "https://aniportalimages.s3.amazonaws.com/media/details/Capture2021092207014520210922071739.jpg"
    },
    {
        title: "LOGMIEER",
        subtitle: "Bachelors Of Engineering",
        date: "Jun 2017 - Aug 2021",
        image: "images/logmieer.jpg"
    },
    {
        title: "K.S.K.W Collage Nashik",
        subtitle: "Higher Secondary Education",
        date: "Jun 2010 - Nov 2012",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkDRx5kY24YcCN_t6PgzyOu-syifZd7iG2cw&usqp=CAU"
    }
];

export const SOCIAL_LINKS = {
    github: "https://github.com/Suraj231194",
    linkedin: "https://www.linkedin.com/in/surajpawar2311/",
    email: "surajpawar913@gmail.com"
};

export const FOOTER_TEXT = "Created By Suraj | 2023 All rights reserved.";
