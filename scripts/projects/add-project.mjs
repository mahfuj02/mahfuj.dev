import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createBanner } from "./banner.mjs";
import {
  bannerDir,
  fail,
  findProjectIndex,
  insertAt,
  parseArgs,
  parsePosition,
  parseRepoUrl,
  positionToIndex,
  readProjects,
  setOutputs,
  slugify,
  validateProject,
  writeProjects,
} from "./lib.mjs";
import { buildStack } from "./stack.mjs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const README_LIMIT = 12_000;

const args = parseArgs(process.argv.slice(2));
const dryRun = Boolean(args["dry-run"]);
const repoInput = args["repo-url"] ?? process.env.REPO_URL;
const liveUrlInput = args["live-url"] ?? process.env.LIVE_URL;
const imageUrlInput = args["image-url"] ?? process.env.IMAGE_URL;
const prBodyFile = args["pr-body-file"] ?? process.env.PR_BODY_FILE ?? path.join(os.tmpdir(), "add-project-pr-body.md");

// ---------- GitHub ----------

function githubToken() {
  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN;
  if (token) return token;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

async function github(pathname, { raw = false, optional = false } = {}) {
  const token = githubToken();
  const response = await fetch(`https://api.github.com${pathname}`, {
    headers: {
      Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "portfolio-add-project",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (response.status === 404 && optional) return null;
  if (!response.ok) {
    const hint =
      response.status === 404 || response.status === 403
        ? " For a private repo, set the GH_PAT secret (a token with read access to it)."
        : "";
    throw new Error(`GitHub API ${pathname} failed: HTTP ${response.status}.${hint}`);
  }
  return raw ? response.text() : response.json();
}

async function fetchRepoFacts({ owner, repo }) {
  const meta = await github(`/repos/${owner}/${repo}`);
  const [languages, packageText, readme] = await Promise.all([
    github(`/repos/${owner}/${repo}/languages`),
    github(`/repos/${owner}/${repo}/contents/package.json`, { raw: true, optional: true }),
    github(`/repos/${owner}/${repo}/readme`, { raw: true, optional: true }),
  ]);
  let packageJson = null;
  try {
    packageJson = packageText ? JSON.parse(packageText) : null;
  } catch {
    console.warn("! package.json could not be parsed; ignoring it.");
  }
  return { meta, languages, packageJson, readme: readme ? readme.slice(0, README_LIMIT) : "" };
}

// ---------- Groq ----------

const EXAMPLE_SLUGS = ["role-ready", "game-hub"];
const GENERATED_FIELDS = ["title", "category", "role", "summary", "details", "challenge", "solution", "impact", "highlight", "bannerAlt"];

function buildMessages(projects, facts, stack, previousProblems) {
  const examples = EXAMPLE_SLUGS.map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)
    .map((p) => Object.fromEntries(GENERATED_FIELDS.filter((key) => p[key] !== undefined).map((key) => [key, p[key]])));
  const categories = [...new Set(projects.map((p) => p.category))];
  const roles = [...new Set(projects.map((p) => p.role))];

  const system = [
    "You write portfolio case-study entries for a developer, as strict JSON.",
    `Return one JSON object with exactly these keys: ${GENERATED_FIELDS.join(", ")}.`,
    "Types: title/category/role/summary/challenge/solution/impact/highlight/bannerAlt are strings; details is an array of 4 to 7 strings.",
    "",
    "Truthfulness rules (most important):",
    "- Use ONLY facts found in the README, repo metadata, and dependency list below.",
    "- Never invent metrics, user counts, performance numbers, customers, features, integrations, or deployment claims.",
    "- If something is unclear or not stated, keep the wording general instead of guessing. Do not claim the project is live or shipped unless a live URL is given.",
    "- Do not mention anything about the README itself.",
    "",
    "Style rules (match the examples exactly in tone, tense and length):",
    '- First-person implied, past tense, action verbs for "details" ("Built…", "Implemented…", "Integrated…"), one sentence each, 100-250 characters.',
    "- summary: 1-2 sentences, 150-300 characters. challenge / solution / impact: one sentence each, 150-300 characters.",
    `- category: prefer one of the existing categories when it fits: ${categories.join("; ")}. Otherwise write a similar short Title Case label.`,
    `- role: prefer one of the existing roles when it fits: ${roles.join("; ")}.`,
    "- title: the human-friendly project name (Title Case), not the raw repo slug, unless the repo name is already a good name.",
    '- highlight: a very short mono-style tagline (max 60 characters) made only of facts from the sources, e.g. "Vue 3 · TanStack Query · Pinia"-style or a feature pair joined by " · ". No numbers unless stated in the sources.',
    '- bannerAlt: short alt text for the banner image, ending with "banner" or similar, like the examples.',
    "",
    "Two existing entries, as style references only (do not copy their facts):",
    JSON.stringify(examples, null, 2),
  ].join("\n");

  const user = [
    `Repository: ${facts.meta.full_name}`,
    `Description: ${facts.meta.description ?? "(none)"}`,
    `Homepage / live URL: ${facts.meta.homepage || "(none)"}`,
    `Topics: ${(facts.meta.topics ?? []).join(", ") || "(none)"}`,
    `Created: ${facts.meta.created_at}`,
    `Languages (bytes): ${JSON.stringify(facts.languages)}`,
    `Detected stack: ${stack.join(", ") || "(none)"}`,
    `package.json dependencies: ${JSON.stringify(facts.packageJson?.dependencies ?? {})}`,
    `package.json devDependencies: ${JSON.stringify(facts.packageJson?.devDependencies ?? {})}`,
    "",
    "README:",
    facts.readme || "(no README)",
    ...(previousProblems.length
      ? ["", "Your previous answer was rejected for these reasons; fix them:", ...previousProblems.map((p) => `- ${p}`)]
      : []),
  ].join("\n");

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

async function listGroqModels(key) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/models", { headers: { Authorization: `Bearer ${key}` } });
    const ids = (await response.json()).data.map((m) => m.id).sort();
    return `
Models available to this key: ${ids.join(", ")}
Set the GROQ_MODEL repository variable (Settings -> Secrets and variables -> Actions -> Variables) to one of them.`;
  } catch {
    return "";
  }
}

async function callGroq(messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set. Add it as a repository secret (or export it locally).");
  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages,
    }),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(`Groq API failed: HTTP ${response.status} ${detail}${response.status === 404 ? await listGroqModels(key) : ""}`);
  }
  const body = await response.json();
  return body.choices?.[0]?.message?.content ?? "";
}

