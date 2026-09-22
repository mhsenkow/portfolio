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
    { href: "/projects", label: "projects" },
    { href: "/other-design-work", label: "other" },
    { href: "/list-view", label: "list" },
  ];

  return (
    <div className="masthead">
      <Link
        href="/"
        className="masthead-brand"
        aria-current={pathname === "/" ? "page" : undefined}
      >
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
