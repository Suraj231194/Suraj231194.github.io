import {
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
  SiVite,
  SiFramer,
  SiGreensock,
  SiThreedotjs,
  SiClaude,
  SiGithubcopilot,
  SiOpenai
} from "react-icons/si";
import { MousePointer2 } from "lucide-react";

export const RESUME_LINK = "/Suraj-Pawar-Resume.pdf";

/* =======================
   NAVIGATION
   Section links scroll within the page; the résumé is a download.
======================= */
export const NAV_LINKS = [
  { id: "projects", title: "Projects" },
  { id: "experience", title: "Experience" },
  { id: "tools", title: "Skills" },
  { id: "about", title: "About" },
  { id: "contact", title: "Contact" }
];

/* =======================
   HERO
======================= */
export const HERO_CONTENT = {
  name: "Suraj Pawar",
  status: "Available for opportunities",
  role: "Front-end focused full stack developer",
  summary:
    "I build fast, accessible React and Next.js interfaces, from healthcare apps at Care IO to sites with motion and 3D, using AI tools like Claude Code and Copilot.",
  primaryCta: { label: "See my projects", href: "#projects" },
  secondaryCta: { label: "Download résumé", href: RESUME_LINK },
  // The strip along the bottom of the first screen.
  facts: [
    { label: "Role", value: "Frontend developer, Care IO" },
    { label: "Experience", value: "Since August 2022" },
    { label: "Based in", value: "Nashik, Maharashtra" },
    { label: "Open to", value: "Full-time roles and freelance work" }
  ],
  // The layers of the 3D scene in the hero, top layer first.
  layers: [
    { name: "Interface", tools: "React, Next.js, Tailwind CSS" },
    { name: "Motion and 3D", tools: "Framer Motion, GSAP, three.js" },
    { name: "Server", tools: "Node.js, Express, REST APIs" },
    { name: "Data", tools: "PostgreSQL, MongoDB, Prisma" }
  ]
};

/* =======================
   ABOUT
======================= */
export const ABOUT_CONTENT = {
  title: "About me",
  lead: "I came to software from quality control in manufacturing.",
  image: "/images/surapawar.webp",
  name: "Suraj Pawar",
  role: "Full Stack Web Developer (MERN)",
  story:
    "I spent nearly five years in quality assurance and quality control in automobile manufacturing at Mungi Engineers in Nashik. In 2022 I trained in full stack web development at Masai School, and since August 2022 I have built front ends for healthcare applications at Care IO.",
  description:
    "Passionate Full Stack Web Developer with strong experience in MERN stack and modern frontend architectures. Skilled in building scalable, secure, and performance-driven web applications with real-world business logic.",
  resumeButton: "Download CV",
  resumeLink: RESUME_LINK
};

