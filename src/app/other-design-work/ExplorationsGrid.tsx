"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { ProjectCard } from "@/content/project-card";
import { useArrowNavGrid } from "@/hooks/useArrowNavGrid";

export function ExplorationsGrid({ items }: { items: ProjectCard[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  useArrowNavGrid(gridRef, "[data-grid-card]");

  return (
    <div
      ref={gridRef}
      role="region"
      aria-label="Explorations. Arrow keys move between projects; Enter opens."
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "var(--space-6)",
        marginTop: "var(--space-8)",
      }}
    >
      {items.map((p, index) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          prefetch={false}
          data-grid-card
          aria-label={`${p.title}${p.year ? `, ${p.year}` : ""}`}
          style={{
            background: "var(--surface-card)",
            border: "var(--border-weak)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-5)",
            boxShadow: "var(--shadow-1)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {(p.thumbSrc || p.image) && (
            <div>
              <Image
                src={p.thumbSrc || p.image!.src}
                alt=""
                width={440}
                height={275}
                unoptimized
                sizes="(min-width: 900px) 280px, 45vw"
                priority={index < 4}
                loading={index < 4 ? "eager" : "lazy"}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "var(--radius-md)",
                }}
              />
            </div>
          )}
          <h3
            className="h3"
            style={{ margin: "var(--space-3) 0 0", textTransform: "lowercase" }}
          >
            {p.title}
          </h3>
          <p style={{ marginTop: "var(--space-2)", color: "var(--color-muted)" }}>
            {p.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
