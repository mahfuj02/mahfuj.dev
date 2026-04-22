"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const IphoneModelViewer = dynamic(() => import("./iphone-model-viewer").then((mod) => mod.IphoneModelViewer), {
  ssr: false,
  loading: () => <div className="h-[560px] w-[340px]" />,
});

export function ProjectsSection() {
  const orderedProjects = [
    ...projects.filter((project) => project.id === "role-ready"),
    ...projects.filter((project) => project.id !== "role-ready"),
  ];

  const [featuredProject, ...otherProjects] = orderedProjects;

  return (
    <section id="work" className="relative py-16 sm:py-20 section-fade scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div className="min-w-0">
          <h2 className="text-5xl font-bold leading-[0.95] tracking-tight text-zinc-100 sm:text-7xl lg:text-8xl">My Work</h2>
          <p className="mt-6 max-w-xl break-words [overflow-wrap:anywhere] font-mono text-base leading-relaxed text-zinc-200 sm:mt-10 sm:text-lg lg:mt-16 lg:text-2xl">
            Build modern full-stack web and cross-platform mobile applications using React, Next.js, TypeScript, Django,
            Rails, and React Native.
            Recent work also includes AI-assisted experiences powered by OpenAI to support real user communication needs.
          </p>
        </div>

        <div className="relative w-full max-w-[580px] lg:-mt-24">
          <div className="flex justify-center lg:justify-start">
            <IphoneModelViewer className="h-[600px] w-[360px] lg:-ml-6" />
          </div>
          <div className="mt-4 flex items-center gap-4 justify-center lg:justify-start lg:pl-2">
            <span className="text-2xl text-zinc-500">↗</span>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Featured Mobile App</p>
              <p className="mt-0.5 text-xl font-bold text-zinc-100">SafeDrive AI</p>
            </div>
            <Link
              href="/projects/safe-drive-ai"
              className="ml-auto rounded-full border border-zinc-700 px-4 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              View project →
            </Link>
          </div>
        </div>
      </div>

      {/* Section intro */}
      <div className="mt-16">
        <p className="font-mono text-sm font-semibold uppercase tracking-widest text-zinc-500">
          0{orderedProjects.length} · Work
        </p>
        <div className="mt-2 h-px w-full bg-zinc-800" />
        <p className="mt-4 font-mono text-base text-zinc-400">
          Selected projects — full stack, mobile, and AI. Each one shipped and live.
        </p>
      </div>

      <div className="mt-10 w-full">
        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto]">

          {/* Featured card */}
          {featuredProject ? (
            <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60 lg:col-span-2 lg:row-span-2 lg:self-stretch">
              <div className="relative h-[320px] shrink-0 border-b border-zinc-800 bg-zinc-950 lg:h-0 lg:flex-1">
                <Image
                  src={featuredProject.bannerImage}
                  alt={featuredProject.bannerAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-zinc-300 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                  <span className="rounded-full border border-teal-500/30 bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur-sm">
                    Featured Project
                  </span>
                </div>
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="line-clamp-1 text-4xl font-bold text-zinc-100">{featuredProject.title}</h3>
                <p className="mt-1.5 font-mono text-sm text-zinc-500">
                  18 tailored questions · Real-time STAR scoring
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredProject.stack.map((tech) => (
                    <span key={tech} className="rounded-md bg-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-400">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="inline-flex items-center gap-2 text-lg font-semibold text-zinc-100 transition-colors hover:text-zinc-200"
                  >
                    View project <span className="text-zinc-400">↗</span>
                  </Link>
                  {featuredProject.liveUrl ? (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-sm text-teal-400 transition-colors hover:text-teal-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Live site
                    </a>
                  ) : null}
                  {featuredProject.githubUrl ? (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      GitHub →
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ) : null}

          {/* Smaller cards */}
          {otherProjects.map((project) => (
            <article key={project.slug} className="flex flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60">
              <div className="relative h-40 shrink-0 border-b border-zinc-800 bg-zinc-950 lg:h-[148px]">
                <Image
                  src={project.bannerImage}
                  alt={project.bannerAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-2xl font-bold text-zinc-100">{project.title}</h3>
                <p className="mt-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {project.category}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-500">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-100 transition-colors hover:text-zinc-200"
                  >
                    View project <span className="text-zinc-400">↗</span>
                  </Link>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-teal-400 transition-colors hover:text-teal-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      Live site
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