function checkGenerated(generated, candidate) {
  let problems = [];
  if (!generated || typeof generated !== "object") return ["response is not a JSON object"];
  const entry = { ...candidate, ...Object.fromEntries(GENERATED_FIELDS.map((key) => [key, generated[key]])) };
  problems = validateProject(entry);
  return problems;
}

async function generateText(projects, facts, stack, candidate) {
  let problems = [];
  for (let attempt = 1; attempt <= 2; attempt++) {
    let generated = null;
    try {
      generated = JSON.parse(await callGroq(buildMessages(projects, facts, stack, problems)));
    } catch (error) {
      if (error.message.startsWith("Groq API failed") || error.message.startsWith("GROQ_API_KEY")) throw error;
      problems = [`response was not valid JSON (${error.message})`];
      console.warn(`! Attempt ${attempt}: ${problems[0]}`);
      continue;
    }
    problems = checkGenerated(generated, candidate);
    if (problems.length === 0) {
      return Object.fromEntries(
        GENERATED_FIELDS.map((key) => [key, Array.isArray(generated[key]) ? generated[key].map((s) => s.trim()) : generated[key].trim()]),
      );
    }
    console.warn(`! Attempt ${attempt} rejected: ${problems.join("; ")}`);
  }
  throw new Error(`Groq output did not match the Project type after a retry: ${problems.join("; ")}`);
}

// ---------- main ----------

function normalizeLiveUrl(homepage) {
  const value = String(homepage ?? "").trim();
  if (!value) return undefined;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes(".")) return undefined;
    return url.href.replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function pad(text) {
  return String(text).replace(/\|/g, "\\|");
}

function buildPrBody({ entry, position, count, before, banner, imageUrl }) {
  return [
    `## Add project: ${entry.title}`,
    "",
    `**Position:** ${position} of ${count} ${position === 1 ? "(featured card)" : ""}`.trim(),
    `**Source:** ${entry.githubUrl}${entry.liveUrl ? ` · Live: ${entry.liveUrl}` : ""}`,
    `**Banner:** ${{ image: "image from the provided link", screenshot: "screenshot of the live site", card: "generated card" }[banner.source]}${banner.note ? `\n> ${banner.note}` : ""}`,
    "",
    `![${entry.bannerAlt}](${imageUrl})`,
    "",
    "### Generated text (review before merging)",
    "",
    `- **Title:** ${entry.title}`,
    `- **Category:** ${entry.category}`,
    `- **Role:** ${entry.role}`,
    `- **Year:** ${entry.year}`,
    `- **Highlight:** ${entry.highlight}`,
    `- **Stack:** ${entry.stack.join(", ")}`,
    "",
    `**Summary:** ${entry.summary}`,
    "",
    "**Details:**",
    ...entry.details.map((d) => `- ${d}`),
    "",
    `**Challenge:** ${entry.challenge}`,
    "",
    `**Solution:** ${entry.solution}`,
    "",
    `**Impact:** ${entry.impact}`,
    "",
    "### Resulting order",
    "",
    ...before.map((title, i) => `${i + 1}. ${pad(title)}`),
    "",
    "_Text is AI-generated from the repo README, metadata and dependencies. Please check it for accuracy; edit `data/projects.json` in this PR if needed._",
    "",
  ].join("\n");
}

