import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <HeroSection />
      <ProjectsSection />

      <section id="experience" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
      </section>

      <section id="skills" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
      </section>

      <section id="contact" className="py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
      </section>
    </main>
  );
}
