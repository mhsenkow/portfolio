import {
  IBM_Plex_Sans,
  Inter,
  Work_Sans,
  Space_Grotesk,
  DM_Sans,
  Libre_Baskerville,
  Lora,
  Manrope,
  JetBrains_Mono,
  Fira_Code,
} from "next/font/google";
import type { Font } from "./system";

/**
 * Non-default typefaces — CSS vars only, no preload.
 * Applied to <html> when ThemeToggle selects them so first paint stays on Geist.
 */
const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "600"],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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

const manrope = Manrope({
  variable: "--font-manrope",
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
  inter: inter.variable,
  "work-sans": workSans.variable,
  "space-grotesk": spaceGrotesk.variable,
  "dm-sans": dmSans.variable,
  "libre-baskerville": libreBaskerville.variable,
  lora: lora.variable,
  manrope: manrope.variable,
  "jetbrains-mono": jetBrainsMono.variable,
  "fira-code": firaCode.variable,
};

const OPTIONAL_CLASSES = Object.values(OPTIONAL_FONT_CLASS);

/** Attach the CSS variable class for a non-Geist font; no-op for geist. */
export function ensureOptionalFontClass(font: Font) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const cls of OPTIONAL_CLASSES) {
    root.classList.remove(cls);
  }
  const next = OPTIONAL_FONT_CLASS[font];
  if (next) root.classList.add(next);
}
