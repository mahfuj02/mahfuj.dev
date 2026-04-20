export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  bannerImage: string;
  bannerAlt: string;
  year: string;
  role: string;
  summary: string;
  details: string[];
  stack: string[];
  challenge: string;
  solution: string;
  impact: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "role-ready",
    slug: "role-ready",
    title: "RoleReady",
    category: "AI Web Application",
    bannerImage: "/projects/roleready_portfolio.jpg",
    bannerAlt: "RoleReady AI interview coaching web app banner",
    year: "2026",
    role: "Full Stack Developer",
    summary:
      "RoleReady is a live AI interview coaching web app where users upload resume and job description, practice tailored questions by text or voice, and receive structured scoring feedback.",
    details: [
      "Built and deployed a live Next.js web app with Supabase authentication and Groq AI services for interview preparation workflows.",
      "Implemented resume and job description intake flow (upload, paste, or URL) followed by AI-driven gap analysis and personalized prep recommendations.",
      "Generated an interview question bank with 18 tailored questions (behavioral, technical, and situational) aligned to each user's target role.",
      "Designed practice sessions with typed or spoken answers, integrating Groq Whisper for speech-to-text and Llama 3.3 70B for analysis and feedback.",
      "Delivered structured feedback scoring with overall score plus category-level evaluation across Relevance, STAR structure, Depth, and Communication.",
      "Shipped full session completion reporting with score summary, STAR breakdown, improvement insights, skipped question tracking, and actionable next steps.",
      "Created a polished product UI using a navy, teal, amber, green, and red state system with Syne and DM Sans to support clear learning progress.",
      "Live site: role-ready-snowy.vercel.app",
    ],
    stack: ["Next.js", "TypeScript", "Supabase Auth", "Groq API", "Llama 3.3 70B", "Whisper", "Vercel"],
    liveUrl: "https://role-ready-snowy.vercel.app",
    challenge:
      "Job seekers need realistic interview preparation that adapts to resume gaps and job requirements while giving actionable feedback beyond generic question lists.",
    solution:
      "Built an end-to-end AI interview coach that analyzes resume-to-role gaps, generates tailored questions, supports voice and text answers, and provides structured scoring with clear improvement guidance.",
    impact:
      "Created a practical, live MVP that helps developers, PMs, and engineers practice role-specific interviews with measurable feedback and repeatable preparation loops.",
  },
  {
    id: "connexions-spectrum",
    slug: "connexions-spectrum",
    title: "Connexions Spectrum",
    category: "Mobile App Development",
    bannerImage: "/projects/connexions.jpg",
    bannerAlt: "Connexions Spectrum mobile app banner",
    year: "2025",
    role: "Mobile App Developer",
    summary:
      "Connexions Spectrum is an Android and iOS communication support app for autistic users, combining anonymous peer matching, guided conversation practice, and emergency guardian assistance.",
    details: [
      "Built a cross-platform Android and iOS app with React Native, with shared logic and responsive mobile-first flows.",
      "Implemented point-based matching so users can connect with suitable peers and communicate in an anonymous and safer space.",
      "Integrated an OpenAI-powered chat assistant to help users practice conversation and gradually improve communication confidence.",
      "Added a panic button workflow that can alert guardians quickly when users feel unsafe or need immediate support.",
      "Designed and delivered production-ready UI/UX from Figma concepts with Supabase-backed data and real-time app interactions.",
    ],
    stack: ["React Native", "TanStack Query", "OpenAI API", "Supabase", "Figma"],
    challenge:
      "Users needed a communication-focused app that feels safe, inclusive, and supportive, while balancing privacy, emotional safety, and real-time assistance.",
    solution:
      "Developed an AI-assisted communication experience with anonymous matching, conversational guidance, and a guardian escalation path through a panic button system.",
    impact:
      "Created a practical support platform that helps autistic users build communication habits and access timely help when needed.",
  },
  {
    id: "game-hub",
    slug: "game-hub",
    title: "Game Hub",
    category: "Frontend Web Development",
    bannerImage: "/projects/game-hub.jpg",
    bannerAlt: "Game Hub project banner",
    year: "2023",
    role: "Frontend Developer",
    summary:
      "A game discovery web app built as an early React project, where users can browse, filter, sort, and explore detailed game information.",
    details: [
      "Built one of my first full React projects after learning React fundamentals and component architecture.",
      "Integrated external game data APIs to display game cards, ratings, genres, platforms, and detail pages.",
      "Implemented filtering and sorting flows to improve game search and browsing experience.",
      "Designed responsive layouts with reusable UI components for desktop and mobile screens.",
      "Focused on clean state management, API error handling, and smoother user interactions.",
    ],
    stack: ["React", "TypeScript", "API Integration", "Responsive UI", "Figma"],
    challenge:
      "As a first major React project, the challenge was combining API-driven data, interactive filters, and clean component structure in a production-like UI.",
    solution:
      "Created a modular React interface with reusable components, organized state, and clear browsing workflows for discovering games quickly.",
    impact:
      "Strengthened my frontend engineering foundation and demonstrated practical skills in building API-powered React applications end-to-end.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
