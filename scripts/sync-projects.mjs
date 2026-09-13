// Refresh name/description/links in src/data/projects.json from the GitHub API.
// Thumbnails and tech lists are kept as-is. Run: npm run sync:projects
// Set GITHUB_TOKEN to raise the unauthenticated rate limit.
//
// Heads up: descriptions in projects.json have been copy-edited (trailing "..."
// removed, a redundant URL dropped). This script overwrites them with the raw
// GitHub text, so review `git diff src/data/projects.json` after running it.
import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../src/data/projects.json", import.meta.url);
const projects = JSON.parse(await readFile(file, "utf8"));

const headers = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

for (const project of projects) {
  const res = await fetch(`https://api.github.com/repositories/${project.id}`, {
    headers,
  });
  if (!res.ok) {
    console.error(`${project.id} (${project.name}): HTTP ${res.status}`);
    continue;
  }
  const { name, description, homepage, html_url } = await res.json();
  Object.assign(project, {
    name,
    description: description ?? "",
    homepage: homepage ?? "",
    html_url,
  });
  console.log(`updated ${name}`);
}

await writeFile(file, `${JSON.stringify(projects, null, 2)}\n`);
