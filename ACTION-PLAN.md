# SEO Action Plan — Portfolio

## Done
1. Canonical `SITE_URL` → `https://ibm.io`
2. Full sitemap (static pages + all project slugs)
3. Robots host/sitemap + AI crawler allows; disallow `/api/`
4. Root OG/Twitter image (`/images/og.png` 1200×630) + metadata template
5. JSON-LD: ProfilePage/Person, WebSite, CreativeWork (projects)
6. `public/llms.txt`
7. Project `generateStaticParams` + canonicals
8. Remove nested `<main>`
9. Judge slug `/projects/judge` with redirect from legacy `i2systems-lighting-infra`

## Next (deploy)
1. `npm run deploy` so ibm.io picks up metadata/sitemap
2. Verify live: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, view-source home for `ld+json` + og:image
3. Search Console: set preferred domain `ibm.io`, submit sitemap

## Later (optional)
1. BreadcrumbList on case studies
2. Image weight pass on largest gallery assets
3. CWV measurement (PageSpeed mobile) after deploy
