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
				<ul style={{ marginTop: 'var(--space-8)', padding: 0, listStyle: 'none', display: 'grid', gap: 'var(--space-4)' }}>
					{sorted.map((p) => (
						<li key={p.slug} style={{ borderBottom: 'var(--border-weak)', paddingBottom: 'var(--space-4)' }}>
							<div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'baseline', flexWrap: 'wrap' }}>
								<span style={{ color: 'var(--color-muted)', minWidth: 60 }}>{p.year ?? ''}</span>
								<Link href={`/projects/${p.slug}`}>{p.title}</Link>
							</div>
							<p style={{ marginTop: 'var(--space-2)', color: 'var(--color-muted)' }}>{p.description}</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}


