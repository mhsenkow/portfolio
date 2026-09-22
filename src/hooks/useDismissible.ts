"use client";

import { useEffect, useRef, type RefObject } from "react";

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
  /** Disable outside-click dismiss (Escape / scroll lock still apply). */
  disableOutside?: boolean;
};

/**
 * Escape + outside pointerdown dismiss, optional scroll lock and focus restore.
 */
export function useDismissible({
  open,
  onClose,
  rootRef,
  openerRef,
  lockScroll = false,
  focusOnOpen = false,
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
      const focusable = root?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
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
  }, [open, rootRef, openerRef, lockScroll, focusOnOpen, disableOutside]);
}
