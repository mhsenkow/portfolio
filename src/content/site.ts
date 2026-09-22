/** Canonical public origin for sitemap, robots, metadata, and schema. */
export const SITE_URL = 'https://ibm.io';

export const SITE_NAME = 'Michael Senkow';

export const SITE_TAGLINE =
	'Staff Product Designer — complex tooling, data workflows, and product systems.';

const RESUME_FALLBACK_URL =
	'https://drive.google.com/file/d/1AOqIET8BF5kRcZuXYrEYPFMxweFE4GPZ/view?usp=sharing';

export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL ?? RESUME_FALLBACK_URL;
