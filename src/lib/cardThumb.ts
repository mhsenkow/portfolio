/** Map a public image path to its prebuilt 440w WebP thumb. */
export function cardThumbPath(src: string): string {
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const underImages = normalized.replace(/^\/images\//, "");
  const noExt = underImages.replace(/\.[^.]+$/, "");
  return `/images/thumbs/${noExt}.webp`;
}
