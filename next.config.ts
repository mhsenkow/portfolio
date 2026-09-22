import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP first — AVIF cold-encodes slowly on CF Images for card grids
    formats: ["image/webp"],
    contentDispositionType: "inline",
    // Grid thumbs are ~220px CSS; include 440 for 2x so browsers don't jump to 640–1200.
    // Keep a modest deviceSizes cap — 3840/1200 hung CF Images for lazy tiles.
    deviceSizes: [640, 828, 1080],
    imageSizes: [64, 96, 128, 256, 384, 440],
    // Cloudflare / OpenNext only accept configured qualities (default 75). q=70 → 400.
    qualities: [75],
    remotePatterns: [
      { protocol: "https", hostname: "mhsenkow.work" },
      { protocol: "https", hostname: "www.mhsenkow.work" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/i2systems-lighting-infra",
        destination: "/projects/judge",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
