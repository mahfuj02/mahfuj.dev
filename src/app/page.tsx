import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { MobilePreviewSection } from "@/components/mobile-preview-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-24">
      <HeroSection />
      <ExpertiseSection />
      <MobilePreviewSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
