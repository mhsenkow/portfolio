import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'about — mhsenkow',
	description: 'About mhsenkow',
};

export default function AboutPage() {
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 style={{ fontSize: 'var(--size-6)', lineHeight: 1.1 }}>about</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 760 }}>
					I’m a software engineer/designer. This is the better, lower-case portfolio.
				</p>
			</section>
		</main>
	);
}
