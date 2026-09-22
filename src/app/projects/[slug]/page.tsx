import { notFound } from 'next/navigation';
import { LightboxImage } from '@/app/components/Lightbox';
import type { Metadata } from 'next';
import { findProject, projectMediaDir, projects } from '@/content/projects';
import { SITE_NAME, SITE_URL } from '@/content/site';
import Link from 'next/link';
import { ProjectPager } from '@/app/components/ProjectPager';
import { LinkToken } from '@/app/components/LinkToken';
import { SidePanelLayout } from '@/app/components/SidePanelLayout';
import fs from 'fs';
import path from 'path';

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const project = findProject(slug);
	if (!project) return { title: 'Not found' };
	const title = project.title;
	const description = project.description;
	const canonical = `/projects/${project.slug}`;
	const ogImage = project.image
		? {
				url: project.image.src,
				width: project.image.width ?? 1200,
				height: project.image.height ?? 630,
				alt: project.image.alt,
			}
		: undefined;
	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title: `${title} — ${SITE_NAME}`,
			description,
			url: `${SITE_URL}${canonical}`,
			images: ogImage ? [ogImage] : undefined,
		},
		twitter: {
			card: project.image ? 'summary_large_image' : 'summary',
			title: `${title} — ${SITE_NAME}`,
			description,
			images: project.image ? [project.image.src] : undefined,
		},
	};
}

