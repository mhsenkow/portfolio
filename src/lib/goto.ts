import { projects } from "@/content/projects";
import { deriveSkillsets } from "@/content/skillsets";
import { RESUME_URL } from "@/content/site";

export type Destination = {
  id: string;
  href: string;
  title: string;
  blurb: string;
  kind: "page" | "project" | "tool";
  /** Searchable blob used to build the TF-IDF vector. */
  text: string;
};

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "is",
  "are",
  "was",
  "be",
  "as",
  "it",
  "this",
  "that",
  "my",
  "me",
  "i",
  "im",
  "i'm",
  "you",
  "your",
  "show",
  "find",
  "go",
  "take",
  "get",
  "open",
  "want",
  "looking",
  "look",
  "please",
  "where",
  "whats",
  "what's",
  "what",
  "who",
  "how",
  "can",
  "see",
  "page",
]);

/** Query-side concept expansion — casual words → related catalog terms. */
const CONCEPTS: Record<string, string[]> = {
  earth: [
    "planet",
    "planetary",
    "world",
    "globe",
    "soil",
    "orrery",
    "geodesic",
    "galaxy",
    "space",
    "loam",
    "walstad",
    "aquarium",
    "architecture",
  ],
  planet: ["planetary", "orrery", "solar", "system", "space", "earth", "galaxy"],
  space: ["orrery", "planet", "planetary", "galaxy", "solar", "webxr", "ramen", "smoke"],
  nature: ["loam", "walstad", "permaculture", "soil", "aquarium", "plants"],
  soil: ["loam", "walstad", "permaculture", "nutrient", "earth"],
  ai: ["ollama", "local-first", "notebook", "throughline", "loom", "agent", "watson"],
  local: ["local-first", "ollama", "throughline", "loom", "offline", "on-device"],
  design: ["systems", "carbon", "figma", "ux", "product"],
  system: ["systems", "carbon", "component", "design"],
  viz: ["visualization", "vega", "chart", "data", "infographic", "d3"],
  data: ["analytics", "viz", "visualization", "dashboard", "notebook", "duckdb", "sql"],
  microsoft: ["viva", "teams", "myanalytics", "workplace", "windows"],
  meta: ["facebook", "daiquery", "bento", "notebooks"],
  ibm: ["watson", "carbon", "spss"],
  apple: ["a11y", "accessibility"],
  hire: ["about", "contact", "resume", "staff"],
  job: ["about", "contact", "resume", "hire"],
  contact: ["about", "email", "hire"],
  // Skills / platforms / languages
  mobile: ["android", "ios", "responsive", "phone", "app", "galaxy"],
  responsive: ["mobile", "layout", "breakpoint", "adaptive", "viewport"],
  frontend: ["react", "typescript", "javascript", "css", "html", "ui", "web"],
  backend: ["rust", "python", "postgres", "workers", "sql", "api"],
  language: [
    "typescript",
    "javascript",
    "rust",
    "python",
    "gdscript",
    "glsl",
    "sql",
    "wgsl",
  ],
  languages: [
    "typescript",
    "javascript",
    "rust",
    "python",
    "gdscript",
    "glsl",
    "sql",
    "wgsl",
  ],
  code: ["typescript", "rust", "python", "react", "javascript", "frontend", "shader"],
  shader: ["glsl", "wgsl", "webgl", "webgpu", "gdshader", "mercury"],
  desktop: ["tauri", "macos", "rust", "throughline"],
  database: ["postgres", "duckdb", "sql", "sqlite"],
  typescript: ["ts", "typed", "javascript", "frontend", "react"],
  rust: ["systems", "wasm", "tauri", "ramen", "performance"],
  python: ["scripting", "pipeline", "data", "ml"],
  react: ["frontend", "javascript", "typescript", "jsx", "ui"],
  godot: ["gdscript", "gdshader", "game", "simulation", "loam", "walstad"],
  webgl: ["three", "glsl", "shader", "gpu", "realtime"],
  webgpu: ["wgsl", "gpu", "shader", "realtime"],
};

