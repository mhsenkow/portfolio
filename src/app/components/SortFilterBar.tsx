"use client";

import { useState } from "react";
import type { Project } from "@/content/projects";

export type SortOption = "year-desc" | "year-asc" | "title-asc" | "title-desc";
export type FilterOption = "all" | "featured" | "creative" | "microsoft" | "meta" | "ibm" | "apple";

interface SortFilterBarProps {
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  currentSort: SortOption;
  currentFilter: FilterOption;
  itemCount: number;
  filterCounts?: Record<FilterOption, number>;
}

export function SortFilterBar({
  onSortChange,
  onFilterChange,
  currentSort,
  currentFilter,
  itemCount,
  filterCounts,
}: SortFilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <div className="tool-bar">
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

      {showFilters && (
        <div className="tool-bar__filters" role="group" aria-label="Filters">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className="tool-bar__chip"
              data-active={currentFilter === option.value ? "true" : undefined}
              aria-pressed={currentFilter === option.value}
              onClick={() => onFilterChange(option.value)}
            >
              {option.label}
              <span>{option.count}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function sortProjects(projects: Project[], sort: SortOption): Project[] {
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

export function filterProjects(projects: Project[], filter: FilterOption): Project[] {
  switch (filter) {
    case "featured":
      return projects.filter((p) => p.featured === true);
    case "creative":
      return projects.filter((p) => p.category === "creative");
    case "microsoft":
      return projects.filter(
        (p) =>
          p.stack?.some((s) => s.toLowerCase().includes("microsoft")) ||
          p.details?.entity?.toLowerCase().includes("microsoft") ||
          p.title.toLowerCase().includes("microsoft")
      );
    case "meta":
      return projects.filter(
        (p) =>
          p.stack?.some((s) => s.toLowerCase().includes("meta")) ||
          p.details?.entity?.toLowerCase().includes("meta") ||
          p.title.toLowerCase().includes("meta")
      );
    case "ibm":
      return projects.filter(
        (p) =>
          p.stack?.some((s) => s.toLowerCase().includes("ibm")) ||
          p.details?.entity?.toLowerCase().includes("ibm") ||
          p.title.toLowerCase().includes("ibm")
      );
    case "apple":
      return projects.filter(
        (p) =>
          p.stack?.some((s) => s.toLowerCase().includes("apple")) ||
          p.details?.entity?.toLowerCase().includes("apple") ||
          p.title.toLowerCase().includes("apple")
      );
    case "all":
    default:
      return projects;
  }
}

export function getFilterCounts(projects: Project[]) {
  return {
    all: projects.length,
    featured: projects.filter((p) => p.featured === true).length,
    creative: projects.filter((p) => p.category === "creative").length,
    microsoft: projects.filter(
      (p) =>
        p.stack?.some((s) => s.toLowerCase().includes("microsoft")) ||
        p.details?.entity?.toLowerCase().includes("microsoft") ||
        p.title.toLowerCase().includes("microsoft")
    ).length,
    meta: projects.filter(
      (p) =>
        p.stack?.some((s) => s.toLowerCase().includes("meta")) ||
        p.details?.entity?.toLowerCase().includes("meta") ||
        p.title.toLowerCase().includes("meta")
    ).length,
    ibm: projects.filter(
      (p) =>
        p.stack?.some((s) => s.toLowerCase().includes("ibm")) ||
        p.details?.entity?.toLowerCase().includes("ibm") ||
        p.title.toLowerCase().includes("ibm")
    ).length,
    apple: projects.filter(
      (p) =>
        p.stack?.some((s) => s.toLowerCase().includes("apple")) ||
        p.details?.entity?.toLowerCase().includes("apple") ||
        p.title.toLowerCase().includes("apple")
    ).length,
  };
}
