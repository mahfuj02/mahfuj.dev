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
    id: "flight-local",
    slug: "flight-local",
    title: "Flight Local (B2B Travel Solution)",
    category: "Web Development",
    bannerImage: "/projects/flight-local-banner.svg",
    bannerAlt: "Flight Local project dashboard banner",
    year: "2025",
    role: "Frontend Developer",
    summary:
      "A B2B travel platform for agencies to search itineraries, configure partner pricing, and complete bookings through a role-based dashboard.",
    details: [
      "Built a complete B2B travel workflow for agencies with role-based dashboards.",
      "Integrated booking pipelines and custom pricing rules for partner accounts.",
      "Optimized API interactions for faster itinerary search and response times.",
      "Implemented reusable UI modules for reporting, reservations, and support actions.",
      "Added QA checks and release notes to reduce regressions in deployment cycles.",
    ],
    stack: ["Next.js", "React", "TypeScript", "REST API", "Tailwind CSS"],
    challenge:
      "Agency users needed flexible pricing and quick itinerary search without a complex learning curve.",
    solution:
      "Designed a modular dashboard with guided booking steps, partner pricing controls, and shared UI components across operations.",
    impact:
      "Improved operator speed, reduced repetitive support interactions, and made release cycles more reliable.",
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
