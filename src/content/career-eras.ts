import type { ProjectCard } from "@/content/project-card";
import type { Company } from "@/content/companies";
import { SKILLSETS, SKILLSET_LABEL, type Skillset } from "@/content/skillsets";

/** Career chapters for home-grid blocking — Braun hairline bands, not cards. */
export const CAREER_ERAS = [
  "now",
  "contracts",
  "meta",
  "microsoft",
  "ibm",
  "origin",
] as const;

export type CareerEra = (typeof CAREER_ERAS)[number];

export const CAREER_ERA_LABEL: Record<CareerEra, string> = {
  now: "now · i2 + machines",
  contracts: "2024–25 · contracts",
  meta: "2020–23 · meta",
  microsoft: "2018–19 · microsoft",
  ibm: "2014–17 · ibm",
  origin: "–2013 · origin",
};

/** Newest-first chapter order (default grid). */
export const CAREER_ERA_ORDER_DESC: CareerEra[] = [
  "now",
  "contracts",
  "meta",
  "microsoft",
  "ibm",
  "origin",
];

/** Oldest-first chapter order. */
export const CAREER_ERA_ORDER_ASC: CareerEra[] = [
  "origin",
  "ibm",
  "microsoft",
  "meta",
  "contracts",
  "now",
];

/**
 * Assign a career chapter. Employer tags win; craft/independents land in the
 * same chapter as their year so eras mix companies with machines.
 */
export function assignCareerEra(project: ProjectCard): CareerEra {
  const companies = project.companies;
  if (companies.includes("i2systems")) return "now";
  if (companies.includes("meta")) return "meta";
  if (companies.includes("microsoft")) return "microsoft";
  if (companies.includes("ibm")) return "ibm";
  if (companies.includes("apple")) return "origin";

  const year = project.year ?? 0;
  if (year >= 2025) return "now";
  if (year >= 2024) return "contracts";
  if (year >= 2020) return "meta";
  if (year >= 2018) return "microsoft";
  if (year >= 2014) return "ibm";
  return "origin";
}

export type GridBand = {
  id: string;
  label: string;
  items: ProjectCard[];
};

export type GridGroupMode = "eras" | "corp" | "groups" | "flat";

export const GRID_GROUP_CYCLE: GridGroupMode[] = ["eras", "corp", "groups", "flat"];

export const GRID_GROUP_LABEL: Record<GridGroupMode, string> = {
  eras: "eras",
  corp: "corp",
  groups: "groups",
  flat: "flat",
};

function bandsFromBuckets(
  order: readonly string[],
  labels: Record<string, string>,
  buckets: Map<string, ProjectCard[]>
): GridBand[] {
  return order
    .map((id) => ({
      id,
      label: labels[id] ?? id,
      items: buckets.get(id) ?? [],
    }))
    .filter((band) => band.items.length > 0);
}

export function groupByCareerEra(
  items: ProjectCard[],
  direction: "desc" | "asc"
): GridBand[] {
  const order = direction === "asc" ? CAREER_ERA_ORDER_ASC : CAREER_ERA_ORDER_DESC;
  const buckets = new Map<string, ProjectCard[]>();
  for (const era of order) buckets.set(era, []);

  for (const item of items) {
    const era = assignCareerEra(item);
    buckets.get(era)!.push(item);
  }

  return bandsFromBuckets(order, CAREER_ERA_LABEL, buckets);
}

/** Newest-first employer order; craft/independent last. */
export const CORP_ORDER_DESC: Company[] = [
  "i2systems",
  "microsoft",
  "meta",
  "ibm",
  "apple",
  "independent",
];

export const CORP_ORDER_ASC: Company[] = [...CORP_ORDER_DESC].reverse();

export const CORP_BAND_LABEL: Record<Company, string> = {
  i2systems: "i2systems",
  microsoft: "microsoft",
  meta: "meta",
  ibm: "ibm",
  apple: "apple",
  independent: "independent · machines",
};

function primaryCompany(project: ProjectCard): Company {
  for (const id of CORP_ORDER_DESC) {
    if (id === "independent") continue;
    if (project.companies.includes(id)) return id;
  }
  return "independent";
}

export function groupByCorp(
  items: ProjectCard[],
  direction: "desc" | "asc"
): GridBand[] {
  const order = direction === "asc" ? CORP_ORDER_ASC : CORP_ORDER_DESC;
  const buckets = new Map<string, ProjectCard[]>();
  for (const id of order) buckets.set(id, []);

  for (const item of items) {
    buckets.get(primaryCompany(item))!.push(item);
  }

  return bandsFromBuckets(order, CORP_BAND_LABEL, buckets);
}

/** Skillset chapter order — craft last so hire-adjacent systems/data lead. */
export const GROUP_ORDER: (Skillset | "other")[] = [
  "systems",
  "data",
  "vibe",
  "code",
  "prototype",
  "realtime",
  "make",
  "craft",
  "other",
];

export const GROUP_BAND_LABEL: Record<Skillset | "other", string> = {
  ...SKILLSET_LABEL,
  other: "other",
};

function primarySkillset(project: ProjectCard): Skillset | "other" {
  for (const id of SKILLSETS) {
    if (project.skillsets.includes(id)) return id;
  }
  return "other";
}

/** Band by primary skillset — the craft/skill “groups” view. */
export function groupBySkillGroup(items: ProjectCard[]): GridBand[] {
  const buckets = new Map<string, ProjectCard[]>();
  for (const id of GROUP_ORDER) buckets.set(id, []);

  for (const item of items) {
    buckets.get(primarySkillset(item))!.push(item);
  }

  return bandsFromBuckets(GROUP_ORDER, GROUP_BAND_LABEL, buckets);
}

export function groupGridItems(
  items: ProjectCard[],
  mode: GridGroupMode,
  direction: "desc" | "asc"
): GridBand[] | null {
  if (mode === "flat") return null;
  if (mode === "eras") return groupByCareerEra(items, direction);
  if (mode === "corp") return groupByCorp(items, direction);
  return groupBySkillGroup(items);
}