/**
 * Expand stack / skill tokens so language & platform synonyms land in the index.
 * Applied per destination — keeps catalog text lean while search stays generous.
 */
const TECH_EXPAND: Record<string, string[]> = {
  typescript: ["ts", "typed", "javascript", "language", "frontend", "code"],
  javascript: ["js", "frontend", "web", "language", "code"],
  rust: ["systems", "language", "wasm", "performance", "code", "systems-programming"],
  python: ["py", "scripting", "pipeline", "language", "code"],
  react: ["frontend", "jsx", "ui", "javascript", "typescript", "code"],
  "next.js": ["react", "frontend", "typescript"],
  nextjs: ["react", "frontend", "typescript"],
  tauri: ["rust", "desktop", "macos", "code"],
  godot: ["gdscript", "gdshader", "game", "simulation", "realtime"],
  "godot 4": ["godot", "gdscript", "gdshader", "game"],
  gdscript: ["godot", "game", "language", "code"],
  gdshader: ["godot", "shader", "glsl", "realtime"],
  glsl: ["shader", "webgl", "gpu", "language", "code"],
  wgsl: ["shader", "webgpu", "gpu", "language", "code"],
  webgl: ["shader", "glsl", "gpu", "realtime", "three"],
  webgpu: ["shader", "wgsl", "gpu", "realtime"],
  "three.js": ["three", "webgl", "3d", "realtime", "javascript"],
  three: ["webgl", "3d", "realtime"],
  webxr: ["vr", "ar", "immersive", "three", "javascript"],
  duckdb: ["sql", "database", "analytics", "data", "wasm"],
  postgres: ["postgresql", "sql", "database", "backend"],
  postgresql: ["postgres", "sql", "database"],
  sql: ["database", "query", "data", "language"],
  "cloudflare workers": ["workers", "edge", "typescript", "backend"],
  workers: ["cloudflare", "edge", "typescript"],
  manifold: ["geometry", "csg", "cad", "mesh", "typescript", "fabrication"],
  bun: ["typescript", "javascript", "runtime", "code"],
  vite: ["frontend", "typescript", "javascript"],
  canvas: ["frontend", "graphics", "javascript"],
  android: ["mobile", "java", "kotlin", "app"],
  java: ["android", "mobile", "language", "code"],
  ios: ["mobile", "swift", "app"],
  swift: ["ios", "mobile", "language", "code"],
  kotlin: ["android", "mobile", "language", "code"],
  html: ["frontend", "web", "css"],
  css: ["frontend", "web", "responsive", "layout"],
  pwa: ["offline", "web", "frontend", "mobile"],
  ollama: ["ai", "llm", "local-first", "local"],
  "local-first": ["offline", "local", "privacy", "on-device"],
  vega: ["visualization", "viz", "data", "chart"],
  "vega-lite": ["vega", "visualization", "viz", "data"],
  d3: ["visualization", "viz", "data", "javascript", "svg"],
  ecs: ["systems", "simulation", "game", "realtime"],
  voxel: ["3d", "realtime", "simulation"],
  stl: ["fabrication", "3d", "print", "mesh"],
  wasm: ["rust", "web", "performance", "code"],
  macos: ["desktop", "native", "apple"],
  playwright: ["testing", "automation", "typescript"],
  processing: ["java", "creative", "code", "visualization"],
  "d3.js": ["d3", "visualization", "viz", "data"],
};

