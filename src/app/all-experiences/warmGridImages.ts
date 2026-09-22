import { getImageProps } from "next/image";
import type { ProjectCard } from "@/content/project-card";

const warmed = new Set<string>();

/** Match GridTileImage — 220px CSS / 440w for 2x, not 750–1200. */
const THUMB = {
  width: 440,
  height: 275,
  quality: 75 as const,
  sizes: "220px",
};

/** Warm Next.js-optimized grid thumbs so decode happens behind the intro curtain. */
export function warmGridImages(items: ProjectCard[], limit = 8) {
  if (typeof window === "undefined") return;

  const slice = items.filter((p) => p.image).slice(0, limit);
  for (const project of slice) {
    const src = project.image!.src;
    if (warmed.has(src)) continue;
    warmed.add(src);

    try {
      const { props } = getImageProps({
        src,
        alt: "",
        width: THUMB.width,
        height: THUMB.height,
        quality: THUMB.quality,
        sizes: THUMB.sizes,
      });
      const href = props.src;
      if (!href) continue;

      const img = new window.Image();
      img.decoding = "async";
      img.src = href;

      // Hint the browser for the first wave only
      if (warmed.size <= 3) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        link.setAttribute("data-grid-warm", "1");
        document.head.appendChild(link);
      }
    } catch {
      /* ignore bad assets */
    }
  }
}
