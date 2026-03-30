import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-16 sm:px-6 md:pt-0 lg:pt-6">
        <HeroSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <ScrollTopButton />
    </>
  );
}
