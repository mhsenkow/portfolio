import type { Metadata } from 'next';
import Image from 'next/image';
import { RESUME_URL } from '@/content/site';
import styles from './about.module.css';

export const metadata: Metadata = {
	title: 'about — mhsenkow',
	description:
		'Michael Senkow — staff product designer. Complex tooling, data workflows, and software that still feels like craft.',
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
					<p className={styles.hint}>i build machines</p>
					<h1 className={`h1 ${styles.title}`}>about</h1>
				</header>

				<div className={styles.grid}>
					<div className={styles.story}>
						<p>
							I&apos;m Michael — staff product designer working where complex tooling,
							data workflows, and craft meet. Enterprise systems that still feel like
							something made by a person; personal machines that you can run on your
							own desk.
						</p>
						<p>
							Path: MechE + technical communications at Michigan Tech, then HCI and
							digital fabrication at the University of Michigan. Early stops in Boston
							startups, architecture research, and an Apple IS&amp;T internship on
							accessibility.
						</p>
						<ul className={styles.orgList}>
							<li>
								<span className={styles.orgName}>IBM</span>
								<span className={styles.orgBody}>
									Early Design program, Watson Analytics, and the data-viz /
									platform guide work that folded into Carbon.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>Microsoft</span>
								<span className={styles.orgBody}>
									MyAnalytics and Workplace Analytics → Viva Insights (including
									Focus Time).
								</span>
							</li>
							<li>
								<span className={styles.orgName}>Meta Infra</span>
								<span className={styles.orgBody}>
									Daiquery / Bento notebooks, analysis workflows, data-viz
									systems, and XDS.
								</span>
							</li>
							<li>
								<span className={styles.orgBodyFull}>
									Providing a range of infra, analytics and complex tooling for
									various start-ups now
								</span>
							</li>
						</ul>
						<p>
							I also ship my own local-first tools and sims — aquariums, orreries,
							word counters, and the like. Happy to talk design, tooling, or
							whatever you&apos;re building.
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
								<p className={styles.metaLabel}>based</p>
								<p className={styles.metaText}>
									Seattle — previously Upper &amp; Lower Michigan, Boston, Austin,
									Cupertino.
								</p>
							</div>
							<div>
								<p className={styles.metaLabel}>reach</p>
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
