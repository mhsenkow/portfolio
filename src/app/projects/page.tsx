import { ProjectsGrid } from './ProjectsGrid';
import { projects } from '@/content/projects';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'key projects — mhsenkow',
    description: 'Selected work and experiments',
};

export default function ProjectsPage() {
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
                <h1 style={{ fontSize: 'var(--size-6)', lineHeight: 1.1 }}>key projects</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 820 }}>
					I have a fairly large number of projects I like to show off, this is a sub-sampling. 
				</p>
				<ProjectsGrid />
			</section>
		</main>
	);
}
