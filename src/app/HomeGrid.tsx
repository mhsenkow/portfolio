"use client";

import { GridWithHoverPanel } from "@/app/all-experiences/GridWithHoverPanel";
import { openIntroModal } from "@/app/components/IntroModal";
import type { ProjectCard } from "@/content/project-card";

export function HomeGrid({ items }: { items: ProjectCard[] }) {
  return (
    <GridWithHoverPanel
      items={items}
      title="Work"
      onTitleClick={openIntroModal}
    />
  );
}
