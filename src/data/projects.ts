import projectsData from "../../data/projects.json";

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
  highlight?: string;
};

export const projects: Project[] = projectsData as Project[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
