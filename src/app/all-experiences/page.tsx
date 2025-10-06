import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { GridWithHoverPanel } from './GridWithHoverPanel';

export const metadata: Metadata = {
	title: 'grid view — mhsenkow',
	description: 'All projects in a responsive grid',
};

export default function AllExperiencesPage() {
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 style={{ fontSize: 'var(--size-6)', lineHeight: 1.1 }}>grid view</h1>
				<GridWithHoverPanel items={projects} />
			</section>
		</main>
	);
}


