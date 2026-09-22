import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Cap widths — 3840 fallbacks were hanging lazy grid tiles on Cloudflare Images
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 256, 384],
    // Cloudflare / OpenNext only accept configured qualities (default 75). q=70 → 400.
    qualities: [75],
    remotePatterns: [
      { protocol: "https", hostname: "mhsenkow.work" },
      { protocol: "https", hostname: "www.mhsenkow.work" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
