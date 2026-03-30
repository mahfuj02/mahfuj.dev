import fs from "node:fs";
import path from "node:path";

export const BLOG_CATEGORIES = ["algorithms", "data-structures", "leetcode"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTimeMinutes: number;
  categories: BlogCategory[];
  sourcePlatform: "leetcode" | "custom";
  sourceTitle: string;
  sourceUrl: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  problemInMyWords: string;
  approach: string;
  complexity: {
    time: string;
    space: string;
  };
  keyPoints: string[];
  implementations: {
    typescript: string;
    python: string;
    cpp: string;
  };
};

export const categoryLabelMap: Record<BlogCategory, string> = {
  algorithms: "Algorithms",
  "data-structures": "Data Structures",
  leetcode: "LeetCode",
};

const postsPath = path.join(process.cwd(), "data", "blog", "posts.json");

function readPostsFile(): BlogPost[] {
  try {
    const raw = fs.readFileSync(postsPath, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as BlogPost[];
  } catch {
    return [];
  }
}

export function getAllBlogPosts() {
  return [...readPostsFile()].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getBlogPostBySlug(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory) {
  return getAllBlogPosts().filter((post) => post.categories.includes(category));
}

export function isBlogCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory);
}
