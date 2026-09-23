import type { Metadata } from 'next';
import Image from 'next/image';
import {
	CONTACT_EMAIL,
	RESUME_URL,
	SITE_BLURB,
	SITE_GREETING,
	SITE_ROLE,
} from '@/content/site';
import styles from './about.module.css';

export const metadata: Metadata = {
	title: 'About',
	description: `Michael Senkow — ${SITE_ROLE}. ${SITE_BLURB}`,
	alternates: { canonical: '/about' },
};

const LINKS = [
	{ href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
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
					<p className={styles.hint}>{SITE_ROLE}</p>
					<h1 className={`h1 ${styles.title}`}>About</h1>
				</header>

				<div className={styles.grid}>
					<div className={styles.story}>
						{SITE_GREETING.map((para) => (
							<p key={para.slice(0, 28)}>{para}</p>
						))}

						<p>
							Recently: consulting for <strong>i2Systems</strong> (Lux, Judge) and AI
							startups. Before that — <strong>Meta Infra</strong> notebooks &amp; data-viz
							systems; <strong>Microsoft</strong> MyAnalytics / Viva Insights and Focus
							Time research; <strong>IBM</strong> Watson / Cognos and early Carbon.
						</p>

						<p>
							Off-hours I ship independent local-first machines — same systems instinct
							as the day job, just for myself.
						</p>

						<p>
							M.S. HCI · UMich · B.S. ME &amp; Tech Comm · Michigan Tech · Apple IS&amp;T
							internship. Email is the best first step.
						</p>

						<ul className={styles.orgList}>
							<li>
								<span className={styles.orgName}>Now</span>
								<span className={styles.orgBody}>
									i2Systems + AI consulting.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>Meta</span>
								<span className={styles.orgBody}>
									Daiquery / Bento, analysis workflows, XDS data-viz.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>Microsoft</span>
								<span className={styles.orgBody}>
									Viva Insights lineage, Focus Time, Teams admin.
								</span>
							</li>
							<li>
								<span className={styles.orgName}>IBM</span>
								<span className={styles.orgBody}>
									Watson / Cognos; early Carbon foundations.
								</span>
							</li>
						</ul>
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
