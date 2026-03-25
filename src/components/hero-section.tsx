"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[115vh] items-center overflow-hidden border-b border-zinc-900 pb-28 pt-16 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-32 after:bg-gradient-to-b after:from-transparent after:to-[#09090b] after:pointer-events-none"
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
            <a href="#home">home</a>
            <a href="#expertise">expertise</a>
            <a href="#work">work</a>
            <a href="#experience">experience</a>
            <a href="#contact">contact</a>
          </div>
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

      <div className="hero-text-frame relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[10px] uppercase tracking-[0.24em] text-zinc-300 sm:text-xs"
        >
          Software Engineer, Front End & App Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          className="mt-5 text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl"
        >
          MAHFUJ AHMED
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-3xl text-sm uppercase tracking-[0.18em] text-zinc-200 sm:text-lg"
        >
          Software Engineer, Front End & App Developer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
          className="mt-8 space-y-3"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">As featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-zinc-500/70 sm:text-xl">
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