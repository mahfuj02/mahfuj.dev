import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full px-6 pb-16 pt-28 lg:pt-32">
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 lg:p-12">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch">
          <div className="lg:pr-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-200"
            >
              <span>←</span>
              <span>Back to work</span>
            </Link>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">Case Study</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-zinc-100 md:text-6xl">{project.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-300">{project.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200">
                {project.category}
              </span>
              <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200">
                {project.role}
              </span>
              <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200">
                {project.year}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950/70">
            <div className="relative h-56 w-full sm:h-72 lg:h-full lg:min-h-[420px]">
              <Image
                src={project.bannerImage}
                alt={project.bannerAlt}
                fill
                className="object-contain"
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7">
          <h2 className="text-2xl font-bold text-zinc-100">Project Highlights</h2>
          <ul className="mt-5 space-y-4 text-zinc-300">
            {project.details.map((detail) => (
              <li key={detail} className="flex gap-3 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="space-y-6">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200">
                  {tech}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">Challenge</h3>
            <p className="mt-3 leading-relaxed text-zinc-300">{project.challenge}</p>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">Solution</h3>
            <p className="mt-3 leading-relaxed text-zinc-300">{project.solution}</p>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-400">Impact</h3>
            <p className="mt-3 leading-relaxed text-zinc-300">{project.impact}</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
