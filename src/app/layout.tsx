import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Nav } from "./components/Nav";
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
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.variable}`}>
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
            <div className="container">
              <p>© {new Date().getFullYear()} mhsenkow</p>
              <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-4)' }}>
                <a href="https://www.linkedin.com/in/mhsenkow/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                <a href="https://github.com/mhsenkow" target="_blank" rel="noreferrer noopener">GitHub</a>
                <a href="https://thenounproject.com/creator/mhsenkow/" target="_blank" rel="noreferrer noopener">Noun Project</a>
                <a href="mailto:mhsenkow@gmail.com">Email</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
