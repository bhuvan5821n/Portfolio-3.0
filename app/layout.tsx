import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteShell } from "@/components/site/site-shell";
import { createPersonJsonLd, routeMetadata, serializeJsonLd } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./critical-frontend.css";

const bricolage = localFont({
  src: "./fonts/bricolage-latin.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/plex-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...routeMetadata.home,
  metadataBase: new URL(siteConfig.origin),
};

export const viewport: Viewport = {
  themeColor: "#101a20",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(createPersonJsonLd()) }}
        />
      </body>
    </html>
  );
}
