import type { ProjectCard } from "@/content/project-card";

/** Career chapters for home-grid blocking — Braun hairline bands, not cards. */
export const CAREER_ERAS = [
  "now",
  "contracts",
  "meta",
  "microsoft",
  "ibm",
  "origin",
  "machines",
] as const;

export type CareerEra = (typeof CAREER_ERAS)[number];

export const CAREER_ERA_LABEL: Record<CareerEra, string> = {
  now: "now · i2 + machines",
  contracts: "2024–25 · contracts",
  meta: "2022 · meta",
  microsoft: "2018–19 · microsoft",
  ibm: "2014–17 · ibm",
  origin: "2012–13 · origin",
  machines: "machines · craft & builds",
};

/** Newest-first chapter order (default grid). */
export const CAREER_ERA_ORDER_DESC: CareerEra[] = [
  "now",
  "contracts",
  "meta",
  "microsoft",
  "ibm",
  "origin",
  "machines",
];

/** Oldest-first chapter order. */
export const CAREER_ERA_ORDER_ASC: CareerEra[] = [
  "origin",
  "ibm",
  "microsoft",
  "meta",
  "contracts",
  "now",
  "machines",
];

/**
 * Assign a career chapter. Employer tags win; featured 2025+ independents join "now";
 * remaining independents land in machines / origin / contracts by year.
 */
export function assignCareerEra(project: ProjectCard): CareerEra {
  const companies = project.companies;
  if (companies.includes("i2systems")) return "now";
  if (companies.includes("meta")) return "meta";
  if (companies.includes("microsoft")) return "microsoft";
  if (companies.includes("ibm")) return "ibm";
  if (companies.includes("apple")) return "origin";

  const year = project.year ?? 0;
  if (year >= 2025 && project.featured) return "now";
  if (year >= 2024 && year <= 2025) return "contracts";
  if (year > 0 && year <= 2013) return "origin";
  if (!year) return "origin";
  return "machines";
}

export type CareerBand = {
  era: CareerEra;
  label: string;
  items: ProjectCard[];
};

export function groupByCareerEra(
  items: ProjectCard[],
  direction: "desc" | "asc"
): CareerBand[] {
  const order = direction === "asc" ? CAREER_ERA_ORDER_ASC : CAREER_ERA_ORDER_DESC;
  const buckets = new Map<CareerEra, ProjectCard[]>();
  for (const era of order) buckets.set(era, []);

  for (const item of items) {
    const era = assignCareerEra(item);
    buckets.get(era)!.push(item);
  }

  return order
    .map((era) => ({
      era,
      label: CAREER_ERA_LABEL[era],
      items: buckets.get(era) ?? [],
    }))
    .filter((band) => band.items.length > 0);
}
