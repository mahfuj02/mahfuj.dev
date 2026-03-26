"use client";

import { useState } from "react";

const experiences = [
  {
    id: "industrial-project",
    type: "Experience",
    title: "Industrial Project",
    org: "RRC College",
    timeline: "2025 May - 2025 September",
    focus: "Mobile App Development",
    details: [
      "Collaborated with a student-industry team to plan and implement a real-world mobile app workflow.",
      "Worked on feature modules, API integration, and iterative UI improvements based on weekly feedback.",
      "Contributed to testing, bug triage, and release preparation with versioned deployment notes.",
    ],
  },
  {
    id: "liilab",
    type: "Experience",
    title: "Backend Developer",
    org: "Liilab",
    timeline: "2021 May - 2022 Feb",
    focus: "Django, WordPress Themes & Plugins",
    details: [
      "Built and maintained backend endpoints using Django for internal and client-facing features.",
      "Developed and customized WordPress themes and plugins based on project requirements.",
      "Improved maintainability by organizing reusable modules and documenting setup steps.",
    ],
  },
  {
    id: "education-rrc",
    type: "Education",
    title: "Full Stack Web Developer",
    org: "RRC College",
    timeline: "2023 Aug - 2025 Aug",
    focus: "Program Credential",
    details: [
      "Completed full stack coursework covering frontend architecture, backend APIs, and database systems.",
      "Built multiple capstone and team projects using modern web stacks with production-style workflows.",
      "Focused on software engineering practices including code reviews, testing basics, and deployment.",
    ],
  },
];

export function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="relative py-16 section-fade">
      <div className="mb-8 space-y-2 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">Professional Background</h2>
      </div>

      <div className="space-y-4">
        {experiences.map((item) => {
          const isActive = activeId === item.id;

          return (
            <article
              key={item.id}
              className={`rounded-xl border p-5 transition-colors ${
                isActive ? "border-zinc-500 bg-zinc-900/60" : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveId(isActive ? "" : item.id)}
                className="w-full text-left"
                aria-expanded={isActive}
                aria-controls={`panel-${item.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{item.type}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-100">{item.title}</h3>
                    <p className="text-sm text-zinc-300">
                      {item.org} · {item.focus}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">{item.timeline}</p>
                    <span className="text-xl text-zinc-400">{isActive ? "−" : "+"}</span>
                  </div>
                </div>
              </button>

              {isActive ? (
                <div id={`panel-${item.id}`} className="mt-4 border-t border-zinc-800 pt-4">
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {item.details.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-[2px] text-zinc-600">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}