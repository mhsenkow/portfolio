import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "./components/Nav";
import { LightboxProvider } from "./components/Lightbox";
import { IntroModal } from "./components/IntroModal";
import Script from "next/script";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/content/site";
import "@/styles/globals.css";

/** Default stack only — optional typefaces load on demand via ThemeToggle. */
const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Staff Product Designer`,
    template: `%s — ${SITE_NAME}`,
  },
  description: `${SITE_NAME} — Staff Product Designer. ${SITE_TAGLINE}. Case studies from Microsoft, Meta, IBM, and independent work.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Staff Product Designer`,
    description: SITE_TAGLINE,
    url: SITE_URL,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Michael Senkow — Staff Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Staff Product Designer`,
    description: SITE_TAGLINE,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Staff Product Designer",
    description: SITE_TAGLINE,
    image: `${SITE_URL}/images/profile/michael.jpg`,
    sameAs: [
      "https://github.com/mhsenkow",
      "https://www.linkedin.com/in/mhsenkow/",
      "https://codepen.io/mhsenkow",
      "https://thenounproject.com/creator/mhsenkow/",
    ],
    knowsAbout: [
      "Product design",
      "Design systems",
      "Data visualization",
      "Enterprise tooling",
      "Local-first software",
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} — Portfolio`,
  url: SITE_URL,
  description: SITE_TAGLINE,
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        {/* Critical: cover before globals.css arrives — CSS latency, not JS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
html{background:#f2f2f0}
html[data-theme=dark],html[data-theme=frost],html[data-theme=loom],html[data-theme=tank]{background:#121212}
#intro-boot{display:block;position:fixed;inset:0;z-index:190;pointer-events:none;background:rgba(242,242,240,.5);backdrop-filter:saturate(1.2) blur(18px);-webkit-backdrop-filter:saturate(1.2) blur(18px)}
html[data-theme=dark] #intro-boot,html[data-theme=frost] #intro-boot,html[data-theme=loom] #intro-boot,html[data-theme=tank] #intro-boot{background:rgba(18,18,18,.55)}
html[data-intro=skip] #intro-boot,html.intro-done #intro-boot{display:none!important}
.intro-modal{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:16px;background:rgba(242,242,240,.42);backdrop-filter:saturate(1.2) blur(18px);-webkit-backdrop-filter:saturate(1.2) blur(18px);pointer-events:auto}
html[data-theme=dark] .intro-modal,html[data-theme=frost] .intro-modal,html[data-theme=loom] .intro-modal,html[data-theme=tank] .intro-modal{background:rgba(18,18,18,.45)}
`.replace(/\s+/g, " ").trim(),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var map={hc:'contrast',electric:'frost',forest:'tank'};if(map[t])t=map[t];var ok=['light','dark','contrast','paper','glass','frost','brutal','loom','tank','nes'];if(ok.indexOf(t)<0)t=null;var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t||p);if(t)localStorage.setItem('theme',t);var f=localStorage.getItem('font')||'geist';document.documentElement.setAttribute('data-font',f);document.documentElement.setAttribute('data-intro','open');document.documentElement.classList.remove('intro-done');try{sessionStorage.removeItem('intro-dismissed');}catch(e){}}catch(e){document.documentElement.setAttribute('data-intro','open');}})();`}
        </Script>
        {/* Curtain first in DOM so first paint is covered */}
        <div id="intro-boot" className="intro-boot" aria-hidden="true" />
        <LightboxProvider>
        <div className="app-shell">
          <a href="#content" className="sr-only">Skip to content</a>
          <header className="site-header">
            <nav aria-label="Primary" className="site-header__nav">
              <Nav />
            </nav>
          </header>
          <div className="app-main">{children}</div>
          {/* overlay root for panels (left/right drawers, modals) */}
          <div id="overlays" className="overlay-root" />
          <IntroModal />
          <footer className="site-footer">
            <div className="container footer-inner">
              <ul className="icon-links" role="list">
                <li>
                  <a className="icon-btn" href="mailto:mhsenkow@gmail.com" aria-label="Email">
                    <span className="tooltip" role="tooltip">Email</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18V8.236l7.386 6.398a1 1 0 0 0 1.228 0L20 8.236V18H4Z"/></svg>
                  </a>
                </li>
                <li>
                  <a className="icon-btn" href="https://github.com/mhsenkow" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
                    <span className="tooltip" role="tooltip">GitHub</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.162 19.492c.5.092.684-.217.684-.483 0-.237-.009-.866-.013-1.7-2.782.604-3.37-1.341-3.37-1.341-.454-1.154-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.945 0-1.092.39-1.986 1.03-2.685-.104-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.547 1.378.204 2.397.1 2.65.642.699 1.029 1.593 1.029 2.685 0 3.844-2.339 4.688-4.566 4.936.359.31.679.92.679 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.58.69.481A10.002 10.002 0 0 0 12 2Z"/></svg>
                  </a>
                </li>
                <li>
                  <a className="icon-btn" href="https://www.linkedin.com/in/mhsenkow/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                    <span className="tooltip" role="tooltip">LinkedIn</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20.451 20.451h-3.555v-5.569c0-1.328-.027-3.037-1.851-3.037-1.853 0-2.136 1.447-2.136 2.94v5.666H9.355V9h3.413v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.604 0 4.27 2.372 4.27 5.456v6.283ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.116 20.451H3.558V9h3.558v11.451Z"/></svg>
                  </a>
                </li>
                <li>
                  <a className="icon-btn" href="https://thenounproject.com/creator/mhsenkow/" target="_blank" rel="noreferrer noopener" aria-label="Noun Project">
                    <span className="tooltip" role="tooltip">Noun Project</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <g fill="currentColor">
                        <rect x="3" y="5" width="4" height="4" rx="1"/>
                        <rect x="10" y="5" width="4" height="4" rx="1"/>
                        <rect x="17" y="5" width="4" height="4" rx="1"/>
                        <rect x="3" y="12" width="4" height="4" rx="1"/>
                        <rect x="10" y="12" width="4" height="4" rx="1"/>
                        <rect x="17" y="12" width="4" height="4" rx="1"/>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
              <p className="footer-copy">© {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
