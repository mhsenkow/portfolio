"use client";

import { LinkToken } from "@/app/components/LinkToken";
import { findProject } from "@/content/projects";
import { isStoryToken, STORY_SENTENCES } from "@/content/story";
import { cardThumbPath } from "@/lib/cardThumb";
import styles from "./story.module.css";

function tipFor(slug: string): { description?: string; previewSrc?: string; href: string } {
	const project = findProject(slug);
	const href = `/projects/${project?.slug ?? slug}`;
	const description =
		project?.details?.results && Array.isArray(project.details.results)
			? project.details.results[0]
			: project?.description;
	const src = project?.image?.src;
	return {
		href,
		description,
		previewSrc: src ? cardThumbPath(src) : undefined,
	};
}

export function StoryProse() {
	return (
		<div className={styles.prose}>
			{STORY_SENTENCES.map((parts, i) => (
				<p key={i}>
					{parts.map((part, j) => {
						if (!isStoryToken(part)) return <span key={j}>{part}</span>;
						const tip = tipFor(part.slug);
						return (
							<LinkToken
								key={`${part.slug}-${j}`}
								href={tip.href}
								label={part.label}
								description={tip.description}
								previewSrc={tip.previewSrc}
							/>
						);
					})}
				</p>
			))}
		</div>
	);
}
