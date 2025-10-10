"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/content/projects';
import { LightboxImage } from '@/app/components/Lightbox';
import { SortFilterBar, sortProjects, filterProjects, getFilterCounts, type SortOption, type FilterOption } from '@/app/components/SortFilterBar';
import styles from './GridWithHoverPanel.module.css';

type Props = { items: Project[] };

export function GridWithHoverPanel({ items }: Props) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const [mountNode, setMountNode] = useState<Element | null>(null);
  const [open, setOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia && window.matchMedia('(max-width: 900px)').matches ? false : true;
  });
  
  // Sort and filter state
  const [sort, setSort] = useState<SortOption>('year-desc');
  const [filter, setFilter] = useState<FilterOption>('all');
  
  // Process items based on sort and filter
  const processedItems = useMemo(() => {
    const filtered = filterProjects(items, filter);
    return sortProjects(filtered, sort);
  }, [items, sort, filter]);
  
  const filterCounts = useMemo(() => getFilterCounts(items), [items]);

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
      {/* Title and toolbar in horizontal layout */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap',
        gap: 'var(--space-4)'
      }}>
        <h1 style={{ 
          fontSize: 'var(--size-6)', 
          lineHeight: 1.1, 
          margin: 0,
          flex: '1 1 auto',
          minWidth: '200px'
        }}>
          grid view
        </h1>
        
        <div style={{ flex: '0 0 auto' }}>
          <SortFilterBar
            onSortChange={setSort}
            onFilterChange={setFilter}
            currentSort={sort}
            currentFilter={filter}
            itemCount={processedItems.length}
            filterCounts={filterCounts}
          />
        </div>
      </div>
      
      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 'var(--space-4)'
        }}
        layout
      >
        <AnimatePresence mode="popLayout">
          {processedItems.map((p, index) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ 
                opacity: 0, 
                scale: 0.85, 
                y: 30,
                rotateX: -15,
                rotateY: 5
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateX: 0,
                rotateY: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.85, 
                y: -30,
                rotateX: 15,
                rotateY: -5,
                transition: {
                  duration: 0.25,
                  ease: [0.4, 0.0, 1, 1]
                }
              }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.02,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.03,
                y: -2,
                rotateX: -2,
                transition: { 
                  duration: 0.2,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
              onMouseEnter={() => setHovered(p)}
              onPointerEnter={() => setHovered(p)}
              onFocus={() => setHovered(p)}
              onBlur={() => setHovered((cur) => (cur?.slug === p.slug ? null : cur))}
            >
              <Link 
                href={`/projects/${p.slug}`} 
                className={`${styles.card} card`} 
                onMouseEnter={() => setHovered(p)}
                onMouseOver={() => setHovered(p)}
                onPointerEnter={() => setHovered(p)}
                onFocus={() => setHovered(p)}
                onTouchStart={() => setHovered(p)}
                onBlur={() => setHovered((cur) => (cur?.slug === p.slug ? null : cur))}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--color-border)',
                  padding: 'var(--space-4)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {p.image && (
                  <div className={`${styles.cardImage} card-image`} style={{ 
                    marginBottom: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '120px',
                    background: 'var(--surface-elev)'
                  }}>
                    <Image 
                      src={p.image.src} 
                      alt={p.image.alt} 
                      fill 
                      priority={index < 6}
                      sizes="(max-width: 600px) 50vw, 200px"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)'
                      }}
                    />
                  </div>
                )}
                <h3 style={{ 
                  margin: 0, 
                  fontSize: 'var(--size-2)',
                  fontWeight: '600',
                  lineHeight: 1.3,
                  transition: 'color 0.2s ease'
                }}>{p.title}</h3>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {mountNode ? createPortal(panel, mountNode) : panel}
    </div>
  );
}


