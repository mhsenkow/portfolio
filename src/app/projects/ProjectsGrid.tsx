"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { projects as allProjects, type Project } from '@/content/projects';

export function ProjectsGrid({ items }: { items?: Project[] }) {
    const list =
        items ??
        [...allProjects.filter((p) => p.featured === true)].sort((a, b) => {
            // Corp / work case studies first, then machines & craft
            const rank = (p: Project) => (p.category === 'creative' ? 1 : 0);
            const byKind = rank(a) - rank(b);
            if (byKind !== 0) return byKind;
            return (b.year ?? 0) - (a.year ?? 0);
        });
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
                                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                                    quality={75}
                                    className={styles.imageImg}
                                />
                            </div>
                        )}
						<h3 className="h3">{p.title}</h3>
						<p>{p.description}</p>
					</Link>
				</motion.div>
			))}
		</motion.div>
	);
}


