"use client";

import { useEffect, useState } from "react";
import {
  FONT_BEAT,
  FONT_CHAPTERS,
  FONT_LABEL,
  THEMES,
  THEME_LABEL,
  migrateFont,
  migrateTheme,
  type Font,
  type Theme,
} from "@/theme/system";
import { ensureAllOptionalFontClasses, ensureOptionalFontClass } from "@/theme/optional-fonts";

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
  } catch {
    /* ignore */
  }
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

function getStoredFont(): Font | null {
  try {
    return migrateFont(localStorage.getItem("font"));
  } catch {
    return null;
  }
}

function storeFont(font: Font) {
  try {
    localStorage.setItem("font", font);
  } catch {
    /* ignore */
  }
}

/** Font stacks via `html[data-font]` + on-demand next/font CSS vars. */
function applyFont(font: Font) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-font", font);
  ensureOptionalFontClass(font);
}

type Props = {
  /** Kept for Nav API compatibility. */
  compact?: boolean;
};

export default function ThemeToggle({ compact: _compact = true }: Props) {
  void _compact;
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

    const attrFont = migrateFont(document.documentElement.getAttribute("data-font"));
    const initialFont: Font = attrFont || getStoredFont() || "geist";
    setFont(initialFont);
    applyFont(initialFont);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyFont(font);
    storeFont(font);
  }, [font]);

  useEffect(() => {
    if (settingsOpen) ensureAllOptionalFontClasses();
  }, [settingsOpen]);

  function cycleTheme() {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  }

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
          <div className="masthead-settings-panel" role="dialog" aria-label="Type — a career in faces">
            <header className="type-story__head">
              <p className="type-story__kicker">type</p>
              <p className="type-story__lede">a career in faces</p>
            </header>

            <div className="type-story">
              {FONT_CHAPTERS.map((chapter) => (
                <section key={chapter.id} className="type-story__chapter" aria-label={chapter.era}>
                  <div className="type-story__meta">
                    <span className="type-story__era">{chapter.era}</span>
                    {chapter.years ? (
                      <span className="type-story__years">{chapter.years}</span>
                    ) : null}
                  </div>
                  <p className="type-story__note">{chapter.note}</p>
                  <ul className="type-story__faces" role="list">
                    {chapter.fonts.map((id) => {
                      const active = font === id;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            className="type-story__face"
                            data-active={active ? "true" : undefined}
                            data-font-preview={id}
                            aria-pressed={active}
                            onClick={() => setFont(id)}
                          >
                            <span className="type-story__name">{FONT_LABEL[id]}</span>
                            <span className="type-story__beat">{FONT_BEAT[id]}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
