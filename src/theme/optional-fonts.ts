import {
  IBM_Plex_Sans,
  Libre_Baskerville,
  Lora,
  JetBrains_Mono,
  Fira_Code,
} from "next/font/google";
import type { Font } from "./system";

/**
 * Loaded typefaces only — company system stacks (SF Pro, Segoe, Optimistic)
 * are CSS-only and need no network fetch.
 */
const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "600"],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: false,
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: false,
  display: "swap",
});

const OPTIONAL_FONT_CLASS: Partial<Record<Font, string>> = {
  "ibm-plex": ibmPlex.variable,
  "libre-baskerville": libreBaskerville.variable,
  lora: lora.variable,
  "jetbrains-mono": jetBrainsMono.variable,
  "fira-code": firaCode.variable,
};

const OPTIONAL_CLASSES = Object.values(OPTIONAL_FONT_CLASS);

/** Attach every loaded face so the type panel can preview each name in-character. */
export function ensureAllOptionalFontClasses() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const cls of OPTIONAL_CLASSES) {
    root.classList.add(cls);
  }
}

/** Keep loaded faces mounted so chapter previews stay in-character. */
export function ensureOptionalFontClass() {
  ensureAllOptionalFontClasses();
}
