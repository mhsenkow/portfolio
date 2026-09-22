# Michael Senkow — Portfolio

Staff product designer portfolio for **[ibm.io](https://ibm.io)** (`mhsenkow`).

Complex tooling, data workflows, and product systems — enterprise case studies plus independent machines and craft.

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- CSS modules / global tokens (multi-theme)
- Deployed with **OpenNext → Cloudflare Workers** (`wrangler`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:1337](http://localhost:1337).

## Content

| Path | Role |
|------|------|
| `src/content/site.ts` | Site URL, name, tagline, resume |
| `src/content/projects.ts` | Career + creative case studies |
| `src/content/github-builds.ts` | Independent tools / machines |

Home grid shows the full set. `/projects` shows `featured: true` only.

## Deploy

```bash
npm run deploy
```

Custom domains: `ibm.io`, `www.ibm.io` (see `wrangler.jsonc`).

Preview without promoting:

```bash
npm run preview
```

## Useful routes

- `/` — full work grid
- `/projects` — selected case studies
- `/about` — bio + contact
- `/list-view` — chronological archive
- `/other-design-work` — explorations
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`
