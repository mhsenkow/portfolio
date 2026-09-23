"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import styles from "./page.module.css";
import type { ProjectCard } from "@/content/project-card";
import { useArrowNavGrid } from "@/hooks/useArrowNavGrid";

export function ProjectsGrid({ items }: { items: ProjectCard[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  useArrowNavGrid(gridRef, "[data-grid-card]");

  return (
    <div
      ref={gridRef}
      className={styles.grid}
      style={{ marginTop: "var(--space-8)" }}
      role="region"
      aria-label="Case studies. Arrow keys move between projects; Enter opens."
    >
      {items.map((p, index) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          prefetch={false}
          data-grid-card
          className={`glass-card is-interactive glass-card--pad ${styles.card}`}
          aria-label={`${p.title}${p.year ? `, ${p.year}` : ""}`}
        >
          {(p.thumbSrc || p.image) && (
            <div className="card-image">
              <Image
                src={p.thumbSrc || p.image!.src}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
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
