import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
	title: 'Explorations',
	description: 'Installations, research, generative work, and independent experiments.',
	alternates: { canonical: '/other-design-work' },
};

export default function OtherDesignWorkPage() {
	const creative = projects.filter((p) => p.category === 'creative');
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 className="h1">Explorations</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 820 }}>
					Independent tools, installations, research, and generative experiments alongside the case studies.
				</p>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
					{creative.map((p) => (
						<Link key={p.slug} href={`/projects/${p.slug}`} style={{
						background: 'var(--surface-card)',
						border: 'var(--border-weak)',
							borderRadius: 'var(--radius-md)',
							padding: 'var(--space-5)',
							boxShadow: 'var(--shadow-1)'
						}}>
							{p.image && (
								<div>
									<Image src={p.image.src} alt={p.image.alt} width={720} height={480} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} />
								</div>
							)}
							<h3 className="h3" style={{ margin: 'var(--space-3) 0 0', textTransform: 'lowercase' }}>{p.title}</h3>
							<p style={{ marginTop: 'var(--space-2)', color: 'var(--color-muted)' }}>{p.description}</p>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
