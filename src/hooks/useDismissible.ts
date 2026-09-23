"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Options = {
  open: boolean;
  onClose: () => void;
  /** Element that contains the dismissible UI; outside pointerdown closes. */
  rootRef: RefObject<HTMLElement | null>;
  /** Restore focus here when closed (e.g. the opener button). */
  openerRef?: RefObject<HTMLElement | null>;
  /** Lock body scroll while open. */
  lockScroll?: boolean;
  /** Move focus into root when opened. */
  focusOnOpen?: boolean;
  /** Keep Tab cycling inside root while open. */
  trapFocus?: boolean;
  /** Disable outside-click dismiss (Escape / scroll lock still apply). */
  disableOutside?: boolean;
};

/**
 * Escape + outside pointerdown dismiss, optional scroll lock, focus restore, Tab trap.
 */
export function useDismissible({
  open,
  onClose,
  rootRef,
  openerRef,
  lockScroll = false,
  focusOnOpen = false,
  trapFocus = false,
  disableOutside = false,
}: Options) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const opener = openerRef?.current ?? null;
    if (lockScroll) document.body.style.overflow = "hidden";

    if (focusOnOpen) {
      const root = rootRef.current;
      const focusable = root?.querySelector<HTMLElement>(FOCUSABLE);
      focusable?.focus();
    }

    function onPointerDown(e: PointerEvent) {
      if (disableOutside) return;
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(e.target as Node)) return;
      onCloseRef.current();
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !trapFocus) return;
      const root = rootRef.current;
      if (!root) return;
      const nodes = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
      );
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !root.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      if (lockScroll) document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [open, rootRef, openerRef, lockScroll, focusOnOpen, trapFocus, disableOutside]);
}
