"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProjectCard } from "@/content/project-card";

export type SortOption = "year-desc" | "year-asc" | "title-asc" | "title-desc";
export type FilterOption = "all" | "featured" | "creative" | "microsoft" | "meta" | "ibm" | "apple";

interface SortFilterBarProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  currentSort: SortOption;
  currentFilter: FilterOption;
  itemCount: number;
  filterCounts?: Record<FilterOption, number>;
  leading?: ReactNode;
}

function matchesOrg(p: ProjectCard, org: string) {
  const needle = org.toLowerCase();
  return (
    p.stack?.some((s) => s.toLowerCase().includes(needle)) ||
    p.entity?.toLowerCase().includes(needle) ||
    p.title.toLowerCase().includes(needle)
  );
}

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

  const sortOptions = [
    { value: "year-desc" as const, label: "newest" },
    { value: "year-asc" as const, label: "oldest" },
    { value: "title-asc" as const, label: "a–z" },
    { value: "title-desc" as const, label: "z–a" },
  ];

  const filterOptions = [
    { value: "all" as const, label: "all", count: filterCounts?.all || itemCount },
    { value: "featured" as const, label: "featured", count: filterCounts?.featured || 0 },
    { value: "creative" as const, label: "creative", count: filterCounts?.creative || 0 },
    { value: "microsoft" as const, label: "microsoft", count: filterCounts?.microsoft || 0 },
    { value: "meta" as const, label: "meta", count: filterCounts?.meta || 0 },
    { value: "ibm" as const, label: "ibm", count: filterCounts?.ibm || 0 },
    { value: "apple" as const, label: "apple", count: filterCounts?.apple || 0 },
  ];

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

  return (
    <div className="tool-bar">
      <div className="tool-bar__top">
        {leading}
        <div className="tool-bar__controls">
          <label className="tool-bar__field">
            <span className="tool-bar__label">sort</span>
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort projects"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="tool-bar__link"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "hide filters" : "filter"}
          </button>

          <span className="tool-bar__count">{itemCount}</span>

          {currentFilter !== "all" && (
            <button type="button" className="tool-bar__link" onClick={() => onFilterChange("all")}>
              clear
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div ref={filtersRef} className="tool-bar__filters" role="group" aria-label="Filters">
          {filterOptions.map((option) => {
            const active = currentFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className="tool-bar__chip"
                data-active={active ? "true" : undefined}
                aria-pressed={active}
                onClick={() => onFilterChange(option.value)}
              >
                {active ? <span className="tool-bar__chip-pill" aria-hidden="true" /> : null}
                <span className="tool-bar__chip-label">{option.label}</span>
                <span className="tool-bar__chip-count">{option.count}</span>
              </button>
            );
          })}
        </div>
      )}
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
    case "featured":
      return projects.filter((p) => p.featured === true);
    case "creative":
      return projects.filter((p) => p.category === "creative");
    case "microsoft":
      return projects.filter((p) => matchesOrg(p, "microsoft"));
    case "meta":
      return projects.filter((p) => matchesOrg(p, "meta"));
    case "ibm":
      return projects.filter((p) => matchesOrg(p, "ibm"));
    case "apple":
      return projects.filter((p) => matchesOrg(p, "apple"));
    case "all":
    default:
      return projects;
  }
}

export function getFilterCounts(projects: ProjectCard[]) {
  return {
    all: projects.length,
    featured: projects.filter((p) => p.featured === true).length,
    creative: projects.filter((p) => p.category === "creative").length,
    microsoft: projects.filter((p) => matchesOrg(p, "microsoft")).length,
    meta: projects.filter((p) => matchesOrg(p, "meta")).length,
    ibm: projects.filter((p) => matchesOrg(p, "ibm")).length,
    apple: projects.filter((p) => matchesOrg(p, "apple")).length,
  };
}
