"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useDismissible } from "@/hooks/useDismissible";
import { GOTO_SUGGESTIONS, rankGoto, type GotoHit } from "@/lib/goto";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.endsWith(".pdf");
}

/** Suite / static public apps — full navigation, not App Router soft push. */
function isStaticTool(href: string) {
  return /^\/(pulse|wordcount|wordcounter|timecount|tools|notebook|stories)(\/|$)/i.test(
    href,
  );
}

const KIND_LABEL: Record<GotoHit["destination"]["kind"], string> = {
  page: "Page",
  project: "Project",
  tool: "Tool",
};

export function GotoSearch() {
  const router = useRouter();
  const listId = useId();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  useDismissible({
    open,
    onClose: close,
    rootRef: dialogRef,
    openerRef,
    lockScroll: true,
    focusOnOpen: true,
    trapFocus: true,
  });

  const hits = useMemo(() => (query.trim() ? rankGoto(query, 8) : []), [query]);
  const hasQuery = Boolean(query.trim());
  const showSuggestions = !hasQuery || hits.length === 0;

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (hit: GotoHit) => {
      const { href } = hit.destination;
      close();
      if (isExternal(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      if (isStaticTool(href)) {
        window.location.assign(href);
        return;
      }
      startTransition(() => {
        router.push(href);
      });
    },
    [close, router]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const hit = hits[active] ?? hits[0];
    if (hit) go(hit);
  };

  const applySuggestion = (chip: string) => {
    setQuery(chip);
    inputRef.current?.focus();
  };

  const suggestionBlock = (
    <div className="spotlight__suggest">
      {hasQuery && hits.length === 0 ? (
        <p className="spotlight__empty">No exact matches — try a related word</p>
      ) : (
        <p className="spotlight__hint">Jump with a word</p>
      )}
      <div className="spotlight__chips" role="group" aria-label="Suggested searches">
        {GOTO_SUGGESTIONS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="spotlight__chip"
            onClick={() => applySuggestion(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );

  const overlay =
    open && mounted
      ? createPortal(
          <div className="spotlight" data-open="true">
            <button
              type="button"
              className="spotlight__scrim"
              aria-label="Dismiss search"
              onClick={close}
            />
            <div
              ref={dialogRef}
              className="spotlight__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <p id={titleId} className="sr-only">
                Go to a page or project
              </p>
              <form className="spotlight__bar" onSubmit={onSubmit} role="search">
                <MagnifyingGlass
                  className="spotlight__glyph"
                  size={22}
                  weight="light"
                  aria-hidden
                  focusable="false"
                />
                <input
                  ref={inputRef}
                  type="search"
                  className="spotlight__input"
                  placeholder="Try rust, mobile, typescript…"
                  value={query}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-autocomplete="list"
                  aria-controls={listId}
                  aria-activedescendant={
                    hits[active] ? `${listId}-${active}` : undefined
                  }
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActive((i) =>
                        Math.min(i + 1, Math.max(hits.length - 1, 0))
                      );
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActive((i) => Math.max(i - 1, 0));
                    }
                  }}
                />
                <kbd className="spotlight__kbd">esc</kbd>
              </form>

              <div className="spotlight__body">
                {hasQuery && hits.length > 0 ? (
                  <ul
                    id={listId}
                    className="spotlight__list"
                    role="listbox"
                    aria-label="Matches"
                  >
                    {hits.map((hit, i) => (
                      <li key={hit.destination.id} role="presentation">
                        <button
                          type="button"
                          id={`${listId}-${i}`}
                          role="option"
                          aria-selected={i === active}
                          className="spotlight__hit"
                          data-active={i === active ? "true" : undefined}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => go(hit)}
                        >
                          <span className="spotlight__hit-text">
                            <span className="spotlight__hit-title">
                              {hit.destination.title}
                            </span>
                            {hit.destination.blurb ? (
                              <span className="spotlight__hit-meta">
                                {hit.destination.blurb}
                              </span>
                            ) : null}
                          </span>
                          <span className="spotlight__hit-kind">
                            {KIND_LABEL[hit.destination.kind]}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : showSuggestions ? (
                  suggestionBlock
                ) : null}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className="footer-search"
        aria-label="Search (⌘K)"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        <MagnifyingGlass size={15} weight="light" aria-hidden focusable="false" />
      </button>
      {overlay}
    </>
  );
}
