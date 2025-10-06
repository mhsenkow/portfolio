import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE = 'https://www.mhsenkow.work';
const START = `${BASE}/all-experiences`;
const OUT = path.join(process.cwd(), 'migrations', 'scrape');

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function fetchText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ensureDir(path.dirname(dest));
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  ensureDir(OUT);
  const html = await fetchText(START);
  fs.writeFileSync(path.join(OUT, 'all-experiences.html'), html);

  const sectionSlugs = Array.from(new Set([
    ...Array.from(html.matchAll(/#\/(\S+?)\//g)).map((m) => m[1]),
    ...Array.from(html.matchAll(/href=\"\/(\S+?)\"/g)).map((m) => m[1])
  ]));

  for (const slug of sectionSlugs) {
    const url = `${BASE}/all-experiences#/${slug}/`;
    const safe = slug.replace(/[^a-z0-9-_]/gi, '_');
    const dir = path.join(OUT, safe);
    ensureDir(dir);
    try {
      const page = await fetchText(url);
      fs.writeFileSync(path.join(dir, 'page.html'), page);
      const assets = Array.from(new Set([
        ...Array.from(page.matchAll(/https?:\/\/images\.squarespace-cdn\.com\/[^\"'\s]+/g)).map((m) => m[0]),
        ...Array.from(page.matchAll(/https?:\/\/static[^"]+\.(?:pdf|png|jpg|jpeg|webp|gif|avif)/gi)).map((m) => m[0])
      ]));
      for (const asset of assets) {
        const filename = path.basename(asset.split('?')[0]);
        const dest = path.join(dir, 'assets', filename);
        try { await download(asset, dest); } catch {}
      }
      console.log(`Saved ${slug}: ${assets.length} assets`);
    } catch (e) {
      console.warn(`Failed ${slug}:`, e);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
