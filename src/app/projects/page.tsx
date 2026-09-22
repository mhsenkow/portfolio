import { ProjectsGrid } from './ProjectsGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Case studies',
    description: 'Selected product design case studies across enterprise and independent work.',
	alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
                <h1 className="h1">Case studies</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 820 }}>
					Selected product and systems work — enterprise case studies and independent tools. The full archive is on the home page.
				</p>
				<ProjectsGrid />
			</section>
		</main>
	);
}
