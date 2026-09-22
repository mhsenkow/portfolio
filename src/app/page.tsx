import { projects } from "@/content/projects";
import { toProjectCards } from "@/content/project-card";
import { HomeGrid } from "./HomeGrid";

export default function Home() {
  const cards = toProjectCards(projects);
  return (
    <main id="content">
      <section className="container" style={{ padding: "var(--space-6) 0 var(--space-12)" }}>
        <HomeGrid items={cards} />
      </section>
    </main>
  );
}
