"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const filters = [{ label: "All", count: "03" }];

const IphoneModelViewer = dynamic(() => import("./iphone-model-viewer").then((mod) => mod.IphoneModelViewer), {
  ssr: false,
  loading: () => <div className="h-[560px] w-[340px]" />,
});

export function ProjectsSection() {
  const thirdProject = projects[2];

  return (
    <section id="work" className="relative py-20 section-fade">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <h2 className="text-7xl font-bold leading-[0.95] tracking-tight text-zinc-100 sm:text-8xl">My Work</h2>
          <p className="mt-16 max-w-xl font-mono text-2xl leading-snug text-zinc-200">
            Build modern full-stack web and cross-platform mobile applications using React, Next.js, TypeScript, Django,
            Rails, and React Native.
            Recent work also includes AI-assisted experiences powered by OpenAI to support real user communication needs.
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

      <div className="mt-12 flex flex-wrap items-center gap-3 text-xl font-semibold text-zinc-500">
        <span>Filter by</span>
        {filters.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3">
            <button
              type="button"
              className={`font-mono text-base transition-colors ${index === 0 ? "text-cyan-300" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              {item.label}
            </button>
            <span className="text-base text-zinc-500">{item.count}</span>
            {index < filters.length - 1 ? <span className="text-zinc-600">/</span> : null}
          </div>
        ))}
      </div>

      <div className="mt-10 w-full">
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.slice(0, 2).map((project) => (
            <article key={project.title} className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60">
              <div className="relative h-72 border-b border-zinc-800 bg-zinc-950">
                <Image src={project.bannerImage} alt={project.bannerAlt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="p-5">
                <h3 className="line-clamp-1 text-2xl font-bold text-zinc-100">{project.title}</h3>
                <p className="mt-2 text-lg font-semibold text-zinc-400">{project.category}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-zinc-200 transition-colors hover:text-zinc-100"
                >
                  View project <span className="text-zinc-400">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <article className="w-full lg:w-[72%] overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60">
            <div className="relative h-72 border-b border-zinc-800 bg-zinc-950">
              <Image
                src={thirdProject.bannerImage}
                alt={thirdProject.bannerAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 72vw, 100vw"
              />
            </div>
            <div className="p-5">
              <h3 className="line-clamp-1 text-2xl font-bold text-zinc-100">{thirdProject.title}</h3>
              <p className="mt-2 text-lg font-semibold text-zinc-400">{thirdProject.category}</p>
              <Link
                href={`/projects/${thirdProject.slug}`}
                className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-zinc-200 transition-colors hover:text-zinc-100"
              >
                View project <span className="text-zinc-400">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
