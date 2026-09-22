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

export const FONTS = [
  "geist",
  "ibm-plex",
  "inter",
  "work-sans",
  "space-grotesk",
  "dm-sans",
  "libre-baskerville",
  "lora",
  "manrope",
  "jetbrains-mono",
  "fira-code",
] as const;

export type Font = (typeof FONTS)[number];

export const FONT_LABEL: Record<Font, string> = {
  geist: "Geist",
  "ibm-plex": "IBM Plex Sans",
  inter: "Inter",
  "work-sans": "Work Sans",
  "space-grotesk": "Space Grotesk",
  "dm-sans": "DM Sans",
  "libre-baskerville": "Libre Baskerville",
  lora: "Lora",
  manrope: "Manrope",
  "jetbrains-mono": "JetBrains Mono",
  "fira-code": "Fira Code",
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
