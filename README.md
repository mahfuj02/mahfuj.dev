# mahfuj.dev — Developer Portfolio

A modern, animated developer portfolio built with **Next.js 14**, **TypeScript**, **TailwindCSS**, **Framer Motion**, and **React Three Fiber** for interactive 3D elements.

**Live:** [mahfuj.dev](https://mahfuj.dev)

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **TailwindCSS** for responsive design
- ✨ **Framer Motion** for smooth animations
- 🎯 **React Three Fiber** for 3D graphics and interactive backgrounds
- 📱 **Fully Responsive** mobile-first design
- ♿ **Accessible** and performant

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber, Three.js
- **Package Manager:** npm

## Getting Started

### Prerequisites
- Node.js 18+ and npm installed

### Installation

```bash
git clone https://github.com/mahfuj02/mahfuj.dev.git
cd mahfuj.dev
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

### Production Build

```bash
npm run build
npm run start
```

## Deployment

Deploy easily to **Vercel** (recommended for Next.js):

1. Push your code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Link your custom domain (`mahfuj.dev`)
4. Auto-deploys on every push

## Blog Automation (Daily Commits)

This repo includes file-based blog automation under `data/blog` and GitHub workflows under `.github/workflows`.

### Storage

- `data/blog/posts.json`: published blog posts shown on the site
- `data/blog/queue.json`: queued draft posts waiting to publish
- `data/blog/used-problems.json`: dedupe keys to prevent repeat problems
- `data/blog/runs.json`: publish history for one-post-per-day control

### Local Commands

```bash
npm run blog:queue
npm run blog:publish
npm run blog:publish:force
```

### GitHub Author Setup (Important)

To make daily commits count for your GitHub contribution graph, set these repository secrets:

- `GH_COMMIT_NAME`: your GitHub display/commit name
- `GH_COMMIT_EMAIL`: your verified GitHub email (recommended: your GitHub noreply email)

Find your noreply email at:
GitHub -> Settings -> Emails -> "Keep my email addresses private"

Then add secrets at:
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret

### Workflows

- `blog-queue.yml`: fills the queue on schedule or manual run
- `blog-daily-publish.yml`: publishes exactly one queued post per day at a randomized UTC slot

## Adding projects

Projects live in `data/projects.json`. **Array order is display order** — index 0 is the large featured card, and every project in the file is shown on the homepage.

### Add a project

1. GitHub -> **Actions** -> **Add Project** -> **Run workflow**.
2. Fill in `repo_url` (e.g. `https://github.com/mahfuj02/some-project`) and optionally `position` (default `1` = top/featured; a number past the end of the list appends). Everything at or after that position shifts down by one; nothing is removed.
3. A pull request opens with the generated text, the position and the banner image. Review it (phone-friendly), edit `data/projects.json` in the PR if needed, and merge.

The workflow reads the repo (metadata, languages, `package.json`, README), writes the copy with Groq (`llama-3.3-70b-versatile`) using only those facts, builds the `stack`, and creates `public/projects/<slug>.jpg` (a 1600x900 screenshot of the live site, or a generated card if there is no live URL or the screenshot fails). If the project already exists it fails and tells you to use **Move Project**.

### Move a project

**Actions** -> **Move Project** -> **Run workflow** with `repo_url` (or the project slug) and `position`. Only the order changes, and a PR opens.

### Setup

- Secrets (Settings -> Secrets and variables -> Actions): `GROQ_API_KEY` (required), `GH_PAT` (optional; a token with read access, only needed for private repos).
- Settings -> Actions -> General -> Workflow permissions: enable **Allow GitHub Actions to create and approve pull requests**.
- Images in the PR description load from this repo, so they only render for people who can read it.

### Local dry run

```bash
GROQ_API_KEY=... npm run projects:add -- --repo-url https://github.com/<owner>/<repo> --position 2 --dry-run
npm run projects:move -- --project <slug> --position 1 --dry-run
```

Dry runs print the result and write nothing to `data/` or `public/`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Main layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   └── Contact.tsx
└── lib/               # Utilities
```

## License

MIT
