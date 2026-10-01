// Maps npm dependency names (and GitHub language names) to the display names used in data/projects.json.
// Order matters: earlier entries rank higher, so frameworks come before libraries and languages.
const DEPENDENCY_NAMES = [
  ["next", "Next.js"],
  ["react-native", "React Native"],
  ["expo", "Expo"],
  ["react", "React"],
  ["vue", "Vue 3"],
  ["nuxt", "Nuxt"],
  ["@angular/core", "Angular"],
  ["svelte", "Svelte"],
  ["astro", "Astro"],
  ["express", "Express"],
  ["fastify", "Fastify"],
  ["@nestjs/core", "NestJS"],
  ["electron", "Electron"],
  ["typescript", "TypeScript"],
  ["@supabase/supabase-js", "Supabase"],
  ["firebase", "Firebase"],
  ["mongoose", "MongoDB"],
  ["mongodb", "MongoDB"],
  ["prisma", "Prisma"],
  ["@prisma/client", "Prisma"],
  ["drizzle-orm", "Drizzle ORM"],
  ["pg", "PostgreSQL"],
  ["@clerk/nextjs", "Clerk"],
  ["next-auth", "NextAuth.js"],
  ["stripe", "Stripe"],
  ["openai", "OpenAI API"],
  ["@anthropic-ai/sdk", "Claude API"],
  ["groq-sdk", "Groq API"],
  ["@google/generative-ai", "Gemini API"],
  ["@tanstack/react-query", "TanStack Query"],
  ["@tanstack/vue-query", "TanStack Vue Query"],
  ["redux", "Redux"],
  ["@reduxjs/toolkit", "Redux Toolkit"],
  ["zustand", "Zustand"],
  ["pinia", "Pinia"],
  ["vue-router", "Vue Router"],
  ["react-router-dom", "React Router"],
  ["@apollo/client", "Apollo Client"],
  ["graphql", "GraphQL"],
  ["axios", "Axios"],
  ["tailwindcss", "Tailwind CSS"],
  ["@mui/material", "Material UI"],
  ["framer-motion", "Framer Motion"],
  ["three", "Three.js"],
  ["@react-three/fiber", "React Three Fiber"],
  ["storybook", "Storybook"],
  ["vite", "Vite"],
  ["jest", "Jest"],
  ["vitest", "Vitest"],
  ["playwright", "Playwright"],
  ["cypress", "Cypress"],
];

const LANGUAGE_NAMES = {
  TypeScript: "TypeScript",
  JavaScript: "JavaScript",
  Python: "Python",
  Ruby: "Ruby",
  Java: "Java",
  Kotlin: "Kotlin",
  Swift: "Swift",
  Dart: "Dart",
  Go: "Go",
  Rust: "Rust",
  PHP: "PHP",
  "C++": "C++",
  C: "C",
  "C#": "C#",
  Vue: "Vue 3",
  Dockerfile: "Docker",
  CMake: "CMake",
};

// Languages that are markup/styling noise rather than a meaningful stack entry.
const IGNORED_LANGUAGES = new Set(["HTML", "CSS", "SCSS", "Shell", "Batchfile", "PowerShell", "Makefile", "PLpgSQL", "TSQL", "Jupyter Notebook"]);

export const STACK_LIMIT = 7;

/**
 * @param {Record<string, unknown> | null} packageJson parsed package.json (or null)
 * @param {Record<string, number>} languages GitHub /languages response (bytes per language)
 * @returns {string[]} up to STACK_LIMIT display names
 */
export function buildStack(packageJson, languages) {
  const deps = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };

  const stack = [];
  const add = (name) => {
    if (name && !stack.includes(name)) stack.push(name);
  };

  // React Native/Expo apps also list "react"; the more specific framework is enough.
  const mobile = "react-native" in deps || "expo" in deps;
  const metaFramework = "next" in deps || "nuxt" in deps;
  for (const [dep, name] of DEPENDENCY_NAMES) {
    if (!(dep in deps)) continue;
    if (dep === "react" && (mobile || metaFramework)) continue;
    if (dep === "vite" && (metaFramework || mobile)) continue;
    add(name);
  }

  const languageNames = Object.entries(languages ?? {})
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang)
    .filter((lang) => !IGNORED_LANGUAGES.has(lang))
    .map((lang) => LANGUAGE_NAMES[lang] ?? lang);

  // Languages come after frameworks, but the primary language should still make the cut.
  const primary = languageNames[0];
  const rest = stack.filter((name) => name !== "TypeScript");
  const hasTs = stack.includes("TypeScript");
  const ordered = [...rest.slice(0, 2), ...(hasTs ? ["TypeScript"] : []), ...rest.slice(2)];
  const final = [];
  const push = (name) => {
    if (name && !final.includes(name)) final.push(name);
  };
  ordered.forEach(push);
  if (primary) push(primary);
  languageNames.slice(1).forEach(push);

  return final.slice(0, STACK_LIMIT);
}
