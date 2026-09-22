/** Company / org tags derived from entity, title, and stack. */

export const COMPANIES = [
  "microsoft",
  "meta",
  "ibm",
  "apple",
  "i2systems",
  "umich",
  "michigan-tech",
  "independent",
] as const;

export type Company = (typeof COMPANIES)[number];

export const COMPANY_LABEL: Record<Company, string> = {
  microsoft: "microsoft",
  meta: "meta",
  ibm: "ibm",
  apple: "apple",
  i2systems: "i2systems",
  umich: "umich",
  "michigan-tech": "michigan tech",
  independent: "independent",
};

type CompanySource = {
  slug: string;
  title: string;
  stack?: string[];
  entity?: string;
  details?: {
    entity?: string;
    location?: string;
  };
};

const RULES: Record<Exclude<Company, "independent">, RegExp[]> = {
  microsoft: [/\bmicrosoft\b/, /\bviva\b/, /\bmyanalytics\b/, /\bworkplace analytics\b/],
  meta: [/\bmeta\b/, /\bdaiquery\b/, /\bbento\b/],
  ibm: [/\bibm\b/, /\bwatson\b/, /\bcarbon\b/, /\bcognos\b/],
  apple: [/\bapple\b/],
  i2systems: [
    /\bi2systems\b/,
    /\bi2 systems\b/,
    /\bi2systems —/,
    /\bjudge —/,
    /\bjudge\b.*crm/,
    /\blux\b.*design/,
  ],
  umich: [
    /\buniversity of michigan\b/,
    /\bumich\b/,
    /\btaubman\b/,
    /\bann arbor\b/,
    /\bglow workshop\b/,
  ],
  "michigan-tech": [
    /\bmichigan tech\b/,
    /\bmichigan technological\b/,
    /\bmtu\b/,
    /\bhoughton\b/,
    /\btechnical communications?\b/,
  ],
};

function haystack(project: CompanySource): string {
  return [
    project.slug,
    project.title,
    project.entity ?? "",
    project.details?.entity ?? "",
    project.details?.location ?? "",
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
  if (out.length === 0) out.push("independent");
  return out;
}
