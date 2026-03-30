import fs from "node:fs";
import path from "node:path";

export const blogDir = path.join(process.cwd(), "data", "blog");
export const postsPath = path.join(blogDir, "posts.json");
export const queuePath = path.join(blogDir, "queue.json");
export const usedProblemsPath = path.join(blogDir, "used-problems.json");
export const runsPath = path.join(blogDir, "runs.json");

export function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function pickRandom(items, count) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function computeReadTimeMinutes(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 180));
}

export function inferCategories(title) {
  const lower = title.toLowerCase();
  const categories = new Set(["algorithms", "leetcode"]);

  if (
    /stack|queue|heap|tree|graph|trie|linked list|array|hash|set|map/.test(lower)
  ) {
    categories.add("data-structures");
  }

  return [...categories];
}

export function makeSlugUnique(slug, existingSlugs) {
  if (!existingSlugs.has(slug)) {
    return slug;
  }

  let i = 2;
  while (existingSlugs.has(`${slug}-${i}`)) {
    i += 1;
  }

  return `${slug}-${i}`;
}

export function getTodayUtcDate() {
  return new Date().toISOString().slice(0, 10);
}
