import { ReactNode } from 'react';

type Props = {
  panel: ReactNode;
  children: ReactNode;
};

/**
 * Case-study layout: sticky rail + story on desktop;
 * header-then-story stack on tablet/phone. Breakpoint is CSS-only
 * (max-width: 1100px) so there is no layout flash on resize/hydrate.
 */
export function SidePanelLayout({ panel, children }: Props) {
  return (
    <div className="project-grid">
      <aside className="project-aside" aria-label="Project details">
        {panel}
      </aside>
      <div className="project-story">{children}</div>
    </div>
  );
}
