"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "@phosphor-icons/react";
import { LinkToken } from "@/app/components/LinkToken";
import { useDismissible } from "@/hooks/useDismissible";

export const INTRO_OPEN_EVENT = "portfolio:open-intro";
export const INTRO_STATE_EVENT = "portfolio:intro-state";

export type IntroStateDetail = { open: boolean };

function setIntroOpen(open: boolean) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-intro", open ? "open" : "skip");
  root.classList.toggle("intro-done", !open);
}

function persistIntroDismissed() {
  try {
    sessionStorage.setItem("intro-dismissed", "1");
  } catch {
    /* ignore */
  }
}

function emitIntroState(open: boolean) {
  if (typeof window === "undefined") return;
  setIntroOpen(open);
  window.dispatchEvent(
    new CustomEvent<IntroStateDetail>(INTRO_STATE_EVENT, { detail: { open } })
  );
}

/** Close intro and remember for this tab — call before leaving home. */
export function dismissIntroModal() {
  persistIntroDismissed();
  emitIntroState(false);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio:dismiss-intro"));
  }
}

export function openIntroModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(INTRO_OPEN_EVENT));
}

const EARLIER_SITES = [
  {
    href: "https://mhsenkow.work/",
    label: "Prior portfolio (Vercel)",
    description:
      "The previous Next.js portfolio — denser archive, experimental themes, and the bridge into this ibm.io cut.",
  },
  {
    href: "https://webgl-portfolio-jbxw.vercel.app/",
    label: "WebGL portfolio",
    description:
      "GPU / WebGL experiment: spatial navigation and motion as the primary storytelling layer.",
  },
  {
    href: "https://portfolio-site-tau-ten-35.vercel.app/",
    label: "Particle narrative",
    description:
      "Particle-field narrative site — scroll and motion used to move through chapters of work.",
  },
  {
    href: "https://mhsenkow.github.io/sleeping-ox-studios/",
    label: "Sleeping Ox Studios",
    description:
      "Studio / brand landing for Sleeping Ox — early independent identity and project framing.",
  },
  {
    href: "https://www.mhsenkow.org/Older/old/portfolio/",
    label: "2013 portfolio",
    description:
      "Pre-staff archive from 2013 — school and early professional work before the systems track.",
  },
  {
    href: "https://www.figma.com/proto/SS9PFTPBKoUEmOhn1f5GJt/presentation?node-id=376-3&t=97fqkQd8qUt8cyQY-1&starting-point-node-id=376%3A3",
    label: "AI work deck",
    description:
      "Figma prototype deck covering AI product work — flows, framing, and presentation narrative.",
  },
] as const;

export function IntroModal() {
  const [open, setOpen] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.getAttribute("data-intro") === "open";
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    persistIntroDismissed();
    setOpen(false);
    emitIntroState(false);
  }, []);

  useEffect(() => {
    function onDismissEvent() {
      setOpen(false);
    }
    window.addEventListener("portfolio:dismiss-intro", onDismissEvent);
    return () => window.removeEventListener("portfolio:dismiss-intro", onDismissEvent);
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("intro") === "1") {
        params.delete("intro");
        const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
        window.history.replaceState({}, "", next);
        try {
          sessionStorage.removeItem("intro-dismissed");
        } catch {
          /* ignore */
        }
        setOpen(true);
        emitIntroState(true);
        return;
      }
    } catch {
      /* ignore */
    }
    if (open) emitIntroState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount sync only
  }, []);

  useEffect(() => {
    function onOpen() {
      openerRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      emitIntroState(true);
    }
    window.addEventListener(INTRO_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(INTRO_OPEN_EVENT, onOpen);
  }, []);

  useDismissible({
    open,
    onClose: dismiss,
    rootRef,
    openerRef,
    lockScroll: true,
    focusOnOpen: true,
    disableOutside: true, // backdrop onClick handles outside
  });

  if (!open) return null;

  return (
    <div
      ref={rootRef}
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
          <X size={14} weight="light" aria-hidden />
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
                <strong>Current</strong> — Lux design system, Figma add-ons, Flux demos,
                SEO tooling, and <strong>Judge</strong> (Salesforce / CRM integrity), plus
                other internal experiments. Moving the team&apos;s product practice forward;
                not the marketing site.
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
          IBM, Microsoft, Meta, and i2Systems. M.S. HCI · B.S. Mechanical Engineering
          &amp; Technical Communications · architecture, digital fabrication, and early
          Apple IS&amp;T accessibility.
        </p>

        <button type="button" className="intro-modal__enter" onClick={dismiss}>
          View work
          <ArrowRight size={16} weight="light" aria-hidden />
        </button>

        <details className="intro-modal__earlier">
          <summary>Earlier sites</summary>
          <div className="intro-modal__links">
            {EARLIER_SITES.map((item) => (
              <LinkToken
                key={item.href}
                href={item.href}
                label={item.label}
                description={item.description}
              />
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
