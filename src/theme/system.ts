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
 * Quiet career arc in face order only — all are loadable (no proprietary
 * system faces that silently fall back).
 */
export const FONTS = [
  "libre-baskerville",
  "lora",
  "ibm-plex",
  "inter",
  "geist",
  "jetbrains-mono",
  "fira-code",
] as const;

export type Font = (typeof FONTS)[number];

export const FONT_LABEL: Record<Font, string> = {
  "libre-baskerville": "Libre Baskerville",
  lora: "Lora",
  "ibm-plex": "IBM Plex Sans",
  inter: "Inter",
  geist: "Geist",
  "jetbrains-mono": "JetBrains Mono",
  "fira-code": "Fira Code",
};

/** Retired / unavailable faces → nearest working face */
export const FONT_LEGACY: Record<string, Font> = {
  "work-sans": "inter",
  "space-grotesk": "geist",
  "dm-sans": "inter",
  manrope: "geist",
  "sf-pro": "geist",
  segoe: "inter",
  optimistic: "inter",
};

export const DEFAULT_THEME: Theme = "light";
export const DEFAULT_FONT: Font = "inter";

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
