"use client";

import { projects } from "@/content/projects";
import { GridWithHoverPanel } from "@/app/all-experiences/GridWithHoverPanel";
import { openIntroModal } from "@/app/components/IntroModal";

export default function Home() {
  return (
    <main id="content">
      <section className="container" style={{ padding: "var(--space-6) 0 var(--space-12)" }}>
        <GridWithHoverPanel
          items={projects}
          title="work"
          onTitleClick={openIntroModal}
        />
      </section>
    </main>
  );
}
