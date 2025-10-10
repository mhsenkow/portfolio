"use client";

import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/content/projects';
import { LinkToken } from '@/app/components/LinkToken';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main id="content">
      <section className="container" style={{ padding: "var(--space-16) 0" }}>
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ fontSize: "var(--size-7)", lineHeight: 1.1 }}>mhsenkow</motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }} style={{ marginTop: "var(--space-4)", color: "var(--color-muted)", maxWidth: 820, display: 'grid', gap: 'var(--space-3)' }}>
          <p>Hey hey! I’m a Staff Product Designer — passionate about crafting cutting‑edge complex tooling, AI workflows, and digital craft being used creatively.</p>
          <p>Focus Time moments I’ve helped create are on millions of PCs. The Daiquery Notebook work enabled almost everyone at Meta to make decisions better with AI‑enabled workflows. I’ve helped build such projects as Cognos Analytics powered by Watson, early steps of IBM’s Carbon Design System, and the early days of Viva Insights.</p>
          <p>You’re looking at a sampling of my work across tech. There’s a <Link href="/list-view">full list</Link> at the top and a more exploratory <Link href="/all-experiences">grid view</Link> as well.</p>
          <p>Each of these cards leads to a main project from one of my eras of work. I’m currently doing a revamp in code and exploring what I can make — check it out.</p>
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <LinkToken href="https://webgl-portfolio-jbxw.vercel.app/" label="WebGL portfolio" />
            <LinkToken href="https://portfolio-site-tau-ten-35.vercel.app/" label="Particle narrative portfolio" />
            <LinkToken href="https://mhsenkow.squarespace.com/" label="Old Squarespace portfolio" />
            <LinkToken href="https://www.figma.com/proto/SS9PFTPBKoUEmOhn1f5GJt/presentation?node-id=376-3&t=97fqkQd8qUt8cyQY-1&starting-point-node-id=376%3A3" label="AI work deck" />
          </div>
        </motion.div>
      </section>

      <section className="container" style={{ paddingBottom: 'var(--space-16)' }}>
        <h2 style={{ fontSize: 'var(--size-4)' }}>highlights</h2>
        <motion.div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-6)',
          marginTop: 'var(--space-6)'
        }} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 }}}}>
          {projects.filter((p) => p.featured === true).slice(0, 4).map((p) => (
            <motion.div key={p.slug} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <Link href={`/projects/${p.slug}`} className="card">
              {p.image && (
                <div className="card-image">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </div>
              )}
              <h3 style={{ margin: 0, fontSize: 'var(--size-3)' }}>{p.title}</h3>
              <p style={{ marginTop: 'var(--space-2)', color: 'var(--color-muted)' }}>{p.description}</p>
            </Link>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Link href="/projects">view key projects →</Link>
        </div>
      </section>
    </main>
  );
}
