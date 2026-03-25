"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[82vh] items-center overflow-hidden border-b border-zinc-900 py-16"
    >
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-laptop-scene">
          <div className="hero-laptop-screen">
            <div className="hero-laptop-camera" />
            <div className="hero-laptop-wallpaper" />
            <div className="hero-laptop-code-row hero-laptop-code-row-1" />
            <div className="hero-laptop-code-row hero-laptop-code-row-2" />
            <div className="hero-laptop-code-row hero-laptop-code-row-3" />
          </div>
          <div className="hero-laptop-base" />
          <div className="hero-keyboard">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-mouse" />
        </div>
        <div className="hero-orb" />
        <div className="hero-lang-orbit hero-lang-orbit-outer">
          <span>C++</span>
          <span>TypeScript</span>
          <span>Python</span>
          <span>React</span>
          <span>Next.js</span>
          <span>Node.js</span>
          <span>Java</span>
          <span>C</span>
        </div>
        <div className="hero-lang-orbit hero-lang-orbit-inner">
          <span>Django</span>
          <span>PostgreSQL</span>
          <span>Supabase</span>
          <span>OpenAI</span>
          <span>AWS</span>
          <span>Docker</span>
        </div>
      </div>

      <div className="relative z-10 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.26em] text-zinc-300"
        >
          Software Engineer, Front End & App Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="mt-6 text-6xl font-bold tracking-tight text-zinc-100 sm:text-7xl lg:text-8xl"
        >
          MAHFUJ AHMED
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          className="mx-auto mt-7 max-w-4xl text-lg uppercase tracking-[0.22em] text-zinc-200 sm:text-2xl"
        >
          Software Engineer, Front End & App Developer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
          className="mt-14 space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">As featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xl font-semibold text-zinc-500/70 sm:text-4xl">
            <span>upwork</span>
            <span>CAREERFOUNDRY</span>
            <span>Frontend Mentor</span>
            <span>WeAreDevelopers</span>
            <span>colorlib</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}