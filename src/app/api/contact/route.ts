import { NextRequest, NextResponse } from 'next/server';

// Basic fallback: log submissions to server console and optionally write to disk.
const CONTACT_TO = process.env.CONTACT_TO || 'mhsenkow@gmail.com';

export async function POST(req: NextRequest) {
  try {
    let name = '';
    let email = '';
    let message = '';
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      ({ name, email, message } = await req.json());
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await req.formData();
      name = String(form.get('name') || '');
      email = String(form.get('email') || '');
      message = String(form.get('message') || '');
    }
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    // If no email service is configured, accept the submission and log it.
    console.log('[contact] submission:', { name, email, message });
    // Optionally: write to a file under /tmp so Vercel supports it at runtime.
    try {
      const line = `\n---\n${new Date().toISOString()}\nFrom: ${name} <${email}>\n\n${message}\n`;
      // @ts-ignore - Node fs available in route handlers
      const fs = await import('fs');
      fs.appendFileSync('/tmp/contact-submissions.txt', line, 'utf8');
    } catch {}

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 });
  }
}


