"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { LightboxImage } from "@/app/components/Lightbox";
import {
  INTRO_STATE_EVENT,
  type IntroStateDetail,
} from "@/app/components/IntroModal";
import {
  SortFilterBar,
  filterProjects,
  getFilterCounts,
  sortProjects,
  type FilterOption,
  type SortOption,
} from "@/app/components/SortFilterBar";
import { itemTransition } from "@/theme/motion";
import { warmGridImages } from "./warmGridImages";
import styles from "./GridWithHoverPanel.module.css";

type Props = {
  items: Project[];
  title?: string;
  onTitleClick?: () => void;
};

function GridTileImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  const markLoaded = useCallback(() => setLoaded(true), []);

  const imgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && node.complete && node.naturalWidth > 0) markLoaded();
    },
    [markLoaded]
  );

  return (
    <div className={styles.thumb} data-loaded={loaded ? "true" : "false"}>
      <span className={styles.thumbFiller} aria-hidden="true">
        <span className={styles.thumbFillerSweep} />
      </span>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 700px) 45vw, 220px"
        quality={75}
        className={styles.thumbImg}
        onLoad={markLoaded}
        onLoadingComplete={markLoaded}
      />
    </div>
  );
}

export function GridWithHoverPanel({ items, title = "work", onTitleClick }: Props) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia && window.matchMedia("(max-width: 900px)").matches ? false : true;
  });

  const [sort, setSort] = useState<SortOption>("year-desc");
  const [filter, setFilter] = useState<FilterOption>("all");

  const processedItems = useMemo(() => {
    return sortProjects(filterProjects(items, filter), sort);
  }, [items, sort, filter]);

  const filterCounts = useMemo(() => getFilterCounts(items), [items]);

  useEffect(() => {
    setMountNode(document.getElementById("overlays"));
  }, []);

  useEffect(() => {
    document.body.classList.add("has-right-panel");
    return () => {
      document.body.classList.remove("has-right-panel");
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-right-panel", open ? "open" : "closed");
  }, [open]);

  // Warm thumbs as soon as the grid mounts (and harder while the intro curtain is up).
  useEffect(() => {
    warmGridImages(items, introOpen ? 36 : 16);
  }, [items, introOpen]);

  useEffect(() => {
    function onIntroState(e: Event) {
      const detail = (e as CustomEvent<IntroStateDetail>).detail;
      setIntroOpen(Boolean(detail?.open));
      if (detail?.open) warmGridImages(items, 36);
    }
    window.addEventListener(INTRO_STATE_EVENT, onIntroState);
    return () => window.removeEventListener(INTRO_STATE_EVENT, onIntroState);
  }, [items]);

  const panel = useMemo(
    () => (
      <aside className="overlay-panel--right work-panel" aria-label="Details" data-state={open ? "open" : "closed"}>
        <button
          type="button"
          className="panel-handle"
          aria-label={open ? "Close details" : "Open details"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.42 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.71 6.7a1 1 0 0 0-1.42 0Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M14.71 17.29a1 1 0 0 0 0-1.41L10.83 12l3.88-3.88a1 1 0 1 0-1.42-1.41L8.7 11.3a1 1 0 0 0 0 1.41l4.59 4.59a1 1 0 0 0 1.42 0Z" />
            </svg>
          )}
        </button>
        <div className="work-panel__body glass-card">
          {hovered ? (
            <>
              <p className="work-panel__meta">
                {hovered.details?.entity || hovered.year || "project"}
                {hovered.year ? ` · ${hovered.year}` : ""}
              </p>
              <h2 className="work-panel__title">{hovered.title}</h2>
              <p className="work-panel__desc">{hovered.description}</p>
              {hovered.image && (
                <div className="work-panel__media">
                  <LightboxImage
                    src={hovered.image.src}
                    alt={hovered.image.alt}
                    group={[{ src: hovered.image.src, alt: hovered.image.alt }]}
                    index={0}
                    width={1200}
                    height={800}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              )}
              <Link href={`/projects/${hovered.slug}`} className="work-panel__open">
                View case study →
              </Link>
            </>
          ) : (
            <>
              <p className="work-panel__meta">Project detail</p>
              <h2 className="work-panel__title">Select a project</h2>
              <p className="work-panel__desc">Hover a tile to preview title, year, and summary.</p>
            </>
          )}
        </div>
      </aside>
    ),
    [hovered, open]
  );

  const eagerCount = introOpen ? 24 : 12;

  return (
    <div className={styles.work}>
      <div className={styles.toolbar}>
        <SortFilterBar
          leading={
            onTitleClick ? (
              <button
                type="button"
                onClick={onTitleClick}
                className={styles.titleBtn}
                aria-label={`${title} — open intro`}
              >
                {title}
              </button>
            ) : (
              <h1 className={styles.title}>{title}</h1>
            )
          }
          onSortChange={setSort}
          onFilterChange={setFilter}
          currentSort={sort}
          currentFilter={filter}
          itemCount={processedItems.length}
          filterCounts={filterCounts}
        />
      </div>

      <motion.div className={styles.grid} layout>
        <AnimatePresence mode="popLayout">
          {processedItems.map((p, index) => (
            <motion.div
              key={p.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={itemTransition(
                reduceMotion,
                reduceMotion ? 0 : Math.min(index * 0.012, 0.16)
              )}
              onMouseEnter={() => setHovered(p)}
              onPointerEnter={() => setHovered(p)}
              onFocus={() => setHovered(p)}
              onBlur={() => setHovered((cur) => (cur?.slug === p.slug ? null : cur))}
            >
              <Link
                href={`/projects/${p.slug}`}
                className={`${styles.tile} glass-card is-interactive`}
                data-active={hovered?.slug === p.slug ? "true" : undefined}
                onMouseEnter={() => setHovered(p)}
                onFocus={() => setHovered(p)}
                onTouchStart={() => setHovered(p)}
              >
                {p.image ? (
                  <GridTileImage
                    src={p.image.src}
                    alt={p.image.alt}
                    priority={index < eagerCount}
                  />
                ) : (
                  <div className={styles.thumb} data-loaded="false">
                    <span className={styles.thumbFiller} aria-hidden="true">
                      <span className={styles.thumbFillerSweep} />
                    </span>
                  </div>
                )}
                <div className={styles.meta}>
                  <span className={styles.year}>{p.year || "—"}</span>
                  <h3 className={styles.tileTitle}>{p.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {mountNode ? createPortal(panel, mountNode) : panel}
    </div>
  );
}
