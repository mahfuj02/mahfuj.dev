import fs from "node:fs";
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
const MAX_COMMITS_PER_DAY = 3;

const stageCommitMessages = {
  1: [
    "docs(blog): draft approach notes for {title}",
    "chore(blog): initialize draft walkthrough for {title}",
    "docs(blog): add first-pass draft for {title}",
  ],
  2: [
    "refactor(blog): refine explanation and edge cases for {title}",
    "docs(blog): improve solution reasoning for {title}",
    "chore(blog): enrich draft details for {title}",
  ],
  3: [
    "feat(blog): publish finalized post for {title}",
    "docs(blog): finalize and publish {title}",
    "feat(blog): ship complete writeup for {title}",
  ],
};

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

function shouldStartDailyCycle(force, hasTodayProgress, alreadyPublishedToday) {
  if (force) {
    return true;
  }

  if (hasTodayProgress) {
    return true;
  }

  return shouldPublishToday(false, alreadyPublishedToday);
}

function ensureRunsShape(runs) {
  return {
    publishedDates: Array.isArray(runs?.publishedDates) ? runs.publishedDates : [],
    dailyProgress: runs?.dailyProgress && typeof runs.dailyProgress === "object" ? runs.dailyProgress : {},
    activeDraft: runs?.activeDraft && typeof runs.activeDraft === "object" ? runs.activeDraft : null,
  };
}

function buildCommitMessage(stage, title) {
  const templates = stageCommitMessages[stage] ?? ["chore(blog): update blog content for {title}"];
  const choice = templates[Math.floor(Math.random() * templates.length)];
  return choice.replace("{title}", title);
}

function setWorkflowOutput(key, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath || !value) {
    return;
  }

  process.stdout.write(`Workflow output ${key}: ${value}\n`);
  const sanitized = String(value).replace(/\r?\n/g, " ").trim();
  fs.appendFileSync(outputPath, `${key}=${sanitized}\n`, "utf8");
}

function stageOneRefinePost(post) {
  const refined = { ...post };
  refined.approach = `${post.approach} I also note one brute-force baseline first, then explain the optimized path.`;
  refined.keyPoints = [
    ...post.keyPoints,
    "Start from a baseline idea and clearly explain why optimization is needed.",
  ];
  return refined;
}

function stageTwoRefinePost(post) {
  const refined = { ...post };
  refined.problemInMyWords = `${post.problemInMyWords} I explicitly restate input-output intent to avoid ambiguity before coding.`;
  refined.complexity = {
    ...post.complexity,
    space: post.complexity.space === "O(n)" ? "O(n) (can vary with chosen structure)" : post.complexity.space,
  };
  refined.keyPoints = [
    ...post.keyPoints,
    "Call out tradeoffs and memory behavior in addition to time complexity.",
  ];
  return refined;
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
  const runsRaw = readJson(runsPath, { publishedDates: [] });
  const runs = ensureRunsShape(runsRaw);

  const today = getTodayUtcDate();
  const alreadyPublished = runs.publishedDates.includes(today);
  const progressForToday = runs.dailyProgress[today] ?? null;
  const hasTodayProgress = Boolean(progressForToday);

  if (!shouldStartDailyCycle(force, hasTodayProgress, alreadyPublished)) {
    console.log("Skip publish for this run (waiting for randomized daily slot).");
    process.exit(0);
  }

  if (progressForToday && progressForToday.commitsToday >= MAX_COMMITS_PER_DAY && !force) {
    console.log("Daily commit cap reached for current post.");
    process.exit(0);
  }

  let commitMessage = "";

  if (!progressForToday) {
    if (!Array.isArray(queue.items) || queue.items.length === 0) {
      console.log("Queue is empty. Nothing to start for daily cycle.");
      process.exit(0);
    }

    const selected = pickRandom(queue.items, 1)[0];
    queue.items = queue.items.filter((item) => item !== selected);

    runs.activeDraft = {
      date: today,
      problemKey: selected.problemKey,
      post: stageOneRefinePost(selected.post),
    };

    runs.dailyProgress[today] = {
      problemKey: selected.problemKey,
      slug: selected.post.slug,
      sourceTitle: selected.post.sourceTitle,
      stage: 1,
      commitsToday: 1,
      updatedAt: new Date().toISOString(),
    };

    commitMessage = buildCommitMessage(1, selected.post.sourceTitle);

    writeJson(queuePath, queue);
    writeJson(runsPath, runs);

    console.log(`Prepared draft stage for: ${selected.post.sourceTitle}`);
    setWorkflowOutput("commit_message", commitMessage);
    process.exit(0);
  }

  if (!runs.activeDraft || runs.activeDraft.date !== today) {
    console.log("No active draft found for today; skipping to prevent inconsistency.");
    process.exit(0);
  }

  const activePostTitle = runs.activeDraft.post.sourceTitle;

  if (progressForToday.stage === 1) {
    runs.activeDraft.post = stageTwoRefinePost(runs.activeDraft.post);
    runs.dailyProgress[today] = {
      ...progressForToday,
      stage: 2,
      commitsToday: Math.min(MAX_COMMITS_PER_DAY, (progressForToday.commitsToday ?? 1) + 1),
      updatedAt: new Date().toISOString(),
    };

    commitMessage = buildCommitMessage(2, activePostTitle);

    writeJson(runsPath, runs);
    console.log(`Refined draft stage for: ${activePostTitle}`);
    setWorkflowOutput("commit_message", commitMessage);
    process.exit(0);
  }

  if (progressForToday.stage >= 2) {
    const existingSlugs = new Set(posts.map((post) => post.slug));
    const publishItem = {
      problemKey: runs.activeDraft.problemKey,
      post: runs.activeDraft.post,
    };
    const publishedPost = normalizePublishedPost(publishItem, existingSlugs);

    posts.push(publishedPost);
    used.keys = Array.from(new Set([...(used.keys ?? []), publishItem.problemKey]));
    runs.publishedDates = Array.from(new Set([...(runs.publishedDates ?? []), today]));
    runs.dailyProgress[today] = {
      ...progressForToday,
      stage: 3,
      commitsToday: Math.min(MAX_COMMITS_PER_DAY, (progressForToday.commitsToday ?? 2) + 1),
      publishedSlug: publishedPost.slug,
      updatedAt: new Date().toISOString(),
    };
    runs.activeDraft = null;

    commitMessage = buildCommitMessage(3, activePostTitle);

    writeJson(postsPath, posts);
    writeJson(queuePath, queue);
    writeJson(usedProblemsPath, used);
    writeJson(runsPath, runs);

    console.log(`Published blog post: ${publishedPost.slug}`);
    setWorkflowOutput("commit_message", commitMessage);
    process.exit(0);
  }

  console.log("No stage action taken.");
}

main();
