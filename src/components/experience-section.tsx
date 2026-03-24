const experiences = [
  {
    role: "Senior Lead Software Engineer",
    company: "Saimon Global Ltd",
    timeline: "2019 - 2024",
    location: "Dhaka, Bangladesh",
    summary:
      "Led frontend teams to build robust B2C and B2B travel-tech products using React/Next.js and Flutter.",
  },
  {
    role: "Web Developer",
    company: "influenceTHIS Canada",
    timeline: "2018 - 2019",
    location: "Remote (Toronto, Canada)",
    summary:
      "Developed modular UI/UX systems for a conference event platform using JavaScript, SCSS, and Node tooling.",
  },
  {
    role: "Top Rated Web Developer",
    company: "Upwork Inc.",
    timeline: "2017 - Present",
    location: "Remote",
    summary:
      "Delivered 150+ successful jobs with high client satisfaction across frontend projects and WordPress development.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="border-b border-zinc-900 py-16">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <p className="text-sm text-zinc-400">Recent work history and delivery impact.</p>
      </div>

      <div className="space-y-4">
        {experiences.map((item) => (
          <article key={`${item.company}-${item.timeline}`} className="rounded-xl border border-zinc-800 p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
              <p className="text-sm text-zinc-400">{item.timeline}</p>
            </div>
            <p className="mt-1 text-sm text-zinc-300">
              {item.company} · {item.location}
            </p>
            <p className="mt-3 text-sm text-zinc-400">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}