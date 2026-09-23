"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { ArchiveItem } from "@/content/project-card";
import { ARCHIVE_MILESTONES } from "@/content/archive-milestones";

type ArchiveFilter = "all" | "work" | "side";

const FILTERS: { value: ArchiveFilter; label: string }[] = [
  { value: "all", label: "all" },
  { value: "work", label: "work" },
  { value: "side", label: "side projects" },
];

const GAP_YEAR_MIN = 2010;

function isSide(p: ArchiveItem) {
  return p.category === "creative";
}

type YearBucket = {
  year: number | null;
  work: ArchiveItem[];
  side: ArchiveItem[];
  empty?: boolean;
};

function buildTimeline(projects: ArchiveItem[]): YearBucket[] {
  const dated = projects.filter((p) => typeof p.year === "number");
  const undated = projects.filter((p) => typeof p.year !== "number");

  const years = dated.map((p) => p.year as number);
  const maxY = years.length ? Math.max(...years) : new Date().getFullYear();
  const minY = years.length ? Math.min(Math.min(...years), GAP_YEAR_MIN) : GAP_YEAR_MIN;

  const byYear = new Map<number, { work: ArchiveItem[]; side: ArchiveItem[] }>();
  for (let y = minY; y <= maxY; y++) {
    byYear.set(y, { work: [], side: [] });
  }
  for (const p of dated) {
    const y = p.year as number;
    const bucket = byYear.get(y) ?? { work: [], side: [] };
    if (isSide(p)) bucket.side.push(p);
    else bucket.work.push(p);
    byYear.set(y, bucket);
  }

  const buckets: YearBucket[] = [];
  for (let y = maxY; y >= minY; y--) {
    const b = byYear.get(y)!;
    buckets.push({
      year: y,
      work: b.work,
      side: b.side,
      empty: b.work.length === 0 && b.side.length === 0,
    });
  }

  if (undated.length) {
    buckets.push({
      year: null,
      work: undated.filter((p) => !isSide(p)),
      side: undated.filter(isSide),
    });
  }

  return buckets;
}

function yearKey(year: number | null) {
  return year === null ? "undated" : String(year);
}

function ProjectMark({
  project,
  lane,
  reduceMotion,
}: {
  project: ArchiveItem;
  lane: "work" | "side";
  reduceMotion: boolean | null;
}) {
  return (
    <motion.li
      className={`archive-mark archive-mark--${lane}`}
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, x: lane === "work" ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: lane === "work" ? -6 : 6 }}
      transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.2, 0, 0, 1] }}
    >
      <span className="archive-mark__stem" aria-hidden="true" />
      <span className="archive-mark__dot" aria-hidden="true" />
      <div className="archive-mark__body">
        <Link href={`/projects/${project.slug}`} className="archive-mark__title">
          {project.title}
        </Link>
        <p className="archive-mark__desc">{project.description}</p>
      </div>
    </motion.li>
  );
}

