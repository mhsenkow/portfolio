import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'about — mhsenkow',
	description: 'About mhsenkow',
};

export default function AboutPage() {
	return (
		<main id="content">
			<section className="container" style={{ padding: 'var(--space-16) 0' }}>
				<h1 className="h1">about</h1>
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1.2fr 0.8fr',
					gap: 'var(--space-10)',
					alignItems: 'start',
					marginTop: 'var(--space-6)'
				}}>
				<div style={{ color: 'var(--color-text)', maxWidth: 820, display: 'grid', gap: 'var(--space-3)' }}>
					<p><strong>Hello!</strong></p>
					<p>
						I&apos;m Michael, a product designer passionate about the intersection of artificial intelligence, human-centered design, big data, and software development. I thrive where DESIGN and TECHNOLOGY meet, whether it&apos;s using 3D printers and CNC-controlled robots to create art or reimagining enterprise applications to enhance our work-life balance. I love exploring big-picture ideas and diving into the details that make applications not just functional but delightful.
					</p>
					<p>
						I hold a Master&apos;s in Information Science, focusing on Human-Computer Interaction, from the University of Michigan, and a dual Bachelor&apos;s in Mechanical Engineering and Technical Communications from Michigan Technological University. My early career included technical roles at startups in Boston, design research for Architecture professors during grad school, and an internship at Apple in Cupertino.
					</p>
					<p>
						Currently I&apos;m freelancing and looking for that next big step.
					</p>
					<p>
						Most recently I was providing initial design guidance and branding for a few start-ups all around the &apos;private data source, notebook&apos; realm, and working in Meta&apos;s internal applications covering Analysis workflows across Daiquery, Bento, Data Explorer and frameworks for Data-viz systems.
					</p>
					<p>
						Before that I was at Microsoft working on Teams and MyAnalytics and Workplace Analytics (now branded Viva Insights) as a mixture of design lead and individual contributor designer. At IBM I was in the first group of 60 that was at the start of the Design movement at IBM and had been with the company for four years, priorly working on Watson Analytics projects and aided in building Data-Viz and both the UX and Technical sides of the Watson Data Platform Design Guide that folded into their current Carbon Blue design system.
					</p>
					<p>
						Always happy to discuss design and technology, feel free to reach out!
					</p>
				</div>

				<div>
					<div style={{
						borderRadius: '24px',
						overflow: 'hidden',
						background: 'var(--surface-image-frame)',
						boxShadow: 'var(--shadow-1)'
					}}>
						<Image src="/images/profile/michael.jpg" alt="Michael Senkow" width={800} height={800} priority style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
					<section style={{ marginTop: 'var(--space-6)' }}>
						<h2 className="h2">info</h2>
						<p className="type-secondary" style={{ marginTop: 'var(--space-2)' }}>Seattle, WA — Have lived in upper and lower Michigan, Boston, Austin, Cupertino before this.</p>
						<div style={{ display: 'grid', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
							<a href="mailto:mhsenkow@gmail.com">mhsenkow@gmail.com</a>
							<a href="tel:+19062814672">+1 906 281 4672</a>
							<a href="https://www.linkedin.com/in/mhsenkow/" target="_blank" rel="noreferrer noopener">Linkedin</a>
							<a href="https://codepen.io/mhsenkow" target="_blank" rel="noreferrer noopener">Codepen</a>
							<a href="https://thenounproject.com/creator/mhsenkow/" target="_blank" rel="noreferrer noopener">Noun Project</a>
						</div>
					</section>
				</div>
				</div>
			</section>
			<section className="container" style={{ padding: '0 0 var(--space-16) 0' }}>
				<h2 className="h2">contact</h2>
				<div style={{ maxWidth: 820, marginTop: 'var(--space-6)' }}>
					<p style={{ fontSize: 'var(--size-3)', marginBottom: 'var(--space-3)' }}>
						Feel free to reach out via email:
					</p>
					<a href="mailto:mhsenkow@gmail.com" style={{ 
						fontSize: 'var(--size-4)', 
						color: 'var(--color-accent)', 
						textDecoration: 'none',
						display: 'inline-block',
						padding: 'var(--space-3) var(--space-5)',
						background: 'var(--surface-card)',
						border: '1px solid var(--color-border)',
						borderRadius: 'var(--radius-lg)',
						transition: 'all 0.2s ease'
					}}>
						mhsenkow@gmail.com
					</a>
				</div>
			</section>
		</main>
	);
}
