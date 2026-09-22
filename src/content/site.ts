/** Canonical public origin for sitemap, robots, metadata, and schema. */
export const SITE_URL = 'https://ibm.io';

export const SITE_NAME = 'Michael Senkow';

export const SITE_TAGLINE =
	'Staff Product Designer — complex tooling, data workflows, and product systems.';

/** First-party PDF — avoids Drive login walls for interviewers. */
export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? '/resume.pdf';
