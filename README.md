# react-portfolio

Personal portfolio site for Kiran Suthar. React + TypeScript + Vite, styled with SASS.

Live at [kiransuthar.in](https://www.kiransuthar.in).

## Getting started

```bash
npm install
npm run dev
```

That is the whole setup. No environment variables are needed to run or build the site.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on port 5173 |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run sync:projects` | Refresh project metadata from the GitHub API |
| `npm run optimize:images` | Convert screenshots to WebP thumbnails |

## Project data

The cards in the Projects section are built from `src/data/projects.json`, which is
bundled at build time. The site makes no API calls at runtime, so it does not depend
on GitHub's rate limit for visitors.

To refresh titles, descriptions and links from GitHub:

```bash
npm run sync:projects
```

Descriptions in that file have been lightly copy-edited, and the script overwrites
them with the raw GitHub text, so review `git diff src/data/projects.json` afterwards.

The script works without any credentials. Unauthenticated GitHub requests are capped
at 60 per hour and the script makes one per project, so set `GITHUB_TOKEN` only if you
run it repeatedly and hit that limit.

## Adding a project screenshot

Thumbnails are 1000px-wide WebP files in `public/images/`, displayed at a 16:9 crop.
To convert new full-size screenshots:

```bash
npm run optimize:images -- path/to/screenshots
```

Requires `cwebp` (`brew install webp`). Then reference the output in
`src/data/projects.json` and commit the WebP files, not the originals.

## A note on environment variables

Vite inlines any variable whose name starts with `VITE_` directly into the client
bundle, where anyone who opens the site can read it. **Never put a secret behind that
prefix.** Build-time-only values, like `GITHUB_TOKEN` above, must stay unprefixed so
they never reach the browser.

Real `.env` files are gitignored. Keep it that way: a committed token is a leaked
token, even if the commit is later reverted, because it stays in the git history.
