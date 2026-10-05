import type { ComponentType } from "react";

export type EssayMeta = {
	slug: string;
	title: string;
	description: string;
	/** ISO date — publish day */
	date: string;
	updated?: string;
	/** Project slugs for LinkToken / related work */
	relatedProjects?: string[];
	status: "draft" | "published";
};

export type Essay = EssayMeta & {
	Body: ComponentType;
};
