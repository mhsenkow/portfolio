import { getImageProps } from "next/image";
import type { ProjectCard } from "@/content/project-card";

const warmed = new Set<string>();

/** Must match next.config imageSizes — unknown w → 400 from CF Images. */
const ALLOWED_WIDTHS = [64, 96, 128, 256, 384, 440] as const;

const THUMB = {
  width: 440,
  height: 275,
  quality: 75 as const,
  sizes: "220px",
};

function snapWidth(requested: number, maxW = 440): number {
  const cap = Math.min(requested, maxW);
  let best: number = ALLOWED_WIDTHS[0];
  for (const w of ALLOWED_WIDTHS) {
    if (w <= cap) best = w;
    else break;
  }
  return best;
}

function thumbUrl(src: string, width = THUMB.width) {
  const w = snapWidth(width);
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${THUMB.quality}`;
}

/** Warm Next.js-optimized grid thumbs so decode happens behind the intro curtain. */
export function warmGridImages(items: ProjectCard[], limit = 8) {
  if (typeof window === "undefined") return;

  const slice = items.filter((p) => p.image).slice(0, limit);
  for (const project of slice) {
    const src = project.image!.src;
    if (warmed.has(src)) continue;
    warmed.add(src);

    try {
      let href = thumbUrl(src);
      try {
        const { props } = getImageProps({
          src,
          alt: "",
          width: THUMB.width,
          height: THUMB.height,
          quality: THUMB.quality,
          sizes: THUMB.sizes,
          loader: ({ src: s, width, quality }) => {
            const w = snapWidth(width);
            return `/_next/image?url=${encodeURIComponent(s)}&w=${w}&q=${quality ?? 75}`;
          },
        });
        if (props.src) href = props.src;
      } catch {
        /* use thumbUrl */
      }

      const img = new window.Image();
      img.decoding = "async";
      img.src = href;

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
