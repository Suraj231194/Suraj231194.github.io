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

import {
  SiMongodb,
  SiRedux,
  SiChakraui,
  SiExpress,
  SiNextdotjs,
  SiSupabase,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiVercel,
  SiVite
} from "react-icons/si";

/* =======================
   NAVIGATION
======================= */
export const NAV_LINKS = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "tools", title: "Tools" },
  { id: "contact", title: "Contact" },
  {
    id: "resume",
    title: "Resume",
    href: "/Suraj-Pawar-Resume.pdf",
    download: true
  }
];

/* =======================
   HERO
======================= */
export const HERO_CONTENT = {
  greeting: "Hello, my name is",
  name: "Suraj Pawar",
  title: "And I'm a",
  roles: ["Full Stack Web Developer", "MERN Developer", "Frontend Specialist"],
  buttonText: "View my work",
  link: "#projects",
  secondaryButtonText: "Contact me",
  secondaryLink: "#contact"
};

/* =======================
   ABOUT
======================= */
export const ABOUT_CONTENT = {
  title: "About me",
  image: "/images/surapawar.webp",
  name: "Suraj Pawar",
  role: "Full Stack Web Developer (MERN)",
  description:
    "Passionate Full Stack Web Developer with strong experience in MERN stack and modern frontend architectures. Skilled in building scalable, secure, and performance-driven web applications with real-world business logic.",
  resumeButton: "Download CV",
  resumeLink: "/Suraj-Pawar-Resume.pdf"
};

