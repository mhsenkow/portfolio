# SEO Audit — Portfolio Innards

**Site:** https://ibm.io (canonical) · local http://localhost:1338  
**Date:** 2026-09-22  
**Scope:** Codebase SEO configuration (sitemap, robots, metadata, schema, GEO)

## Score card (pre → post local fixes)

| Category | Before | After (local) | Notes |
|----------|--------|---------------|-------|
| Technical / crawl | 35 | 85 | Canonical was wrong domain; sitemap incomplete |
| On-page meta | 55 | 80 | Titles/descriptions improved; OG image added |
| Schema | 10 | 75 | Person/ProfilePage + WebSite + CreativeWork |
| GEO / AI | 20 | 70 | llms.txt + AI crawler allows |
| Images / CWV | — | — | Not fully measured this pass |

**Overall (local, post-fix):** ~78/100 — Good, pending deploy

## Confirmed findings (fixed in source)

### Critical
1. **Canonical domain mismatch** — `metadataBase`, `robots` host, and sitemap used `https://www.mhsenkow.work` while production Workers routes serve **ibm.io**.  
   - **Fix:** `SITE_URL = 'https://ibm.io'` in `src/content/site.ts`; wired through robots/sitemap/layout.

2. **Sitemap missing nearly all indexable URLs** — only `/`, `/about`, `/projects`, `/contact` (contact page does not exist). No project case-study URLs.  
   - **Fix:** Sitemap now emits static routes + every `projects/{slug}`.

### High
3. **No JSON-LD** — no Person / WebSite / CreativeWork.  
   - **Fix:** ProfilePage+Person and WebSite in root layout; CreativeWork on project pages.

4. **No default OG/Twitter image** on site root.  
   - **Fix:** `/images/profile/michael.jpg` as default large image card.

5. **No `llms.txt`** for AI search discoverability.  
   - **Fix:** `public/llms.txt`.

6. **Nested `<main>`** — layout wrapped pages that also render `<main id="content">`.  
   - **Fix:** layout shell uses `<div className="app-main">`.

### Medium
7. Project metadata titles duplicated brand awkwardly; missing per-page canonicals.  
   - **Fix:** title template `%s — Michael Senkow`; canonicals on key routes + projects; `generateStaticParams` for project slugs.

8. Live ibm.io still serving **old** meta (`mhsenkow — portfolio` / “lower case portfolio”) until redeploy.

## Environment limitations
- PageSpeed / CWV not run this pass.
- Live ibm.io HTML reflects last deploy, not local branch until `npm run deploy`.

## Remaining recommendations
- Add a dedicated 1200×630 OG share image (profile square is acceptable but not ideal).
- Consider `BreadcrumbList` JSON-LD on project pages.
- Soft-404/redirect check for legacy Squarespace `#/` hashes if any external links remain.
- After deploy: submit `https://ibm.io/sitemap.xml` in Google Search Console / Bing.
