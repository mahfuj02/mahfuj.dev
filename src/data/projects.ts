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
    id: "ai-lab-granada",
    slug: "ai-lab-granada",
    title: "AI Lab Granada",
    category: "Data Visualization",
    bannerImage: "/projects/ai-lab-granada-banner.svg",
    bannerAlt: "AI Lab Granada analytics banner",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "An analytics interface for model experiments and KPI storytelling with interactive filters and progressive rendering.",
    details: [
      "Designed interactive dashboards for model insights and experiment comparisons.",
      "Created chart components for trend analysis and KPI storytelling.",
      "Improved data loading flow with progressive rendering for large datasets.",
      "Implemented filter states for slicing metrics by model, date, and segment.",
      "Collaborated with stakeholders to convert raw metrics into actionable visuals.",
    ],
    stack: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS", "Data APIs"],
    challenge:
      "Teams had large, noisy experiment datasets but no simple way to compare model performance over time.",
    solution:
      "Built focused dashboards with clear KPI hierarchies, fast filter interactions, and reusable chart primitives.",
    impact:
      "Enabled faster decision-making in model reviews and improved communication between technical and non-technical stakeholders.",
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
