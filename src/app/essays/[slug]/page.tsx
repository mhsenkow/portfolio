import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findEssay, listPublishedEssays } from "@/content/essays";
import { SITE_NAME, SITE_URL } from "@/content/site";
import styles from "../essays.module.css";

export function generateStaticParams() {
	return listPublishedEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const essay = findEssay(slug);
	if (!essay) return { title: "Not found" };
	const canonical = `/essays/${essay.slug}`;
	return {
		title: essay.title,
		description: essay.description,
		alternates: { canonical },
		openGraph: {
			title: `${essay.title} — ${SITE_NAME}`,
			description: essay.description,
			url: `${SITE_URL}${canonical}`,
			type: "article",
			publishedTime: essay.date,
			modifiedTime: essay.updated ?? essay.date,
		},
		twitter: {
			card: "summary",
			title: `${essay.title} — ${SITE_NAME}`,
			description: essay.description,
		},
	};
}

function formatDate(iso: string) {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	}).format(new Date(`${iso}T00:00:00Z`));
}

export default async function EssayPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const essay = findEssay(slug);
	if (!essay) notFound();

	const { Body } = essay;

	return (
		<main id="content">
			<section className={`container ${styles.page}`}>
				<header className={styles.articleMast}>
					<Link href="/essays" className={styles.back}>
						← essays
					</Link>
					<h1 className={`h1 ${styles.title}`}>{essay.title}</h1>
					<p className={styles.articleDate}>
						{formatDate(essay.date)}
						{essay.updated ? ` · updated ${formatDate(essay.updated)}` : null}
					</p>
				</header>
				<article className={styles.prose} aria-label={essay.title}>
					<Body />
				</article>
			</section>
		</main>
	);
}
