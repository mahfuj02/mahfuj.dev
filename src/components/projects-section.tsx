"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const filters = [{ label: "All", count: "10" }];

const projects = [
  { title: "Flight Local (B2B Travel Solution)", category: "Web Development" },
  { title: "AI Lab Granada", category: "Data Visualization" },
  { title: "Khora - Urban Thinkers", category: "Web Development" },
  { title: "Tryotel Mobile App", category: "Mobile Development" },
  { title: "Analytics Dashboard", category: "Data Visualization" },
  { title: "Enterprise Booking Portal", category: "Web Development" },
];

const IphoneModelViewer = dynamic(() => import("./iphone-model-viewer").then((mod) => mod.IphoneModelViewer), {
  ssr: false,
  loading: () => <div className="h-[560px] w-[340px]" />,
});

export function ProjectsSection() {
  return (
    <section id="work" className="relative py-20 section-fade">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <h2 className="text-7xl font-bold leading-[0.95] tracking-tight text-zinc-100 sm:text-8xl">My Work</h2>
          <p className="mt-16 max-w-xl font-mono text-2xl leading-snug text-zinc-200">
            Deployed scalable travel, event and telemedicine web and hybrid mobile apps using React SPA and PWA.
            Collaborated in 140+ projects with 50+ clients all around the world.
          </p>
        </div>

        <div className="relative w-full max-w-[580px] lg:-mt-24">
          <div className="flex justify-center lg:justify-start">
            <IphoneModelViewer className="h-[600px] w-[360px] lg:-ml-6" />
          </div>

          {/* <div className="mt-4 flex items-start gap-4 lg:mt-3 lg:ml-0 lg:justify-start">
            <p className="text-5xl leading-none text-violet-400">↗</p>
            <div className="text-left">
              <p className="text-2xl font-semibold text-zinc-100 sm:text-3xl">Featured Project</p>
              <p className="mt-1 font-mono text-3xl font-bold text-zinc-100 sm:text-4xl">Tryotel App</p>
              <a
                href="#"
                className="mt-4 inline-flex rounded-md bg-violet-600 px-5 py-2 font-mono text-lg font-bold text-zinc-100 transition-opacity hover:opacity-90"
              >
                View Project
              </a>
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3 text-4xl font-semibold text-zinc-500">
        <span>Filter by</span>
        {filters.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3">
            <button
              type="button"
              className={`transition-colors ${index === 0 ? "text-cyan-300" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              {item.label}
            </button>
            <span className="text-base text-zinc-500">{item.count}</span>
            {index < filters.length - 1 ? <span className="text-zinc-600">/</span> : null}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <article key={project.title} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70">
            <div
              className={`h-72 border-b border-zinc-800 bg-gradient-to-br ${
                index % 3 === 0
                  ? "from-zinc-100 via-zinc-200 to-zinc-300"
                  : index % 3 === 1
                    ? "from-zinc-700 via-zinc-800 to-zinc-950"
                    : "from-zinc-200 via-zinc-300 to-zinc-100"
              }`}
            />
            <div className="p-6">
              <h3 className="line-clamp-1 text-4xl font-bold text-zinc-100">{project.title}</h3>
              <p className="mt-2 text-2xl font-semibold text-zinc-400">{project.category}</p>
              <p className="mt-4 text-2xl font-semibold text-zinc-100">
                Show project <span className="ml-2 text-zinc-400">—</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
