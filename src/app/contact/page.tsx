import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'contact — mhsenkow',
	description: 'Get in touch',
};

export default function ContactPage() {
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 style={{ fontSize: 'var(--size-6)', lineHeight: 1.1 }}>contact</h1>
				<p style={{ marginTop: 'var(--space-4)', color: 'var(--color-muted)', maxWidth: 760 }}>
					Email me: <a href="mailto:hello@mhsenkow.work">hello@mhsenkow.work</a>
				</p>
			</section>
		</main>
	);
}


