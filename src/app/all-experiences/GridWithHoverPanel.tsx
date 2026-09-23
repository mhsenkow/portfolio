"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Buildings,
  CaretLeft,
  CaretRight,
  CirclesFour,
  GridFour,
  Rows,
  Square,
  SquaresFour,
  X,
} from "@phosphor-icons/react";
import type { ProjectCard } from "@/content/project-card";
import {
  GRID_GROUP_CYCLE,
  GRID_GROUP_LABEL,
  groupGridItems,
  type GridGroupMode,
} from "@/content/career-eras";
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
import { useDismissible } from "@/hooks/useDismissible";
import { useArrowNavGrid } from "@/hooks/useArrowNavGrid";
import { warmGridImages } from "./warmGridImages";
import styles from "./GridWithHoverPanel.module.css";

type Props = {
  items: ProjectCard[];
  title?: string;
  onTitleClick?: () => void;
};

export type GridDensity = "small" | "medium" | "normal";

const DENSITY_CYCLE: GridDensity[] = ["normal", "medium", "small"];
const DENSITY_LABEL: Record<GridDensity, string> = {
  small: "small tiles",
  medium: "medium tiles",
  normal: "normal tiles",
};

const EAGER_COUNT = 6;
const WARM_IDLE = 8;
const COMPACT_MQ = "(max-width: 900px)";

const DENSITY_SIZES: Record<GridDensity, string> = {
  small: "140px",
  medium: "180px",
  normal: "220px",
};

function useCompactGrid() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MQ);
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return compact;
}

function GridTileImage({
  src,
  fallbackSrc,
  alt,
  priority,
  density,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  priority?: boolean;
  density: GridDensity;
}) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const sizes = DENSITY_SIZES[density];

  const markLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    setLoaded(false);
    setCurrentSrc(src);
  }, [density, src]);

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
        key={`${currentSrc}-${density}`}
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={styles.thumbImg}
        onLoad={markLoaded}
        onLoadingComplete={markLoaded}
        onError={() => {
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            return;
          }
          markLoaded();
        }}
      />
    </div>
  );
}

function ProjectPreview({
  project,
  titleId,
}: {
  project: ProjectCard;
  titleId?: string;
}) {
  const previewSrc = project.thumbSrc || project.image?.src;
  return (
    <>
      <p className="work-panel__meta">
        {project.entity || project.year || "project"}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      <h2 id={titleId} className="work-panel__title">
        {project.title}
      </h2>
      <p className="work-panel__desc">{project.description}</p>
      {previewSrc && project.image && (
        <div className="work-panel__media">
          <LightboxImage
            src={previewSrc}
            alt={project.image.alt}
            group={[{ src: project.image.src, alt: project.image.alt }]}
            index={0}
            width={440}
            height={275}
            sizes="(max-width: 900px) 92vw, 360px"
            unoptimized
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      )}
      <a
        href={`/projects/${project.slug}`}
        className="work-panel__open"
        onClick={() => dismissIntroModal()}
      >
        View case study
        <ArrowRight size={16} weight="light" aria-hidden />
      </a>
    </>
  );
}

function readDensity(): GridDensity {
  try {
    const raw = localStorage.getItem("grid-density");
    if (raw === "small" || raw === "medium" || raw === "normal") return raw;
  } catch {
    /* ignore */
  }
  return "normal";
}

function readGroupMode(): GridGroupMode {
  try {
    const raw = localStorage.getItem("grid-group-mode");
    if (raw && (GRID_GROUP_CYCLE as string[]).includes(raw)) {
      return raw as GridGroupMode;
    }
    const legacy = localStorage.getItem("grid-era-bands");
    if (legacy === "0") return "flat";
    if (legacy === "1") return "eras";
  } catch {
    /* ignore */
  }
  return "eras";
}

