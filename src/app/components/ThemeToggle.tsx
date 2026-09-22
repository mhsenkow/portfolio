"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_FONT,
  DEFAULT_THEME,
  FONTS,
  FONT_LABEL,
  THEMES,
  THEME_LABEL,
  migrateFont,
  migrateTheme,
  type Font,
  type Theme,
} from "@/theme/system";
import { ensureAllOptionalFontClasses, ensureOptionalFontClass } from "@/theme/optional-fonts";
import { useDismissible } from "@/hooks/useDismissible";

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

function applyFont(font: Font) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-font", font);
  ensureOptionalFontClass();
}

type Props = {
  compact?: boolean;
};

export default function ThemeToggle({ compact: _compact = true }: Props) {
  void _compact;
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [font, setFont] = useState<Font>(DEFAULT_FONT);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const typeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentTheme = migrateTheme(document.documentElement.getAttribute("data-theme"));
    const stored = getStoredTheme();
    const initial: Theme = currentTheme || stored || DEFAULT_THEME;
    setTheme(initial);
    applyTheme(initial);
    storeTheme(initial);

    const attrFont = migrateFont(document.documentElement.getAttribute("data-font"));
    const initialFont: Font = attrFont || getStoredFont() || DEFAULT_FONT;
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

  useDismissible({
    open: settingsOpen,
    onClose: () => setSettingsOpen(false),
    rootRef,
    openerRef: typeBtnRef,
    focusOnOpen: true,
  });

  function cycleTheme() {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  }

  function pickFont(id: Font) {
    setFont(id);
    setSettingsOpen(false);
  }

  return (
    <div className="masthead-theme" ref={rootRef}>
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
        ref={typeBtnRef}
        type="button"
        className="masthead-link masthead-settings"
        aria-expanded={settingsOpen}
        aria-haspopup="dialog"
        onClick={() => setSettingsOpen((v) => !v)}
      >
        type
      </button>
      {settingsOpen ? (
        <div className="masthead-settings-panel" role="dialog" aria-label="Type">
          <ul className="type-list" role="list">
            {FONTS.map((id) => {
              const active = font === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className="type-list__face"
                    data-active={active ? "true" : undefined}
                    data-font-preview={id}
                    aria-pressed={active}
                    onClick={() => pickFont(id)}
                  >
                    {FONT_LABEL[id]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
