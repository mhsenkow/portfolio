"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/content/projects';

type Props = { items: Project[] };

export function GridWithHoverPanel({ items }: Props) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);

  useEffect(() => { setMountNode(document.getElementById('overlays')); }, []);

  const panel = useMemo(() => (
    <aside className="overlay-panel--right" aria-label="Details">
      <div className="project-card" style={{ height: '100%', overflow: 'auto' }}>
        {hovered ? (
          <div>
            <h2 style={{ fontSize: 'var(--size-4)', lineHeight: 1.2 }}>{hovered.title}</h2>
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-muted)' }}>{hovered.description}</p>
            {hovered.image && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Image src={hovered.image.src} alt={hovered.image.alt} width={1200} height={800} unoptimized style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} />
              </div>
            )}
            <div style={{ marginTop: 'var(--space-4)' }}>
              <Link href={`/projects/${hovered.slug}`}>open project →</Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: 'var(--size-4)' }}>hover a card →</h2>
            <p style={{ color: 'var(--color-muted)' }}>Move your cursor over a tile to preview details here.</p>
          </div>
        )}
      </div>
    </aside>
  ), [hovered]);

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 'var(--space-4)',
        marginTop: 'var(--space-8)'
      }}>
        {items.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card" onMouseEnter={() => setHovered(p)} onFocus={() => setHovered(p)}>
            {p.image && (
              <div className="card-image" style={{ marginBottom: 'var(--space-2)' }}>
                <Image src={p.image.src} alt={p.image.alt} fill sizes="200px" />
              </div>
            )}
            <h3 style={{ margin: 0, fontSize: 'var(--size-2)' }}>{p.title}</h3>
          </Link>
        ))}
      </div>
      {mountNode ? createPortal(panel, mountNode) : panel}
    </div>
  );
}


