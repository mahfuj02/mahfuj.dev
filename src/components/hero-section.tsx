"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[56svh] items-start overflow-hidden pb-0 pt-5 sm:min-h-[102svh] sm:items-center sm:pb-20 sm:pt-8 lg:min-h-[112svh] lg:pb-28 lg:pt-16 section-fade"
    >
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-laptop-scene">
          <div className="hero-laptop-screen">
            <div className="hero-laptop-camera" />
            <div className="hero-laptop-wallpaper" />
            <div className="hero-laptop-code-row hero-laptop-code-row-1" />
            <div className="hero-laptop-code-row hero-laptop-code-row-2" />
            <div className="hero-laptop-code-row hero-laptop-code-row-3" />

            <div className="hero-text-frame relative z-10 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0, ease: "easeOut" }}
                className="text-[clamp(1.45rem,8vw,4.5rem)] font-bold tracking-tight text-zinc-100"
              >
                MAHFUJ AHMED
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                className="mx-auto mt-3 max-w-3xl text-[clamp(0.52rem,2.1vw,1.05rem)] uppercase tracking-[0.12em] text-zinc-200"
              >
                Full Stack Web and App Developer
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                className="mt-4 space-y-2"
              >
                <p className="text-[0.58rem] uppercase tracking-[0.22em] text-zinc-500">Problem Solving & Competitions</p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[clamp(0.62rem,1.9vw,1.25rem)] font-semibold text-zinc-500/80">
                  <span>Codeforces</span>
                  <span>LeetCode</span>
                  <span>Hackathon</span>
                  <span>ICPC</span>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="hero-laptop-base" />
          <div className="hero-keyboard">
            <a href="#expertise">expertise</a>
            <a href="#work">work</a>
            <a href="#experience">experience</a>
            <Link href="/blog">blog</Link>
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
    </section>
  );
}