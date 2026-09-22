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
  { href: "https://mhsenkow.work/", label: "Prior portfolio (Vercel)" },
  { href: "https://webgl-portfolio-jbxw.vercel.app/", label: "WebGL portfolio" },
  { href: "https://portfolio-site-tau-ten-35.vercel.app/", label: "Particle narrative" },
  { href: "https://mhsenkow.github.io/sleeping-ox-studios/", label: "Sleeping Ox Studios" },
  { href: "https://www.mhsenkow.org/Older/old/portfolio/", label: "2013 portfolio" },
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
        <p className="intro-modal__hint">Portfolio</p>

        <header className="intro-modal__mast">
          <h1 id="intro-title" className="h1 intro-modal__title">
            Michael Senkow
          </h1>
          <p className="intro-modal__role">Staff Product Designer</p>
          <p className="intro-modal__lede">
            Complex tooling, data workflows, and product systems for enterprise and independent work.
          </p>
        </header>

        <section className="intro-modal__proof" aria-label="Selected products">
          <p className="intro-modal__section-label">selected work</p>
          <ul className="intro-modal__proof-list">
            <li>
              <span className="intro-modal__proof-org">i2Systems</span>
              <span className="intro-modal__proof-body">
                <strong>Judge</strong> — a review-gated Salesforce / CRM integrity
                layer: scan accounts and contacts, rank issues, and apply
                sandbox-safe fixes with HubSpot / Mailchimp sync and a full audit trail.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">Microsoft</span>
              <span className="intro-modal__proof-body">
                <strong>Focus Time</strong> in Viva Insights — protected deep-work blocks shipping
                across Outlook on millions of PCs. Grew from silence-mode research into the Focus plan.
                Earlier chapters of{" "}
                <strong>Workplace Analytics → Viva Insights</strong>.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">Meta Infra</span>
              <span className="intro-modal__proof-body">
                <strong>Daiquery notebooks</strong> — the SQL cell system data scientists and
                engineers use to query Meta&apos;s warehouse; AI-assisted workflows and contributions
                to Meta&apos;s XDS infra component system. Also data visualization systems and
                AI-infographics across Analysis tools.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">IBM</span>
              <span className="intro-modal__proof-body">
                Cognos Analytics with Watson, and early contributions to the{" "}
                <strong>Carbon Design System</strong>.
              </span>
            </li>
          </ul>
        </section>

        <p className="intro-modal__guide">
          The grid behind this is a cross-section of the work.
          <br />
          Hover a project, or open{" "}
          <Link href="/projects" onClick={dismiss}>
            Case studies
          </Link>{" "}
          /{" "}
          <Link href="/list-view" onClick={dismiss}>
            Archive
          </Link>
          .
        </p>

        <p className="intro-modal__aside">
          Former Apple IS&amp;T (accessibility) · B.S. Mechanical Engineering &amp; Technical
          Communications · M.S. HCI · architecture and digital fabrication
        </p>

        <button type="button" className="intro-modal__enter" onClick={dismiss}>
          View work →
        </button>

        <aside className="intro-modal__explorations" aria-label="Previous portfolio versions">
          <p className="intro-modal__section-label">previous portfolio versions</p>
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
