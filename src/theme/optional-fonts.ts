import {
  IBM_Plex_Sans,
  Inter,
  Libre_Baskerville,
  Lora,
  JetBrains_Mono,
  Fira_Code,
} from "next/font/google";
import type { Font } from "./system";

/** Non-Geist faces — CSS vars only, loaded when the type panel mounts. */
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
  inter: inter.variable,
  "libre-baskerville": libreBaskerville.variable,
  lora: lora.variable,
  "jetbrains-mono": jetBrainsMono.variable,
  "fira-code": firaCode.variable,
};

const OPTIONAL_CLASSES = Object.values(OPTIONAL_FONT_CLASS);

/** Mount loaded faces so list previews render in-character. */
export function ensureAllOptionalFontClasses() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const cls of OPTIONAL_CLASSES) {
    root.classList.add(cls);
  }
}

export function ensureOptionalFontClass() {
  ensureAllOptionalFontClasses();
}

/** Always-on class so the default face resolves before the type panel mounts. */
export const defaultFontClassName = inter.variable;
