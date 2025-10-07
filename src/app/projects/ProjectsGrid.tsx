"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { projects as allProjects, type Project } from '@/content/projects';

export function ProjectsGrid({ items }: { items?: Project[] }) {
    const list = items ?? allProjects.filter((p) => p.featured === true);
	return (
		<motion.div className={styles.grid} style={{ marginTop: 'var(--space-8)' }} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 }}}}>
			{list.map((p) => (
				<motion.div key={p.slug} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
					<Link href={`/projects/${p.slug}`} className={styles.card}>
                        {p.image && (
                            <div className={styles.image}>
                                <Image
                                    src={p.image.src}
                                    alt={p.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className={styles.imageImg}
                                />
                            </div>
                        )}
						<h3>{p.title}</h3>
						<p>{p.description}</p>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}


