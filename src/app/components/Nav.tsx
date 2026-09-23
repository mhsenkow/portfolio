"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "@phosphor-icons/react";
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
        <House
          className="masthead-brand__home"
          size={12}
          weight="light"
          aria-hidden
          focusable="false"
        />
        mhsenkow
      </Link>
      <div className="masthead-actions">
        <button
          type="button"
          className="masthead-link"
          onClick={openIntroModal}
          aria-haspopup="dialog"
          aria-controls="intro-dialog"
        >
          intro
        </button>
        {items.map((i) => {
          const current =
            pathname === i.href || pathname.startsWith(i.href + "/");
          return (
            <Link
              key={i.href}
              href={i.href}
              className="masthead-link"
              aria-current={current ? "page" : undefined}
            >
              {i.label}
            </Link>
          );
        })}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="masthead-link masthead-link--resume"
          aria-label="Resume (opens PDF in a new tab)"
        >
          resume
        </a>
        <ThemeToggle compact />
      </div>
    </div>
  );
}
