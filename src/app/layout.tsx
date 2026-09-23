import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "./components/Nav";
import { LightboxProvider } from "./components/Lightbox";
import { IntroModal } from "./components/IntroModal";
import { FooterLinks } from "./components/FooterLinks";
import { FooterStory } from "./components/FooterStory";
import { GotoSearch } from "./components/GotoSearch";
import { PulseBeacon } from "./components/PulseBeacon";
import Script from "next/script";
import { SITE_BLURB, SITE_NAME, SITE_ROLE, SITE_TAGLINE, SITE_URL } from "@/content/site";
import { defaultFontClassName } from "@/theme/optional-fonts";
import "@/styles/globals.css";

/** Geist always available; Inter is the default face (see theme-init). */
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
    default: `${SITE_NAME} — ${SITE_ROLE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: `${SITE_NAME} — ${SITE_ROLE}. ${SITE_BLURB}`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_BLURB,
    url: SITE_URL,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_ROLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_BLURB,
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
    jobTitle: SITE_ROLE,
    description: SITE_BLURB,
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
      "AI-assisted workflows",
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
      className={`${geistSans.variable} ${geistMono.variable} ${defaultFontClassName}`}
    >
      <body>
        {/* Critical: cover before globals.css arrives — CSS latency, not JS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
html{background:#f2f2f0}
html[data-theme=dark],html[data-theme=frost],html[data-theme=loom],html[data-theme=tank]{background:#121212}
#intro-boot{display:block;position:fixed;inset:0;z-index:190;pointer-events:none;background:linear-gradient(165deg,rgba(126,182,217,.12),rgba(242,242,240,.42) 45%,rgba(158,196,220,.1));backdrop-filter:saturate(1.35) blur(22px);-webkit-backdrop-filter:saturate(1.35) blur(22px)}
html[data-theme=dark] #intro-boot,html[data-theme=frost] #intro-boot,html[data-theme=loom] #intro-boot,html[data-theme=tank] #intro-boot{background:linear-gradient(165deg,rgba(58,111,143,.2),rgba(18,18,18,.5) 45%,rgba(42,74,92,.16))}
html[data-intro=skip] #intro-boot,html.intro-done #intro-boot{display:none!important}
.intro-modal{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:16px;background:linear-gradient(165deg,rgba(126,182,217,.14),rgba(242,242,240,.28) 42%,rgba(158,196,220,.1));backdrop-filter:saturate(1.35) blur(22px);-webkit-backdrop-filter:saturate(1.35) blur(22px);pointer-events:auto}
html[data-theme=dark] .intro-modal,html[data-theme=frost] .intro-modal,html[data-theme=loom] .intro-modal,html[data-theme=tank] .intro-modal{background:linear-gradient(165deg,rgba(58,111,143,.18),rgba(18,18,18,.4) 45%,rgba(42,74,92,.14))}
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
          {`(function(){try{var t=localStorage.getItem('theme');var map={hc:'contrast',electric:'frost',forest:'tank'};if(map[t])t=map[t];var ok=['light','dark','contrast','paper','glass','frost','brutal','loom','tank','nes'];if(ok.indexOf(t)<0)t=null;document.documentElement.setAttribute('data-theme',t||'light');if(t)localStorage.setItem('theme',t);var fmap={'work-sans':'inter','space-grotesk':'geist','dm-sans':'inter',manrope:'geist','sf-pro':'geist',segoe:'inter',optimistic:'inter'};var f=localStorage.getItem('font');if(fmap[f])f=fmap[f];var fonts=['libre-baskerville','lora','ibm-plex','inter','geist','jetbrains-mono','fira-code'];if(fonts.indexOf(f)<0)f='inter';document.documentElement.setAttribute('data-font',f);var force=/(?:^|[?&])intro=1(?:&|$)/.test(location.search);var dismissed=false;try{dismissed=sessionStorage.getItem('intro-dismissed')==='1';}catch(e){}if(force){try{sessionStorage.removeItem('intro-dismissed');}catch(e){}dismissed=false;}var show=force||(!dismissed&&location.pathname==='/');document.documentElement.setAttribute('data-intro',show?'open':'skip');document.documentElement.classList.toggle('intro-done',!show);}catch(e){document.documentElement.setAttribute('data-theme','light');document.documentElement.setAttribute('data-font','inter');document.documentElement.setAttribute('data-intro',location.pathname==='/'?'open':'skip');}})();`}
        </Script>
        {/* Curtain first in DOM so first paint is covered */}
        <div id="intro-boot" className="intro-boot" aria-hidden="true" />
        <LightboxProvider>
        <PulseBeacon />
        <div className="app-shell">
          <a href="#content" className="skip-link">
            Skip to content
          </a>
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
              <FooterLinks />
              <div className="footer-end">
                <FooterStory />
                <GotoSearch />
                <p className="footer-copy">© {new Date().getFullYear()}</p>
              </div>
            </div>
          </footer>
        </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
