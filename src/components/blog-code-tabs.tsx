"use client";

import { useMemo, useState } from "react";

type LanguageKey = "typescript" | "python" | "cpp";

type BlogCodeTabsProps = {
  implementations: Record<LanguageKey, string>;
};

const languageLabelMap: Record<LanguageKey, string> = {
  typescript: "TypeScript",
  python: "Python",
  cpp: "C++",
};

const languageStyleMap: Record<LanguageKey, { active: string; inactive: string }> = {
  typescript: {
    active: "border-[#3178c6]/80 bg-[#3178c6]/15 text-[#9ecbff]",
    inactive: "border-zinc-700 text-[#8fbce9] hover:border-[#3178c6]/55",
  },
  python: {
    active: "border-[#3776ab]/80 bg-[#3776ab]/15 text-[#a7d7ff]",
    inactive: "border-zinc-700 text-[#9ec5e8] hover:border-[#3776ab]/55",
  },
  cpp: {
    active: "border-[#00599c]/80 bg-[#00599c]/15 text-[#9fd5ff]",
    inactive: "border-zinc-700 text-[#95bfdc] hover:border-[#00599c]/55",
  },
};

export function BlogCodeTabs({ implementations }: BlogCodeTabsProps) {
  const [active, setActive] = useState<LanguageKey>("typescript");

  const codeSnippet = useMemo(() => {
    return implementations[active];
  }, [active, implementations]);

  return (
    <section>
      <h2 className="text-2xl font-bold text-zinc-100">Implementation</h2>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {(["typescript", "python", "cpp"] as LanguageKey[]).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActive(lang)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
              active === lang ? languageStyleMap[lang].active : languageStyleMap[lang].inactive
            }`}
          >
            {languageLabelMap[lang]}
          </button>
        ))}
      </div>

      <pre className="mt-3 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm leading-relaxed text-zinc-200">
        <code>{codeSnippet}</code>
      </pre>
    </section>
  );
}
