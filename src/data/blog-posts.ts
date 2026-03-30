export const BLOG_CATEGORIES = [
  "algorithms",
  "data-structures",
  "leetcode",
] as const;

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

const blogPosts: BlogPost[] = [
  {
    slug: "two-sum-hash-map-pattern",
    title: "Two Sum with Hash Map: My Reliable O(n) Pattern",
    excerpt:
      "A practical walkthrough of how I use a hash map for Two Sum, including edge-case checks and why one-pass lookup is enough.",
    publishedAt: "2026-03-30",
    readTimeMinutes: 4,
    categories: ["algorithms", "data-structures", "leetcode"],
    sourcePlatform: "leetcode",
    sourceTitle: "Two Sum",
    sourceUrl: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    problemInMyWords:
      "Given a list of numbers and a target value, I need to find two different indices whose values add up to the target.",
    approach:
      "I scan the array once. For each value, I compute its complement (target - current). If I have already seen that complement in a hash map, I return the saved index and current index. Otherwise I store current value and index in the map.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    keyPoints: [
      "Use one pass to avoid nested loops.",
      "Map stores value -> index for quick complement lookup.",
      "Check complement before inserting current element.",
    ],
    implementations: {
      typescript: `function twoSum(nums: number[], target: number): [number, number] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const complement = target - value;

    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }

    seen.set(value, i);
  }

  throw new Error("No valid pair found");
}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}

    for i, value in enumerate(nums):
        complement = target - value

        if complement in seen:
            return [seen[complement], i]

        seen[value] = i

    raise ValueError("No valid pair found")`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
  unordered_map<int, int> seen;

  for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
    int complement = target - nums[i];
    auto it = seen.find(complement);

    if (it != seen.end()) {
      return {it->second, i};
    }

    seen[nums[i]] = i;
  }

  return {};
}`,
    },
  },
  {
    slug: "valid-parentheses-stack-basics",
    title: "Valid Parentheses: Why Stack Is the Cleanest Fit",
    excerpt:
      "How I approach bracket-matching problems with a stack, and the exact checks that avoid false positives.",
    publishedAt: "2026-03-28",
    readTimeMinutes: 5,
    categories: ["algorithms", "data-structures", "leetcode"],
    sourcePlatform: "leetcode",
    sourceTitle: "Valid Parentheses",
    sourceUrl: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: "Easy",
    problemInMyWords:
      "I need to verify that every opening bracket is closed in the correct order and by the correct bracket type.",
    approach:
      "I push opening symbols into a stack. When I read a closing symbol, I check whether the top of stack has its matching opening pair. If mismatch or stack is empty, the string is invalid. At the end, stack must be empty.",
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    keyPoints: [
      "Early return on mismatch improves readability.",
      "A mapping table avoids repeated condition chains.",
      "Final stack emptiness check is mandatory.",
    ],
    implementations: {
      typescript: `function isValid(s: string): boolean {
  const pairs: Record<string, string> = {")": "(", "]": "[", "}": "{"};
  const stack: string[] = [];

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
      continue;
    }

    const top = stack.length ? stack.pop() : undefined;
    if (top !== pairs[ch]) {
      return false;
    }
  }

  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for ch in s:
      if ch in "([{":
        stack.append(ch)
        continue

      top = stack.pop() if stack else None
      if top != pairs.get(ch):
        return False

    return len(stack) == 0`,
      cpp: `#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

bool isValid(const string& s) {
  unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
  vector<char> stack;

  for (char ch : s) {
    if (ch == '(' || ch == '[' || ch == '{') {
      stack.push_back(ch);
      continue;
    }

    if (stack.empty() || stack.back() != pairs[ch]) {
      return false;
    }
    stack.pop_back();
  }

  return stack.empty();
}`,
    },
  },
  {
    slug: "binary-search-first-true-template",
    title: "Binary Search Template I Reuse for First True",
    excerpt:
      "A reusable binary search template for boundary problems, with loop invariants and off-by-one safety tips.",
    publishedAt: "2026-03-25",
    readTimeMinutes: 6,
    categories: ["algorithms"],
    sourcePlatform: "custom",
    sourceTitle: "Boundary Search Pattern Notes",
    sourceUrl: "https://mahfuj.dev",
    problemInMyWords:
      "For monotonic boolean conditions, I want the smallest index where the condition becomes true.",
    approach:
      "I maintain two pointers left and right. While left < right, I test mid. If predicate(mid) is true, I keep the left half including mid. Otherwise I move left to mid + 1. This converges to the first true index.",
    complexity: {
      time: "O(log n)",
      space: "O(1)",
    },
    keyPoints: [
      "Use mid = left + Math.floor((right - left) / 2) to avoid overflow patterns.",
      "Keep a clear invariant: answer is always inside [left, right].",
      "Use left < right condition for boundary problems.",
    ],
    implementations: {
      typescript: `function firstTrue(n: number, predicate: (x: number) => boolean): number {
  let left = 0;
  let right = n - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (predicate(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
      python: `def first_true(n: int, predicate) -> int:
    left = 0
    right = n - 1

    while left < right:
        mid = left + (right - left) // 2

        if predicate(mid):
            right = mid
        else:
            left = mid + 1

    return left`,
      cpp: `int firstTrue(int n, const function<bool(int)>& predicate) {
  int left = 0;
  int right = n - 1;

  while (left < right) {
    int mid = left + (right - left) / 2;

    if (predicate(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}`,
    },
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory) {
  return getAllBlogPosts().filter((post) => post.categories.includes(category));
}

export function isBlogCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory);
}
