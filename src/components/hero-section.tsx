"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="home"
      className="flex min-h-[76vh] items-center border-b border-zinc-900 py-16"
    >
      <div className="space-y-7">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.25em] text-zinc-400"
        >
          Software Engineer, Front End & App Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="text-5xl font-bold tracking-tight sm:text-6xl"
        >
          TAMAL SEN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          className="max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg"
        >
          I design and build production-grade web and mobile products using React,
          Next.js, TypeScript, and Flutter. Collaborated on 140+ projects with 50+
          clients worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
          className="space-y-3"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">As featured in</p>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
            <a className="transition-colors hover:text-white" href="https://www.wearedevelopers.com/" target="_blank" rel="noreferrer">WeAreDevelopers</a>
            <a className="transition-colors hover:text-white" href="https://colorlib.com/" target="_blank" rel="noreferrer">Colorlib</a>
            <a className="transition-colors hover:text-white" href="https://careerfoundry.com/" target="_blank" rel="noreferrer">CareerFoundry</a>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#work"
              className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-opacity hover:opacity-90"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}