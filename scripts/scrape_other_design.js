const fs = require('fs');
const path = require('path');
const https = require('https');

const PAGE_URL = 'https://www.mhsenkow.work/other-design-work';
const OUT_DIR = path.join(process.cwd(), 'migrations', 'scrape', 'other-design-work');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'projects');

const SLUGS = [
  'icon-creation',
  'scripted-axidraw-work',
  'generative-web-code-art',
  'graphic-design-work',
  '3d-printer-experimentation',
  'prototype-sketches',
  'ai-generated-video-art',
];

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(dest));
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', (err) => { fs.unlink(dest, () => reject(err)); });
  });
}

async function main() {
  ensureDir(OUT_DIR);
  const html = await fetchText(PAGE_URL);
  fs.writeFileSync(path.join(OUT_DIR, 'page.html'), html);

  const urls = Array.from(new Set([
    ...Array.from(html.matchAll(/https?:\/\/images\.squarespace-cdn\.com\/[^"'\s)]+/g)).map((m) => m[0]),
  ]));

  const assetsDir = path.join(OUT_DIR, 'assets');
  ensureDir(assetsDir);
  const assetPaths = [];
  for (let i = 0; i < urls.length; i++) {
    const raw = urls[i];
    const base = raw.split('?')[0];
    const filenameBase = path.basename(base);
    const filename = `${String(i).padStart(2, '0')}-${filenameBase}`;
    const dest = path.join(assetsDir, filename);
    try { await download(raw, dest); assetPaths.push(dest); } catch {}
  }

  // Map first N images to SLUGS
  const manifest = {};
  for (let i = 0; i < SLUGS.length && i < assetPaths.length; i++) {
    const slug = SLUGS[i];
    const srcFile = assetPaths[i];
    const ext = path.extname(srcFile).toLowerCase() || '.jpg';
    const destDir = path.join(PUBLIC_DIR, slug);
    ensureDir(destDir);
    const destFile = path.join(destDir, `card${ext}`);
    fs.copyFileSync(srcFile, destFile);
    manifest[slug] = `/images/projects/${slug}/card${ext}`;
  }

  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify({
    page: PAGE_URL,
    totalFound: urls.length,
    mapped: manifest,
  }, null, 2));

  console.log('Saved images for slugs:', Object.keys(manifest));
}

main().catch((e) => { console.error(e); process.exit(1); });


