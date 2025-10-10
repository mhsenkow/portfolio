"use client";

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'hc';
type Font = 'geist' | 'ibm-plex' | 'inter' | 'work-sans' | 'space-grotesk' | 'dm-sans';

function getStoredTheme(): Theme | null {
  try { return (localStorage.getItem('theme') as Theme) || null; } catch { return null; }
}

function storeTheme(theme: Theme) {
  try { localStorage.setItem('theme', theme); } catch {}
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
}

function getStoredFont(): Font | null {
  try { return (localStorage.getItem('font') as Font) || null; } catch { return null; }
}

function storeFont(font: Font) {
  try { localStorage.setItem('font', font); } catch {}
}

function applyFont(font: Font) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.setAttribute('data-font', font);
  console.log('[font] Applied font:', font, 'to html element');
  // Force update by directly setting body font-family
  const fontMap: Record<Font, string> = {
    'geist': 'var(--font-geist), ui-sans-serif, system-ui',
    'ibm-plex': 'var(--font-ibm-plex), ui-sans-serif, system-ui',
    'inter': 'var(--font-inter), ui-sans-serif, system-ui',
    'work-sans': 'var(--font-work-sans), ui-sans-serif, system-ui',
    'space-grotesk': 'var(--font-space-grotesk), ui-sans-serif, system-ui',
    'dm-sans': 'var(--font-dm-sans), ui-sans-serif, system-ui'
  };
  document.body.style.fontFamily = fontMap[font];
}

export function initThemeOnLoad() {
  if (typeof document === 'undefined') return;
  const stored = getStoredTheme();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial: Theme = stored ?? (prefersDark ? 'dark' : 'light');
  applyTheme(initial);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [font, setFont] = useState<Font>('geist');

  useEffect(() => {
    // Read the theme that was already applied by the inline script
    const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
    const stored = getStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = currentTheme || stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    
    // Only apply theme if it's not already set
    if (!currentTheme) {
      applyTheme(initial);
    }
    
    const storedFont = getStoredFont();
    const currentFont = document.documentElement.getAttribute('data-font') as Font;
    const initialFont: Font = currentFont || storedFont || 'geist';
    setFont(initialFont);
    
    // Only apply font if it's not already set
    if (!currentFont) {
      applyFont(initialFont);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyFont(font);
    storeFont(font);
  }, [font]);

  return (
    <div role="group" aria-label="Theme and Font" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <button
          type="button"
          aria-pressed={theme === 'light'}
          aria-label="Light theme"
          onClick={() => setTheme('light')}
          style={{ width: 28, height: 28, borderRadius: 999, border: 'var(--border)', background: 'var(--surface-card)', display: 'grid', placeItems: 'center' }}
        >
          {/* sun icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
        </button>
        <button
          type="button"
          aria-pressed={theme === 'dark'}
          aria-label="Dark theme"
          onClick={() => setTheme('dark')}
          style={{ width: 28, height: 28, borderRadius: 999, border: 'var(--border)', background: 'var(--surface-card)', display: 'grid', placeItems: 'center' }}
        >
          {/* moon icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <button
          type="button"
          aria-pressed={theme === 'hc'}
          aria-label="High contrast theme"
          onClick={() => setTheme('hc')}
          style={{ width: 28, height: 28, borderRadius: 999, border: 'var(--border)', background: 'var(--surface-card)', display: 'grid', placeItems: 'center' }}
        >
          {/* three circles icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="7" cy="12" r="3"/>
            <circle cx="12" cy="12" r="3"/>
            <circle cx="17" cy="12" r="3"/>
          </svg>
        </button>
      </div>
      
      <select
        aria-label="Font"
        value={font}
        onChange={(e) => setFont(e.target.value as Font)}
        style={{
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          border: 'var(--border)',
          background: 'var(--surface-card)',
          fontSize: 'var(--size-0)',
        }}
      >
        <option value="geist">Geist</option>
        <option value="ibm-plex">IBM Plex Sans</option>
        <option value="inter">Inter</option>
        <option value="work-sans">Work Sans</option>
        <option value="space-grotesk">Space Grotesk</option>
        <option value="dm-sans">DM Sans</option>
      </select>
    </div>
  );
}


