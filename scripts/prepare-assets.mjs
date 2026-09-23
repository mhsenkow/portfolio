#!/usr/bin/env node
/**
 * Prebuild grid thumbs (440w WebP) + bake auto-gallery file lists.
 * Avoids Cloudflare Images CPU on cold home loads (Error 1102).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const CONTENT_DIR = path.join(ROOT, "src/content");
const THUMBS_ROOT = path.join(PUBLIC, "images/thumbs");
const GALLERY_OUT = path.join(ROOT, "src/content/auto-galleries.json");

const THUMB_WIDTH = 440;
const THUMB_QUALITY = 75;
const MIN_GALLERY_BYTES = 2048;

function cardThumbPath(src) {
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const underImages = normalized.replace(/^\/images\//, "");
  const noExt = underImages.replace(/\.[^.]+$/, "");
  return `/images/thumbs/${noExt}.webp`;
}

function collectCardSrcs() {
  const srcs = new Set();
  for (const name of fs.readdirSync(CONTENT_DIR)) {
    if (!/\.(ts|tsx|js|mjs)$/.test(name)) continue;
    const text = fs.readFileSync(path.join(CONTENT_DIR, name), "utf8");
    // Multiline-safe: image: { src: '...' } whether inline or nested.
    for (const m of text.matchAll(/\bimage:\s*\{[^}]*?\bsrc:\s*'([^']+)'/gs)) {
      if (m[1].startsWith("/images/")) srcs.add(m[1]);
    }
  }
  return [...srcs];
}

async function writeThumb(srcPath) {
  const abs = path.join(PUBLIC, srcPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    console.warn(`  skip missing: ${srcPath}`);
    return false;
  }
  const outRel = cardThumbPath(srcPath);
  const outAbs = path.join(PUBLIC, outRel.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });

  const srcStat = fs.statSync(abs);
  if (fs.existsSync(outAbs) && fs.statSync(outAbs).mtimeMs >= srcStat.mtimeMs) {
    return false; // fresh
  }

  await sharp(abs)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY, effort: 4 })
    .toFile(outAbs);
  return true;
}

function bakeGalleries() {
  const projectsDir = path.join(PUBLIC, "images/projects");
  const manifest = {};
  if (!fs.existsSync(projectsDir)) return manifest;

  for (const entry of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "cards" || entry.name === "thumbs") continue;
    const dir = path.join(projectsDir, entry.name);
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
      .filter((f) => {
        try {
          return fs.statSync(path.join(dir, f)).size >= MIN_GALLERY_BYTES;
        } catch {
          return false;
        }
      })
      .sort()
      .map((f) => `/images/projects/${entry.name}/${f}`);
    if (files.length) manifest[entry.name] = files;
  }
  return manifest;
}

async function main() {
  console.log("prepare-assets: card thumbs");
  const srcs = collectCardSrcs();
  let wrote = 0;
  for (const src of srcs) {
    if (await writeThumb(src)) wrote++;
  }
  console.log(`  ${srcs.length} card sources, ${wrote} thumbs written/updated`);

  console.log("prepare-assets: auto galleries");
  const manifest = bakeGalleries();
  fs.writeFileSync(GALLERY_OUT, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`  ${Object.keys(manifest).length} media dirs → ${path.relative(ROOT, GALLERY_OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
