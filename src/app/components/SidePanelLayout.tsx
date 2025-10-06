"use client";
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  panel: ReactNode;
  children: ReactNode;
};

export function SidePanelLayout({ panel, children }: Props) {
  const [mountNode, setMountNode] = useState<Element | null>(null);
  const portalContent = useMemo(() => (
    <aside className="overlay-panel" aria-label="Project panel">
      <div className="project-card" style={{ height: '100%', overflow: 'auto' }}>
        {panel}
      </div>
    </aside>
  ), [panel]);

  useEffect(() => {
    const node = document.getElementById('overlays');
    setMountNode(node);
    // When using the left overlay panel, push content in so it doesn't sit under the panel
    document.body.classList.add('has-left-panel');
    return () => {
      document.body.classList.remove('has-left-panel');
    };
  }, []);

  return (
    <div className="project-grid">
      {/* Fallback in case portal container is not present (SSR or layout change) */}
      <aside className="project-aside" aria-label="Project panel" style={{ display: mountNode ? 'none' : undefined }}>
        {panel}
      </aside>
      <div>{children}</div>
      {mountNode ? createPortal(portalContent, mountNode) : null}
    </div>
  );
}


