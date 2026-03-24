export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <section id="home" className="flex min-h-[60vh] items-center border-b border-zinc-200 py-16 dark:border-zinc-800">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
            Software Engineer
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Mahfuj
          </h1>
          <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-300 sm:text-lg">
            I build fast, modern web experiences with React, Next.js, and
            TypeScript.
          </p>
        </div>
      </section>

      <section id="projects" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
      </section>

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
