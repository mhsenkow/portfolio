"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/content/projects';
import { LightboxImage } from '@/app/components/Lightbox';

type Props = { items: Project[] };

export function GridWithHoverPanel({ items }: Props) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia && window.matchMedia('(max-width: 900px)').matches ? false : true;
  });

  useEffect(() => { setMountNode(document.getElementById('overlays')); }, []);
  useEffect(() => {
    document.body.classList.add('has-right-panel');
    return () => { document.body.classList.remove('has-right-panel'); };
  }, []);
  useEffect(() => {
    document.body.setAttribute('data-right-panel', open ? 'open' : 'closed');
  }, [open]);

  const panel = useMemo(() => (
    <aside className="overlay-panel--right" aria-label="Details" data-state={open ? 'open' : 'closed'}>
      <button type="button" className="panel-handle" aria-label={open ? 'Close details' : 'Open details'} onClick={() => setOpen((v) => !v)}>
        {open ? (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="currentColor" d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.42 1.41l4.59-4.59a1 1 0 0 0 0-1.41L10.71 6.7a1 1 0 0 0-1.42 0Z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="currentColor" d="M14.71 17.29a1 1 0 0 0 0-1.41L10.83 12l3.88-3.88a1 1 0 1 0-1.42-1.41L8.7 11.3a1 1 0 0 0 0 1.41l4.59 4.59a1 1 0 0 0 1.42 0Z"/>
          </svg>
        )}
      </button>
      <div className="project-card" style={{ height: '100%', overflow: 'auto' }}>
        {hovered ? (
          <div>
            <h2 style={{ fontSize: 'var(--size-4)', lineHeight: 1.2 }}>{hovered.title}</h2>
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-muted)' }}>{hovered.description}</p>
            {hovered.image && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <LightboxImage src={hovered.image.src} alt={hovered.image.alt} group={[{ src: hovered.image.src, alt: hovered.image.alt }]} index={0} width={1200} height={800} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} />
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
  ), [hovered, open]);

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
                <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 600px) 50vw, 200px" />
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


