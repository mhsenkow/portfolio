"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  href: string;
  label: string;
  /** Short blurb on hover/focus — progressive disclosure beyond the chip label. */
  description?: string;
  /** Optional preview image (screenshot / thumb). Favicon used as fallback mark. */
  previewSrc?: string;
};

function hostFromHref(href: string): string | null {
  try {
    if (!/^https?:\/\//i.test(href)) return null;
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function faviconFor(href: string): string | null {
  const host = hostFromHref(href);
  if (!host) return null;
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
}

export function LinkToken({ href, label, description, previewSrc }: Props) {
  const host = hostFromHref(href);
  const icon = faviconFor(href);
  const external = Boolean(host);
  const tipId = useId();
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const place = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const tipWidth = Math.min(300, window.innerWidth - 24);
    const left = Math.min(
      Math.max(12, r.left + r.width / 2 - tipWidth / 2),
      window.innerWidth - tipWidth - 12
    );
    const preferAbove = r.top > 140;
    setStyle({
      width: tipWidth,
      left,
      top: preferAbove ? r.top - 10 : r.bottom + 10,
      transform: preferAbove ? "translateY(-100%)" : "none",
    });
  }, []);

  const show = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    place();
    setOpen(true);
  }, [place]);

  const hide = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 80);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onScroll() {
      place();
    }
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, place]);

  const tip =
    mounted && open
      ? createPortal(
          <span
            id={tipId}
            className="link-token__tip"
            role="tooltip"
            style={style}
            onPointerEnter={show}
            onPointerLeave={hide}
          >
            <span className="link-token__tip-head">
              {previewSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote preview thumbs
                <img className="link-token__tip-preview" src={previewSrc} alt="" />
              ) : icon ? (
                <Image
                  className="link-token__tip-mark"
                  src={icon}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                />
              ) : null}
              <span className="link-token__tip-copy">
                <span className="link-token__tip-title">{label}</span>
                {description ? (
                  <span className="link-token__tip-desc">{description}</span>
                ) : null}
              </span>
            </span>
            <span className="link-token__tip-meta">
              {host ? `${host} · opens in new tab` : "Open link"}
            </span>
          </span>,
          document.body
        )
      : null;

  return (
    <>
      <Link
        ref={anchorRef}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="link-token"
        aria-describedby={open ? tipId : undefined}
        onPointerEnter={show}
        onPointerLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {icon && <Image src={icon} alt="" width={16} height={16} unoptimized />}
        <span className="link-token__label">{label}</span>
      </Link>
      {tip}
    </>
  );
}
