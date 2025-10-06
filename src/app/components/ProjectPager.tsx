"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
};

export function ProjectPager({ prev, next }: Props) {
  const [mountNode, setMountNode] = useState<Element | null>(null);
  useEffect(() => {
    setMountNode(document.getElementById('overlays'));
  }, []);

  const content = (
    <div className="project-pager" role="navigation" aria-label="Project navigation">
      {prev && (
        <Link className="pager-btn" href={`/projects/${prev.slug}`} aria-label={`Previous: ${prev.title}`}>
          ←
        </Link>
      )}
      {next && (
        <Link className="pager-btn" href={`/projects/${next.slug}`} aria-label={`Next: ${next.title}`}>
          →
        </Link>
      )}
    </div>
  );

  return mountNode ? createPortal(content, mountNode) : content;
}