export function ArchiveList({ projects }: { projects: ArchiveItem[] }) {
  const [filter, setFilter] = useState<ArchiveFilter>("all");
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const scrollRootRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const timeline = useMemo(() => buildTimeline(projects), [projects]);

  const counts = useMemo(
    () => ({
      all: projects.length,
      work: projects.filter((p) => !isSide(p)).length,
      side: projects.filter(isSide).length,
    }),
    [projects]
  );

  const density = useMemo(() => {
    const dated = timeline
      .filter((b) => b.year !== null)
      .map((b) => {
        const work = filter === "side" ? 0 : b.work.length;
        const side = filter === "work" ? 0 : b.side.length;
        return {
          key: yearKey(b.year),
          label: String(b.year as number).slice(2),
          ariaYear: String(b.year),
          work,
          side,
          total: work + side,
        };
      });
    const chronological = [...dated].reverse();
    const undated = timeline.find((b) => b.year === null);
    if (undated) {
      const work = filter === "side" ? 0 : undated.work.length;
      const side = filter === "work" ? 0 : undated.side.length;
      chronological.push({
        key: "undated",
        label: "—",
        ariaYear: "undated",
        work,
        side,
        total: work + side,
      });
    }
    const max = Math.max(1, ...chronological.map((r) => r.total));
    return { rows: chronological, max };
  }, [timeline, filter]);

  const setSectionRef = useCallback((key: string, node: HTMLElement | null) => {
    if (node) sectionRefs.current.set(key, node);
    else sectionRefs.current.delete(key);
  }, []);

  useEffect(() => {
    scrollRootRef.current =
      document.querySelector<HTMLElement>(".app-main") ?? document.documentElement;

    const root = scrollRootRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target) {
          const key = (visible[0].target as HTMLElement).dataset.yearKey;
          if (key) setActiveYear(key);
        }
      },
      {
        root: root === document.documentElement ? null : root,
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.2, 0.45, 0.7],
      }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [timeline, filter]);

  const jumpToYear = (key: string) => {
    const el = sectionRefs.current.get(key);
    const root = scrollRootRef.current;
    if (!el || !root) return;
    const rootTop =
      root === document.documentElement ? 0 : root.getBoundingClientRect().top;
    const offset = el.getBoundingClientRect().top - rootTop + root.scrollTop - 110;
    root.scrollTo({ top: offset, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveYear(key);
  };

  const ease = [0.2, 0, 0, 1] as const;
  const pillTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 480, damping: 38, mass: 0.7 };

  const rangeLabel = useMemo(() => {
    const years = timeline.map((b) => b.year).filter((y): y is number => y !== null);
    if (!years.length) return "";
    return `${Math.min(...years)}–${Math.max(...years)}`;
  }, [timeline]);

  const edgeMilestones = useMemo(() => {
    const datedKeys = new Set(
      timeline.filter((b) => b.year !== null).map((b) => yearKey(b.year))
    );
    return ARCHIVE_MILESTONES.filter((m) => datedKeys.has(String(m.year)));
  }, [timeline]);

  return (
    <div className="archive-viz" data-filter={filter}>
      {edgeMilestones.length > 0 ? (
        <aside className="archive-edge" aria-label="Key moments">
          <span className="archive-edge__cap" aria-hidden="true">
            eras
          </span>
          <ol className="archive-edge__rail">
            {[...edgeMilestones].reverse().map((m) => {
              const key = String(m.year);
              const active = activeYear === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    className="archive-edge__dot"
                    data-active={active ? "true" : undefined}
                    aria-label={`${m.year}: ${m.label}${m.detail ? `. ${m.detail}` : ""}`}
                    aria-current={active ? "true" : undefined}
                    onClick={() => jumpToYear(key)}
                  >
                    <span className="archive-edge__mark" aria-hidden="true" />
                    <span className="archive-edge__tip" role="tooltip">
                      <span className="archive-edge__tip-year">{m.year}</span>
                      <span className="archive-edge__tip-label">{m.label}</span>
                      {m.detail ? (
                        <span className="archive-edge__tip-detail">{m.detail}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      ) : null}
      <div className="archive-viz__controls">
        <div className="archive-filter" role="group" aria-label="Filter projects">
          <LayoutGroup id="archive-filters">
            {FILTERS.map((option) => {
              const active = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className="archive-filter__chip"
                  data-active={active ? "true" : undefined}
                  aria-pressed={active}
                  onClick={() => setFilter(option.value)}
                >
                  {active ? (
                    <motion.span
                      className="archive-filter__pill"
                      layoutId="archive-filter-pill"
                      transition={pillTransition}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="archive-filter__label">{option.label}</span>
                  <span className="archive-filter__count">{counts[option.value]}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="archive-legend" aria-hidden="true">
          <span className="archive-legend__item archive-legend__item--work">work</span>
          <span className="archive-legend__item archive-legend__item--side">side</span>
        </div>
      </div>

      <div className="archive-density" role="navigation" aria-label="Jump to year">
        <div className="archive-density__meta">
          <span>{rangeLabel}</span>
          <span>density</span>
        </div>
        <div className="archive-density__chart">
          {density.rows.map((row) => {
            const active = activeYear === row.key;
            const h = row.total === 0 ? 0 : Math.max(6, Math.round((row.total / density.max) * 56));
            const workH =
              row.total === 0 ? 0 : Math.round((row.work / Math.max(row.total, 1)) * h);
            const sideH = Math.max(0, h - workH);
            return (
              <button
                key={row.key}
                type="button"
                className="archive-density__col"
                data-active={active ? "true" : undefined}
                data-empty={row.total === 0 ? "true" : undefined}
                aria-label={`${row.ariaYear}: ${row.total} project${row.total === 1 ? "" : "s"}`}
                onClick={() => jumpToYear(row.key)}
              >
                <span className="archive-density__bar">
                  <motion.span
                    className="archive-density__seg archive-density__seg--side"
                    animate={{ height: sideH }}
                    transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
                  />
                  <motion.span
                    className="archive-density__seg archive-density__seg--work"
                    animate={{ height: workH }}
                    transition={{ duration: reduceMotion ? 0 : 0.28, ease }}
                  />
                </span>
                <span className="archive-density__year">{row.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="archive-spine" aria-label="Career timeline">
        <div className="archive-spine__axis" aria-hidden="true" />
        <div className="archive-spine__headers" aria-hidden="true">
          <span>work</span>
          <span>side</span>
        </div>

        {timeline.map((bucket) => {
          const key = yearKey(bucket.year);
          const showWork = filter !== "side";
          const showSide = filter !== "work";
          const workItems = showWork ? bucket.work : [];
          const sideItems = showSide ? bucket.side : [];
          const visibleCount = workItems.length + sideItems.length;

          // Gap years stay in "all" to keep the career arc readable
          if (bucket.empty && filter !== "all") return null;
          if (!bucket.empty && visibleCount === 0) return null;

          return (
            <section
              key={key}
              ref={(node) => setSectionRef(key, node)}
              className="archive-year"
              data-year-key={key}
              data-empty={bucket.empty ? "true" : undefined}
              data-active={activeYear === key ? "true" : undefined}
              aria-label={
                bucket.year === null
                  ? "Undated projects"
                  : `${bucket.year}${bucket.empty ? ", quiet year" : ""}`
              }
            >
              <div className="archive-year__label">
                <span className="archive-year__num">
                  {bucket.year === null ? "—" : bucket.year}
                </span>
                {!bucket.empty && (
                  <span className="archive-year__count">{visibleCount}</span>
                )}
              </div>

              {bucket.empty ? (
                <>
                  <div className="archive-year__gap archive-year__gap--work" aria-hidden="true" />
                  <div className="archive-year__node" aria-hidden="true">
                    <span className="archive-year__ring" />
                  </div>
                  <div className="archive-year__gap archive-year__gap--side" aria-hidden="true">
                    <span className="archive-year__gap-line" />
                  </div>
                </>
              ) : (
                <>
                  <ul className="archive-lane archive-lane--work">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {workItems.map((p) => (
                        <ProjectMark
                          key={p.slug}
                          project={p}
                          lane="work"
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                  <div className="archive-year__node" aria-hidden="true">
                    <span className="archive-year__ring" />
                  </div>
                  <ul className="archive-lane archive-lane--side">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {sideItems.map((p) => (
                        <ProjectMark
                          key={p.slug}
                          project={p}
                          lane="side"
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                </>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
