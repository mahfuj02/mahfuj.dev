const expertiseColumns = [
  {
    title: "Software Developer",
    icon: "software",
    stack: ["Python", "C++", "Full Stack"],
    summary: "Build reliable backend and product systems with clean architecture and scalable foundations.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Full Stack Developer",
    icon: "fullstack",
    stack: ["Next.js", "React"],
    summary: "Create fast and accessible user interfaces with strong component design and production-ready UX.",
    accent: "from-sky-400 to-blue-500",
  },
  {
    title: "Android & iOS Dev",
    icon: "mobile",
    stack: ["Android", "iOS Dev", "React Native"],
    summary: "Deliver polished cross-platform mobile experiences with native-quality performance and interactions.",
    accent: "from-orange-400 to-amber-500",
  },
];

function ExpertiseLogo({ type }: { type: "software" | "fullstack" | "mobile" }) {
  if (type === "software") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 text-zinc-100" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 20h8" />
        <path d="M10 17l-1.2 3" />
        <path d="M14 17l1.2 3" />
      </svg>
    );
  }

  if (type === "fullstack") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 text-zinc-100" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="6" rx="1.5" />
        <rect x="4" y="14" width="16" height="6" rx="1.5" />
        <path d="M8 7h8" />
        <path d="M8 17h8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 text-zinc-100" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11.2 5.8h1.6" />
      <path d="M11.1 18.6h1.8" />
      <circle cx="6" cy="16" r="1.2" />
      <path d="M4.8 17.7l1.9 1.8" />
      <path d="M5.3 13.9h1.4" />
      <path d="M19.6 14.2c.6-.4 1-.8 1-1.5 0-1.1-.9-1.6-2-1.6-1 0-1.8.4-2.3 1.1" />
      <path d="M16.6 14.9c.4.7 1.1 1.1 2 1.1 1.1 0 2-.6 2-1.6" />
    </svg>
  );
}

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
              <div className="flex items-center gap-4">
                <ExpertiseLogo type={item.icon as "software" | "fullstack" | "mobile"} />
                <h3 className="text-3xl font-semibold leading-tight text-zinc-100 sm:text-4xl">
                  {item.title}
                </h3>
              </div>
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