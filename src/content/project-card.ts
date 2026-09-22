import type { Project } from "./projects";
import { deriveSkillsets, type Skillset } from "./skillsets";

/** Slim card shape for grids/filters — no case-study body, gallery, or sections. */
export type ProjectCard = {
  slug: string;
  title: string;
  description: string;
  year?: number;
  featured?: boolean;
  category?: Project["category"];
  image?: Project["image"];
  stack?: string[];
  /** Flattened from details.entity for filter + hover panel. */
  entity?: string;
  /** Derived craft clusters for the skillset filter. */
  skillsets: Skillset[];
};

export function toProjectCard(project: Project): ProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    year: project.year,
    featured: project.featured,
    category: project.category,
    image: project.image,
    stack: project.stack,
    entity: project.details?.entity,
    skillsets: deriveSkillsets(project),
  };
}

export function toProjectCards(projects: Project[]): ProjectCard[] {
  return projects.map(toProjectCard);
}
