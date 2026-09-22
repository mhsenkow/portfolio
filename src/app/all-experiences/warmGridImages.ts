import { getImageProps } from "next/image";
import type { Project } from "@/content/projects";

const warmed = new Set<string>();

/** Warm Next.js-optimized grid thumbs so decode happens behind the intro curtain. */
export function warmGridImages(items: Project[], limit = 28) {
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
        width: 440,
        height: 275,
        quality: 75,
      });
      const href = props.src;
      if (!href) continue;

      const img = new window.Image();
      img.decoding = "async";
      img.src = href;

      // Hint the browser for the first wave
      if (warmed.size <= 12) {
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
