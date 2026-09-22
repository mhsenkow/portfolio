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

## Design system

| Concern | Where |
|---------|--------|
| Colors, glass, spacing, type scale | `src/styles/tokens.css` (`data-theme`) |
| Motion durations / reduced-motion | `src/styles/motion.css`, `src/theme/motion.ts` |
| Theme & font catalogs | `src/theme/system.ts` |
| Theme / type UI | `ThemeToggle` (orb + type panel) |
| Card recipe | `.glass-card` (+ `.is-interactive`, `.glass-card--pad`) |

Themes align with the wordcount suite: light, dark, contrast, paper, glass, frost, brutal, loom, tank, nes.

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
