/** Canonical public origin for sitemap, robots, metadata, and schema. */
export const SITE_URL = 'https://ibm.io';

export const SITE_NAME = 'Michael Senkow';

export const SITE_TAGLINE = 'i build machines, interfaces, and objects';

export const SITE_ROLE = 'Staff Product Designer | UX for AI Tools, Research & Design Systems';

/**
 * Intro greeting — resume voice, keep it to two short beats.
 */
export const SITE_GREETING = [
	"Hi — UX designer for AI-powered and internal tools: research to product design to visual/brand systems to front-end contribution. Meta Staff PD on cross-pillar data/AI; also Microsoft, IBM, Apple.",
	"Comfortable as a shared design resource — feedback sessions, Figma specs/prototypes, visual cohesion, and design-to-code fluency (React/TS, Storybook) so teams ship on-brand.",
] as const;

/** Flattened for meta / OG / search snippets. */
export const SITE_BLURB = SITE_GREETING.join(' ');

/** First-party PDF — avoids Drive login walls for interviewers. */
export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? '/resume.pdf';

export const CONTACT_EMAIL = 'mhsenkow@gmail.com';
