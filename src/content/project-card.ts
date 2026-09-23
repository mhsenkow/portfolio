import type { Project } from "./projects";
import { deriveCompanies, type Company } from "./companies";
import { deriveSkillsets, type Skillset } from "./skillsets";
import { cardThumbPath } from "@/lib/cardThumb";

/** Slim card shape for grids/filters — no case-study body, gallery, or sections. */
export type ProjectCard = {
  slug: string;
  title: string;
  description: string;
  year?: number;
  featured?: boolean;
  category?: Project["category"];
  image?: Project["image"];
  /** Prebuilt 440w WebP for grids — served as static asset, not via CF Images. */
  thumbSrc?: string;
  stack?: string[];
  /** Flattened from details.entity for filter + hover panel. */
  entity?: string;
  /** Derived craft clusters for the skill filter. */
  skillsets: Skillset[];
  /** Derived org tags for the company filter. */
  companies: Company[];
};

/** Archive timeline row — title/year/category only. */
export type ArchiveItem = {
  slug: string;
  title: string;
  description: string;
  year?: number;
  category?: Project["category"];
};

export function toProjectCard(project: Project): ProjectCard {
  const entity = project.details?.entity;
  const image = project.image;
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    year: project.year,
    featured: project.featured,
    category: project.category,
    image,
    thumbSrc: image?.src ? cardThumbPath(image.src) : undefined,
    stack: project.stack,
    entity,
    skillsets: deriveSkillsets(project),
    companies: deriveCompanies({ ...project, entity }),
  };
}

export function toProjectCards(projects: Project[]): ProjectCard[] {
  return projects.map(toProjectCard);
}

export function toArchiveItem(project: Project): ArchiveItem {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    year: project.year,
    category: project.category,
  };
}

export function toArchiveItems(projects: Project[]): ArchiveItem[] {
  return projects.map(toArchiveItem);
}