/** Extra tokens fused into destination text so casual phrasing still hits. */
const ALIASES: Record<string, string[]> = {
  about: ["bio", "contact", "email", "who", "background", "hire", "hiring", "job"],
  projects: ["case", "studies", "work", "portfolio", "featured"],
  "other-design-work": ["explorations", "experiments", "side", "creative", "craft"],
  "list-view": ["archive", "timeline", "chronological", "history", "all"],
  home: ["start", "grid", "overview"],
  resume: ["cv", "curriculum", "pdf", "hire"],
  judge: ["i2systems", "i2", "lux", "salesforce", "crm", "lighting"],
  throughline: ["notebook", "ollama", "local-first", "ai", "notebooks"],
  wordcounter: ["wordcount", "word", "counter", "writing"],
  "loom-os": ["loom", "terminal", "personal", "intelligence", "vector", "memory", "ollama", "ai"],
  orrery: [
    "planet",
    "planetary",
    "earth",
    "solar",
    "system",
    "space",
    "world",
    "globe",
    "webxr",
    "god-game",
  ],
  geodesic: ["geo", "dome", "earth", "sphere", "hub", "3d", "print"],
  "guide-to-the-galaxy": ["galaxy", "planet", "earth", "space", "solar", "planetarium", "adler"],
  loam: ["soil", "earth", "permaculture", "nature", "plants", "garden"],
  "walstad-loom": ["aquarium", "earth", "nature", "soil", "fish", "pixel", "walstad"],
  "smoke-ring": ["space", "torus", "voxel", "integral", "trees", "gas"],
  ramen: ["space", "kepler", "drum", "walk", "embodied"],
  "meta-daiquery-bento-notebooks": ["meta", "facebook", "daiquery", "bento", "notebooks", "sql"],
  "ibm-spss-modeler": ["ibm", "spss", "modeler", "watson", "carbon"],
  "apple-accessibility": ["apple", "a11y", "accessibility"],
  "windows-cloud-updating-peripherals": ["microsoft", "windows", "w365", "peripherals"],
  "teams-admin-center": ["microsoft", "teams", "admin"],
  "workplace-analytics-programs": ["microsoft", "viva", "workplace", "analytics"],
  "researching-silence": ["focus", "silence", "microsoft", "wellbeing"],
  "improving-work-life-balance": ["focus", "myanalytics", "microsoft", "metrics"],
};

/** Chips shown when the field is empty or has no hits. */
export const GOTO_SUGGESTIONS = [
  "ai",
  "rust",
  "typescript",
  "mobile",
  "earth",
  "local",
  "microsoft",
] as const;

/** Fuse tech synonyms for every token already in a destination blob. */
function expandTechTokens(raw: string): string {
  const tokens = tokenize(raw);
  const extras: string[] = [];
  for (const t of tokens) {
    const hit = TECH_EXPAND[t];
    if (hit) extras.push(...hit);
  }
  // Multi-word stack labels ("Godot 4", "Three.js", "Cloudflare Workers")
  const lower = raw.toLowerCase();
  for (const [key, vals] of Object.entries(TECH_EXPAND)) {
    if (key.includes(" ") || key.includes(".")) {
      if (lower.includes(key)) extras.push(...vals);
    }
  }
  return extras.length ? `${raw} ${extras.join(" ")}` : raw;
}

function flatten(value: string | string[] | undefined): string {
  if (!value) return "";
  return Array.isArray(value) ? value.join(" ") : value;
}

function tokenize(raw: string): string[] {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9+#.\-/\s]/g, " ")
    .split(/[\s/._-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Expand query with concept neighbors (deduped). */
function expandQueryTokens(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    const extras = CONCEPTS[t];
    if (!extras) continue;
    for (const x of extras) out.add(x);
  }
  return [...out];
}

function editDistance1(a: string, b: string): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  if (la > lb) return editDistance1(b, a);
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (la === lb) {
      i++;
      j++;
    } else {
      j++;
    }
  }
  return true;
}

function tokenSoftMatch(queryToken: string, docToken: string): number {
  if (queryToken === docToken) return 1;
  if (docToken.startsWith(queryToken) && queryToken.length >= 3) return 0.72;
  if (queryToken.startsWith(docToken) && docToken.length >= 3) return 0.55;
  if (docToken.includes(queryToken) && queryToken.length >= 4) return 0.45;
  if (queryToken.length >= 4 && docToken.length >= 4 && editDistance1(queryToken, docToken)) {
    return 0.5;
  }
  return 0;
}

