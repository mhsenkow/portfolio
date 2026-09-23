import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { toProjectCards } from '@/content/project-card';
import { ExplorationsGrid } from './ExplorationsGrid';

export const metadata: Metadata = {
	title: 'Explorations',
	description: 'Installations, research, generative work, and independent experiments.',
	alternates: { canonical: '/other-design-work' },
};

export default function OtherDesignWorkPage() {
	const creative = toProjectCards(projects.filter((p) => p.category === 'creative'));
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 className="h1">Explorations</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 820 }}>
					Independent tools, installations, research, and generative experiments.
				</p>
				<ExplorationsGrid items={creative} />
			</section>
		</main>
	);
}
