"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Footer through-line link — accent mark, current-page aware. */
export function FooterStory() {
  const pathname = usePathname();
  const onStory = pathname === "/story";

  return (
    <Link
      href="/story"
      className="footer-story"
      aria-current={onStory ? "page" : undefined}
    >
      a story
    </Link>
  );
}
