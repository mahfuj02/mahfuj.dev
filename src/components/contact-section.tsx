export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 section-fade">
      <div className="mx-auto max-w-5xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
          Communication
        </p>
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Let&apos;s <span className="text-zinc-200">Connect</span>
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base text-zinc-400 sm:text-lg">
          Open to full-time roles, internships, and collaboration opportunities in full-stack, mobile, and AI-integrated product development.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/45 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-zinc-100 sm:text-3xl">Open to Opportunities</h3>
          <p className="mt-2 text-base text-zinc-400">
            Looking for software engineering roles where I can contribute across frontend, backend, mobile, and practical AI integrations.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Preferred Roles</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li>Full Stack Developer</li>
                <li>Frontend Engineer</li>
                <li>React Native Developer</li>
              </ul>
            </article>

            <article className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Work Focus</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li>Web and mobile products</li>
                <li>API-driven architecture</li>
                <li>AI-assisted user features</li>
              </ul>
            </article>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/35 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Availability</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Available for full-time opportunities and internship roles. Open to remote, hybrid, or on-site work in Canada.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-zinc-100 sm:text-3xl">Contact & Presence</h3>

          <div className="space-y-4">
            <article className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Email</p>
              <a href="mailto:ahmed.mahfuj02@gmail.com" className="mt-1 block text-base font-semibold text-zinc-300 sm:text-lg">
                ahmed.mahfuj02@gmail.com
              </a>
            </article>

            <article className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Location</p>
              <p className="mt-1 text-base font-semibold text-zinc-300 sm:text-lg">Winnipeg, Manitoba, Canada</p>
            </article>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-zinc-100">Social Presence</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://github.com/mahfuj02"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">G</span>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mahfuj02/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">in</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:ahmed.mahfuj02@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">@</span>
                <span>Email</span>
              </a>
              <a
                href="/resume/Mahfuj_Ahmed_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">CV</span>
                <span>Resume</span>
              </a>
            </div>
          </div>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900/35 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Quick Connect</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="mailto:ahmed.mahfuj02@gmail.com"
                className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500"
              >
                Email Me
              </a>
              <a
                href="/resume/Mahfuj_Ahmed_Resume.pdf"
                download
                className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500"
              >
                Resume
              </a>
            </div>
          </article>
        </div>
      </div>

      <div className="mt-14 border-t border-zinc-800 pt-8 text-sm text-zinc-500">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p>(c) 2026 Mahfuj Ahmed. All rights reserved.</p>
          <p>Built with passion in Canada.</p>
        </div>
      </div>
    </section>
  );
}