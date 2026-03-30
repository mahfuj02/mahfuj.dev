import Link from "next/link";
import type { Metadata } from "next";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { SiteHeader } from "@/components/site-header";
import {
  BLOG_CATEGORIES,
  categoryLabelMap,
  getAllBlogPosts,
  getPostsByCategory,
  isBlogCategory,
} from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Mahfuj Ahmed",
  description:
    "Notes and writeups on algorithms, data structures, LeetCode problems, and problem-solving patterns.",
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

const categoryStyleMap: Record<string, { active: string; inactive: string; tag: string }> = {
  algorithms: {
    active: "border-cyan-300/70 bg-cyan-400/10 text-cyan-100",
    inactive: "border-zinc-700 text-cyan-200/80 hover:border-cyan-300/45",
    tag: "border-cyan-300/45 bg-cyan-400/10 text-cyan-100",
  },
  "data-structures": {
    active: "border-emerald-300/70 bg-emerald-400/10 text-emerald-100",
    inactive: "border-zinc-700 text-emerald-200/80 hover:border-emerald-300/45",
    tag: "border-emerald-300/45 bg-emerald-400/10 text-emerald-100",
  },
  leetcode: {
    active: "border-amber-300/70 bg-amber-400/10 text-amber-100",
    inactive: "border-zinc-700 text-amber-200/80 hover:border-amber-300/45",
    tag: "border-amber-300/45 bg-amber-400/10 text-amber-100",
  },
};

function formatDate(input: string) {
  return new Date(input).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const activeCategory = category && isBlogCategory(category) ? category : null;
  const posts = activeCategory ? getPostsByCategory(activeCategory) : getAllBlogPosts();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-24 sm:px-6 lg:pt-28">
        <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/45 p-6 sm:p-9">
          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-24 -top-8 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Technical Blog</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">Algorithms and Problem Solving Notes</h1>
            <p className="mt-4 max-w-3xl text-base text-zinc-300 sm:text-lg">
              I document solution strategies, implementation patterns, and lessons from coding problems so I can build a reliable interview and engineering knowledge base.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link
                href="/blog"
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  !activeCategory
                    ? "border-zinc-300/55 bg-zinc-200/10 text-zinc-100"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                All
              </Link>
              {BLOG_CATEGORIES.map((item) => (
                <Link
                  key={item}
                  href={`/blog?category=${item}`}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                    activeCategory === item
                      ? categoryStyleMap[item].active
                      : categoryStyleMap[item].inactive
                  }`}
                >
                  {categoryLabelMap[item]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-zinc-800 bg-zinc-900/35 p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-zinc-100">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.categories.map((tag) => (
                  <span
                    key={`${post.slug}-${tag}`}
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${categoryStyleMap[tag].tag}`}
                  >
                    {categoryLabelMap[tag]}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition-colors hover:text-cyan-100"
              >
                Read post
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </section>

        {posts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/35 p-6 text-zinc-300">
            No posts found for this category yet. Add new entries in your blog data source and they will show here automatically.
          </div>
        )}
      </main>
      <ScrollTopButton />
    </>
  );
}
