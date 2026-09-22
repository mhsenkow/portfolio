"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LinkToken } from "@/app/components/LinkToken";

export const INTRO_OPEN_EVENT = "portfolio:open-intro";
export const INTRO_STATE_EVENT = "portfolio:intro-state";

export type IntroStateDetail = { open: boolean };

function setIntroOpen(open: boolean) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-intro", open ? "open" : "skip");
  root.classList.toggle("intro-done", !open);
}

function emitIntroState(open: boolean) {
  if (typeof window === "undefined") return;
  setIntroOpen(open);
  window.dispatchEvent(
    new CustomEvent<IntroStateDetail>(INTRO_STATE_EVENT, { detail: { open } })
  );
}

export function openIntroModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(INTRO_OPEN_EVENT));
}

const EARLIER_SITES = [
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
  const [open, setOpen] = useState(true);

  const dismiss = useCallback(() => {
    setOpen(false);
    emitIntroState(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("intro") === "1") {
        params.delete("intro");
        const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
        window.history.replaceState({}, "", next);
        setOpen(true);
        emitIntroState(true);
        return;
      }
    } catch {
      /* ignore */
    }
    // Sync curtain with initial open state (do not re-force after user dismisses).
    if (open) emitIntroState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount sync only
  }, []);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
      emitIntroState(true);
    }
    window.addEventListener(INTRO_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(INTRO_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="intro-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      onClick={dismiss}
    >
      <div className="intro-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="intro-modal__close"
          onClick={dismiss}
          aria-label="Close intro"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M3.2 3.2l9.6 9.6M12.8 3.2L3.2 12.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinecap="square"
            />
          </svg>
        </button>
        <p className="intro-modal__hint">portfolio : i build machines</p>

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

        <details className="intro-modal__earlier">
          <summary>Earlier sites</summary>
          <div className="intro-modal__links">
            {EARLIER_SITES.map((item) => (
              <LinkToken key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