function buildDestinations(): Destination[] {
  const pages: Destination[] = [
    {
      id: "home",
      href: "/",
      title: "Home",
      blurb: "Full work grid",
      kind: "page",
      text: `home start overview work grid ${ALIASES.home.join(" ")}`,
    },
    {
      id: "about",
      href: "/about",
      title: "About",
      blurb: "Bio and contact",
      kind: "page",
      text: `about bio contact email background michael senkow staff product designer ${ALIASES.about.join(" ")}`,
    },
    {
      id: "story",
      href: "/story",
      title: "A story",
      blurb: "Systems, products, AI, fabrication, and habitat games",
      kind: "page",
      text: `story throughline through-line narrative arc design systems products ai apple ibm microsoft meta judge notebooks morphfaux orrery ramen walstad loom wordcounter starship-vega imdb-loom data fabrication craft`,
    },
    {
      id: "projects",
      href: "/projects",
      title: "Case studies",
      blurb: "Selected product work",
      kind: "page",
      text: `projects case studies featured work microsoft meta ibm apple ${ALIASES.projects.join(" ")}`,
    },
    {
      id: "other-design-work",
      href: "/other-design-work",
      title: "Explorations",
      blurb: "Independent machines and craft",
      kind: "page",
      text: `explorations other design work creative craft experiments ${ALIASES["other-design-work"].join(" ")}`,
    },
    {
      id: "list-view",
      href: "/list-view",
      title: "Archive",
      blurb: "Chronological list of everything",
      kind: "page",
      text: `archive list view chronological timeline history ${ALIASES["list-view"].join(" ")}`,
    },
    {
      id: "resume",
      href: RESUME_URL,
      title: "Resume",
      blurb: "PDF resume",
      kind: "page",
      text: `resume cv curriculum vitae pdf download ${ALIASES.resume.join(" ")}`,
    },
  ];

  const projectDests: Destination[] = projects.map((p) => {
    const aliasTokens = [...(p.aliases ?? []), ...(ALIASES[p.slug] ?? [])].join(" ");
    const skillsets = deriveSkillsets(p).join(" ");
    const text = expandTechTokens(
      [
        p.slug,
        p.title,
        p.description,
        p.stack?.join(" "),
        p.details?.role,
        p.details?.entity,
        flatten(p.details?.synopsis),
        p.details?.skills?.join(" "),
        skillsets,
        aliasTokens,
        p.category ?? "",
        p.year != null ? String(p.year) : "",
        // Side projects / machines often live as creative + GitHub
        p.links?.some((l) => /github/i.test(l.label) || /github\.com/i.test(l.href))
          ? "github open-source side-project machine"
          : "",
      ]
        .filter(Boolean)
        .join(" ")
    );

    return {
      id: `project:${p.slug}`,
      href: `/projects/${p.slug}`,
      title: p.title,
      blurb: p.description,
      kind: "project" as const,
      text,
    };
  });

  const tools: Destination[] = [];
  for (const p of projects) {
    const live = p.links?.find((l) => /live|demo|open/i.test(l.label));
    if (!live?.href || live.href.startsWith("/projects/")) continue;
    if (live.href.startsWith("http") && !live.href.includes("ibm.io")) continue;
    tools.push({
      id: `tool:${p.slug}`,
      href: live.href,
      title: `${p.title} — live`,
      blurb: live.label,
      kind: "tool",
      text: `${p.slug} ${p.title} live demo tool app open ${p.description}`,
    });
  }

  return [...pages, ...projectDests, ...tools];
}

type Sparse = Map<string, number>;

type Indexed = {
  dest: Destination;
  tokens: string[];
  tokenSet: Set<string>;
  titleTokens: Set<string>;
  vec: Sparse;
  norm: number;
};

function tfidf(tokens: string[], idf: Map<string, number>): Sparse {
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  const len = tokens.length || 1;
  const vec: Sparse = new Map();
  for (const [t, c] of tf) {
    const w = (c / len) * (idf.get(t) ?? 0);
    if (w > 0) vec.set(t, w);
  }
  return vec;
}

function norm(vec: Sparse): number {
  let s = 0;
  for (const v of vec.values()) s += v * v;
  return Math.sqrt(s) || 1;
}

function cosine(a: Sparse, aNorm: number, b: Sparse, bNorm: number): number {
  if (a.size > b.size) return cosine(b, bNorm, a, aNorm);
  let dot = 0;
  for (const [t, av] of a) {
    const bv = b.get(t);
    if (bv) dot += av * bv;
  }
  return dot / (aNorm * bNorm);
}

