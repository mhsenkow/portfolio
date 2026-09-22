/** Company / org tags derived from entity, title, and stack. */

export const COMPANIES = [
  "microsoft",
  "meta",
  "ibm",
  "apple",
  "i2systems",
  "independent",
] as const;

export type Company = (typeof COMPANIES)[number];

export const COMPANY_LABEL: Record<Company, string> = {
  microsoft: "microsoft",
  meta: "meta",
  ibm: "ibm",
  apple: "apple",
  i2systems: "i2systems",
  independent: "independent",
};

type CompanySource = {
  slug: string;
  title: string;
  stack?: string[];
  entity?: string;
  details?: {
    entity?: string;
  };
};

const RULES: Record<Exclude<Company, "independent">, RegExp[]> = {
  microsoft: [/\bmicrosoft\b/, /\bviva\b/, /\bmyanalytics\b/, /\bworkplace analytics\b/],
  meta: [/\bmeta\b/, /\bdaiquery\b/, /\bbento\b/],
  ibm: [/\bibm\b/, /\bwatson\b/, /\bcarbon\b/, /\bcognos\b/],
  apple: [/\bapple\b/],
  i2systems: [/\bi2systems\b/, /\bi2 systems\b/, /\bi2systems —/, /\bjudge —/, /\bjudge\b.*crm/, /\blux\b.*design/],
};

function haystack(project: CompanySource): string {
  return [
    project.slug,
    project.title,
    project.entity ?? "",
    project.details?.entity ?? "",
    ...(project.stack ?? []),
  ]
    .join(" | ")
    .toLowerCase();
}

export function deriveCompanies(project: CompanySource): Company[] {
  const hay = haystack(project);
  const out: Company[] = [];
  for (const id of COMPANIES) {
    if (id === "independent") continue;
    if (RULES[id].some((re) => re.test(hay))) out.push(id);
  }
  // Everything else — independent builds, academic, studio, untitled
  if (out.length === 0) out.push("independent");
  return out;
}
