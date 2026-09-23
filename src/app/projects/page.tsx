import { ProjectsGrid } from './ProjectsGrid';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { toProjectCards } from '@/content/project-card';

export const metadata: Metadata = {
	title: 'Case studies',
	description: 'Selected product design case studies across enterprise and independent work.',
	alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
	const featured = toProjectCards(
		[...projects.filter((p) => p.featured === true)].sort((a, b) => {
			const rank = (p: (typeof projects)[number]) => (p.category === 'creative' ? 1 : 0);
			const byKind = rank(a) - rank(b);
			if (byKind !== 0) return byKind;
			return (b.year ?? 0) - (a.year ?? 0);
		})
	);

	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 className="h1">Case studies</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 820 }}>
					Selected case studies — full cross-section on the home grid.
				</p>
				<ProjectsGrid items={featured} />
			</section>
		</main>
	);
}