function softOverlap(queryTokens: string[], item: Indexed): number {
  if (!queryTokens.length) return 0;
  let sum = 0;
  for (const qt of queryTokens) {
    let best = 0;
    if (item.titleTokens.has(qt)) best = 1.35;
    else if (item.tokenSet.has(qt)) best = 1;
    else {
      for (const dt of item.tokenSet) {
        const m = tokenSoftMatch(qt, dt);
        if (m > best) best = m;
        if (best >= 1) break;
      }
      if (best > 0 && item.titleTokens.size) {
        for (const dt of item.titleTokens) {
          const m = tokenSoftMatch(qt, dt);
          if (m > 0) best = Math.max(best, m + 0.15);
        }
      }
    }
    sum += best;
  }
  return Math.min(1.2, sum / queryTokens.length);
}

function lexicalScore(queryTokens: string[], queryRaw: string, item: Indexed): number {
  if (!queryTokens.length) return 0;
  const overlap = softOverlap(queryTokens, item);
  const q = queryRaw.toLowerCase().trim();
  const title = item.dest.title.toLowerCase();
  const slug = item.dest.id.replace(/^project:|^tool:/, "");
  const blob = item.dest.text.toLowerCase();
  let bonus = 0;
  if (q && (title.includes(q) || slug.includes(q.replace(/\s+/g, "-")))) bonus += 0.35;
  else if (q.length >= 4 && blob.includes(q)) bonus += 0.18;
  if (queryTokens.every((t) => item.titleTokens.has(t) || item.tokenSet.has(t))) {
    bonus += 0.12;
  }
  return Math.min(1, overlap * 0.85 + bonus);
}

let cache: { items: Indexed[]; idf: Map<string, number> } | null = null;

function ensureIndex() {
  if (cache) return cache;

  const destinations = buildDestinations();
  const docs = destinations.map((dest) => {
    const tokens = tokenize(dest.text);
    return {
      dest,
      tokens,
      tokenSet: new Set(tokens),
      titleTokens: new Set(tokenize(`${dest.title} ${dest.id}`)),
    };
  });

  const df = new Map<string, number>();
  for (const d of docs) {
    for (const t of d.tokenSet) df.set(t, (df.get(t) ?? 0) + 1);
  }
  const N = docs.length;
  const idf = new Map<string, number>();
  for (const [t, c] of df) {
    idf.set(t, Math.log(1 + N / c));
  }

  const items: Indexed[] = docs.map((d) => {
    const vec = tfidf(d.tokens, idf);
    return { ...d, vec, norm: norm(vec) };
  });

  cache = { items, idf };
  return cache;
}

export type GotoHit = {
  destination: Destination;
  score: number;
};

/**
 * Hybrid rank: expanded-query TF-IDF + soft lexical (prefix / typo / substring).
 * Zero network, zero model download — built for a small fixed catalog.
 */
export function rankGoto(query: string, limit = 8): GotoHit[] {
  const q = query.trim();
  if (!q) return [];

  const { items, idf } = ensureIndex();
  const rawTokens = tokenize(q);
  if (!rawTokens.length) return [];

  const qTokens = expandQueryTokens(rawTokens);
  const qVec = tfidf(qTokens, idf);
  const qNorm = norm(qVec);

  const scored: GotoHit[] = [];
  for (const item of items) {
    const semantic = cosine(qVec, qNorm, item.vec, item.norm);
    const lexical = lexicalScore(rawTokens, q, item);
    // Expanded tokens feed TF-IDF; lexical stays on the typed words + soft match.
    const expandedLexical = softOverlap(qTokens, item) * 0.35;
    const score = 0.5 * semantic + 0.35 * lexical + 0.15 * Math.min(1, expandedLexical);
    if (score < 0.06) continue;
    scored.push({ destination: item.dest, score });
  }

  scored.sort(
    (a, b) => b.score - a.score || a.destination.title.localeCompare(b.destination.title)
  );
  return scored.slice(0, limit);
}
