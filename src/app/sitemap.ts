import type { MetadataRoute } from 'next';
import { listPublishedEssays } from '@/content/essays';
import { projects } from '@/content/projects';
import { SITE_URL } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
		{ url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
		{ url: `${SITE_URL}/story`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
		{ url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
		{ url: `${SITE_URL}/other-design-work`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
		{ url: `${SITE_URL}/list-view`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
		{ url: `${SITE_URL}/essays`, lastModified: now, changeFrequency: 'monthly', priority: 0.55 },
	];

	const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
		url: `${SITE_URL}/projects/${p.slug}`,
		lastModified: now,
		changeFrequency: 'monthly' as const,
		priority: p.featured ? 0.8 : 0.5,
	}));

	const essayRoutes: MetadataRoute.Sitemap = listPublishedEssays().map((e) => ({
		url: `${SITE_URL}/essays/${e.slug}`,
		lastModified: new Date(e.updated ?? e.date),
		changeFrequency: 'yearly' as const,
		priority: 0.5,
	}));

	return [...staticRoutes, ...projectRoutes, ...essayRoutes];
}
