const expertiseColumns = [
  {
    title: "Software Dev",
    stack: ["Python", "C++", "Full Stack"],
    summary: "Build reliable backend and product systems with clean architecture and scalable foundations.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Frontend Dev",
    stack: ["Next.js", "React"],
    summary: "Create fast and accessible user interfaces with strong component design and production-ready UX.",
    accent: "from-sky-400 to-blue-500",
  },
  {
    title: "Mobile Dev",
    stack: ["Android", "iOS Dev", "React Native"],
    summary: "Deliver polished cross-platform mobile experiences with native-quality performance and interactions.",
    accent: "from-orange-400 to-amber-500",
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative py-20 section-fade">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">My Expertise</h2>
      </div>

      <div className="relative overflow-hidden border border-zinc-600/80 bg-zinc-950/50">
        <pre className="pointer-events-none absolute -bottom-6 left-10 hidden text-xs leading-7 text-zinc-700/30 lg:block">
{`<html lang="en">\n  <head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>What do I do</title>\n  </head>\n</html>`}
        </pre>
        <pre className="pointer-events-none absolute bottom-2 right-12 hidden text-xs leading-7 text-zinc-700/25 xl:block">
{`<body>\n  <h1>Things I build</h1>\n  <section>frontend + backend + mobile</section>\n</body>`}
        </pre>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3">
          {expertiseColumns.map((item, index) => (
            <article
              key={item.title}
              className={`border-zinc-600/80 p-8 sm:p-10 ${index < expertiseColumns.length - 1 ? "lg:border-r" : ""}`}
            >
              <h3 className="text-4xl font-semibold leading-tight text-zinc-100">
                {item.title}
              </h3>
              <div className={`mt-2 h-1.5 w-32 rounded-full bg-gradient-to-r ${item.accent}`} />

              <ul className="mt-6 space-y-2 text-xl font-semibold text-zinc-100">
                {item.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <p className="mt-7 border-l border-zinc-700 pl-4 text-base leading-relaxed text-zinc-300">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}