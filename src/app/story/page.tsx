import type { Metadata } from "next";
import { SITE_BLURB, SITE_NAME } from "@/content/site";
import { STORY_BLURB } from "@/content/story";
import { StoryProse } from "./StoryProse";
import styles from "./story.module.css";

export const metadata: Metadata = {
	title: "A story",
	description: `${STORY_BLURB} ${SITE_NAME} — ${SITE_BLURB}`,
	alternates: { canonical: "/story" },
};

export default function StoryPage() {
	return (
		<main id="content">
			<section className={`container ${styles.page}`}>
				<header className={styles.mast}>
					<p className={styles.hint}>systems · products · AI · data · craft</p>
					<h1 className={`h1 ${styles.title}`}>A story</h1>
				</header>
				<article aria-label="Career through-line">
					<StoryProse />
				</article>
			</section>
		</main>
	);
}
