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
          Have a project in mind or just want to say hi? I&apos;m always open to discussing new opportunities and creative ideas.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/45 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-zinc-100 sm:text-3xl">Send a Message</h3>
          <p className="mt-2 text-base text-zinc-400">I&apos;ll get back to you within 24 hours.</p>

          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3.5 text-base text-zinc-200 outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3.5 text-base text-zinc-200 outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3.5 text-base text-zinc-200 outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-600 bg-zinc-950 px-6 py-3.5 text-base font-semibold uppercase tracking-[0.1em] text-zinc-100 transition-colors hover:border-zinc-400"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-zinc-100 sm:text-3xl">Direct Contact</h3>

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
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">G</span>
                <span>GitHub</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">in</span>
                <span>LinkedIn</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">X</span>
                <span>X</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/65 px-5 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-zinc-800 text-xs">f</span>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-zinc-800 pt-8 text-sm text-zinc-500">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p>© 2026 Mahfuj Ahmed. All rights reserved.</p>
          <p>Built with passion in Canada.</p>
        </div>
      </div>
    </section>
  );
}