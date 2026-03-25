const expertise = [
  "Frontend Engineering",
  "App Development",
  "UI Architecture",
  "Design Systems",
  "Performance Optimization",
  "Team Leadership",
  "Cloud Deployment",
  "Data Visualization",
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative py-16 section-fade">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Expertise</h2>
        <p className="text-sm text-zinc-400">
          End-to-end delivery across modern product engineering.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {expertise.map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-200"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}