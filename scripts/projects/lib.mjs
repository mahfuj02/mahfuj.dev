import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const projectsPath = path.join(rootDir, "data", "projects.json");
export const bannerDir = path.join(rootDir, "public", "projects");

export function readProjects(filePath = projectsPath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeProjects(projects, filePath = projectsPath) {
  fs.writeFileSync(filePath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
}

export function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Accepts https://github.com/owner/repo, with optional .git, trailing slash, or sub-paths. */
export function parseRepoUrl(input) {
  const match = String(input ?? "")
    .trim()
    .match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?(?:[/?#].*)?$/);
  if (!match) {
    throw new Error(`"${input}" is not a GitHub repo URL (expected https://github.com/<owner>/<repo>).`);
  }
  return { owner: match[1], repo: match[2], url: `https://github.com/${match[1]}/${match[2]}` };
}

export function normalizeGithubUrl(url) {
  try {
    return parseRepoUrl(url).url.toLowerCase();
  } catch {
    return String(url ?? "").trim().replace(/\/+$/, "").toLowerCase();
  }
}

/**
 * Finds a project by GitHub URL or slug. `ref` may be either; returns the index or -1.
 */
export function findProjectIndex(projects, ref) {
  const raw = String(ref ?? "").trim();
  if (!raw) return -1;
  const asUrl = normalizeGithubUrl(raw);
  const asSlug = slugify(raw);
  return projects.findIndex(
    (project) =>
      (project.githubUrl && normalizeGithubUrl(project.githubUrl) === asUrl) ||
      project.slug === raw ||
      project.slug === asSlug ||
      project.id === raw,
  );
}

/**
 * Parses the `position` input (1-based). Missing/blank -> null (caller decides the default).
 * Anything that is not a whole number >= 1 is an error rather than a silent fallback.
 */
export function parsePosition(value) {
  if (value === undefined || value === null || String(value).trim() === "") return null;
  const n = Number(String(value).trim());
  if (!Number.isInteger(n) || n < 1) {
    throw new Error(`position must be a whole number >= 1 (got "${value}").`);
  }
  return n;
}

/** Converts a 1-based position into a 0-based index within [0, maxIndex]; null or too large -> maxIndex. */
export function positionToIndex(position, maxIndex) {
  if (position === null) return maxIndex;
  return Math.min(position - 1, maxIndex);
}

export function insertAt(list, item, index) {
  const copy = [...list];
  copy.splice(index, 0, item);
  return copy;
}

export function moveTo(list, fromIndex, position) {
  const copy = [...list];
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(positionToIndex(position, copy.length), 0, item);
  return copy;
}

const STRING_FIELDS = [
  "id",
  "slug",
  "title",
  "category",
  "bannerImage",
  "bannerAlt",
  "year",
  "role",
  "summary",
  "challenge",
  "solution",
  "impact",
];

/** Returns a list of problems; empty means the object matches the Project type. */
export function validateProject(project) {
  const problems = [];
  if (!project || typeof project !== "object") return ["response is not an object"];
  for (const key of STRING_FIELDS) {
    if (typeof project[key] !== "string" || !project[key].trim()) {
      problems.push(`"${key}" must be a non-empty string`);
    }
  }
  if (!Array.isArray(project.details) || project.details.some((d) => typeof d !== "string" || !d.trim())) {
    problems.push('"details" must be an array of non-empty strings');
  } else if (project.details.length < 4 || project.details.length > 7) {
    problems.push(`"details" must have 4-7 bullets (got ${project.details.length})`);
  }
  if (
    !Array.isArray(project.stack) ||
    project.stack.length === 0 ||
    project.stack.length > 7 ||
    project.stack.some((s) => typeof s !== "string" || !s.trim())
  ) {
    problems.push('"stack" must be 1-7 non-empty strings');
  }
  for (const key of ["liveUrl", "githubUrl", "highlight"]) {
    if (project[key] !== undefined && (typeof project[key] !== "string" || !project[key].trim())) {
      problems.push(`"${key}" must be a non-empty string when present`);
    }
  }
  if (typeof project.highlight === "string" && project.highlight.length > 70) {
    problems.push('"highlight" must be a short tagline (max 70 characters)');
  }
  return problems;
}

export function setOutputs(values) {
  const file = process.env.GITHUB_OUTPUT;
  if (!file) return;
  fs.appendFileSync(file, Object.entries(values).map(([k, v]) => `${k}=${v}`).join("\n") + "\n");
}

export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [key, inline] = arg.slice(2).split("=");
    if (inline !== undefined) args[key] = inline;
    else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith("--")) args[key] = argv[++i];
    else args[key] = true;
  }
  return args;
}

export function fail(message) {
  console.error(`\nError: ${message}`);
  process.exit(1);
}
