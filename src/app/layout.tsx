import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans, Inter, Work_Sans, Space_Grotesk, DM_Sans } from "next/font/google";
import { Nav } from "./components/Nav";
import { LightboxProvider } from "./components/Lightbox";
import Script from "next/script";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlex = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mhsenkow — portfolio",
  description: "lower case portfolio by mhsenkow",
  metadataBase: new URL("https://www.mhsenkow.work"),
  openGraph: {
    type: "website",
    title: "mhsenkow — portfolio",
    description: "lower case portfolio by mhsenkow",
    url: "https://www.mhsenkow.work",
  },
  twitter: {
    card: "summary",
    title: "mhsenkow — portfolio",
    description: "lower case portfolio by mhsenkow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlex.variable} ${inter.variable} ${workSans.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t||p);var f=localStorage.getItem('font')||'geist';document.documentElement.setAttribute('data-font',f);}catch(e){}})();`}
        </Script>
        <LightboxProvider>
        <div className="app-shell">
          <a href="#content" className="sr-only">Skip to content</a>
          <header className="site-header">
            <div className="container">
              <nav aria-label="Primary"><Nav /></nav>
            </div>
          </header>
          <main className="app-main">{children}</main>
          {/* overlay root for panels (left/right drawers, modals) */}
          <div id="overlays" className="overlay-root" />
          <footer className="site-footer">
            <div className="container footer-inner">
              <p className="footer-copy">© {new Date().getFullYear()} mhsenkow</p>
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
            </div>
          </footer>
        </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
