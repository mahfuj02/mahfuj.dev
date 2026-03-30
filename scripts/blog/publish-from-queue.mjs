import {
  getTodayUtcDate,
  makeSlugUnique,
  pickRandom,
  postsPath,
  queuePath,
  readJson,
  runsPath,
  usedProblemsPath,
  writeJson,
} from "./shared.mjs";

const slotsUtc = [0, 4, 8, 12, 16, 20];

function computeDailyTargetSlot(dateText) {
  const hash = [...dateText].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return slotsUtc[hash % slotsUtc.length];
}

function currentUtcHour() {
  return Number(new Date().toISOString().slice(11, 13));
}

function shouldPublishToday(force, alreadyPublished) {
  if (force) {
    return true;
  }

  if (alreadyPublished) {
    return false;
  }

  const today = getTodayUtcDate();
  const targetSlot = computeDailyTargetSlot(today);
  return currentUtcHour() >= targetSlot;
}

function normalizePublishedPost(item, existingSlugs) {
  const post = { ...item.post };
  post.publishedAt = getTodayUtcDate();
  post.slug = makeSlugUnique(post.slug, existingSlugs);
  return post;
}

function parseForceFlag() {
  return process.argv.includes("--force");
}

async function main() {
  const force = parseForceFlag();

  const posts = readJson(postsPath, []);
  const queue = readJson(queuePath, { items: [] });
  const used = readJson(usedProblemsPath, { keys: [] });
  const runs = readJson(runsPath, { publishedDates: [] });

  const today = getTodayUtcDate();
  const alreadyPublished = (runs.publishedDates ?? []).includes(today);

  if (!shouldPublishToday(force, alreadyPublished)) {
    console.log("Skip publish for this run (waiting for randomized daily slot or already published).");
    process.exit(0);
  }

  if (!Array.isArray(queue.items) || queue.items.length === 0) {
    console.log("Queue is empty. Nothing to publish.");
    process.exit(0);
  }

  const selected = pickRandom(queue.items, 1)[0];
  queue.items = queue.items.filter((item) => item !== selected);

  const existingSlugs = new Set(posts.map((post) => post.slug));
  const publishedPost = normalizePublishedPost(selected, existingSlugs);

  posts.push(publishedPost);
  used.keys = Array.from(new Set([...(used.keys ?? []), selected.problemKey]));
  runs.publishedDates = Array.from(new Set([...(runs.publishedDates ?? []), today]));

  writeJson(postsPath, posts);
  writeJson(queuePath, queue);
  writeJson(usedProblemsPath, used);
  writeJson(runsPath, runs);

  console.log(`Published blog post: ${publishedPost.slug}`);
}

main();
