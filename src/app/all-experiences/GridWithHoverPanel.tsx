"use client";

import Image, { type ImageLoader } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { ProjectCard } from "@/content/project-card";
import { LightboxImage } from "@/app/components/Lightbox";
import {
  dismissIntroModal,
  INTRO_STATE_EVENT,
  type IntroStateDetail,
} from "@/app/components/IntroModal";
import {
  SortFilterBar,
  filterProjects,
  getCompanyCounts,
  getSkillCounts,
  sortProjects,
  type CompanyFilter,
  type SkillFilter,
  type SortOption,
} from "@/app/components/SortFilterBar";
import { warmGridImages } from "./warmGridImages";
import styles from "./GridWithHoverPanel.module.css";

type Props = {
  items: ProjectCard[];
  title?: string;
  onTitleClick?: () => void;
};

const EAGER_COUNT = 6;
const WARM_INTRO = 12;
const WARM_IDLE = 8;

/** Grid tiles are ~220px; never ask the optimizer for case-study-sized widths. */
const gridThumbLoader: ImageLoader = ({ src, width, quality }) => {
  const w = Math.min(width, 440);
  const q = quality ?? 75;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
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
        loader={gridThumbLoader}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        // ~220px CSS tile; loader caps at 440 for 2x
        sizes="220px"
        quality={75}
        className={styles.thumbImg}
        onLoad={markLoaded}
        onLoadingComplete={markLoaded}
        onError={markLoaded}
      />
    </div>
  );
}

export function GridWithHoverPanel({ items, title = "work", onTitleClick }: Props) {
  const router = useRouter();
  /** Sticky selection — do not clear on blur or the panel CTA unmounts mid-click. */
  const [active, setActive] = useState<ProjectCard | null>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia && window.matchMedia("(max-width: 900px)").matches ? false : true;
  });

  const [sort, setSort] = useState<SortOption>("year-desc");
  const [skill, setSkill] = useState<SkillFilter>("all");
  const [company, setCompany] = useState<CompanyFilter>("all");

  const processedItems = useMemo(() => {
    return sortProjects(filterProjects(items, { skill, company }), sort);
  }, [items, sort, skill, company]);

  const skillCounts = useMemo(() => getSkillCounts(items, company), [items, company]);
  const companyCounts = useMemo(() => getCompanyCounts(items, skill), [items, skill]);

  const selectProject = useCallback(
    (p: ProjectCard) => {
      setActive(p);
      router.prefetch(`/projects/${p.slug}`);
    },
    [router]
  );

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

  useEffect(() => {
    warmGridImages(processedItems, introOpen ? WARM_INTRO : WARM_IDLE);
  }, [processedItems, introOpen]);

  useEffect(() => {
    function onIntroState(e: Event) {
      const detail = (e as CustomEvent<IntroStateDetail>).detail;
      setIntroOpen(Boolean(detail?.open));
      if (detail?.open) warmGridImages(processedItems, WARM_INTRO);
    }
    window.addEventListener(INTRO_STATE_EVENT, onIntroState);
    return () => window.removeEventListener(INTRO_STATE_EVENT, onIntroState);
  }, [processedItems]);

  /** Keep selection if the project is still in the filtered set. */
  useEffect(() => {
    if (!active) return;
    if (!processedItems.some((p) => p.slug === active.slug)) {
      setActive(null);
    }
  }, [processedItems, active]);

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
            <CaretRight size={16} weight="light" aria-hidden />
          ) : (
            <CaretLeft size={16} weight="light" aria-hidden />
          )}
        </button>
        <div className="work-panel__body glass-card">
          {active ? (
            <>
              <p className="work-panel__meta">
                {active.entity || active.year || "project"}
                {active.year ? ` · ${active.year}` : ""}
              </p>
              <h2 className="work-panel__title">{active.title}</h2>
              <p className="work-panel__desc">{active.description}</p>
              {active.image && (
                <div className="work-panel__media">
                  <LightboxImage
                    src={active.image.src}
                    alt={active.image.alt}
                    group={[{ src: active.image.src, alt: active.image.alt }]}
                    index={0}
                    width={720}
                    height={450}
                    sizes="360px"
                    unoptimized={false}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              )}
              <a
                href={`/projects/${active.slug}`}
                className="work-panel__open"
                onClick={() => dismissIntroModal()}
              >
                View case study
                <ArrowRight size={16} weight="light" aria-hidden />
              </a>
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
    [active, open]
  );

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
          onSkillChange={setSkill}
          onCompanyChange={setCompany}
          currentSort={sort}
          currentSkill={skill}
          currentCompany={company}
          itemCount={processedItems.length}
          skillCounts={skillCounts}
          companyCounts={companyCounts}
        />
      </div>

      <div className={styles.grid}>
        {processedItems.map((p, index) => (
          <div
            key={p.slug}
            className={styles.tileWrap}
            style={{ "--tile-i": index } as CSSProperties}
            onMouseEnter={() => selectProject(p)}
            onPointerEnter={() => selectProject(p)}
            onFocus={() => selectProject(p)}
          >
            <Link
              href={`/projects/${p.slug}`}
              prefetch
              className={`${styles.tile} glass-card is-interactive`}
              data-active={active?.slug === p.slug ? "true" : undefined}
              onMouseEnter={() => selectProject(p)}
              onFocus={() => selectProject(p)}
              onTouchStart={() => selectProject(p)}
              onClick={() => dismissIntroModal()}
            >
              {p.image ? (
                <GridTileImage
                  src={p.image.src}
                  alt={p.image.alt}
                  priority={!introOpen && index < EAGER_COUNT}
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
          </div>
        ))}
      </div>

      {mountNode ? createPortal(panel, mountNode) : panel}
    </div>
  );
}
