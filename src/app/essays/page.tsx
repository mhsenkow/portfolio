import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedEssays } from "@/content/essays";
import { SITE_NAME } from "@/content/site";
import styles from "./essays.module.css";

export const metadata: Metadata = {
	title: "Essays",
	description: `Rare long-form writing from ${SITE_NAME} — process, tools, and systems.`,
	alternates: { canonical: "/essays" },
};

function formatDate(iso: string) {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${iso}T00:00:00Z`));
}

export default function EssaysPage() {
	const essays = listPublishedEssays();

	return (
		<main id="content">
			<section className={`container ${styles.page}`}>
				<header className={styles.mast}>
					<p className={styles.hint}>rare · long · when it earns the space</p>
					<h1 className={`h1 ${styles.title}`}>Essays</h1>
					<p className={styles.lede}>
						Occasional long-form writing — process, tools, and systems. Not a feed.
					</p>
				</header>

				{essays.length === 0 ? (
					<p className={styles.empty}>Nothing published yet.</p>
				) : (
					<ul className={styles.list}>
						{essays.map((essay) => (
							<li key={essay.slug} className={styles.item}>
								<Link href={`/essays/${essay.slug}`}>
									<h2 className={styles.itemTitle}>{essay.title}</h2>
									<p className={styles.itemMeta}>{formatDate(essay.date)}</p>
									<p className={styles.itemDesc}>{essay.description}</p>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
