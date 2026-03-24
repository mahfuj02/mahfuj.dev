const testimonials = [
  {
    author: "Mark Greenspan",
    role: "Founder at influenceTHIS Canada",
    quote:
      "Tamal has been highly responsive, organized and strategic in his thinking. A highly valued member of our team.",
  },
  {
    author: "Wilfried Hajek",
    role: "Agile Coach | Speaker | Trainer",
    quote:
      "One of the best professionals we have known in web development skills, with strong communication and planning.",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="text-sm text-zinc-400">Available for product engineering and consulting work.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 p-5">
          <h3 className="text-lg font-semibold">Let&apos;s build something meaningful.</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Open for collaborations on modern web applications, app experiences, and frontend architecture.
          </p>
          <a
            href="mailto:hello@example.com"
            className="mt-5 inline-flex rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900"
          >
            Say Hello
          </a>
        </div>

        <div className="space-y-4">
          {testimonials.map((item) => (
            <article key={item.author} className="rounded-xl border border-zinc-800 p-5">
              <p className="text-sm text-zinc-300">“{item.quote}”</p>
              <p className="mt-3 text-sm font-medium text-zinc-100">{item.author}</p>
              <p className="text-xs text-zinc-500">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}