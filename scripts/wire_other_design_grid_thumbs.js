const fs = require('fs');
const path = require('path');
const https = require('https');

const HTML_PATH = path.join(process.cwd(), 'migrations', 'raw', 'other-design-work.html');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'projects');

// Squarespace grid hrefs → our local slugs
const hrefToSlug = new Map([
  ['/icon-creation/', 'icon-creation'],
  ['/generative-art/', 'scripted-axidraw-work'],
  ['/generative-webcode-art/', 'generative-web-code-art'],
  ['/graphic-design-work/', 'graphic-design-work'],
  ['/3d-printer-experimentation/', '3d-printer-experimentation'],
  ['/prototype-sketches/', 'prototype-sketches'],
  ['/ai-generated-video-art/', 'ai-generated-video-art'],
]);

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function download(url, dest) {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(dest));
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).toString();
        res.destroy();
        return download(loc, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
  });
}

async function main() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  // Find grid items: anchor href followed by <img ... data-src="URL">
  const matches = Array.from(html.matchAll(/<a\s+href="([^"]+)"[^>]*>[^]*?<img[^>]*data-src="([^"]+)"/g));
  const manifest = {};
  for (const m of matches) {
    const href = m[1];
    const url = m[2];
    const slug = hrefToSlug.get(href);
    if (!slug || !url) continue;
    const ext = path.extname(url.split('?')[0]) || '.jpg';
    const destDir = path.join(PUBLIC_DIR, slug);
    const dest = path.join(destDir, `card${ext}`);
    await download(url, dest).catch(() => {});
    manifest[slug] = `/images/projects/${slug}/card${ext}`;
    console.log('Mapped', slug, '←', href, '->', dest);
  }
  fs.writeFileSync(path.join(path.dirname(HTML_PATH), 'other-design-work-grid-manifest.json'), JSON.stringify(manifest, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });


