import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCodeTabs } from "@/components/blog-code-tabs";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { SiteHeader } from "@/components/site-header";
import { categoryLabelMap, getAllBlogPosts, getBlogPostBySlug } from "@/data/blog-posts";

const categoryTagClassMap: Record<string, string> = {
  algorithms: "border-cyan-300/45 bg-cyan-400/10 text-cyan-100",
  "data-structures": "border-emerald-300/45 bg-emerald-400/10 text-emerald-100",
  leetcode: "border-amber-300/45 bg-amber-400/10 text-amber-100",
};

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(input: string) {
  return new Date(input).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found | Mahfuj Ahmed",
    };
  }

  return {
    title: `${post.title} | Mahfuj Ahmed`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-24 sm:px-6 lg:pt-28">
        <article className="rounded-3xl border border-zinc-800 bg-zinc-900/45 p-6 sm:p-8 lg:p-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <span aria-hidden="true">←</span>
            Back to blog
          </Link>

          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {formatDate(post.publishedAt)} · {post.readTimeMinutes} min read
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">{post.excerpt}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.categories.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${categoryTagClassMap[tag]}`}
              >
                {categoryLabelMap[tag]}
              </span>
            ))}
          </div>

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Source</p>
              <p className="mt-2 text-sm text-zinc-200">{post.sourceTitle}</p>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100"
              >
                Open original reference
              </a>
            </article>

            <article className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Complexity</p>
              <p className="mt-2 text-sm text-zinc-200">Time: {post.complexity.time}</p>
              <p className="mt-1 text-sm text-zinc-200">Space: {post.complexity.space}</p>
            </article>
          </section>

          <section className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">Problem in My Words</h2>
              <p className="mt-3 leading-relaxed text-zinc-300">{post.problemInMyWords}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-100">Approach</h2>
              <p className="mt-3 leading-relaxed text-zinc-300">{post.approach}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-100">Key Points</h2>
              <ul className="mt-3 space-y-2 text-zinc-300">
                {post.keyPoints.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <BlogCodeTabs implementations={post.implementations} />
          </section>
        </article>
      </main>
      <ScrollTopButton />
    </>
  );
}
