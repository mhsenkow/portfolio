"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { projects as allProjects, type Project } from "@/content/projects";
import { fadeUpVariants, itemTransition, listStagger } from "@/theme/motion";

export function ProjectsGrid({ items }: { items?: Project[] }) {
	const reduceMotion = useReducedMotion();
	const list =
		items ??
		[...allProjects.filter((p) => p.featured === true)].sort((a, b) => {
			const rank = (p: Project) => (p.category === "creative" ? 1 : 0);
			const byKind = rank(a) - rank(b);
			if (byKind !== 0) return byKind;
			return (b.year ?? 0) - (a.year ?? 0);
		});

	const item = fadeUpVariants(reduceMotion);

	return (
		<motion.div
			className={styles.grid}
			style={{ marginTop: "var(--space-8)" }}
			initial="hidden"
			animate="show"
			variants={listStagger(reduceMotion, 0.05)}
		>
			{list.map((p) => (
				<motion.div
					key={p.slug}
					variants={item}
					transition={itemTransition(reduceMotion)}
				>
					<Link
						href={`/projects/${p.slug}`}
						className="glass-card is-interactive glass-card--pad"
					>
						{p.image && (
							<div className="card-image">
								<Image
									src={p.image.src}
									alt={p.image.alt}
									fill
									sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
									quality={75}
								/>
							</div>
						)}
						<div className={styles.cardBody}>
							<h3 className="h3">{p.title}</h3>
							<p>{p.description}</p>
						</div>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}