/* =======================
   PROJECTS
   Every project is shown the same way: live home-page screenshots (desktop views plus a phone),
   what it is, key features, what I built, the stack and its links. Screenshots are saved as
   <src>-720.webp and <src>-1440.webp, phone shots as <name>-480.webp.

   The first two (the "care" and "build" codebases) are the newest. Their details come from
   their codebases, READMEs and live sites; their screenshots are in public/images/case-studies.
   The earlier projects' details come from their READMEs, the résumé and their live sites;
   their screenshots are in public/images/projects. The list is in page order, and a project
   with nothing to say under "What I built" leaves that tab out.
======================= */
const NEW_PROJECTS = [
  {
    id: "care",
    category: ["Frontend"],
    name: "Chirag & Co.",
    kind: "Concept storefront for an Indian sweets shop",
    summary:
      "An online mithai shop that sells through motion. Sweets land on a brass thali as you scroll, a gift box unties itself, and the whole order flow works, from the shop shelf to order history.",
    year: "2026",
    liveLink: "https://sweety-sepia.vercel.app/",
    sourceLink: null,
    sourceNote: "Source code is private",
    facts: [
      { label: "Type", value: "Concept storefront with a fictional brand" },
      { label: "Pages", value: "10 routes, from home to order history" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "A scroll-driven home page: a WebGL drip hero, sweets that land one by one on a brass thali, a draggable 3D image ring and a CSS 3D gift box that unties and opens.",
      "A shop with category filters, search and price sorting, animated with GSAP Flip, and product pages with pack and quantity choices.",
      "Gifting with a four-slot hamper preview and a validated concierge enquiry form.",
      "Cart and checkout with a delivery date and slot, a gift message, an ₹80 delivery fee that is free over ₹1,500, and pay on delivery or a UPI request.",
      "Order confirmation and order history kept in the browser, with no payment gateway connected yet."
    ],
    contributions: [
      "Built the storefront in Next.js 16 and React 19 with TypeScript.",
      "Wrote the scroll choreography with GSAP ScrollTrigger, including the WebGL shader behind the hero.",
      "Built the cart, checkout and order flow on browser storage, ready to connect to an order API.",
      "Kept native scrolling, paused decorative loops off screen, gave every effect a still version for reduced motion, and covered the main journeys with Playwright browser tests."
    ],
    stack: ["Next.js", "React", "TypeScript", "GSAP", "WebGL", "CSS 3D", "Playwright", "Vercel"],
    screenshots: [
      {
        src: "/images/case-studies/care-hero",
        caption: "Hero: the sweets land on the thali as you scroll",
        alt: "Chirag & Co. home page with the headline 'Some things are better with mithai' beside a brass thali laid with laddoos, barfi, kaju katli and peda"
      },
      {
        src: "/images/case-studies/care-thali",
        caption: "Thali story: each collection is laid out piece by piece",
        alt: "A brass thali holding a rose cake and a chocolate cake beside the heading 'Make a wish. Then make room.'"
      },
      {
        src: "/images/case-studies/care-cards",
        caption: "Card deck: each product card slides over the last",
        alt: "A product card for silver-leaf kaju katli with an Add to bag button"
      },
      {
        src: "/images/case-studies/care-ring",
        caption: "3D ring: drag to turn the collection",
        alt: "Product photographs arranged on a curved 3D ring under the heading 'Our sweet collections'"
      },
      {
        src: "/images/case-studies/care-giftbox",
        caption: "Gift box: it unties and opens as you scroll",
        alt: "An open gift box of sweets in paper cups beside the heading 'Good things. Great boxes.'"
      }
    ],
    phone: {
      src: "/images/case-studies/care-phone-480.webp",
      alt: "Chirag & Co. home page on a phone"
    }
  },
  {
    id: "build",
    category: ["Frontend"],
    name: "Raghav Buildcon",
    kind: "Website for a civil-construction company in Nashik",
    summary:
      "A website for a new road, bridge and building contractor that explains the work with 3D models. Each model assembles itself stage by stage, from the first survey peg to handover.",
    year: "2026",
    liveLink: "https://raghavbuildcon.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Raghavbuildcon",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Company website" },
      { label: "Rendering", value: "Every page statically pre-rendered" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "3D models of a bridge, a road, a building, a pipeline and a township that assemble stage by stage, each part glowing gold as it moves into place.",
      "Builds play when their section appears, pause off screen and start again after a short hold, with a Replay button.",
      "A four-vertical showcase in one 3D landscape: the camera flies from the road to the bridge, the building and the pipeline.",
      "Contact and careers forms that validate, then open a ready-to-send WhatsApp message to the company.",
      "Search-ready metadata, sitemap, robots file, web manifest, Open Graph image and structured data."
    ],
    contributions: [
      "Built the site in Next.js 16 with the App Router, TypeScript and Tailwind CSS 4.",
      "Modelled every structure as plain data and rendered it with three.js. A view redraws only when something changes and loads only near the screen, so no more than three WebGL views run at once.",
      "Kept the content honest: facts the company has not confirmed show as 'To be updated', and sample projects carry a badge.",
      "Made every page work from phones to wide screens, with still versions for reduced motion and for devices without WebGL."
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "three.js", "GSAP", "Vercel"],
    screenshots: [
      {
        src: "/images/case-studies/build-hero",
        caption: "Hero: a township builds itself behind the headline",
        alt: "Raghav Buildcon home page with the headline 'Building Infrastructure. Delivering Trust.' beside a 3D model of a tower, two houses and a street"
      },
      {
        src: "/images/case-studies/build-story",
        caption: "Bridge story: seven stages, from survey to opening for traffic",
        alt: "A finished 3D bridge with street lights and a car, beside the list of seven build stages"
      },
      {
        src: "/images/case-studies/build-verticals",
        caption: "Four verticals in one 3D landscape",
        alt: "Bridge piers rising in a 3D landscape beside the Bridges and Structures panel"
      },
      {
        src: "/images/case-studies/build-frames",
        caption: "Framed models: a house, a tower and a culvert",
        alt: "Three framed 3D models: a two-storey house, a multi-storey building with a crane, and a box culvert"
      }
    ],
    phone: {
      src: "/images/case-studies/build-phone-480.webp",
      alt: "Raghav Buildcon home page on a phone"
    }
  }
];

// Screenshots of an earlier project's live home page, top first.
const projectShots = (id, views) =>
  views.map(([caption, alt], index) => ({ src: `/images/projects/${id}-${index + 1}`, caption, alt }));
const projectPhone = (id, name) => ({ src: `/images/projects/${id}-phone-480.webp`, alt: `${name} home page on a phone` });

const EARLIER_PROJECTS = [
  {
    id: "nexaro",
    category: ["Full Stack"],
    name: "Nexaro",
    kind: "Full stack e-commerce platform",
    summary:
      "Supports the complete shopping journey with secure authentication, product management, order lifecycle workflows, and cloud deployment.",
    year: "2025",
    liveLink: "https://suraj-ecommerce-gamma.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/NexaroEcommerce",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Full stack e-commerce platform" },
      { label: "Hosting", value: "Vercel and AWS" }
    ],
    features: [
      "A product catalogue with categories, search and filters, plus wishlist, cart and checkout flows.",
      "User authentication with role-based access, and order history pages.",
      "Real-time product management and admin dashboards.",
      "A hybrid of server-side and client-side rendering on the Next.js App Router, with Prisma for data."
    ],
    contributions: [
      "Built the full stack architecture with Next.js (App Router) and server-side rendering.",
      "Built the responsive interface with React, Vite, Tailwind CSS and shadcn/ui.",
      "Containerised the backend with Docker and deployed it to AWS ECS Fargate behind a load balancer, with images in ECR and static assets on S3.",
      "Set up CI/CD pipelines with GitHub Actions that build, test and deploy."
    ],
    stack: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Vite", "Prisma", "Tailwind CSS", "PostgreSQL", "Docker", "AWS"],
    screenshots: projectShots("nexaro", [
      ["Home: search, categories and featured deals", "Nexaro home page with a product search bar, category menu and the heading 'Discover premium products with faster checkout and smarter search'"],
      ["Offers: a daily spin and promo codes", "A daily offer spin wheel beside a promo code panel"],
      ["Trending products with prices and ratings", "A row of product cards with prices, ratings and Add to cart buttons"],
      ["A carousel of deals", "A carousel of discounted products under the heading 'Mega Deal Carousel'"]
    ]),
    phone: projectPhone("nexaro", "Nexaro")
  },
  // Fourth on the page, after the first three. Its source is not public, so everything here comes
  // from the live site: its pages, its forms and the headers it sends (PHP, Laravel, Vite build).
  {
    id: "biogenix",
    category: ["Full Stack"],
    name: "Biogenix",
    kind: "Diagnostics product catalogue and ordering portal",
    summary:
      "The website and ordering portal of an Indian diagnostics company. Labs, hospitals and distributors browse its test kits, reagents and analyzers, build quotations and order through B2B and B2C accounts.",
    year: null,
    liveLink: "https://biogenix.in/",
    sourceLink: null,
    sourceNote: "Source code is not public",
    facts: [
      { label: "Type", value: "B2B and B2C ordering portal" },
      { label: "Hosting", value: "Hostinger" }
    ],
    features: [
      "A product catalogue searchable by SKU, name, application or brand, with category and sub-category filters that show counts, sorting, pack sizes and a cart.",
      "A quotation builder: choose products and quantities, see each one's MRP and quantity rules, and download a branded quotation PDF.",
      "Separate B2B and B2C sign-in, a two-step B2B sign-up that verifies the email with an OTP, and proforma invoice requests and meeting bookings for signed-in users.",
      "A home page with a hero slider, company figures, institutional partner logos and a carousel of product categories."
    ],
    contributions: [],
    stack: ["PHP", "Laravel", "JavaScript", "Tailwind CSS", "Vite"],
    screenshots: projectShots("biogenix", [
      ["Home: a hero slider for the product range", "Biogenix home page with the headline 'Precision Diagnostics. Built on Experience.' over a photo of a gloved hand and test cassettes, and an Explore Our Products button"],
      ["Company figures and institutional partners", "Six company figures, such as 10,000+ laboratories and hospitals served, above the Institutional Network section and a strip of partner logos"],
      ["Core product categories in a carousel", "Product category cards for chemistry reagents, ELISA test kits and rapid diagnostic test kits, each with an Explore button"],
      ["Ordering steps for B2B and B2C buyers", "Two panels under 'Become a Channel Partner' showing the B2B and B2C ordering steps, with login and sign-up buttons"],
      ["The nationwide distribution network", "The 'Nationwide Presence. Trusted Distribution Network.' section beside a map of India with partner locations"]
    ]),
    phone: projectPhone("biogenix", "Biogenix")
  },
  {
    id: "urban",
    category: ["Full Stack"],
    name: "UrbanServices",
    kind: "Service booking platform",
    summary:
      "Makes it easy for customers to discover and book trusted home services from verified providers.",
    year: "2025",
    liveLink: "https://secure-file-hub-7lbt.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/UrbanServices",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Home services booking" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "Services to browse by category, with search and filters.",
      "Real-time booking and scheduling through API-driven workflows.",
      "Sign up and log in with Supabase Auth and secure session handling.",
      "Service, booking and user data stored in PostgreSQL."
    ],
    contributions: [
      "Built the responsive interface with React and Tailwind CSS from reusable components.",
      "Integrated Supabase Auth and the PostgreSQL database.",
      "Tested, debugged and optimised the app for performance and user experience."
    ],
    stack: ["Next.js", "JavaScript", "React", "Tailwind CSS", "PostgreSQL", "Supabase"],
    screenshots: projectShots("urban", [
      ["Home: book trusted home services", "UrbanServices home page with the heading 'Book trusted home services with a premium, effortless experience' and booking statistics"],
      ["Service categories for the home", "Feature highlights above the service categories under 'Find the right service for your home'"],
      ["Service cards and customer reviews", "Service cards with booking buttons above customer testimonials"]
    ]),
    phone: projectPhone("urban", "UrbanServices")
  },
  {
    id: "appointment",
    category: ["Full Stack", "MERN"],
    name: "Appointment Booking Platform",
    kind: "Doctor appointment booking on the MERN stack",
    summary:
      "Prevents scheduling conflicts through role-based access, slot availability, and secure booking management for customers and service providers.",
    year: "2026",
    liveLink: "https://mern-appointment-booking-app.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/MERN-Appointment-Booking-app",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Healthcare appointment booking" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "Real-time booking: slot availability checks prevent double bookings.",
      "Doctors to browse by specialty or search by name.",
      "A patient dashboard with appointment history and upcoming visits.",
      "Doctors set their availability and slot length and see patient details before a visit.",
      "Administrators manage users and appointments across the platform."
    ],
    contributions: [
      "Built the React 19 front end with Tailwind CSS, keeping the signed-in session in Zustand.",
      "Built the Node.js and Express API on MongoDB, with JWT authentication.",
      "Seeded doctor, patient and admin accounts so every role can be tried."
    ],
    stack: ["JavaScript", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    screenshots: projectShots("appointment", [
      ["Home: find a doctor and book", "MediBook home page with the heading 'Book the right doctor in minutes' and a doctor search form"],
      ["Why patients choose it, and medical departments", "Reasons patients choose the service above a row of medical departments"],
      ["Featured doctors", "Featured doctor cards with photos, specialties and ratings"],
      ["How it works, in three steps", "The three steps to book: create an account, choose a doctor, book a slot"]
    ]),
    phone: projectPhone("appointment", "Appointment Booking Platform")
  },
  {
    id: "sharebox",
    category: ["Full Stack", "MERN"],
    name: "ShareBox",
    kind: "Secure file management system",
    summary:
      "Enables controlled file sharing through secure uploads, permission-aware access, and scalable AWS S3 storage.",
    year: null,
    liveLink: "https://share-box-orcin.vercel.app/",
    sourceLink: null,
    sourceNote: "Source code is not public",
    facts: [
      { label: "Type", value: "File sharing for teams" },
      { label: "Hosting", value: "Vercel, with files on AWS S3" }
    ],
    features: [
      "Secure file uploads stored on AWS S3.",
      "Sharing with permission-aware access.",
      "A command centre dashboard and an audit trail of activity, as shown on the home page.",
      "Plans for individuals and teams in the pricing section."
    ],
    contributions: [
      "Built the React and Tailwind CSS front end and the Node.js, Express and MongoDB back end, with file storage on AWS S3."
    ],
    stack: ["JavaScript", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "AWS"],
    screenshots: projectShots("sharebox", [
      ["Home: enterprise file sharing", "ShareBox home page with the heading 'Enterprise file sharing that feels premium by default' beside a dashboard preview"],
      ["From upload to audit trail in three steps", "Feature highlights and the three steps from upload to audit trail"],
      ["The command centre dashboard", "A preview of the ShareBox command centre dashboard"],
      ["Plans for every team stage", "Pricing plans for free, pro and team accounts"]
    ]),
    phone: projectPhone("sharebox", "ShareBox")
  },
  {
    id: "revenue",
    category: ["Full Stack"],
    name: "Revenue OS Next",
    kind: "SaaS dashboard",
    summary:
      "Turns revenue and customer data into a fast, searchable SaaS workspace with an enterprise-focused interface.",
    year: null,
    liveLink: "https://nexus-crm-six.vercel.app/",
    // The repository this used to link to (Suraj231194/Nexus-CRM) is no longer public.
    sourceLink: null,
    sourceNote: "Source code is not public",
    facts: [
      { label: "Type", value: "Revenue and CRM workspace" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "A searchable workspace for revenue and customer data.",
      "A unified pipeline, analytics and revenue forecast charts, as presented on the home page.",
      "A marketing site with a feature overview and pricing plans."
    ],
    contributions: [
      "Built the app with Next.js, React and Tailwind CSS on Supabase, deployed on Vercel."
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
    screenshots: projectShots("revenue", [
      ["Home: an all-in-one CRM platform", "RevenueOS home page with the heading 'Supercharge your revenue engine'"],
      ["Everything a sales team needs", "Feature cards for the unified pipeline, advanced analytics and AI automation"],
      ["Data-driven decisions with a revenue forecast", "A revenue forecast bar chart beside the heading 'Data-driven decisions, simplified'"],
      ["Simple, transparent pricing", "Three pricing plans: Starter, Growth and Enterprise"]
    ]),
    phone: projectPhone("revenue", "Revenue OS Next")
  },
  {
    id: "mernvault",
    category: ["Full Stack", "MERN"],
    name: "MERN Secure Vault",
    kind: "Cloud password manager",
    summary:
      "Keeps credentials available across devices with authenticated access, encryption, and secure cloud persistence.",
    year: "2026",
    liveLink: "https://mern-secure-vault-password.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/mern-secure-vault-password",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Zero-knowledge password manager" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "Secrets are encrypted with AES-256-GCM before they leave the device; the server stores only ciphertext.",
      "Keys are derived from the master password with PBKDF2 and unique salts.",
      "A vault for passwords, secure notes and secrets, with categories, favourites, search, filters and pagination.",
      "Decrypted views hide their contents again after 30 seconds."
    ],
    contributions: [
      "Built the React (Vite) front end with Tailwind CSS, Framer Motion and React Hook Form.",
      "Built the Node.js and Express API on MongoDB, hardened with Helmet, CORS and rate limiting."
    ],
    stack: ["JavaScript", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    screenshots: projectShots("mernvault", [
      ["Home: zero-knowledge storage for secrets", "SecureVault home page with the heading 'Fort Knox for your digital secrets'"],
      ["Security features and how it works", "Cards for client-side privacy, AES-256-GCM, zero persistence, audit logging, secure headers and the developer API"],
      ["Who it is for", "The 'Who needs SecureVault?' section and a call to create a free vault"]
    ]),
    phone: projectPhone("mernvault", "MERN Secure Vault")
  },
  {
    id: "mixo",
    category: ["Frontend"],
    name: "Real-Time Campaign Performance Dashboard",
    kind: "Marketing analytics dashboard",
    summary:
      "Turns campaign data into actionable insights through responsive charts, filters, and real-time performance views.",
    year: "2025",
    liveLink: "https://mixo-analytics.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Mixo-Analytics",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Campaign analytics dashboard" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "An overview of total and active campaigns, total budget and average daily spend.",
      "A platform distribution chart and a list of recent campaigns.",
      "Responsive charts, filters and real-time performance views."
    ],
    contributions: [
      "Built the dashboard interface with React and Tailwind CSS."
    ],
    stack: ["React", "Next.js", "Vite", "Tailwind CSS"],
    screenshots: projectShots("mixo", [
      ["Dashboard overview", "The Mixo dashboard overview with campaign totals, a platform distribution chart and recent campaigns"]
    ]),
    phone: projectPhone("mixo", "Campaign Performance Dashboard")
  },
  {
    id: "vault",
    category: ["Frontend"],
    name: "Secure Vault",
    kind: "Browser-only password manager",
    summary:
      "Keeps secrets entirely on the user's device through browser-only Web Crypto encryption, protected local storage, and in-memory decryption.",
    year: "2025",
    liveLink: "https://secure-vault-application.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Secure-Vault-Application",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Offline-first password manager" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "Secrets are encrypted and decrypted entirely in the browser with the Web Crypto API; there is no backend.",
      "AES-256-GCM encryption with keys derived from the master password by PBKDF2 (100,000 iterations and a unique salt).",
      "Only ciphertext is saved to local storage; decrypted secrets stay in memory and are cleared on lock or refresh.",
      "A secure password generator and strength analyser."
    ],
    contributions: [
      "Built the app in React and TypeScript with Tailwind CSS, using only the browser's native cryptography."
    ],
    stack: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Web Crypto API"],
    screenshots: projectShots("vault", [
      ["Setting up a vault with a master password", "The Secure Vault setup screen asking for a master password"]
    ]),
    phone: projectPhone("vault", "Secure Vault")
  },
  {
    id: "aadrila",
    category: ["Frontend"],
    name: "Aadrila Technologies",
    kind: "Corporate website for an AI company",
    summary:
      "Presents an AI company with a responsive, high-performance corporate experience, purposeful motion, and interactive three-dimensional details.",
    year: "2025",
    liveLink: "https://framer-motion-xi-jade.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/Framer-Motion-",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Corporate website" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "A 3D hero carousel with spring physics.",
      "Product cards that tilt in 3D towards the mouse.",
      "An auto-rotating team carousel with staggered animations.",
      "Responsive from phones to desktops, with all content kept in one data file."
    ],
    contributions: [
      "Built the site with React, Vite, Tailwind CSS and Framer Motion."
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    screenshots: projectShots("aadrila", [
      ["Home: AI-powered document automation", "Aadrila home page with the heading 'AI-Powered Document Automation & Fraud Detection' beside document previews"],
      ["Products: document similarity engine", "The products section with the AI-powered document similarity engine"],
      ["Extract, validate and process documents", "A product section about extracting, validating and processing documents"],
      ["About: vision and mission", "The about section with the company's vision and mission"]
    ]),
    phone: projectPhone("aadrila", "Aadrila Technologies")
  },
  {
    id: "aimodel",
    category: ["Frontend"],
    name: "AI Model Prototype",
    kind: "AI chat interface",
    summary:
      "Demonstrates a clear, responsive AI conversation workflow with TypeScript and modern interface patterns.",
    year: "2025",
    liveLink: "https://ai-model-prototype-jihu.vercel.app/",
    sourceLink: "https://github.com/Suraj231194/AI-Model-Prototype",
    sourceNote: null,
    facts: [
      { label: "Type", value: "Front-end prototype" },
      { label: "Hosting", value: "Vercel" }
    ],
    features: [
      "A model selector to switch between AI models.",
      "A prompt editor with templates, and sliders for temperature, max tokens and top-p.",
      "Chat with Markdown, code highlighting and a copy button.",
      "Simulated streaming responses and a light and dark theme."
    ],
    contributions: [
      "Built the front end with React 19, TypeScript and Tailwind CSS, with a mock API behind the chat."
    ],
    stack: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
    screenshots: projectShots("aimodel", [
      ["The chat workspace", "The AI chat interface with a conversation sidebar, model controls and the assistant's greeting"]
    ]),
    phone: projectPhone("aimodel", "AI Model Prototype")
  }
];

