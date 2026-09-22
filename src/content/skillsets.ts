/** Skillset tags derived from project stack, skills, and copy. */

export const SKILLSETS = [
  "code",
  "vibe",
  "prototype",
  "realtime",
  "make",
  "data",
  "systems",
  "craft",
] as const;

export type Skillset = (typeof SKILLSETS)[number];

export const SKILLSET_LABEL: Record<Skillset, string> = {
  code: "code",
  vibe: "vibe",
  prototype: "prototype",
  realtime: "realtime",
  make: "make",
  data: "data",
  systems: "systems",
  craft: "craft",
};

type SkillSource = {
  slug: string;
  title: string;
  description: string;
  category?: "work" | "creative";
  stack?: string[];
  details?: {
    role?: string;
    skills?: string[];
  };
};

/** Patterns scanned against slug · title · stack · skills · role. */
const RULES: Record<Skillset, RegExp[]> = {
  /** Local-first / local LLM / agent tooling — the independent AI machines. */
  vibe: [
    /\bollama\b/,
    /\blocal-first\b/,
    /\blocal llm\b/,
    /\bbyo model\b/,
    /\bagent tooling\b/,
    /\bvector memory\b/,
    /\bpersonal intelligence\b/,
  ],
  /** Shipping in code — languages, frameworks, front-end craft. */
  code: [
    /\btypescript\b/,
    /\bjavascript\b/,
    /\breact\b/,
    /\bnext\.?js\b/,
    /\brust\b/,
    /\bhtml\b/,
    /\bcss\b/,
    /\bvite\b/,
    /\bbun\b/,
    /\btauri\b/,
    /\bpostgres\b/,
    /\bcloudflare\b/,
    /\bgdscript\b/,
    /\bprocessing\b/,
    /\bfrontend\b/,
    /\bfront-end\b/,
    /\bplaywright\b/,
    /\bandroid\b/,
    /\bsalesforce\b/,
    /\bduckdb\b/,
    /\bpython\b/,
    /\bsql\b/,
  ],
  /** Sketches → working demos; coded & Figma prototypes. */
  prototype: [
    /\bprototyp/,
    /\bhackathon\b/,
    /\bchrome extension\b/,
    /\bwirefram/,
    /\bprototype sketches\b/,
  ],
  /** Real-time graphics, games, sims, shaders. */
  realtime: [
    /\bthree\.?js\b/,
    /\bwebgl\b/,
    /\bwebxr\b/,
    /\bwebgpu\b/,
    /\bglsl\b/,
    /\bgdshader\b/,
    /\bgodot\b/,
    /\bvoxel\b/,
    /\bsimulation\b/,
    /\becs\b/,
    /\bpixel art\b/,
    /\bsteam\b/,
  ],
  /** Physical making — fab, robots, parametric geometry. */
  make: [
    /\brhino\b/,
    /\bgrasshopper\b/,
    /\bcnc\b/,
    /\bkuka\b/,
    /\barduino\b/,
    /\bfabricat/,
    /\b3d print/,
    /\bthermoform/,
    /\bmanifold\b/,
    /\bstl\b/,
    /\bmachining\b/,
    /\bblender\b/,
    /\bparametric\b/,
    /\bphysical interaction\b/,
    /\bled design\b/,
    /\baxidraw\b/,
    /\barchitecture graduate\b/,
    /\bspatial design\b/,
    /\bdigital fabrication\b/,
  ],
  /** Data products, viz, analytics notebooks. */
  data: [
    /\bvega\b/,
    /\bd3\b/,
    /\bduckdb\b/,
    /\bdata viz\b/,
    /\banalytics\b/,
    /\bedgar\b/,
    /\bdata product/,
    /\bdata tool/,
    /\bdata suite/,
    /\binformation visualization\b/,
    /\bnotebooks\b/,
  ],
  /** Design systems, admin/product platforms, enterprise UX. */
  systems: [
    /\bdesign system/,
    /\bcomponent (library|system)/,
    /\bcomponent library\b/,
    /\badmin\b/,
    /\bcrm\b/,
    /\bsalesforce\b/,
    /\bworkplace analytics\b/,
    /\bmyanalytics\b/,
    /\baccessibility\b/,
    /\binternal software\b/,
    /\bdata-suite\b/,
    /\bwindows cloud\b/,
  ],
  /** Graphic / generative / visual art (not every “visual design” skill). */
  craft: [
    /\bgraphic design\b/,
    /\bicon creation\b/,
    /\bicon\b/,
    /\bgenerative\b/,
    /\baxidraw\b/,
    /\bvideo art\b/,
    /\bpixel art\b/,
    /\bai generated\b/,
    /\brendering\b/,
    /\bcanvas\b/,
  ],
};

function haystack(project: SkillSource): string {
  return [
    project.slug,
    project.title,
    project.description,
    ...(project.stack ?? []),
    ...(project.details?.skills ?? []),
    project.details?.role ?? "",
  ]
    .join(" | ")
    .toLowerCase();
}

export function deriveSkillsets(project: SkillSource): Skillset[] {
  const hay = haystack(project);
  const out: Skillset[] = [];
  for (const id of SKILLSETS) {
    if (RULES[id].some((re) => re.test(hay))) out.push(id);
  }
  // Pure visual/creative gallery pieces with no other tags → craft
  if (
    out.length === 0 &&
    project.category === "creative" &&
    (!project.stack || project.stack.length === 0)
  ) {
    out.push("craft");
  }
  return out;
}