/* =======================
   PROJECTS
======================= */
export const PROJECTS = [
  {
    title: "Nexaro - Full Stack E-Commerce Platform",
    image: "/images/surajhub.webp",
    description:
      "Supports the complete shopping journey with secure authentication, product management, order lifecycle workflows, and cloud deployment.",
    category: ["Full Stack"],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Vite",
      "Prisma",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
      "AWS"
    ],
    liveLink: "https://suraj-ecommerce-gamma.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/NexaroEcommerce"
  },
  {
    title: "UrbanServices - Service Booking Platform",
    image: "/images/UrbanServices.webp",
    description:
      "Makes it easy for customers to discover and book trusted home services from verified providers.",
    category: ["Full Stack"],
    techStack: [
       "Next.js",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "PostgreSQL",
      "Supabase"
    ],
    liveLink: "https://secure-file-hub-7lbt.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/UrbanServices"
  },
  {
    title: "Appointment Booking Platform",
    image: "/images/appoinment.webp",
    description:
      "Prevents scheduling conflicts through role-based access, slot availability, and secure booking management for customers and service providers.",
    category: ["Full Stack", "MERN"],
    techStack: [
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    liveLink: "https://mern-appointment-booking-app.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/MERN-Appointment-Booking-app"
  },
  {
    title: "ShareBox - Secure File Management System",
    image: "/images/ShareBox.webp",
    description:
      "Enables controlled file sharing through secure uploads, permission-aware access, and scalable AWS S3 storage.",
    category: ["Full Stack", "MERN"],
    techStack: [
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS"
    ],
    liveLink: "https://share-box-orcin.vercel.app/",
    sourceLink: null
  },  
   {
    title: "Revenue OS Next - SaaS Dashboard",
    image: "/images/Nexus.webp",
    description:
      "Turns revenue and customer data into a fast, searchable SaaS workspace with an enterprise-focused interface.",
    category: ["Full Stack"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
    liveLink: "https://nexus-crm-six.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Nexus-CRM"
  }, 
  {
    title: "MERN Secure Vault - Cloud Password Manager",
    image: "/images/securevault.webp",
    description:
      "Keeps credentials available across devices with authenticated access, encryption, and secure cloud persistence.",
    category: ["Full Stack", "MERN"],
    techStack: [
      "JavaScript",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    liveLink: "https://mern-secure-vault-password.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/mern-secure-vault-password"
  },
  
  {
    title: "Real-Time Campaign Performance Dashboard",
    image: "/images/MixoAnalytics.webp",
    description:
      "Turns campaign data into actionable insights through responsive charts, filters, and real-time performance views.",
    category: ["Frontend"],
    techStack: ["React", "Next.js", "Vite", "Tailwind CSS"],
    liveLink: "https://mixo-analytics.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Mixo-Analytics"
  },
  {
    title: "Secure Vault - Browser-Only Password Manager",
    image: "/images/secure.webp",
    description:
      "Keeps secrets entirely on the user's device through browser-only Web Crypto encryption, protected local storage, and in-memory decryption.",
    category: ["Frontend"],
    techStack: [
      "React",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Web Crypto API"
    ],
    liveLink: "https://secure-vault-application.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Secure-Vault-Application"
  },

  {
    title: "Aadrila Technologies - Modern AI Corporate Website",
    image: "/images/aadrila.webp",
    description:
      "Presents an AI company with a responsive, high-performance corporate experience, purposeful motion, and interactive three-dimensional details.",
    category: ["Frontend"],
    techStack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion"
    ],
    liveLink: "https://framer-motion-xi-jade.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Framer-Motion-"
  },
  {
    title: "AI Model Prototype",
    image: "/images/AIModelPrototype.webp",
    description:
      "Demonstrates a clear, responsive AI conversation workflow with TypeScript and modern interface patterns.",
    category: ["Frontend"],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    liveLink: "https://ai-model-prototype-jihu.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/AI-Model-Prototype"
  }
];

/* =======================
   TOOLS / TECH STACK
======================= */
export const TOOLS = [
  { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
  { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Redux", icon: SiRedux, color: "text-purple-500" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
  { name: "Express", icon: SiExpress, color: "text-gray-400" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Prisma", icon: SiPrisma, color: "text-indigo-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Supabase", icon: SiSupabase, color: "text-emerald-500" },
  { name: "AWS", icon: FaAws, color: "text-orange-500" },
  { name: "Docker", icon: FaDocker, color: "text-blue-500" },
  { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white" },
  { name: "Vite", icon: SiVite, color: "text-purple-500" },
  { name: "Git", icon: FaGitAlt, color: "text-red-500" },
  { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-600" },
  { name: "Chakra UI", icon: SiChakraui, color: "text-teal-500" }
];

/* =======================
   EXPERIENCE
======================= */
export const EXPERIENCE = [
  {
    role: "Frontend Developer",
    company: "Care IO Infotech pvt ltd",
    duration: "August 2022 - Present",
    location: "Nashik, Maharashtra",
    description: [
      "Developed modular user interfaces with React.js and Tailwind CSS for healthcare applications, enabling a 40% increase in code reuse and reducing development time by 25% across 10+ products within a 12-month period.",
      "Facilitated cross-team integration by partnering with backend engineers to deliver React.js user interfaces, reducing frontend-backend issue resolution time by 40% over a 12-month period using REST APIs and Git.",
      "Developed and deployed over 30+ reusable React components and custom hooks using React.js and Tailwind CSS, reducing duplicate code by 40% and accelerating feature release cycles by 25%.",
      "Implemented lazy loading techniques and efficient state management in React.js and Next.js to enhance application responsiveness.",
      "Worked with backend, product, and QA teams under Agile methodologies to ensure seamless feature delivery."
    ],
    technologies: ["React.js", "Next.js", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap", "Agile", "REST APIs", "Git"]
  },
  {
    role: "Full-stack Developer",
    company: "Suneko Info - Freelance",
    duration: "Sep 2022 - May 2023",
    location: "Pune, Maharashtra, India - Hybrid",
    description: [
      "Frontend-focused Full-Stack Web Developer specializing in building scalable, responsive, and performance-optimized web interfaces, backed by reliable backend integration.",
      "Designed and developed responsive, interactive user interfaces using React.js, HTML, CSS, JavaScript, and Tailwind CSS.",
      "Integrated robust backend APIs built with Node.js to enable seamless data flow and enhance application performance.",
      "Utilized Bootstrap and Tailwind CSS to implement mobile-first designs, ensuring a consistent user experience across platforms."
    ],
    technologies: ["React.js", "Node.js", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap"]
  },
  {
    role: "Quality Assurance Quality Control",
    company: "Mungi Engineers Pvt. Ltd. - Full-time",
    duration: "Feb 2017 - Dec 2021",
    location: "Nashik, Maharashtra, India",
    description: [
      "In my role at Mungi Engineers Pvt. Ltd., I specialized in Quality Assurance and Quality Control within the automobile manufacturing domain, ensuring adherence to industry standards and internal quality requirements."
    ],
    technologies: []
  }
];

/* =======================
   EDUCATION
======================= */
export const EDUCATION = [
  {
    title: "Masai School",
    subtitle: "Full-Stack Web Development",
    date: "Feb 2022 - Nov 2022",
    image:
      "https://aniportalimages.s3.amazonaws.com/media/details/Capture2021092207014520210922071739.jpg"
  },
  {
    title: "LOGMIEER",
    subtitle: "Bachelor of Engineering",
    date: "Jun 2017 - Aug 2021",
    image: "images/logmieer.jpg"
  },
  {
    title: "K.S.K.W College, Nashik",
    subtitle: "Higher Secondary Education",
    date: "Jun 2010 - Nov 2012",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkDRx5kY24YcCN_t6PgzyOu-syifZd7iG2cw&usqp=CAU"
  }
];

/* =======================
   SOCIAL LINKS
======================= */
export const SOCIAL_LINKS = {
  github: "https://github.com/Suraj231194",
  linkedin: "https://www.linkedin.com/in/surajpawar2311/",
  email: "surajpawar913@gmail.com"
};

/* =======================
   FOOTER
======================= */
export const FOOTER_TEXT = `Designed and built by Suraj Pawar - ${new Date().getFullYear()}`;
