/**
 * Copy to `your-slug.tsx`, fill meta + Body, then register in `../index.ts`:
 *
 *   import { meta, Body } from "./posts/your-slug";
 *   // essays.push({ ...meta, Body });
 *
 * Keep `status: "draft"` until you're ready for sitemap / public routes.
 */
import type { EssayMeta } from "../types";

export const meta = {
	slug: "your-slug",
	title: "Title",
	description: "One-line premise for indexes, OG, and search.",
	date: "2026-10-05",
	relatedProjects: [],
	status: "draft",
} satisfies EssayMeta;

export function Body() {
	return (
		<>
			<p>Lead with the claim. Long essays earn their length.</p>
			<h2>Section</h2>
			<p>Prose goes here. Embed project chips or demos when they help.</p>
		</>
	);
}
