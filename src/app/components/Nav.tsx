"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { openIntroModal } from "./IntroModal";
import { RESUME_URL } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const items = [
    { href: "/about", label: "about" },
    { href: "/projects", label: "case studies" },
    { href: "/other-design-work", label: "explorations" },
    { href: "/list-view", label: "archive" },
  ];

  return (
    <div className="masthead">
      <Link
        href="/"
        className="masthead-brand"
        aria-label="mhsenkow — home"
        aria-current={pathname === "/" ? "page" : undefined}
      >
        <svg
          className="masthead-brand__home"
          viewBox="0 0 16 16"
          width="12"
          height="12"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M8 1.2 1.5 6.7v7.1h4.2V9.6h4.6v4.2h4.2V6.7L8 1.2Zm0 1.7 5.3 4.4v5.5h-2.2V8.1H4.9v4.7H2.7V7.3L8 2.9Z"
          />
        </svg>
        mhsenkow
      </Link>
      <div className="masthead-actions">
        <button
          type="button"
          className="masthead-link"
          onClick={openIntroModal}
          aria-haspopup="dialog"
        >
          intro
        </button>
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="masthead-link"
            aria-current={pathname === i.href || pathname.startsWith(i.href + "/") ? "page" : undefined}
          >
            {i.label}
          </Link>
        ))}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="masthead-link masthead-link--resume"
        >
          resume
        </a>
        <ThemeToggle compact />
      </div>
    </div>
  );
}
