import {
  computeReadTimeMinutes,
  inferCategories,
  makeSlugUnique,
  pickRandom,
  postsPath,
  queuePath,
  readJson,
  usedProblemsPath,
  writeJson,
} from "./shared.mjs";

const FALLBACK_PROBLEMS = [
  { id: 121, title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", difficulty: "Easy" },
  { id: 217, title: "Contains Duplicate", slug: "contains-duplicate", difficulty: "Easy" },
  { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", difficulty: "Medium" },
  { id: 11, title: "Container With Most Water", slug: "container-with-most-water", difficulty: "Medium" },
  { id: 53, title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "Medium" },
  { id: 15, title: "3Sum", slug: "3sum", difficulty: "Medium" },
  { id: 424, title: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement", difficulty: "Medium" },
  { id: 300, title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", difficulty: "Medium" },
  { id: 200, title: "Number of Islands", slug: "number-of-islands", difficulty: "Medium" },
  { id: 33, title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", difficulty: "Medium" }
];

function mapDifficulty(level) {
  if (level === 1) return "Easy";
  if (level === 2) return "Medium";
  return "Hard";
}

async function fetchLeetCodeProblems() {
  try {
    const response = await fetch("https://leetcode.com/api/problems/all/");
    if (!response.ok) {
      throw new Error(`LeetCode API failed with status ${response.status}`);
    }

    const data = await response.json();
    const pairs = Array.isArray(data?.stat_status_pairs) ? data.stat_status_pairs : [];

    return pairs
      .filter((item) => !item.paid_only && item?.stat?.question__title && item?.stat?.question_id)
      .map((item) => ({
        id: item.stat.question_id,
        title: item.stat.question__title,
        slug: item.stat.question__title_slug,
        difficulty: mapDifficulty(item.difficulty?.level),
      }));
  } catch {
    return FALLBACK_PROBLEMS;
  }
}

function buildDraft(problem, existingSlugs) {
  const baseSlug = `${problem.slug}-solution-notes`;
  const slug = makeSlugUnique(baseSlug, existingSlugs);
  const title = `${problem.title}: Pattern and Complexity Walkthrough`;

  const problemInMyWords = `In my own words, this problem asks me to solve ${problem.title} with a correct and efficient strategy while handling edge cases cleanly.`;
  const approach = `I focus on choosing the right data structure and reducing repeated work. I validate complexity, edge cases, and produce maintainable code for interview discussion.`;
  const keyPoints = [
    "Clarify constraints and expected output before coding.",
    "Pick a data structure that minimizes repeated computation.",
    "Validate with edge cases and explain complexity tradeoffs.",
  ];

  const contentForReadTime = [title, problemInMyWords, approach, ...keyPoints].join(" ");

  return {
    problemKey: `leetcode:${problem.id}`,
    post: {
      slug,
      title,
      excerpt: `A concise walkthrough for ${problem.title} with clear approach, complexity, and multi-language implementation templates.`,
      publishedAt: "",
      readTimeMinutes: computeReadTimeMinutes(contentForReadTime),
      categories: inferCategories(problem.title),
      sourcePlatform: "leetcode",
      sourceTitle: problem.title,
      sourceUrl: `https://leetcode.com/problems/${problem.slug}/`,
      difficulty: problem.difficulty,
      problemInMyWords,
      approach,
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
      keyPoints,
      implementations: {
        typescript: `// TypeScript template for ${problem.title}\nfunction solve(input: unknown): unknown {\n  // TODO: implement final logic\n  return input;\n}`,
        python: `# Python template for ${problem.title}\ndef solve(input_data):\n    # TODO: implement final logic\n    return input_data`,
        cpp: `// C++ template for ${problem.title}\n#include <bits/stdc++.h>\nusing namespace std;\n\nauto solve(auto input) {\n  // TODO: implement final logic\n  return input;\n}`,
      },
    },
  };
}

async function main() {
  const countArg = process.argv.find((arg) => arg.startsWith("--count="));
  const requested = countArg ? Number(countArg.split("=")[1]) : 7;
  const count = Number.isFinite(requested) && requested > 0 ? requested : 7;

  const posts = readJson(postsPath, []);
  const queue = readJson(queuePath, { items: [] });
  const used = readJson(usedProblemsPath, { keys: [] });

  const usedKeys = new Set(used.keys);
  const queuedKeys = new Set((queue.items ?? []).map((item) => item.problemKey));
  const existingSlugs = new Set([
    ...posts.map((post) => post.slug),
    ...(queue.items ?? []).map((item) => item.post.slug),
  ]);

  const problems = await fetchLeetCodeProblems();
  const available = problems.filter((problem) => {
    const key = `leetcode:${problem.id}`;
    return !usedKeys.has(key) && !queuedKeys.has(key);
  });

  if (available.length === 0) {
    console.log("No new problems available for queue.");
    process.exit(0);
  }

  const selected = pickRandom(available, Math.min(count, available.length));
  const drafts = selected.map((problem) => {
    const draft = buildDraft(problem, existingSlugs);
    existingSlugs.add(draft.post.slug);
    return draft;
  });

  queue.items = [...(queue.items ?? []), ...drafts];
  writeJson(queuePath, queue);

  console.log(`Queued ${drafts.length} new draft posts.`);
}

main();
