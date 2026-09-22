"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LinkToken } from "@/app/components/LinkToken";

const STORAGE_KEY = "intro-dismissed";
export const INTRO_OPEN_EVENT = "portfolio:open-intro";

export function openIntroModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(INTRO_OPEN_EVENT));
}

const EXPLORATIONS = [
  { href: "https://webgl-portfolio-jbxw.vercel.app/", label: "WebGL portfolio" },
  { href: "https://portfolio-site-tau-ten-35.vercel.app/", label: "Particle narrative" },
  { href: "https://www.mhsenkow.org/Older/old/portfolio/", label: "2013 original" },
  {
    href: "https://www.figma.com/proto/SS9PFTPBKoUEmOhn1f5GJt/presentation?node-id=376-3&t=97fqkQd8qUt8cyQY-1&starting-point-node-id=376%3A3",
    label: "AI work deck",
  },
] as const;

export function IntroModal() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const force = params.get("intro") === "1";
      const dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
      setOpen(force || !dismissed);
      if (force) {
        params.delete("intro");
        const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
        window.history.replaceState({}, "", next);
      }
    } catch {
      setOpen(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener(INTRO_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(INTRO_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, dismiss]);

  if (!ready || !open) return null;

  return (
    <div
      className="intro-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onClick={dismiss}
    >
      <div className="intro-modal__panel" onClick={(e) => e.stopPropagation()}>
        <p className="intro-modal__hint">i build machines</p>

        <header className="intro-modal__mast">
          <h1 id="intro-title" className="intro-modal__title">
            Michael Senkow
          </h1>
          <p className="intro-modal__role">Staff Product Designer</p>
          <p className="intro-modal__lede">
            Complex tooling, data workflows, and software that still feels like craft.
          </p>
        </header>

        <section className="intro-modal__proof" aria-label="Selected products">
          <p className="intro-modal__section-label">selected products</p>
          <ul className="intro-modal__proof-list">
            <li>
              <span className="intro-modal__proof-org">Microsoft</span>
              <span className="intro-modal__proof-body">
                <strong>Focus Time</strong> in Viva Insights — protected deep-work blocks that ship
                across Outlook on millions of PCs. Grew out of earlier silence-mode research
                into what became the Focus plan. Also the first chapters of{" "}
                <strong>Workplace Analytics → Viva Insights</strong>.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">Meta Infra</span>
              <span className="intro-modal__proof-body">
                <strong>Daiquery notebooks</strong> — the SQL cell system data scientists and
                engineers use to query Meta&apos;s warehouse; augmented with AI and part adding to
                the component system in Meta&apos;s XDS infra framework. Also data-viz systems and
                AI-infographics across Analysis workflows.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">IBM</span>
              <span className="intro-modal__proof-body">
                Cognos Analytics with Watson, and early steps of the{" "}
                <strong>Carbon Design System</strong>.
              </span>
            </li>
          </ul>
        </section>

        <p className="intro-modal__guide">
          The grid behind this is a sample across eras. Hover a tile, or jump to{" "}
          <Link href="/projects" onClick={dismiss}>
            key projects
          </Link>{" "}
          /{" "}
          <Link href="/list-view" onClick={dismiss}>
            full list
          </Link>
          .
        </p>

        <p className="intro-modal__aside">
          MechE + technical communications undergrad · HCI masters · architecture &amp; digital
          fabrication along the way
        </p>

        <button type="button" className="intro-modal__enter" onClick={dismiss}>
          enter →
        </button>

        <aside className="intro-modal__explorations" aria-label="Other portfolio explorations">
          <p className="intro-modal__section-label">other portfolio explorations</p>
          <div className="intro-modal__links">
            {EXPLORATIONS.map((item) => (
              <LinkToken key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
