const fs = require('fs');
const path = require('path');
const https = require('https');

const HTML_PATH = path.join(process.cwd(), 'migrations', 'raw', 'other-design-work.html');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'projects');
const OUT_MANIFEST = path.join(process.cwd(), 'migrations', 'raw', 'other-design-work-manifest.json');

const mapToLocalSlug = new Map([
  ['/icon-creation', 'icon-creation'],
  ['/generative-art', 'scripted-axidraw-work'],
  ['/generative-webcode-art', 'generative-web-code-art'],
  ['/graphic-design-work', 'graphic-design-work'],
  ['/3d-printer-experimentation', '3d-printer-experimentation'],
  ['/prototype-sketches', 'prototype-sketches'],
  ['/ai-generated-video-art', 'ai-generated-video-art'],
]);

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function download(url, dest) {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(dest));
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
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
  const entries = Array.from(html.matchAll(/data-full-url="([^"]+)"[\s\S]*?data-asset-url="([^"]+)"/g))
    .map((m) => ({ href: m[1].replace(/\/?$/, ''), asset: m[2] }));

  const manifest = {};
  for (const { href, asset } of entries) {
    const localSlug = mapToLocalSlug.get(href);
    if (!localSlug || !asset) continue;
    const ext = path.extname(asset.split('?')[0]) || '.jpg';
    const destDir = path.join(PUBLIC_DIR, localSlug);
    ensureDir(destDir);
    const destFile = path.join(destDir, `card${ext}`);
    try {
      await download(asset, destFile);
      manifest[localSlug] = `/images/projects/${localSlug}/card${ext}`;
      console.log('Saved', localSlug, '->', destFile);
    } catch (e) {
      console.warn('Failed', localSlug, asset, e.message);
    }
  }
  ensureDir(path.dirname(OUT_MANIFEST));
  fs.writeFileSync(OUT_MANIFEST, JSON.stringify(manifest, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });


