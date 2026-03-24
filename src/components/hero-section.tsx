"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="home"
      className="flex min-h-[60vh] items-center border-b border-zinc-200 py-16 dark:border-zinc-800"
    >
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-sm uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400"
        >
          Software Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Hi, I&apos;m Mahfuj.
          <br />
          I craft modern web products.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          className="max-w-2xl text-base text-zinc-600 dark:text-zinc-300 sm:text-lg"
        >
          I build fast, polished, and scalable user experiences using React,
          Next.js, TypeScript, and modern frontend tooling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-zinc-500 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}