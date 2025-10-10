import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
	title: 'full list — mhsenkow',
	description: 'Chronological list of projects',
};

export default function ListViewPage() {
	const sorted = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 style={{ fontSize: 'var(--size-6)', lineHeight: 1.1 }}>full list</h1>
				<ul className="timeline">
					{sorted.map((p) => (
						<li key={p.slug} className="timeline-item">
							<div className="timeline-year">{p.year ?? ''}</div>
							<div className="timeline-dot" aria-hidden="true" />
							<div className="timeline-content">
								<Link href={`/projects/${p.slug}`}>{p.title}</Link>
								<p className="type-secondary" style={{ marginTop: 'var(--space-2)' }}>{p.description}</p>
							</div>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}


