/**
 * Portfolio design-system catalog — themes & fonts shared by ThemeToggle,
 * boot script, and docs. Visual values live in `src/styles/tokens.css`.
 */

export const THEMES = [
  "light",
  "dark",
  "contrast",
  "paper",
  "glass",
  "frost",
  "brutal",
  "loom",
  "tank",
  "nes",
] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_LABEL: Record<Theme, string> = {
  light: "light",
  dark: "dark",
  contrast: "contrast",
  paper: "paper",
  glass: "glass",
  frost: "frost",
  brutal: "brutal",
  loom: "loom",
  tank: "tank",
  nes: "nes",
};

/** Legacy portfolio theme names → current wordcount-aligned set */
export const THEME_LEGACY: Record<string, Theme> = {
  hc: "contrast",
  electric: "frost",
  forest: "tank",
};

/**
 * Typefaces as career chapters — chronological.
 * System stacks (sf-pro, segoe, optimistic) need no network load.
 */
export const FONTS = [
  "libre-baskerville",
  "lora",
  "sf-pro",
  "ibm-plex",
  "segoe",
  "optimistic",
  "geist",
  "jetbrains-mono",
  "fira-code",
] as const;

export type Font = (typeof FONTS)[number];

export const FONT_LABEL: Record<Font, string> = {
  "libre-baskerville": "Libre Baskerville",
  lora: "Lora",
  "sf-pro": "SF Pro",
  "ibm-plex": "IBM Plex Sans",
  segoe: "Segoe UI",
  optimistic: "Optimistic",
  geist: "Geist",
  "jetbrains-mono": "JetBrains Mono",
  "fira-code": "Fira Code",
};

/** Retired picker faces → nearest story face */
export const FONT_LEGACY: Record<string, Font> = {
  inter: "geist",
  "work-sans": "geist",
  "space-grotesk": "geist",
  "dm-sans": "geist",
  manrope: "geist",
};

export type FontChapter = {
  id: string;
  era: string;
  years?: string;
  note: string;
  fonts: Font[];
};

/** Chapters drive the type panel — a career told in faces. */
export const FONT_CHAPTERS: FontChapter[] = [
  {
    id: "school",
    era: "school",
    years: "2012–13",
    note: "Architecture briefs and HCI thesis years",
    fonts: ["libre-baskerville", "lora"],
  },
  {
    id: "apple",
    era: "apple",
    years: "2012",
    note: "IS&T accessibility tooling",
    fonts: ["sf-pro"],
  },
  {
    id: "ibm",
    era: "ibm",
    years: "2014–17",
    note: "Watson, SPSS, early Carbon",
    fonts: ["ibm-plex"],
  },
  {
    id: "microsoft",
    era: "microsoft",
    years: "2017–24",
    note: "MyAnalytics → Focus Time",
    fonts: ["segoe"],
  },
  {
    id: "meta",
    era: "meta",
    years: "2022",
    note: "Notebooks, Vega, infra systems",
    fonts: ["optimistic"],
  },
  {
    id: "independent",
    era: "independent",
    years: "now",
    note: "Machines, local tools, coded craft",
    fonts: ["geist", "jetbrains-mono", "fira-code"],
  },
];

export const FONT_BEAT: Record<Font, string> = {
  "libre-baskerville": "architecture writing",
  lora: "HCI reading",
  "sf-pro": "Apple system UI",
  "ibm-plex": "IBM Design",
  segoe: "Windows / Office",
  optimistic: "Meta product UI",
  geist: "portfolio default",
  "jetbrains-mono": "terminal craft",
  "fira-code": "prototypes in code",
};

export function migrateTheme(raw: string | null | undefined): Theme | null {
  if (!raw) return null;
  if (THEME_LEGACY[raw]) return THEME_LEGACY[raw];
  if ((THEMES as readonly string[]).includes(raw)) return raw as Theme;
  return null;
}

export function isFont(raw: string | null | undefined): raw is Font {
  return !!raw && (FONTS as readonly string[]).includes(raw);
}

export function migrateFont(raw: string | null | undefined): Font | null {
  if (!raw) return null;
  if (isFont(raw)) return raw;
  if (FONT_LEGACY[raw]) return FONT_LEGACY[raw];
  return null;
}
