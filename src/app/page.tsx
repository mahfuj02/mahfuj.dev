import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-0 lg:pt-6">
      <HeroSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
