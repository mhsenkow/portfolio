"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, X } from "@phosphor-icons/react";
import { LinkToken } from "@/app/components/LinkToken";
import { useDismissible } from "@/hooks/useDismissible";
import { SITE_GREETING, SITE_NAME, SITE_ROLE, SITE_TAGLINE } from "@/content/site";

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
  // Always start closed so SSR HTML matches the first client paint.
  // theme-init already sets data-intro + #intro-boot; sync open after mount.
  const [open, setOpen] = useState(false);
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

  useLayoutEffect(() => {
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
    if (document.documentElement.getAttribute("data-intro") === "open") {
      setOpen(true);
      emitIntroState(true);
    }
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
    trapFocus: true,
    disableOutside: true, // backdrop onClick handles outside
  });

  useEffect(() => {
    if (!open) return;
    const panel = rootRef.current?.querySelector<HTMLElement>(".intro-modal__panel");
    panel?.scrollTo({ top: 0 });
  }, [open]);

  // Keep assistive tech + Tab out of the page chrome while the intro is up.
  useEffect(() => {
    const shell = document.querySelector(".app-shell");
    if (!shell) return;
    const inertTargets = [
      shell.querySelector(".site-header"),
      shell.querySelector(".app-main"),
      shell.querySelector("#overlays"),
      shell.querySelector(".site-footer"),
      shell.querySelector(".skip-link"),
    ].filter(Boolean) as HTMLElement[];

    if (open) {
      for (const el of inertTargets) el.setAttribute("inert", "");
    } else {
      for (const el of inertTargets) el.removeAttribute("inert");
    }
    return () => {
      for (const el of inertTargets) el.removeAttribute("inert");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      id="intro-dialog"
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
        <p className="intro-modal__hint">{SITE_TAGLINE}</p>

        <header className="intro-modal__mast">
          <h1 id="intro-title" className="h1 intro-modal__title">
            {SITE_NAME}
          </h1>
          <p className="intro-modal__role">{SITE_ROLE}</p>
          <div className="intro-modal__lede">
            {SITE_GREETING.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </header>

        <section className="intro-modal__proof" aria-label="Selected products">
          <p className="intro-modal__section-label">selected work</p>
          <ul className="intro-modal__proof-list">
            <li>
              <span className="intro-modal__proof-org">Now</span>
              <span className="intro-modal__proof-body">
                <strong>i2Systems</strong> — Lux, Judge; also legal &amp; HR AI consulting.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">Meta Infra</span>
              <span className="intro-modal__proof-body">
                <strong>Daiquery / Bento</strong> notebooks, analysis workflows, XDS data-viz.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">Microsoft</span>
              <span className="intro-modal__proof-body">
                MyAnalytics → <strong>Viva Insights</strong>; research behind{" "}
                <strong>Focus Time</strong>.
              </span>
            </li>
            <li>
              <span className="intro-modal__proof-org">IBM</span>
              <span className="intro-modal__proof-body">
                Watson / Cognos; early <strong>Carbon</strong> foundations.
              </span>
            </li>
          </ul>
        </section>

        <p className="intro-modal__guide">
          The grid is a cross-section of the work. Open a project, or{" "}
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
          M.S. HCI · UMich · B.S. ME &amp; Tech Comm · Michigan Tech · Apple IS&amp;T · Seattle.
        </p>

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

        <button type="button" className="intro-modal__enter" onClick={dismiss}>
          View work
          <ArrowRight size={16} weight="light" aria-hidden />
        </button>
      </div>
    </div>
  );
}
