import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";
import satori from "satori";

const require = createRequire(import.meta.url);
const WIDTH = 1600;
const HEIGHT = 900;

function toJpg(input) {
  return sharp(input).resize(WIDTH, HEIGHT, { fit: "cover", position: "top" }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
}

/** Screenshots the live site at 1600x900 after network idle. Throws on any failure. */
export async function screenshotBanner(url) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT } });
    const page = await context.newPage();
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    if (!response || response.status() >= 400) {
      throw new Error(`live site responded with HTTP ${response?.status() ?? "no response"}`);
    }
    await page.waitForTimeout(1_000);
    return await toJpg(await page.screenshot({ type: "png" }));
  } finally {
    await browser.close();
  }
}

function loadFonts() {
  const font = (pkg, file) => fs.readFileSync(path.join(path.dirname(require.resolve(`${pkg}/package.json`)), "files", file));
  return [
    { name: "Geist", data: font("@fontsource/geist-sans", "geist-sans-latin-700-normal.woff"), weight: 700, style: "normal" },
    { name: "Geist Mono", data: font("@fontsource/geist-mono", "geist-mono-latin-400-normal.woff"), weight: 400, style: "normal" },
    { name: "Geist Mono", data: font("@fontsource/geist-mono", "geist-mono-latin-600-normal.woff"), weight: 600, style: "normal" },
  ];
}

const el = (type, style, children) => ({ type, props: { style, children } });

/** Generated 1600x900 card in the site's look: zinc-950 background, zinc-100 title, teal accent, mono chips. */
export async function generateBannerCard({ title, category, stack, githubUrl }) {
  const titleSize = title.length <= 14 ? 150 : title.length <= 24 ? 112 : 84;
  const tree = el(
    "div",
    {
      display: "flex",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: "#09090b",
      fontFamily: "Geist",
      border: "2px solid #27272a",
    },
    [
      el("div", { display: "flex", width: 16, height: HEIGHT, backgroundColor: "#14b8a6" }),
      el(
        "div",
        { display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 110px", gap: 36 },
        [
          el(
            "div",
            { display: "flex", alignItems: "center", gap: 16, fontFamily: "Geist Mono", fontWeight: 600, fontSize: 30, color: "#71717a", letterSpacing: 4 },
            [
              el("div", { display: "flex", width: 16, height: 16, borderRadius: 8, backgroundColor: "#2dd4bf" }, ""),
              el("div", { display: "flex" }, category.toUpperCase()),
            ],
          ),
          el("div", { display: "flex", fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, color: "#f4f4f5" }, title),
          el(
            "div",
            { display: "flex", flexWrap: "wrap", gap: 14 },
            stack.map((tech) =>
              el(
                "div",
                { display: "flex", padding: "10px 22px", borderRadius: 10, backgroundColor: "#27272a", fontFamily: "Geist Mono", fontSize: 30, color: "#a1a1aa" },
                tech,
              ),
            ),
          ),
          githubUrl
            ? el("div", { display: "flex", fontFamily: "Geist Mono", fontSize: 28, color: "#2dd4bf" }, githubUrl.replace(/^https?:\/\//, ""))
            : el("div", { display: "flex" }, ""),
        ],
      ),
    ],
  );

  const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts: loadFonts() });
  return toJpg(Buffer.from(svg));
}

/**
 * Produces the banner for a project: live-site screenshot when possible, generated card otherwise.
 * @returns {{ file: string, source: "screenshot" | "card", note?: string }}
 */
export async function createBanner({ slug, liveUrl, card, outDir }) {
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${slug}.jpg`);
  let note;

  if (liveUrl) {
    try {
      fs.writeFileSync(file, await screenshotBanner(liveUrl));
      return { file, source: "screenshot" };
    } catch (error) {
      note = `Screenshot of ${liveUrl} failed (${error.message.split("\n")[0]}); used generated card instead.`;
      console.warn(`! ${note}`);
    }
  }

  fs.writeFileSync(file, await generateBannerCard(card));
  return { file, source: "card", note };
}