export const PROJECTS = [...NEW_PROJECTS, ...EARLIER_PROJECTS];

/* =======================
   TOOLS / TECH STACK
   Grouped like a parts list. Motion and 3D tools are the ones used in this portfolio and in
   the Care and Build case studies. The AI tools are the ones Suraj builds with, as Suraj listed
   them; that group runs the full width under the others. Cursor has no brand mark in react-icons, so it
   takes a plain pointer.
======================= */
export const SKILL_GROUPS = [
  { id: "interface", title: "Interface", description: "Markup, components and styling" },
  { id: "motion", title: "Motion and 3D", description: "Animation, scroll effects and WebGL" },
  { id: "server", title: "Server and data", description: "APIs, databases and authentication" },
  { id: "delivery", title: "Delivery", description: "Tooling, containers, cloud and hosting" },
  { id: "ai", title: "AI-assisted development", description: "The coding agents and assistants I build with", wide: true }
];

export const TOOLS = [
  { name: "HTML", icon: FaHtml5, color: "text-orange-500", group: "interface" },
  { name: "CSS", icon: FaCss3Alt, color: "text-blue-500", group: "interface" },
  { name: "JavaScript", icon: FaJs, color: "text-yellow-500", group: "interface" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600", group: "interface" },
  { name: "React", icon: FaReact, color: "text-cyan-500", group: "interface" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-ink", group: "interface" },
  { name: "Redux", icon: SiRedux, color: "text-purple-500", group: "interface" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500", group: "interface" },
  { name: "Bootstrap", icon: FaBootstrap, color: "text-purple-600", group: "interface" },
  { name: "Chakra UI", icon: SiChakraui, color: "text-teal-500", group: "interface" },
  { name: "Framer Motion", icon: SiFramer, color: "text-pink-500", group: "motion" },
  { name: "GSAP", icon: SiGreensock, color: "text-lime-600", group: "motion" },
  { name: "Three.js", icon: SiThreedotjs, color: "text-ink", group: "motion" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-600", group: "server" },
  { name: "Express", icon: SiExpress, color: "text-ink", group: "server" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600", group: "server" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600", group: "server" },
  { name: "Prisma", icon: SiPrisma, color: "text-indigo-500", group: "server" },
  { name: "Supabase", icon: SiSupabase, color: "text-emerald-500", group: "server" },
  { name: "Git", icon: FaGitAlt, color: "text-red-500", group: "delivery" },
  { name: "Vite", icon: SiVite, color: "text-purple-500", group: "delivery" },
  { name: "Docker", icon: FaDocker, color: "text-blue-500", group: "delivery" },
  { name: "AWS", icon: FaAws, color: "text-orange-500", group: "delivery" },
  { name: "Vercel", icon: SiVercel, color: "text-ink", group: "delivery" },
  { name: "Claude Code", icon: SiClaude, color: "text-[#D97757]", group: "ai" },
  { name: "GitHub Copilot", icon: SiGithubcopilot, color: "text-ink", group: "ai" },
  { name: "ChatGPT", icon: SiOpenai, color: "text-ink", group: "ai" },
  { name: "Cursor", icon: MousePointer2, color: "text-ink", group: "ai" }
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
   AT A GLANCE
   The numbers under About. Years count from August 2022 (the first role at Care IO) to today;
   the component and product counts are from the Care IO role above; the project count is the
   list on this page.
======================= */
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export const HIGHLIGHTS = [
  { value: Math.floor((Date.now() - new Date(2022, 7, 1)) / YEAR_MS), suffix: "+", label: "years building for the web" },
  { value: PROJECTS.length, suffix: "", label: "live projects on this page" },
  { value: 30, suffix: "+", label: "reusable React components and hooks" },
  { value: 10, suffix: "+", label: "healthcare products at Care IO" }
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
      "/images/masai.jpg"
  },
  {
    title: "LOGMIEER",
    subtitle: "Bachelor of Engineering",
    date: "Jun 2017 - Aug 2021",
    image: "/images/logmieer-badge.svg"
  },
  {
    title: "K.S.K.W College, Nashik",
    subtitle: "Higher Secondary Education",
    date: "Jun 2010 - Nov 2012",
    image:
      "/images/kskw-badge.svg"
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
