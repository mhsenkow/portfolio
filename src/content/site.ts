/** Canonical public origin for sitemap, robots, metadata, and schema. */
export const SITE_URL = 'https://ibm.io';

export const SITE_NAME = 'Michael Senkow';

export const SITE_TAGLINE = 'portfolio : i build machines';

export const SITE_ROLE = 'Staff Product Designer / Creative Technologist';

/**
 * Intro greeting — resume voice, keep it to two short beats.
 */
export const SITE_GREETING = [
	"Hi — staff-level product designer shipping AI-assisted workflows, data tools, and design systems across Microsoft, Meta, IBM, Apple, and startups.",
	"I turn complex systems into durable interfaces: notebooks, insights, alerts, and enterprise data tooling — with design-to-engineering fluency.",
] as const;

/** Flattened for meta / OG / search snippets. */
export const SITE_BLURB = SITE_GREETING.join(' ');

/** First-party PDF — avoids Drive login walls for interviewers. */
export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? '/resume.pdf';

export const CONTACT_EMAIL = 'mhsenkow@gmail.com';
