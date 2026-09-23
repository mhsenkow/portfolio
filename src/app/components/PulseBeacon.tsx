"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    IBMPulse?: {
      pageview: (opts?: {
        site?: string;
        path?: string;
        title?: string;
        props?: Record<string, unknown>;
      }) => Promise<unknown>;
      track: (
        name: string,
        props?: Record<string, unknown>,
        opts?: Record<string, unknown>,
      ) => Promise<unknown>;
    };
  }
}

const SCRIPT_ID = "ibm-pulse-beacon";

function loadPulse(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.IBMPulse) return Promise.resolve();
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve) => {
      if (window.IBMPulse) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
    });
  }
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "/lib/pulse.js?v=1";
    s.async = true;
    s.addEventListener("load", () => resolve(), { once: true });
    s.addEventListener("error", () => resolve(), { once: true });
    document.head.appendChild(s);
  });
}

/** Local-first pageviews for portfolio routes (same IndexedDB store as /pulse/). */
export function PulseBeacon() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    const path = pathname || "/";
    if (path === lastPath.current) return;
    lastPath.current = path;

    let cancelled = false;
    loadPulse().then(() => {
      if (cancelled || !window.IBMPulse) return;
      void window.IBMPulse.pageview({
        site: "portfolio",
        path,
        title: document.title,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
