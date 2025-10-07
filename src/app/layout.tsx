import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "./components/Nav";
import Script from "next/script";
import "@/styles/globals.css";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.className} ${geistMono.variable}`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t||p);}catch(e){}})();`}
        </Script>
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
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p>© {new Date().getFullYear()} mhsenkow</p>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <a href="mailto:mhsenkow@gmail.com" aria-label="Email">Email</a>
                <a href="https://github.com/mhsenkow" target="_blank" rel="noreferrer noopener" aria-label="GitHub">GitHub</a>
                <a href="https://www.linkedin.com/in/mhsenkow/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
