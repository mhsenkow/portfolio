"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type LightboxState = {
  isOpen: boolean;
  currentIndex: number;
  items: { src: string; alt: string }[];
  open: (items: { src: string; alt: string }[], startIndex?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
};

const LightboxContext = createContext<LightboxState | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<{ src: string; alt: string }[]>([]);

  const open = useCallback((list: { src: string; alt: string }[], startIndex = 0) => {
    setItems(list);
    setCurrentIndex(startIndex);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % (items.length || 1)), [items.length]);
  const prev = useCallback(() => setCurrentIndex((i) => (i - 1 + (items.length || 1)) % (items.length || 1)), [items.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  const value = useMemo<LightboxState>(() => ({ isOpen, currentIndex, items, open, close, next, prev }), [isOpen, currentIndex, items, open, close, next, prev]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <LightboxOverlay />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}

export function LightboxImage({ src, alt, group, index, width, height, sizes, className, style }: {
  src: string;
  alt: string;
  group: { src: string; alt: string }[];
  index: number;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { open } = useLightbox();
  return (
    <button type="button" onClick={() => open(group, index)} aria-label="Open image" style={{ appearance: 'none', padding: 0, border: 0, background: 'transparent', display: 'block', width: '100%' }}>
      <Image src={src} alt={alt} width={width ?? 1600} height={height ?? 900} sizes={sizes} unoptimized className={className} style={style} />
    </button>
  );
}

function LightboxOverlay() {
  const { isOpen, items, currentIndex, close, next, prev } = useLightbox();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  if (!isOpen || items.length === 0) return null;
  const item = items[currentIndex];
  return (
    <div className="lb-overlay" role="dialog" aria-modal="true" ref={backdropRef} onClick={(e) => { if (e.target === backdropRef.current) close(); }}>
      <div className="lb-content">
        <button className="lb-close" onClick={close} aria-label="Close">×</button>
        <button className="lb-prev" onClick={prev} aria-label="Previous">←</button>
        <button className="lb-next" onClick={next} aria-label="Next">→</button>
        <div className="lb-image-wrap">
          <Image src={item.src} alt={item.alt} fill sizes="100vw" style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}


