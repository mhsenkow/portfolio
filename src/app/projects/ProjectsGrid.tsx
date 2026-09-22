"use client";

import Link from "next/link";
import Image, { type ImageLoader } from "next/image";
import styles from "./page.module.css";
import { projects as allProjects, type Project } from "@/content/projects";

/** Case-study cards render ~360px; never pull 1080 sources. */
const caseCardLoader: ImageLoader = ({ src, width, quality }) => {
  const w = Math.min(width, 640);
  const q = quality ?? 75;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
};

export function ProjectsGrid({ items }: { items?: Project[] }) {
  const list =
    items ??
    [...allProjects.filter((p) => p.featured === true)].sort((a, b) => {
      const rank = (p: Project) => (p.category === "creative" ? 1 : 0);
      const byKind = rank(a) - rank(b);
      if (byKind !== 0) return byKind;
      return (b.year ?? 0) - (a.year ?? 0);
    });

  return (
    <div className={styles.grid} style={{ marginTop: "var(--space-8)" }}>
      {list.map((p, index) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className={`glass-card is-interactive glass-card--pad ${styles.card}`}
        >
          {p.image && (
            <div className="card-image">
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                loader={caseCardLoader}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                quality={75}
                priority={index < 4}
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
          )}
          <div className={styles.cardBody}>
            <h3 className="h3">{p.title}</h3>
            <p>{p.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
