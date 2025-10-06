import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import Link from 'next/link';
import { ProjectPager } from '@/app/components/ProjectPager';
import { SidePanelLayout } from '@/app/components/SidePanelLayout';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	if (!project) return { title: 'not found — mhsenkow' };
	return {
		title: `${project.title} — mhsenkow`,
		description: project.description,
		openGraph: {
			title: `${project.title} — mhsenkow`,
			description: project.description,
			images: project.image ? [
				{ url: project.image.src, width: project.image.width ?? 1200, height: project.image.height ?? 630, alt: project.image.alt }
			] : undefined,
		},
		twitter: {
			card: project.image ? 'summary_large_image' : 'summary',
			title: `${project.title} — mhsenkow`,
			description: project.description,
			images: project.image ? [project.image.src] : undefined,
		},
	};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	if (!project) return notFound();

    // Auto-discover any local images for this project under public/images/projects/{slug}
    let autoGallery: { src: string; alt: string }[] = [];
    try {
        const dir = path.join(process.cwd(), 'public', 'images', 'projects', slug);
        const files = fs.readdirSync(dir);
        autoGallery = files
            .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
            .map((f) => ({ src: `/images/projects/${slug}/${f}`, alt: project.title }));
    } catch (_) {
        // ignore missing directory
    }

    const gallery = [
        ...(project.gallery ?? []),
        ...autoGallery,
    ].filter((item, idx, arr) => arr.findIndex((x) => x.src === item.src) === idx);

    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = idx > 0 ? projects[idx - 1] : null;
    const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

	return (
		<main id="content">
			<section className="container--fluid" style={{ padding: 'var(--space-16) 0' }}>
        <SidePanelLayout panel={
          <div className="project-card">
              <h1 style={{ fontSize: 'var(--size-4)', lineHeight: 1.2 }}>{project.title}</h1>
              <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-muted)' }}>{project.description}</p>
              {project.details && (
                <dl className="project-meta">
                  {project.details.role && (<><dt>Role</dt><dd>{project.details.role}</dd></>)}
                  {project.details.entity && (<><dt>Entity</dt><dd>{project.details.entity}</dd></>)}
                  {project.details.location && (<><dt>Location</dt><dd>{project.details.location}</dd></>)}
                  {project.details.years && (<><dt>Years</dt><dd>{project.details.years}</dd></>)}
                  {project.details.team && (<><dt>Team make-up</dt><dd>{project.details.team}</dd></>)}
                  {project.details.skills && project.details.skills.length > 0 && (<><dt>Skills used</dt><dd>{project.details.skills.join(', ')}</dd></>)}
                </dl>
              )}
              {project.details?.prototypes && project.details.prototypes.length > 0 && (
                <div className="project-links">
                  {project.details.prototypes.map((p) => (
                    <a key={p.href} href={p.href} target="_blank" rel="noreferrer noopener">{p.label}</a>
                  ))}
                </div>
              )}
          </div>
        }>
          <div className="project-content-scroll">
            {project.details?.synopsis && (
              <section className="project-section">
                {Array.isArray(project.details.synopsis) ? (
                  project.details.synopsis.map((s, i) => <p key={i} style={{ color: 'var(--color-muted)' }}>{s}</p>)
                ) : (
                  <p style={{ color: 'var(--color-muted)' }}>{project.details.synopsis}</p>
                )}
              </section>
            )}
            {gallery.length > 0 ? (
              <div style={{ marginTop: 'var(--space-6)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
                {gallery.map((g, i) => (
                  <div key={g.src + i}>
                    <Image src={g.src} alt={g.alt} width={1600} height={900} unoptimized style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} />
                  </div>
                ))}
              </div>
            ) : project.image ? (
              <div style={{ marginTop: 'var(--space-8)' }}>
                <Image src={project.image.src} alt={project.image.alt} width={project.image.width ?? 1600} height={project.image.height ?? 900} unoptimized style={{ width: '100%', height: 'auto' }} />
              </div>
            ) : null}
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)', alignItems: 'center' }}>
              {prev && <Link href={`/projects/${prev.slug}`}>&larr; {prev.title}</Link>}
              <span style={{ color: 'var(--color-muted)' }}>|</span>
              {next && <Link href={`/projects/${next.slug}`}>{next.title} &rarr;</Link>}
            </div>
          </div>
        </SidePanelLayout>
                {project.links && project.links.length > 0 && (
					<ul style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', padding: 0, listStyle: 'none' }}>
						{project.links.map((l) => (
							<li key={l.href}><a href={l.href} target="_blank" rel="noreferrer noopener">{l.label}</a></li>
						))}
					</ul>
				)}
			</section>
            <ProjectPager prev={prev ? { slug: prev.slug, title: prev.title } : null} next={next ? { slug: next.slug, title: next.title } : null} />
		</main>
	);
}
