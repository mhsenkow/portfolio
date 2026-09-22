import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { ArchiveList } from './ArchiveList';

export const metadata: Metadata = {
	title: 'Archive',
	description: 'Chronological archive of product design and independent projects.',
	alternates: { canonical: '/list-view' },
};

export default function ListViewPage() {
	const sorted = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
	return (
		<main id="content">
			<section className="container container--fluid" style={{ padding: 'var(--space-16) 0', maxWidth: 1200, marginInline: 'auto', width: 'min(100% - 32px, 1200px)' }}>
				<h1 className="h1">Archive</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 640 }}>
					Scroll the career arc — work left, side projects right. Density chart jumps years.
				</p>
				<div style={{ marginTop: 'var(--space-8)' }}>
					<ArchiveList projects={sorted} />
				</div>
			</section>
		</main>
	);
}
