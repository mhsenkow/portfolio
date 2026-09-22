"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

type Props = {
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

export function ProjectPager({ prev, next }: Props) {
  const [mountNode, setMountNode] = useState<Element | null>(null);
  useEffect(() => {
    setMountNode(document.getElementById("overlays"));
  }, []);

  if (!prev && !next) return null;

  const content = (
    <div className="project-pager" role="navigation" aria-label="Project navigation">
      <div className="project-pager__slot">
        {prev ? (
          <Link className="pager-btn" href={`/projects/${prev.slug}`} aria-label={`Previous: ${prev.title}`}>
            <ArrowLeft size={16} weight="light" aria-hidden />
          </Link>
        ) : null}
      </div>
      <div className="project-pager__slot project-pager__slot--end">
        {next ? (
          <Link className="pager-btn" href={`/projects/${next.slug}`} aria-label={`Next: ${next.title}`}>
            <ArrowRight size={16} weight="light" aria-hidden />
          </Link>
        ) : null}
      </div>
    </div>
  );

  return mountNode ? createPortal(content, mountNode) : content;
}