function ImageFrame({
	src,
	alt,
	group,
	index,
	width = 1200,
	height = 800,
	sizes,
}: {
	src: string;
	alt: string;
	group: { src: string; alt: string }[];
	index: number;
	width?: number;
	height?: number;
	sizes: string;
}) {
	return (
		<div className="project-media">
			<LightboxImage
				src={src}
				alt={alt}
				group={group}
				index={index}
				width={width}
				height={height}
				sizes={sizes}
				style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--radius-md) - 8px)', display: 'block' }}
			/>
		</div>
	);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = findProject(slug);
	if (!project) return notFound();

	const mediaDir = projectMediaDir(project);
	let autoGallery: { src: string; alt: string }[] = [];
	try {
		const dir = path.join(process.cwd(), 'public', 'images', 'projects', mediaDir);
		const files = fs.readdirSync(dir);
		autoGallery = files
			.filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
			.filter((f) => {
				try {
					return fs.statSync(path.join(dir, f)).size >= 2048;
				} catch {
					return false;
				}
			})
			.map((f) => ({ src: `/images/projects/${mediaDir}/${f}`, alt: project.title }));
	} catch {
		// ignore missing directory
	}

	const gallery = [
		...(project.gallery ?? []),
		...autoGallery,
	].filter((item, idx, arr) => arr.findIndex((x) => x.src === item.src) === idx);

	const headerSrc = project.details?.headerImage?.src;
	const sectionImageSrcs = project.details?.sections?.flatMap((section) =>
		section.images?.map((img) => img.src) ?? []
	) ?? [];
	const galleryFiltered = gallery.filter((g) => !sectionImageSrcs.includes(g.src) && g.src !== headerSrc);

	const idx = projects.findIndex((p) => p.slug === project.slug);
	const prev = idx > 0 ? projects[idx - 1] : null;
	const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

	const videoHref = project.details?.prototypes?.find((p) => /youtu\.be|youtube\.com/.test(p.href))?.href;
	const embedSrc = videoHref
		? (() => {
				try {
					const u = new URL(videoHref);
					const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v');
					return id ? `https://www.youtube.com/embed/${id}` : undefined;
				} catch {
					return undefined;
				}
			})()
		: undefined;

	const metaFields: { label: string; value: string }[] = [];
	if (project.details?.role) metaFields.push({ label: 'Role', value: project.details.role });
	if (project.details?.entity) metaFields.push({ label: 'Entity', value: project.details.entity });
	if (project.details?.location) metaFields.push({ label: 'Location', value: project.details.location });
	if (project.details?.years) metaFields.push({ label: 'Years', value: project.details.years });
	if (project.details?.team) metaFields.push({ label: 'Team make-up', value: project.details.team });
	if (project.details?.skills && project.details.skills.length > 0) {
		metaFields.push({ label: 'Skills used', value: project.details.skills.join(', ') });
	}

	const gallerySizes = '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px';
	const heroSizes = '(max-width: 700px) 100vw, (max-width: 1100px) 92vw, min(1100px, 70vw)';

	const creativeWorkJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.title,
		description: project.description,
		url: `${SITE_URL}/projects/${project.slug}`,
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		...(project.year ? { dateCreated: String(project.year) } : {}),
		...(project.image
			? { image: project.image.src.startsWith('http') ? project.image.src : `${SITE_URL}${project.image.src}` }
			: {}),
		...(project.details?.skills?.length ? { keywords: project.details.skills.join(', ') } : {}),
	};

	return (
		<main id="content">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
			/>
			<section className="container--fluid project-page">
				<SidePanelLayout
					panel={
						<>
							<div className="project-card project-rail-card">
								<div className="eyebrow">Case study</div>
								<h1 className="h3 project-rail-title">{project.title}</h1>
								<p className="type-secondary project-rail-desc">{project.description}</p>
								{metaFields.length > 0 && (
									<dl className="project-meta">
										{metaFields.map((field) => (
											<div key={field.label} className="project-meta__item">
												<dt>{field.label}</dt>
												<dd>{field.value}</dd>
											</div>
										))}
									</dl>
								)}
								{project.details?.prototypes && project.details.prototypes.length > 0 && (
									<div className="project-links">
										{project.details.prototypes.map((p) => (
											<LinkToken key={p.href} href={p.href} label={p.label} />
										))}
									</div>
								)}
							</div>
							{(project.details?.goals || project.details?.results) && (
								<div className="project-card project-rail-card project-goals-card">
									<div className="eyebrow">Goals &amp; outcomes</div>
									<div className="project-goals-grid">
										{project.details.goals && (
											<div className="project-goals-block">
												<h3 className="h4">Goals</h3>
												{Array.isArray(project.details.goals) ? (
													<ul className="type-secondary project-bullet-list">
														{project.details.goals.map((goal, i) => (
															<li key={i}>{goal}</li>
														))}
													</ul>
												) : (
													<p className="type-secondary">{project.details.goals}</p>
												)}
											</div>
										)}
										{project.details.results && (
											<div className="project-goals-block">
												<h3 className="h4">Outcomes</h3>
												{Array.isArray(project.details.results) ? (
													<ul className="type-secondary project-bullet-list">
														{project.details.results.map((result, i) => (
															<li key={i}>{result}</li>
														))}
													</ul>
												) : (
													<p className="type-secondary">{project.details.results}</p>
												)}
											</div>
										)}
									</div>
								</div>
							)}
						</>
					}
				>
					<div className="project-content-scroll">
						<section className="project-overview">
							<div className="eyebrow">Overview</div>
							<h2 className="h2 project-overview-title">{project.title}</h2>
							<p className="lede">{project.description}</p>
						</section>

						{project.details?.headerEmbed && (
							<div className="project-hero">
								<div
									className="project-hero-embed"
									dangerouslySetInnerHTML={{ __html: project.details.headerEmbed.html }}
								/>
								{project.details.headerEmbed.title && project.details.headerEmbed.link && (
									<div className="project-hero-caption">
										<a href={project.details.headerEmbed.link} target="_blank" rel="noopener noreferrer">
											{project.details.headerEmbed.title} →
										</a>
									</div>
								)}
							</div>
						)}

						{!project.details?.headerEmbed && project.details?.headerImage && (
							<div className="project-hero">
								<ImageFrame
									src={project.details.headerImage.src}
									alt={project.details.headerImage.alt}
									group={[{ src: project.details.headerImage.src, alt: project.details.headerImage.alt }]}
									index={0}
									width={project.details.headerImage.width ?? 1600}
									height={project.details.headerImage.height ?? 900}
									sizes={heroSizes}
								/>
							</div>
						)}

						{project.details?.synopsis && (
							<section className="project-section">
								{Array.isArray(project.details.synopsis) ? (
									project.details.synopsis.map((s, i) => {
										const titled = s.match(/^([A-Z][A-Za-z\s&/\-]{2,100}):\s*(.*)$/);
										if (titled) {
											const [, title, rest] = titled;
											const sec = project.details?.sections?.find(
												(section) => section.title.toLowerCase() === title.toLowerCase()
											);
											const group = sec?.images?.map((img) => ({ src: img.src, alt: img.alt })) ?? [];
											return (
												<div key={i} className="project-block">
													<h3 className="h3">{title}</h3>
													{rest && <p className="type-secondary project-block-body">{rest}</p>}
													{sec?.images && (
														<div className="project-image-grid">
															{sec.images.map((img, imgIdx) => (
																<ImageFrame
																	key={img.src + imgIdx}
																	src={img.src}
																	alt={img.alt}
																	group={group}
																	index={imgIdx}
																	sizes={gallerySizes}
																/>
															))}
														</div>
													)}
												</div>
											);
										}
										return (
											<p key={i} className={`type-secondary${i === 0 ? '' : ' project-block-body'}`}>
												{s}
											</p>
										);
									})
								) : (
									<p className="type-secondary">{project.details.synopsis}</p>
								)}
							</section>
						)}

						{project.details?.sections && Array.isArray(project.details.synopsis) && (() => {
							const synopsisTitles = project.details!.synopsis!
								.map((s) => {
									const m = typeof s === 'string' ? s.match(/^([A-Z][A-Za-z\s&/\-]{2,100}):\s*.*$/) : null;
									return m ? m[1].toLowerCase() : null;
								})
								.filter(Boolean) as string[];
							const hasAnchors = project.details!.sections!.some((sec) =>
								synopsisTitles.includes(sec.title.toLowerCase())
							);
							return hasAnchors ? null : (
								<section className="project-section">
									{project.details!.sections!.map((sec) => {
										const group = sec.images?.map((img) => ({ src: img.src, alt: img.alt })) ?? [];
										return (
											<div key={sec.title} className="project-block">
												<h3 className="h3">{sec.title}</h3>
												{sec.body &&
													(Array.isArray(sec.body) ? (
														sec.body.map((b, i) => (
															<p key={i} className={`type-secondary${i === 0 ? ' project-block-body' : ' project-block-body--tight'}`}>
																{b}
															</p>
														))
													) : (
														<p className="type-secondary project-block-body">{sec.body}</p>
													))}
												{sec.images && (
													<div className="project-image-grid">
														{sec.images.map((img, imgIdx) => (
															<ImageFrame
																key={img.src + imgIdx}
																src={img.src}
																alt={img.alt}
																group={group}
																index={imgIdx}
																sizes={gallerySizes}
															/>
														))}
													</div>
												)}
											</div>
										);
									})}
								</section>
							);
						})()}

						{galleryFiltered.length > 0 ? (
							<section className="project-section">
								<h3 className="h3">Gallery</h3>
								<div className="project-image-grid project-image-grid--gallery">
									{(() => {
										const group = galleryFiltered.map((g) => ({ src: g.src, alt: g.alt }));
										return galleryFiltered.map((g, i) => (
											<ImageFrame
												key={g.src + i}
												src={g.src}
												alt={g.alt}
												group={group}
												index={i}
												width={1600}
												height={900}
												sizes={gallerySizes}
											/>
										));
									})()}
								</div>
							</section>
						) : project.image && sectionImageSrcs.length === 0 ? (
							<div className="project-hero">
								<ImageFrame
									src={project.image.src}
									alt={project.image.alt}
									group={[{ src: project.image.src, alt: project.image.alt }]}
									index={0}
									width={project.image.width ?? 1600}
									height={project.image.height ?? 900}
									sizes={heroSizes}
								/>
							</div>
						) : null}

						{embedSrc && (
							<section className="project-section">
								<h3 className="h3">Login concept video</h3>
								<div className="project-video">
									<iframe
										src={embedSrc}
										title="YouTube video"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
									/>
								</div>
							</section>
						)}

						<nav className="project-inline-nav" aria-label="Adjacent case studies">
							{prev ? <Link href={`/projects/${prev.slug}`}>&larr; {prev.title}</Link> : <span />}
							{next ? <Link href={`/projects/${next.slug}`}>{next.title} &rarr;</Link> : <span />}
						</nav>
					</div>
				</SidePanelLayout>

				{project.links && project.links.length > 0 && (
					<ul className="project-external-links">
						{project.links.map((l) => (
							<li key={l.href}>
								<a href={l.href} target="_blank" rel="noreferrer noopener">
									{l.label}
								</a>
							</li>
						))}
					</ul>
				)}
			</section>
			<ProjectPager
				prev={prev ? { slug: prev.slug, title: prev.title } : null}
				next={next ? { slug: next.slug, title: next.title } : null}
			/>
		</main>
	);
}
