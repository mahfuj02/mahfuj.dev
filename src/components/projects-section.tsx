const projects = [
  {
    title: "Connexions Spectrum Mobile App",
    stack: "React Native, TypeScript, OpenAI, Supabase",
    highlights: [
      "Built a cross-platform mobile app for iOS and Android from a single React Native codebase.",
      "Integrated an AI conversation assistant with OpenAI API to generate real-time response suggestions.",
      "Developed real-time WebSocket chat features including delivery receipts, typing indicators, and persistent inbox.",
      "Implemented an MVP matching algorithm in JavaScript to connect users based on preferences.",
    ],
  },
  {
    title: "Game Hub",
    stack: "React, TypeScript, Tailwind CSS, React Query, Zustand",
    highlights: [
      "Developed an interactive game discovery platform with optimized data fetching using React Query.",
      "Designed a responsive Tailwind UI and achieved 95%+ mobile accessibility in Lighthouse.",
      "Built advanced search and filtering by genre, platform, popularity, and user ratings.",
    ],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Selected work based on my recent product and AI-focused development experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{project.stack}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
              {project.highlights.map((item) => (
                <li key={item} className="list-inside list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}