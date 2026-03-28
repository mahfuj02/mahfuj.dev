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
};

export const projects: Project[] = [
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
  {
    id: "khora",
    slug: "khora-urban-thinkers",
    title: "Khora - Urban Thinkers",
    category: "Web Development",
    bannerImage: "/projects/khora-banner.svg",
    bannerAlt: "Khora Urban Thinkers website banner",
    year: "2023",
    role: "Frontend Developer",
    summary:
      "A responsive website experience for urban planning consultation, built with modular sections and CMS-friendly content blocks.",
    details: [
      "Developed responsive frontend pages for urban planning and consultation workflows.",
      "Built component-driven layouts to keep branding and UX consistent site-wide.",
      "Implemented content modules and CMS-friendly sections for rapid updates.",
      "Enhanced accessibility and mobile usability across key conversion pages.",
      "Delivered performance improvements through asset optimization and code cleanup.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "CMS Integration", "Accessibility"],
    challenge:
      "The team needed an editorial-friendly site that could evolve quickly while staying visually consistent.",
    solution:
      "Created reusable content blocks and a responsive design system with strong accessibility and performance standards.",
    impact:
      "Reduced publishing friction, improved mobile engagement, and kept brand expression consistent across pages.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
