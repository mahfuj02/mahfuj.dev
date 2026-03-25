export function ProjectsSection() {
  return (
    <section id="work" className="relative border-b border-zinc-900 py-16 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-32 after:bg-gradient-to-b after:from-transparent after:to-[#09090b] after:pointer-events-none">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Featured Project</h2>
        <p className="text-sm text-zinc-400">
          Selected product work and enterprise delivery highlights.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
        <h3 className="text-xl font-semibold tracking-tight">Tryotel App</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Cross-platform travel technology solution focused on modern UX,
          scalability, and business impact.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Flutter",
            "Dart",
            "Node.js",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-800 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Role</p>
            <p className="mt-2 text-sm text-zinc-200">Senior Lead Software Engineer</p>
          </article>
          <article className="rounded-xl border border-zinc-800 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Company</p>
            <p className="mt-2 text-sm text-zinc-200">Saimon Global Ltd</p>
          </article>
          <article className="rounded-xl border border-zinc-800 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Timeline</p>
            <p className="mt-2 text-sm text-zinc-200">2019 — 2024</p>
          </article>
        </div>

        <a
          href="#"
          className="mt-6 inline-flex rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-opacity hover:opacity-90"
        >
          View Project
        </a>
      </div>
    </section>
  );
}