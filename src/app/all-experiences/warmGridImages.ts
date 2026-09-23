import type { ProjectCard } from "@/content/project-card";

const warmed = new Set<string>();

const CONCURRENCY = 3;

/** Warm prebuilt static thumbs (no /_next/image / CF Images). */
export function warmGridImages(items: ProjectCard[], limit = 8) {
  if (typeof window === "undefined") return;

  const slice = items
    .map((p) => p.thumbSrc || p.image?.src)
    .filter((src): src is string => Boolean(src))
    .filter((src) => !warmed.has(src))
    .slice(0, limit);

  if (!slice.length) return;

  let i = 0;
  const runNext = () => {
    while (i < slice.length && active < CONCURRENCY) {
      const href = slice[i++];
      warmed.add(href);
      active++;
      const img = new window.Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        active--;
        runNext();
      };
      img.src = href;

      if (warmed.size <= 3) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        link.setAttribute("data-grid-warm", "1");
        document.head.appendChild(link);
      }
    }
  };

  let active = 0;
  runNext();
}
