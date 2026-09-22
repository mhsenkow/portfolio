"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProjectCard } from "@/content/project-card";
import { COMPANIES, COMPANY_LABEL, type Company } from "@/content/companies";
import { SKILLSETS, SKILLSET_LABEL, type Skillset } from "@/content/skillsets";
import { useDismissible } from "@/hooks/useDismissible";

export type SortOption = "year-desc" | "year-asc" | "title-asc" | "title-desc";
export type SkillFilter = "all" | "featured" | Skillset;
export type CompanyFilter = "all" | Company;

/** @deprecated use SkillFilter — kept for any residual imports */
export type FilterOption = SkillFilter;

export type WorkFilters = {
  skill: SkillFilter;
  company: CompanyFilter;
};

interface SortFilterBarProps {
  onSortChange: (sort: SortOption) => void;
  onSkillChange: (skill: SkillFilter) => void;
  onCompanyChange: (company: CompanyFilter) => void;
  currentSort: SortOption;
  currentSkill: SkillFilter;
  currentCompany: CompanyFilter;
  itemCount: number;
  skillCounts?: Partial<Record<SkillFilter, number>>;
  companyCounts?: Partial<Record<CompanyFilter, number>>;
  leading?: ReactNode;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "year-desc", label: "newest" },
  { value: "year-asc", label: "oldest" },
  { value: "title-asc", label: "a–z" },
  { value: "title-desc", label: "z–a" },
];

const SKILL_OPTIONS: { value: SkillFilter; label: string }[] = [
  { value: "all", label: "all" },
  { value: "featured", label: "featured" },
  ...SKILLSETS.map((id) => ({ value: id as SkillFilter, label: SKILLSET_LABEL[id] })),
];

const COMPANY_OPTIONS: { value: CompanyFilter; label: string }[] = [
  { value: "all", label: "all" },
  ...COMPANIES.map((id) => ({ value: id as CompanyFilter, label: COMPANY_LABEL[id] })),
];

type Panel = "skill" | "company" | null;

export function SortFilterBar({
  onSortChange,
  onSkillChange,
  onCompanyChange,
  currentSort,
  currentSkill,
  currentCompany,
  itemCount,
  skillCounts,
  companyCounts,
  leading,
}: SortFilterBarProps) {
  const [panel, setPanel] = useState<Panel>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const skillBtnRef = useRef<HTMLButtonElement>(null);
  const companyBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = panel === "skill" ? skillBtnRef : companyBtnRef;

  const skillActive = currentSkill !== "all";
  const companyActive = currentCompany !== "all";
  const anyActive = skillActive || companyActive;

  const skillLive =
    SKILL_OPTIONS.find((o) => o.value === currentSkill)?.label ?? currentSkill;
  const companyLive =
    COMPANY_OPTIONS.find((o) => o.value === currentCompany)?.label ?? currentCompany;

  useEffect(() => {
    if (!panel) return;
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
  }, [currentSkill, currentCompany, panel]);

  useDismissible({
    open: panel !== null,
    onClose: () => setPanel(null),
    rootRef,
    openerRef,
  });

  function clearAll() {
    onSkillChange("all");
    onCompanyChange("all");
    setPanel(null);
  }

  const openOptions = panel === "skill" ? SKILL_OPTIONS : panel === "company" ? COMPANY_OPTIONS : [];

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
            ref={skillBtnRef}
            type="button"
            className="tool-bar__opt tool-bar__filter-toggle"
            data-active={panel === "skill" || skillActive ? "true" : undefined}
            aria-expanded={panel === "skill"}
            aria-controls="work-filters"
            onClick={() => setPanel((p) => (p === "skill" ? null : "skill"))}
          >
            skill
            {skillActive && panel !== "skill" ? (
              <span className="tool-bar__filter-live">{skillLive}</span>
            ) : null}
          </button>

          <button
            ref={companyBtnRef}
            type="button"
            className="tool-bar__opt tool-bar__filter-toggle"
            data-active={panel === "company" || companyActive ? "true" : undefined}
            aria-expanded={panel === "company"}
            aria-controls="work-filters"
            onClick={() => setPanel((p) => (p === "company" ? null : "company"))}
          >
            company
            {companyActive && panel !== "company" ? (
              <span className="tool-bar__filter-live">{companyLive}</span>
            ) : null}
          </button>

          {anyActive ? (
            <button
              type="button"
              className="tool-bar__opt tool-bar__clear"
              onClick={clearAll}
              aria-label="Clear filters"
            >
              clear
            </button>
          ) : null}
        </div>

        <span className="tool-bar__count" aria-live="polite">
          {itemCount}
        </span>
      </div>

      {panel ? (
        <div
          id="work-filters"
          ref={filtersRef}
          className="tool-bar__filters"
          role="group"
          aria-label={panel === "skill" ? "Skill filters" : "Company filters"}
          data-panel={panel}
        >
          <span className="tool-bar__legend tool-bar__filters-legend" aria-hidden="true">
            {panel}
          </span>
          {openOptions.map((option) => {
            const active =
              panel === "skill"
                ? currentSkill === option.value
                : currentCompany === option.value;
            const count =
              panel === "skill"
                ? (skillCounts?.[option.value as SkillFilter] ??
                  (option.value === "all" ? itemCount : 0))
                : (companyCounts?.[option.value as CompanyFilter] ??
                  (option.value === "all" ? itemCount : 0));

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
                  if (panel === "skill") {
                    onSkillChange(option.value as SkillFilter);
                    if (option.value === "all" && !companyActive) setPanel(null);
                  } else {
                    onCompanyChange(option.value as CompanyFilter);
                    if (option.value === "all" && !skillActive) setPanel(null);
                  }
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

function matchesSkill(p: ProjectCard, skill: SkillFilter): boolean {
  if (skill === "all") return true;
  if (skill === "featured") return p.featured === true;
  return p.skillsets.includes(skill);
}

function matchesCompany(p: ProjectCard, company: CompanyFilter): boolean {
  if (company === "all") return true;
  return p.companies.includes(company);
}

export function filterProjects(
  projects: ProjectCard[],
  filters: WorkFilters | SkillFilter
): ProjectCard[] {
  // Back-compat: single skill filter arg
  if (typeof filters === "string") {
    return projects.filter((p) => matchesSkill(p, filters));
  }
  return projects.filter(
    (p) => matchesSkill(p, filters.skill) && matchesCompany(p, filters.company)
  );
}

/** Counts for skill options, scoped to the current company filter. */
export function getSkillCounts(
  projects: ProjectCard[],
  company: CompanyFilter = "all"
): Record<SkillFilter, number> {
  const base = projects.filter((p) => matchesCompany(p, company));
  const counts = {
    all: base.length,
    featured: base.filter((p) => p.featured === true).length,
  } as Record<SkillFilter, number>;
  for (const id of SKILLSETS) {
    counts[id] = base.filter((p) => p.skillsets.includes(id)).length;
  }
  return counts;
}

/** Counts for company options, scoped to the current skill filter. */
export function getCompanyCounts(
  projects: ProjectCard[],
  skill: SkillFilter = "all"
): Record<CompanyFilter, number> {
  const base = projects.filter((p) => matchesSkill(p, skill));
  const counts = { all: base.length } as Record<CompanyFilter, number>;
  for (const id of COMPANIES) {
    counts[id] = base.filter((p) => p.companies.includes(id)).length;
  }
  return counts;
}

/** @deprecated use getSkillCounts */
export function getFilterCounts(projects: ProjectCard[]) {
  return getSkillCounts(projects, "all");
}
