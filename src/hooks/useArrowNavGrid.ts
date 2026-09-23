"use client";

import { useEffect, type RefObject } from "react";

const ARROWS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"]);

function visibleItems(root: HTMLElement, selector: string): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(selector)].filter((el) => {
    if (el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true") {
      return false;
    }
    // offsetParent is null for display:none; also skip zero-size
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
}

/** Column count from the first visual row (CSS grid / auto-fill). */
function columnCount(items: HTMLElement[]): number {
  if (items.length < 2) return 1;
  const rowTop = Math.round(items[0].getBoundingClientRect().top);
  let cols = 1;
  for (let i = 1; i < items.length; i++) {
    if (Math.round(items[i].getBoundingClientRect().top) !== rowTop) break;
    cols++;
  }
  return Math.max(1, cols);
}

/**
 * Arrow / Home / End navigation between card-like focus targets inside a grid.
 * Does not change Tab order — each card stays a normal tab stop.
 */
export function useArrowNavGrid(
  containerRef: RefObject<HTMLElement | null>,
  itemSelector: string
) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    function onKeyDown(e: KeyboardEvent) {
      if (!ARROWS.has(e.key)) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const target = e.target as HTMLElement | null;
      if (!target || !root!.contains(target)) return;

      // Don't steal arrows from inputs / editable fields / listboxes
      const tag = target.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable ||
        target.closest('[role="listbox"], [role="menu"], [role="combobox"]')
      ) {
        return;
      }

      const items = visibleItems(root!, itemSelector);
      if (items.length === 0) return;

      const focused =
        items.find((el) => el === target) ??
        items.find((el) => el.contains(target));
      if (!focused) return;

      const i = items.indexOf(focused);
      const cols = columnCount(items);
      let next = i;

      switch (e.key) {
        case "ArrowRight":
          next = Math.min(i + 1, items.length - 1);
          break;
        case "ArrowLeft":
          next = Math.max(i - 1, 0);
          break;
        case "ArrowDown":
          next = Math.min(i + cols, items.length - 1);
          break;
        case "ArrowUp":
          next = Math.max(i - cols, 0);
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = items.length - 1;
          break;
      }

      if (next === i) return;
      e.preventDefault();
      items[next].focus();
    }

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [containerRef, itemSelector]);
}
