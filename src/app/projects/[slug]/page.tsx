import { notFound } from 'next/navigation';
import Image from 'next/image';
import { LightboxImage } from '@/app/components/Lightbox';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import Link from 'next/link';
import { ProjectPager } from '@/app/components/ProjectPager';
import { LinkToken } from '@/app/components/LinkToken';
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

    // If section images are defined, remove them from the bottom gallery to avoid duplication
    const headerSrc = project.details?.headerImage?.src;
    const sectionImageSrcs = project.details?.sections?.flatMap((section) =>
      section.images?.map((img) => img.src) ?? []
    ) ?? [];
    const galleryFiltered = gallery.filter((g) => !sectionImageSrcs.includes(g.src) && g.src !== headerSrc);

    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = idx > 0 ? projects[idx - 1] : null;
    const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

    // Extract a YouTube video from prototypes if present
    const videoHref = project.details?.prototypes?.find((p) => /youtu\.be|youtube\.com/.test(p.href))?.href;
    const embedSrc = videoHref
      ? (() => {
          try {
            const u = new URL(videoHref);
            const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : undefined;
          } catch { return undefined; }
        })()
      : undefined;

	return (
		<main id="content">
			<section className="container--fluid" style={{ padding: 'var(--space-16) 0' }}>
        <SidePanelLayout panel={
          <div className="project-card">
              <div className="eyebrow">project</div>
              <h1 className="h3" style={{ marginTop: '6px' }}>{project.title}</h1>
              <p className="type-secondary" style={{ marginTop: 'var(--space-3)' }}>{project.description}</p>
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
                <div className="project-links" style={{ gridAutoFlow: 'row', gap: '8px' }}>
                  {project.details.prototypes.map((p) => (
                    <LinkToken key={p.href} href={p.href} label={p.label} />
                  ))}
                </div>
              )}
          </div>
        }>
          <div className="project-content-scroll">
            <section>
              <div className="eyebrow">overview</div>
              <h2 className="h2" style={{ marginTop: '6px' }}>{project.title}</h2>
              <p className="lede" style={{ marginTop: 'var(--space-2)' }}>{project.description}</p>
            </section>
            {project.details?.headerEmbed && (
              <div style={{ marginTop: 'var(--space-6)' }}>
                <div 
                  dangerouslySetInnerHTML={{ __html: project.details.headerEmbed.html }}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
                {project.details.headerEmbed.title && project.details.headerEmbed.link && (
                  <div style={{ marginTop: 'var(--space-3)', textAlign: 'center' }}>
                    <a 
                      href={project.details.headerEmbed.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        fontSize: 'var(--size-2)', 
                        color: 'var(--color-link)',
                        textDecoration: 'none'
                      }}
                    >
                      {project.details.headerEmbed.title} →
                    </a>
                  </div>
                )}
              </div>
            )}
            {!project.details?.headerEmbed && project.details?.headerImage && (
              <div style={{ marginTop: 'var(--space-6)', background: 'var(--surface-image-frame)', borderRadius: 'var(--radius-md)', padding: '8px' }}>
                <LightboxImage src={project.details.headerImage.src} alt={project.details.headerImage.alt} group={[{ src: project.details.headerImage.src, alt: project.details.headerImage.alt }]} index={0} width={project.details.headerImage.width ?? 1600} height={project.details.headerImage.height ?? 900} sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1200px" className={undefined} style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--radius-md) - 8px)', display: 'block' }} />
              </div>
            )}
            {project.details?.synopsis && (
              <section className="project-section" style={{ maxWidth: 960 }}>
                {Array.isArray(project.details.synopsis) ? (
                  project.details.synopsis.map((s, i) => {
                    const titled = s.match(/^([A-Z][A-Za-z\s&/\-]{2,100}):\s*(.*)$/);
                    if (titled) {
                      const [, title, rest] = titled;
                      return (
                        <div key={i} style={{ marginTop: i === 0 ? 0 : 'var(--space-6)' }}>
                          <h3 className="h3">{title}</h3>
                          {rest && <p className="type-secondary" style={{ marginTop: 'var(--space-2)' }}>{rest}</p>}
                          {/* mini gallery if sections mapping provided */}
                          {project.details?.sections && project.details.sections.find((sec) => sec.title.toLowerCase() === title.toLowerCase())?.images && (
                            <div style={{ marginTop: 'var(--space-3)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
                              {(() => {
                                const sec = project.details!.sections!.find((sec) => sec.title.toLowerCase() === title.toLowerCase())!;
                                const group = sec.images!.map((i) => ({ src: i.src, alt: i.alt }));
                                return sec.images!.map((img, idx) => (
                                  <div key={img.src + idx} style={{ background: 'var(--surface-image-frame)', borderRadius: 'var(--radius-md)', padding: '6px' }}>
                                    <LightboxImage src={img.src} alt={img.alt} group={group} index={idx} width={800} height={600} sizes="(max-width: 600px) 100vw, 800px" style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--radius-md) - 6px)', display: 'block' }} />
                                  </div>
                                ));
                              })()}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return <p key={i} className="type-secondary">{s}</p>;
                  })
                ) : (
                  <p className="type-secondary">{project.details.synopsis}</p>
                )}
              </section>
            )}
			{/* If sections exist but are not anchored by titled synopsis lines, render them explicitly */}
			{project.details?.sections && Array.isArray(project.details.synopsis) && (() => {
				const synopsisTitles = project.details!.synopsis!
					.map((s) => {
						const m = typeof s === 'string' ? s.match(/^([A-Z][A-Za-z\s&/\-]{2,100}):\s*.*$/) : null;
						return m ? m[1].toLowerCase() : null;
					})
					.filter(Boolean) as string[];
				const hasAnchors = project.details!.sections!.some((sec) => synopsisTitles.includes(sec.title.toLowerCase()));
				return hasAnchors ? null : (
					<section className="project-section" style={{ maxWidth: 960 }}>
						{project.details!.sections!.map((sec) => (
							<div key={sec.title} style={{ marginTop: 'var(--space-6)' }}>
								<h3 className="h3">{sec.title}</h3>
								{sec.body && (Array.isArray(sec.body) ? sec.body.map((b, i) => (
									<p key={i} className="type-secondary" style={{ marginTop: i === 0 ? 'var(--space-2)' : 'var(--space-1)' }}>{b}</p>
								)) : <p className="type-secondary" style={{ marginTop: 'var(--space-2)' }}>{sec.body}</p>)}
                                {sec.images && (
									<div style={{ marginTop: 'var(--space-3)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
                                        {(() => {
                                          const group = sec.images!.map((i) => ({ src: i.src, alt: i.alt }));
                                          return sec.images!.map((img, idx) => (
                                            <div key={img.src + idx} style={{ background: 'var(--surface-image-frame)', borderRadius: 'var(--radius-md)', padding: '6px' }}>
                                              <LightboxImage src={img.src} alt={img.alt} group={group} index={idx} width={800} height={600} sizes="(max-width: 600px) 100vw, 800px" style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--radius-md) - 6px)', display: 'block' }} />
                                            </div>
                                          ));
                                        })()}
									</div>
								)}
							</div>
						))}
					</section>
				);
			})()}
            {galleryFiltered.length > 0 ? (
              <section className="project-section">
                <h3 className="h3">gallery</h3>
                <div style={{ marginTop: 'var(--space-3)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
                {(() => {
                  const group = galleryFiltered.map((g) => ({ src: g.src, alt: g.alt }));
                  return galleryFiltered.map((g, i) => (
                    <div key={g.src + i} style={{ background: 'var(--surface-image-frame)', borderRadius: 'var(--radius-md)', padding: '8px' }}>
                      <LightboxImage src={g.src} alt={g.alt} group={group} index={i} width={1600} height={900} sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 1200px" style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--radius-md) - 8px)', display: 'block' }} />
                    </div>
                  ));
                })()}
                </div>
              </section>
            ) : (project.image && sectionImageSrcs.length === 0) ? (
              <div style={{ marginTop: 'var(--space-8)', background: 'var(--surface-image-frame)', borderRadius: 'var(--radius-md)', padding: '8px' }}>
                <LightboxImage src={project.image.src} alt={project.image.alt} group={[{ src: project.image.src, alt: project.image.alt }]} index={0} width={project.image.width ?? 1600} height={project.image.height ?? 900} style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--radius-md) - 8px)', display: 'block' }} />
              </div>
            ) : null}
            {embedSrc && (
              <section className="project-section">
                <h3 className="h3">login concept video</h3>
                <div style={{ marginTop: 'var(--space-3)' }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-1)' }}>
                  <iframe src={embedSrc} title="YouTube video" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                </div>
                </div>
              </section>
            )}
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
