"use client";

import { useEffect, useState } from "react";

/** Wordcount theme cycle */
type Theme =
  | "light"
  | "dark"
  | "contrast"
  | "paper"
  | "glass"
  | "frost"
  | "brutal"
  | "loom"
  | "tank"
  | "nes";

type Font =
  | "geist"
  | "ibm-plex"
  | "inter"
  | "work-sans"
  | "space-grotesk"
  | "dm-sans"
  | "libre-baskerville"
  | "lora"
  | "manrope"
  | "jetbrains-mono"
  | "fira-code";

const THEMES: Theme[] = [
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
];

const THEME_LABEL: Record<Theme, string> = {
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

/** Map legacy portfolio theme names → wordcount set */
function migrateTheme(raw: string | null): Theme | null {
  if (!raw) return null;
  const map: Record<string, Theme> = {
    hc: "contrast",
    electric: "frost",
    forest: "tank",
  };
  if (map[raw]) return map[raw];
  if ((THEMES as string[]).includes(raw)) return raw as Theme;
  return null;
}

function getStoredTheme(): Theme | null {
  try {
    return migrateTheme(localStorage.getItem("theme"));
  } catch {
    return null;
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

function getStoredFont(): Font | null {
  try {
    return (localStorage.getItem("font") as Font) || null;
  } catch {
    return null;
  }
}

function storeFont(font: Font) {
  try {
    localStorage.setItem("font", font);
  } catch {}
}

function applyFont(font: Font) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-font", font);
  const fontMap: Record<Font, string> = {
    geist: "var(--font-geist), ui-sans-serif, system-ui",
    "ibm-plex": "var(--font-ibm-plex), ui-sans-serif, system-ui",
    inter: "var(--font-inter), ui-sans-serif, system-ui",
    "work-sans": "var(--font-work-sans), ui-sans-serif, system-ui",
    "space-grotesk": "var(--font-space-grotesk), ui-sans-serif, system-ui",
    "dm-sans": "var(--font-dm-sans), ui-sans-serif, system-ui",
    "libre-baskerville": "var(--font-libre-baskerville), Georgia, serif",
    lora: "var(--font-lora), Georgia, serif",
    manrope: "var(--font-manrope), ui-sans-serif, system-ui",
    "jetbrains-mono": "var(--font-jetbrains-mono), SF Mono, Monaco, monospace",
    "fira-code": "var(--font-fira-code), SF Mono, Monaco, monospace",
  };
  document.body.style.fontFamily = fontMap[font];
}

export function initThemeOnLoad() {
  if (typeof document === "undefined") return;
  const stored = getStoredTheme();
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
  applyTheme(initial);
}

type Props = {
  /** Single cycling orb — wordcount-style. Full controls when false. */
  compact?: boolean;
};

export default function ThemeToggle({ compact = false }: Props) {
  const [theme, setTheme] = useState<Theme>("light");
  const [font, setFont] = useState<Font>("geist");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const currentTheme = migrateTheme(document.documentElement.getAttribute("data-theme"));
    const stored = getStoredTheme();
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = currentTheme || stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
    storeTheme(initial);

    const storedFont = getStoredFont();
    const currentFont = document.documentElement.getAttribute("data-font") as Font;
    const initialFont: Font = currentFont || storedFont || "geist";
    setFont(initialFont);
    if (!currentFont) applyFont(initialFont);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyFont(font);
    storeFont(font);
  }, [font]);

  function cycleTheme() {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  }

  if (compact) {
    return (
      <div className="masthead-theme">
        <button
          type="button"
          className="masthead-orb-btn"
          aria-label={`theme: ${THEME_LABEL[theme]}`}
          title={`theme: ${THEME_LABEL[theme]}`}
          onClick={cycleTheme}
          data-theme-face={theme}
        >
          <span className="theme-orb" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="masthead-link masthead-settings"
          aria-expanded={settingsOpen}
          aria-haspopup="dialog"
          onClick={() => setSettingsOpen((v) => !v)}
        >
          type
        </button>
        {settingsOpen && (
          <>
            <button
              type="button"
              className="masthead-settings-scrim"
              aria-label="close type settings"
              onClick={() => setSettingsOpen(false)}
            />
            <div className="masthead-settings-panel" role="dialog" aria-label="type settings">
              <label className="masthead-settings-label">
                font
                <select
                  aria-label="Font"
                  value={font}
                  onChange={(e) => setFont(e.target.value as Font)}
                >
                  <option value="geist">Geist</option>
                  <option value="ibm-plex">IBM Plex Sans</option>
                  <option value="inter">Inter</option>
                  <option value="work-sans">Work Sans</option>
                  <option value="space-grotesk">Space Grotesk</option>
                  <option value="dm-sans">DM Sans</option>
                  <option value="libre-baskerville">Libre Baskerville</option>
                  <option value="lora">Lora</option>
                  <option value="manrope">Manrope</option>
                  <option value="jetbrains-mono">JetBrains Mono</option>
                  <option value="fira-code">Fira Code</option>
                </select>
              </label>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div role="group" aria-label="Theme and Font" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <button type="button" onClick={cycleTheme} aria-label={`theme: ${THEME_LABEL[theme]}`}>
        {THEME_LABEL[theme]}
      </button>
      <select
        aria-label="Font"
        value={font}
        onChange={(e) => setFont(e.target.value as Font)}
        style={{
          padding: "4px 8px",
          borderRadius: "var(--radius-sm)",
          border: "var(--border)",
          background: "var(--surface-card)",
          fontSize: "var(--size-0)",
        }}
      >
        <option value="geist">Geist</option>
        <option value="ibm-plex">IBM Plex Sans</option>
        <option value="inter">Inter</option>
        <option value="work-sans">Work Sans</option>
        <option value="space-grotesk">Space Grotesk</option>
        <option value="dm-sans">DM Sans</option>
        <option value="libre-baskerville">Libre Baskerville</option>
        <option value="lora">Lora</option>
        <option value="manrope">Manrope</option>
        <option value="jetbrains-mono">JetBrains Mono</option>
        <option value="fira-code">Fira Code</option>
      </select>
    </div>
  );
}
