import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fail, findProjectIndex, moveTo, parseArgs, parsePosition, positionToIndex, readProjects, setOutputs, writeProjects } from "./lib.mjs";

const args = parseArgs(process.argv.slice(2));
const ref = args.project ?? args["repo-url"] ?? process.env.PROJECT_REF;
const prBodyFile = args["pr-body-file"] ?? process.env.PR_BODY_FILE ?? path.join(os.tmpdir(), "move-project-pr-body.md");
const dryRun = Boolean(args["dry-run"]);

function orderList(projects, highlightSlug) {
  return projects.map((p, i) => `${i + 1}. ${p.title}${p.slug === highlightSlug ? " **← moved**" : ""}${i === 0 ? " _(featured)_" : ""}`);
}

function main() {
  if (!ref) fail("project is required: a GitHub repo URL or a project slug (--project <url|slug>).");
  const position = parsePosition(args.position ?? process.env.POSITION) ?? 1;

  const projects = readProjects();
  const from = findProjectIndex(projects, ref);
  if (from === -1) {
    fail(`No project matches "${ref}". Known slugs: ${projects.map((p) => p.slug).join(", ")}. To add a new project use the "Add Project" workflow.`);
  }

  const project = projects[from];
  const to = positionToIndex(position, projects.length - 1);
  if (to === from) fail(`"${project.title}" is already at position ${from + 1}; nothing to change.`);

  const next = moveTo(projects, from, position);
  const body = [
    `## Move project: ${project.title}`,
    "",
    `**Position:** ${from + 1} → ${to + 1} of ${projects.length}`,
    "",
    "### Order before",
    "",
    ...orderList(projects),
    "",
    "### Order after",
    "",
    ...orderList(next, project.slug),
    "",
    "_Only the order in `data/projects.json` changes; no project content is modified._",
    "",
  ].join("\n");
  fs.writeFileSync(prBodyFile, body, "utf8");

  if (dryRun) {
    console.log(`DRY RUN: would move "${project.title}" from ${from + 1} to ${to + 1}\n`);
    console.log(body);
    return;
  }

  writeProjects(next);
  setOutputs({ slug: project.slug, title: project.title, from: String(from + 1), position: String(to + 1), pr_body_file: prBodyFile });
  console.log(`Moved "${project.title}" from position ${from + 1} to ${to + 1}.`);
}

try {
  main();
} catch (error) {
  fail(error.message);
}
