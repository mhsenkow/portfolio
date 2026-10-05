import type { Essay, EssayMeta } from "./types";

/**
 * Rare long essays — add a post module under `./posts/` and register it here.
 * Drafts (`status: "draft"`) stay out of routes, sitemap, and goto until published.
 */
const essays: Essay[] = [
	// import { meta, Body } from "./posts/your-slug"; then push { ...meta, Body }
];

export function listPublishedEssays(): Essay[] {
	return essays
		.filter((e) => e.status === "published")
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function findEssay(slug: string): Essay | undefined {
	return listPublishedEssays().find((e) => e.slug === slug);
}

export function essayMetas(): EssayMeta[] {
	return listPublishedEssays().map(({ Body: _Body, ...meta }) => meta);
}

export type { Essay, EssayMeta } from "./types";