export function GridWithHoverPanel({ items, title = "work", onTitleClick }: Props) {
  const router = useRouter();
  const compact = useCompactGrid();
  /** Sticky selection — do not clear on blur or the panel CTA unmounts mid-click. */
  const [active, setActive] = useState<ProjectCard | null>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);
  const [introOpen, setIntroOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [density, setDensity] = useState<GridDensity>("normal");
  const [groupMode, setGroupMode] = useState<GridGroupMode>("eras");
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetOpenerRef = useRef<HTMLElement | null>(null);
  const workRef = useRef<HTMLDivElement>(null);

  useArrowNavGrid(workRef, "[data-grid-card]");

  const [sort, setSort] = useState<SortOption>("year-desc");
  const [skill, setSkill] = useState<SkillFilter>("all");
  const [company, setCompany] = useState<CompanyFilter>("all");

  const processedItems = useMemo(() => {
    return sortProjects(filterProjects(items, { skill, company }), sort);
  }, [items, sort, skill, company]);

  const bands = useMemo(() => {
    const direction = sort === "year-asc" ? "asc" : "desc";
    return groupGridItems(processedItems, groupMode, direction);
  }, [processedItems, sort, groupMode]);

  const skillCounts = useMemo(() => getSkillCounts(items, company), [items, company]);
  const companyCounts = useMemo(() => getCompanyCounts(items, skill), [items, skill]);

  const selectProject = useCallback(
    (p: ProjectCard) => {
      setActive(p);
      router.prefetch(`/projects/${p.slug}`);
    },
    [router]
  );

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const cycleDensity = useCallback(() => {
    setDensity((cur) => {
      const i = DENSITY_CYCLE.indexOf(cur);
      const next = DENSITY_CYCLE[(i + 1) % DENSITY_CYCLE.length];
      try {
        localStorage.setItem("grid-density", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const cycleGroupMode = useCallback(() => {
    setGroupMode((cur) => {
      const i = GRID_GROUP_CYCLE.indexOf(cur);
      const next = GRID_GROUP_CYCLE[(i + 1) % GRID_GROUP_CYCLE.length];
      try {
        localStorage.setItem("grid-group-mode", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    setDensity(readDensity());
    setGroupMode(readGroupMode());
  }, []);

  useEffect(() => {
    setMountNode(document.getElementById("overlays"));
  }, []);

  /* Desktop only: side panel owns right padding */
  useEffect(() => {
    if (compact) {
      document.body.classList.remove("has-right-panel");
      document.body.removeAttribute("data-right-panel");
      setPanelOpen(false);
      return;
    }
    document.body.classList.add("has-right-panel");
    setPanelOpen(true);
    return () => {
      document.body.classList.remove("has-right-panel");
      document.body.removeAttribute("data-right-panel");
    };
  }, [compact]);

  useEffect(() => {
    if (compact) return;
    document.body.setAttribute("data-right-panel", panelOpen ? "open" : "closed");
  }, [panelOpen, compact]);

  useEffect(() => {
    if (compact) setSheetOpen(false);
  }, [compact]);

  useEffect(() => {
    if (introOpen) return;
    const run = () => warmGridImages(processedItems, WARM_IDLE);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(run, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(run, 200);
    return () => window.clearTimeout(t);
  }, [processedItems, introOpen]);

  useEffect(() => {
    function onIntroState(e: Event) {
      const detail = (e as CustomEvent<IntroStateDetail>).detail;
      setIntroOpen(Boolean(detail?.open));
    }
    window.addEventListener(INTRO_STATE_EVENT, onIntroState);
    return () => window.removeEventListener(INTRO_STATE_EVENT, onIntroState);
  }, []);

  useEffect(() => {
    if (!active) return;
    if (!processedItems.some((p) => p.slug === active.slug)) {
      setActive(null);
      setSheetOpen(false);
    }
  }, [processedItems, active]);

  useDismissible({
    open: compact && sheetOpen,
    onClose: closeSheet,
    rootRef: sheetRef,
    openerRef: sheetOpenerRef,
    lockScroll: true,
    focusOnOpen: true,
    trapFocus: true,
  });

  const panel = useMemo(
    () => (
      <aside
        className="overlay-panel--right work-panel"
        aria-label="Details"
        data-state={panelOpen ? "open" : "closed"}
        hidden={compact || undefined}
      >
        <button
          type="button"
          className="panel-handle"
          aria-label={panelOpen ? "Close details" : "Open details"}
          onClick={() => setPanelOpen((v) => !v)}
        >
          {panelOpen ? (
            <CaretRight size={16} weight="light" aria-hidden />
          ) : (
            <CaretLeft size={16} weight="light" aria-hidden />
          )}
        </button>
        <div className="work-panel__body glass-card">
          {active ? (
            <ProjectPreview project={active} />
          ) : (
            <>
              <p className="work-panel__meta">Project detail</p>
              <h2 className="work-panel__title">Select a project</h2>
              <p className="work-panel__desc">
                Hover or focus a tile to preview title, year, and summary.
              </p>
            </>
          )}
        </div>
      </aside>
    ),
    [active, panelOpen, compact]
  );

  const sheet =
    compact && sheetOpen && active
      ? createPortal(
          <div className={styles.sheetRoot} ref={sheetRef}>
            <button
              type="button"
              className={styles.sheetScrim}
              aria-label="Dismiss preview"
              onClick={closeSheet}
            />
            <div
              className={`${styles.sheet} glass-card`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="grid-sheet-title"
            >
              <div className={styles.sheetChrome}>
                <span className={styles.sheetGrab} aria-hidden />
                <button
                  type="button"
                  className={styles.sheetClose}
                  aria-label="Close preview"
                  onClick={closeSheet}
                >
                  <X size={16} weight="light" aria-hidden />
                </button>
              </div>
              <div className={styles.sheetBody}>
                <ProjectPreview project={active} titleId="grid-sheet-title" />
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  let tileIndex = 0;

  function renderTile(p: ProjectCard) {
    const index = tileIndex++;
    return (
      <div
        key={p.slug}
        className={styles.tileWrap}
        style={{ "--tile-i": index } as CSSProperties}
        onMouseEnter={() => {
          if (!compact) selectProject(p);
        }}
        onFocus={() => {
          if (!compact) selectProject(p);
        }}
      >
        <Link
          href={`/projects/${p.slug}`}
          prefetch={false}
          data-grid-card
          className={`${styles.tile} glass-card is-interactive`}
          data-active={active?.slug === p.slug ? "true" : undefined}
          aria-label={`${p.title}${p.year ? `, ${p.year}` : ""}`}
          onMouseEnter={() => {
            if (!compact) selectProject(p);
          }}
          onFocus={() => {
            if (!compact) selectProject(p);
          }}
          onClick={(e) => {
            dismissIntroModal();
            if (!compact) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            sheetOpenerRef.current = e.currentTarget;
            selectProject(p);
            setSheetOpen(true);
          }}
        >
          {p.image ? (
            <GridTileImage
              src={p.thumbSrc || p.image.src}
              fallbackSrc={p.thumbSrc ? p.image.src : undefined}
              alt={p.image.alt}
              priority={!introOpen && index < EAGER_COUNT}
              density={density}
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
    );
  }

  const DensityIcon =
    density === "small" ? SquaresFour : density === "medium" ? GridFour : Square;
  const GroupIcon =
    groupMode === "corp"
      ? Buildings
      : groupMode === "groups"
        ? CirclesFour
        : Rows;

  return (
    <div
      ref={workRef}
      className={styles.work}
      data-density={density}
      data-group={groupMode}
      data-compact={compact ? "true" : undefined}
      role="region"
      aria-label="Work grid. Arrow keys move between projects; Enter opens."
    >
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
          trailing={
            <span className={styles.viewControls}>
              <button
                type="button"
                className={styles.densityBtn}
                onClick={cycleGroupMode}
                aria-label={`Grouping: ${GRID_GROUP_LABEL[groupMode]}. Click for next.`}
                title={GRID_GROUP_LABEL[groupMode]}
                data-active={groupMode !== "flat" ? "true" : undefined}
              >
                <GroupIcon size={16} weight="light" aria-hidden />
                <span className={styles.densityLabel}>{GRID_GROUP_LABEL[groupMode]}</span>
              </button>
              <button
                type="button"
                className={styles.densityBtn}
                onClick={cycleDensity}
                aria-label={`Tile size: ${DENSITY_LABEL[density]}. Click for next size.`}
                title={DENSITY_LABEL[density]}
                data-density={density}
              >
                <DensityIcon size={16} weight="light" aria-hidden />
                <span className={styles.densityLabel}>{density}</span>
              </button>
            </span>
          }
        />
      </div>

      {bands ? (
        <div className={styles.bands}>
          {bands.map((band) => (
            <section key={band.id} className={styles.band} data-band={band.id}>
              <header className={styles.bandHead}>
                <h2 className={styles.bandLabel}>{band.label}</h2>
                <span className={styles.bandCount}>{band.items.length}</span>
              </header>
              <div className={styles.grid}>{band.items.map((p) => renderTile(p))}</div>
            </section>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>{processedItems.map((p) => renderTile(p))}</div>
      )}

      {!compact && (mountNode ? createPortal(panel, mountNode) : panel)}
      {sheet}
    </div>
  );
}
