
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
    FaBootstrap
} from "react-icons/fa";
import { SiMongodb, SiRedux, SiChakraui, SiExpress } from "react-icons/si";

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
        title: "Urban Company Clone",
        image: "images/UrbanCompany.png",
        description: "Urban Company is a service provider which helps customers with professional services such as Salon for men & women, Air Conditioners, Refrigerators, Electrical Appliances and Bathroom and repairing.",
        techStack: ["HTML", "CSS", "JavaScript", "React"],
        liveLink: "https://surajurban.vercel.app/",
        sourceLink: "https://github.com/Suraj2320/Urban-Company-Clone"
    },
    {
        title: "Netmeds Clone",
        image: "images/Netmeds.png",
        description: "Netmeds is a trusted Indian online pharmacy which provides the online purchase and delivery of medications. An end to end clone of netmeds.com where you can order pharmacy products and get delivered it at your doorstep.",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveLink: "https://inspiring-blini-089dcd.netlify.app/",
        sourceLink: "https://github.com/arulxavierax/Netmeds-Clone"
    },
    {
        title: "Banggood Clone",
        image: "images/Banggood.png",
        description: "This is an International online selling service from China with shipping. offers online shopping services areas in the world. Banggood specializes in providing Business-to-consumer retail services.",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveLink: "https://superb-torte-4939ea.netlify.app/",
        sourceLink: "https://github.com/VijaySingh8650/Banggood-Website"
    },
    {
        title: "Cult Fit Clone",
        image: "images/Cultfit.png",
        description: "cult.fit is a health and fitness company offering digital and offline experiences across fitness, nutrition, and mental well-being. With the aim to make fitness fun and easy, cult.fit gives workouts a whole new meaning with a range of trainer-led, group workout classes.",
        techStack: ["HTML", "CSS", "JavaScript", "React"],
        liveLink: "https://cultfit-two.vercel.app/",
        sourceLink: "https://github.com/Suraj2320/quickest-seashore-9367-Cultfit.in-Clone/tree/main/cultfit"
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
    github: "https://github.com/Suraj2320",
    linkedin: "https://www.linkedin.com/in/suraj-pawar-42b773215/",
    email: "surajpawar913@gmail.com"
};

export const FOOTER_TEXT = "Created By Suraj | 2023 All rights reserved.";
