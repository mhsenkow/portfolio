"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProjectCard } from "@/content/project-card";
import { SKILLSETS, SKILLSET_LABEL, type Skillset } from "@/content/skillsets";

export type SortOption = "year-desc" | "year-asc" | "title-asc" | "title-desc";
export type FilterOption = "all" | "featured" | Skillset;

interface SortFilterBarProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  currentSort: SortOption;
  currentFilter: FilterOption;
  itemCount: number;
  filterCounts?: Partial<Record<FilterOption, number>>;
  leading?: ReactNode;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "year-desc", label: "newest" },
  { value: "year-asc", label: "oldest" },
  { value: "title-asc", label: "a–z" },
  { value: "title-desc", label: "z–a" },
];

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: "all", label: "all" },
  { value: "featured", label: "featured" },
  ...SKILLSETS.map((id) => ({ value: id as FilterOption, label: SKILLSET_LABEL[id] })),
];

export function SortFilterBar({
  onSortChange,
  onFilterChange,
  currentSort,
  currentFilter,
  itemCount,
  filterCounts,
  leading,
}: SortFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const filterActive = currentFilter !== "all";
  const activeFilterLabel =
    FILTER_OPTIONS.find((o) => o.value === currentFilter)?.label ?? currentFilter;

  useEffect(() => {
    if (!showFilters) return;
    const root = filtersRef.current;
    if (!root) return;
    const active = root.querySelector<HTMLElement>('[data-active="true"]');
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    active?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [currentFilter, showFilters]);

  useEffect(() => {
    if (!showFilters) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setShowFilters(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowFilters(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [showFilters]);

  return (
    <div className="tool-bar" ref={rootRef}>
      <div className="tool-bar__top">
        {leading}

        <div className="tool-bar__rail" role="group" aria-label="Sort">
          <span className="tool-bar__legend" aria-hidden="true">
            sort
          </span>
          <div className="tool-bar__segment">
            {SORT_OPTIONS.map((option, i) => {
              const active = currentSort === option.value;
              return (
                <span key={option.value} className="tool-bar__seg-item">
                  {i > 0 ? <span className="tool-bar__dot" aria-hidden="true" /> : null}
                  <button
                    type="button"
                    className="tool-bar__opt"
                    data-active={active ? "true" : undefined}
                    aria-pressed={active}
                    onClick={() => onSortChange(option.value)}
                  >
                    {option.label}
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        <div className="tool-bar__rail tool-bar__rail--filter">
          <button
            type="button"
            className="tool-bar__opt tool-bar__filter-toggle"
            data-active={showFilters || filterActive ? "true" : undefined}
            aria-expanded={showFilters}
            aria-controls="work-filters"
            onClick={() => setShowFilters((v) => !v)}
          >
            filter
            {filterActive && !showFilters ? (
              <span className="tool-bar__filter-live">{activeFilterLabel}</span>
            ) : null}
          </button>

          {filterActive ? (
            <button
              type="button"
              className="tool-bar__opt tool-bar__clear"
              onClick={() => onFilterChange("all")}
              aria-label="Clear filter"
            >
              clear
            </button>
          ) : null}
        </div>

        <span className="tool-bar__count" aria-live="polite">
          {itemCount}
        </span>
      </div>

      {showFilters ? (
        <div
          id="work-filters"
          ref={filtersRef}
          className="tool-bar__filters"
          role="group"
          aria-label="Filters"
        >
          {FILTER_OPTIONS.map((option) => {
            const active = currentFilter === option.value;
            const count =
              filterCounts?.[option.value] ?? (option.value === "all" ? itemCount : 0);
            if (option.value !== "all" && option.value !== "featured" && count === 0) {
              return null;
            }
            return (
              <button
                key={option.value}
                type="button"
                className="tool-bar__opt tool-bar__filter-opt"
                data-active={active ? "true" : undefined}
                aria-pressed={active}
                onClick={() => {
                  onFilterChange(option.value);
                  if (option.value === "all") setShowFilters(false);
                }}
              >
                <span className="tool-bar__filter-label">{option.label}</span>
                <span className="tool-bar__filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function sortProjects(projects: ProjectCard[], sort: SortOption): ProjectCard[] {
  const sorted = [...projects];

  switch (sort) {
    case "year-desc":
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    case "year-asc":
      return sorted.sort((a, b) => (a.year || 0) - (b.year || 0));
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function filterProjects(projects: ProjectCard[], filter: FilterOption): ProjectCard[] {
  switch (filter) {
    case "all":
      return projects;
    case "featured":
      return projects.filter((p) => p.featured === true);
    default:
      return projects.filter((p) => p.skillsets.includes(filter));
  }
}

export function getFilterCounts(projects: ProjectCard[]): Record<FilterOption, number> {
  const counts = {
    all: projects.length,
    featured: projects.filter((p) => p.featured === true).length,
  } as Record<FilterOption, number>;

  for (const id of SKILLSETS) {
    counts[id] = projects.filter((p) => p.skillsets.includes(id)).length;
  }

  return counts;
}