async function main() {
  if (!repoInput) fail("repo_url is required (--repo-url https://github.com/<owner>/<repo>).");
  const position = parsePosition(args.position ?? process.env.POSITION);
  const repo = parseRepoUrl(repoInput);
  const projects = readProjects();

  const slug = slugify(repo.repo);
  const existing = findProjectIndex(projects, repo.url);
  const slugClash = projects.findIndex((p) => p.slug === slug);
  if (existing !== -1 || slugClash !== -1) {
    const at = existing !== -1 ? existing : slugClash;
    fail(
      `"${projects[at].title}" (${projects[at].slug}) is already in the portfolio at position ${at + 1}. ` +
        'To change where it appears, run the "Move Project" workflow instead.',
    );
  }

  console.log(`Fetching ${repo.url} ...`);
  const facts = await fetchRepoFacts(repo);
  const stack = buildStack(facts.packageJson, facts.languages);
  if (stack.length === 0) console.warn("! Could not detect a stack from dependencies or languages.");

  const liveUrl = normalizeLiveUrl(liveUrlInput) ?? normalizeLiveUrl(facts.meta.homepage);
  if (liveUrlInput && !normalizeLiveUrl(liveUrlInput)) console.warn(`! live_url "${liveUrlInput}" is not a valid URL; ignoring it.`);
  const candidate = {
    id: slug,
    slug,
    bannerImage: `/projects/${slug}.jpg`,
    year: String(new Date(facts.meta.created_at).getUTCFullYear()),
    stack: stack.length ? stack : [facts.meta.language ?? "Software"],
    githubUrl: repo.url,
  };

  console.log(`Generating text with ${GROQ_MODEL} ...`);
  const text = await generateText(projects, facts, candidate.stack, candidate);

  const outDir = dryRun ? fs.mkdtempSync(path.join(os.tmpdir(), "add-project-")) : bannerDir;
  const bannerLink = String(imageUrlInput ?? "").trim() || undefined;
  console.log(
    bannerLink ? `Using image link ${bannerLink} ...` : liveUrl ? `Capturing banner from ${liveUrl} ...` : "No image or live URL; generating banner card ...",
  );
  const banner = await createBanner({
    slug,
    liveUrl,
    imageUrl: bannerLink,
    outDir,
    card: { title: text.title, category: text.category, stack: candidate.stack, githubUrl: repo.url },
  });

  // Key order mirrors existing entries in data/projects.json.
  const entry = {
    id: candidate.id,
    slug: candidate.slug,
    title: text.title,
    category: text.category,
    bannerImage: candidate.bannerImage,
    bannerAlt: text.bannerAlt,
    year: candidate.year,
    role: text.role,
    summary: text.summary,
    details: text.details,
    stack: candidate.stack,
    ...(liveUrl ? { liveUrl } : {}),
    challenge: text.challenge,
    solution: text.solution,
    impact: text.impact,
    githubUrl: repo.url,
    highlight: text.highlight,
  };
  const problems = validateProject(entry);
  if (problems.length) throw new Error(`Final entry is invalid: ${problems.join("; ")}`);

  const index = positionToIndex(position, projects.length);
  const next = insertAt(projects, entry, index);
  const finalPosition = index + 1;

  const branch = `project/add-${slug}`;
  const repository = process.env.GITHUB_REPOSITORY;
  const imageUrl = repository
    ? `https://raw.githubusercontent.com/${repository}/${branch}/public/projects/${slug}.jpg`
    : banner.file;
  const body = buildPrBody({ entry, position: finalPosition, count: next.length, before: next.map((p) => p.title), banner, imageUrl });
  fs.writeFileSync(prBodyFile, body, "utf8");

  if (dryRun) {
    console.log(`\n--- DRY RUN: nothing written to data/ or public/ ---`);
    console.log(`Would insert at position ${finalPosition} of ${next.length}`);
    console.log(`Banner (${banner.source}): ${banner.file}`);
    console.log(`PR body: ${prBodyFile}\n`);
    console.log(JSON.stringify(entry, null, 2));
    return;
  }

  writeProjects(next);
  setOutputs({ slug, title: entry.title, position: String(finalPosition), branch, pr_body_file: prBodyFile });
  console.log(`Added "${entry.title}" at position ${finalPosition} of ${next.length}; banner: ${banner.source}.`);
}

main().catch((error) => fail(error.message));
