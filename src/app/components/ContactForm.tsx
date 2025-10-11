"use client";
import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'opened-mail'|'error'>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const message = String(data.get('message') || '');
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data });
      const json: unknown = await res.json().catch(() => ({}));
      const isOk = typeof json === 'object' && json !== null && 'ok' in (json as { ok?: unknown }) && (json as { ok?: unknown }).ok === true;
      if (res.ok && isOk) {
        setStatus('sent');
        form.reset();
        return;
      }
      // Fallback: open user's email client via mailto
      const subject = encodeURIComponent(`New contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const href = `mailto:mhsenkow@gmail.com?subject=${subject}&body=${body}`;
      const a = document.createElement('a');
      a.href = href;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setStatus('opened-mail');
    } catch {
      setError('Something went wrong. Please email me directly.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} action="/api/contact" method="post" style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <div style={{ display: 'grid', gap: 6 }}>
        <label htmlFor="name" className="type-secondary">Name</label>
        <input id="name" name="name" required placeholder="Your name" style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: 'var(--border)', background: 'var(--surface-card)' }} />
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        <label htmlFor="email" className="type-secondary">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: 'var(--border)', background: 'var(--surface-card)' }} />
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        <label htmlFor="message" className="type-secondary">Message</label>
        <textarea id="message" name="message" required rows={6} placeholder="How can I help?" style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: 'var(--border)', background: 'var(--surface-card)' }} />
      </div>
      <button type="submit" disabled={status==='sending'} style={{ width: 'fit-content', padding: '10px 14px', borderRadius: '999px', border: 'var(--border-strong)', background: 'var(--surface-card)' }}>{status==='sending' ? 'Sending…' : 'Send'}</button>
      {status==='sent' && (<p className="type-secondary" role="status">Thanks — got it!</p>)}
      {status==='opened-mail' && (<p className="type-secondary" role="status">Opened your email app with the message prefilled.</p>)}
      {status==='error' && (<p className="type-secondary" role="alert" style={{ color: 'var(--color-accent)' }}>{error}</p>)}
    </form>
  );
}


