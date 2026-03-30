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
