import type { Metadata } from 'next';
import Image from 'next/image';
import { RESUME_URL } from '@/content/site';
import styles from './about.module.css';

export const metadata: Metadata = {
	title: 'About',
	description:
		'Michael Senkow — Staff Product Designer. Complex tooling, data workflows, and product systems.',
	alternates: { canonical: '/about' },
};

const LINKS = [
	{ href: 'mailto:mhsenkow@gmail.com', label: 'mhsenkow@gmail.com' },
	{ href: RESUME_URL, label: 'Resume', external: true },
	{ href: 'https://github.com/mhsenkow', label: 'GitHub', external: true },
	{ href: 'https://www.linkedin.com/in/mhsenkow/', label: 'LinkedIn', external: true },
	{ href: 'https://codepen.io/mhsenkow', label: 'CodePen', external: true },
	{ href: 'https://thenounproject.com/creator/mhsenkow/', label: 'Noun Project', external: true },
] as const;

export default function AboutPage() {
	return (
		<main id="content">
			<section className={`container ${styles.page}`}>
				<header className={styles.mast}>
					<p className={styles.hint}>Staff Product Designer</p>
					<h1 className={`h1 ${styles.title}`}>About</h1>
				</header>

				<div className={styles.grid}>
					<div className={styles.story}>
						<p>
							I&apos;m Michael — a staff product designer focused on complex tooling,
							data workflows, and systems that stay clear at scale. I design and
							prototype enterprise products and the supporting infrastructure around them.
						</p>
						<p>
							Background: B.S. Mechanical Engineering and Technical Communications at
							Michigan Tech; M.S. HCI and digital fabrication at the University of
							Michigan. Earlier work includes Boston startups, architecture research,
							and an Apple IS&amp;T internship on accessibility.
						</p>
						<ul className={styles.orgList}>
							<li>
								<span className={styles.orgName}>i2Systems</span>
								<span className={styles.orgBody}>
									Current — <strong>Judge</strong>, a Salesforce / CRM integrity
									layer with review-gated fixes, HubSpot / Mailchimp sync, and an
									audit trail.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>Microsoft</span>
								<span className={styles.orgBody}>
									MyAnalytics and Workplace Analytics → Viva Insights, including
									Focus Time.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>Meta Infra</span>
								<span className={styles.orgBody}>
									Daiquery / Bento notebooks, analysis workflows, data visualization
									systems, and XDS.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>IBM</span>
								<span className={styles.orgBody}>
									Early Design program, Watson Analytics, and data-viz / platform
									guide work that contributed to Carbon.
								</span>
							</li>
						</ul>
						<p>
							I also build and ship independent tools — local-first utilities,
							simulations, and design experiments. Open to conversations about product
							design, tooling, and systems work.
						</p>
					</div>

					<aside className={styles.aside}>
						<figure className={styles.portrait}>
							{/* unoptimized: OpenNext/CF image pipeline 400s some local assets */}
							<Image
								src="/images/profile/michael.jpg"
								alt="Michael Senkow"
								width={1000}
								height={1000}
								priority
								unoptimized
								className={styles.portraitImg}
							/>
						</figure>

						<div className={`${styles.meta} glass-card`}>
							<div>
								<p className={styles.metaLabel}>Based</p>
								<p className={styles.metaText}>
									Seattle — previously Michigan, Boston, Austin, and Cupertino.
								</p>
							</div>
							<div>
								<p className={styles.metaLabel}>Contact</p>
								<ul className={styles.links}>
									{LINKS.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												{...('external' in link && link.external
													? { target: '_blank', rel: 'noreferrer noopener' }
													: {})}
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
