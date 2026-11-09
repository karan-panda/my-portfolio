import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/data/profile";
import { siteDescription, siteUrl } from "@/lib/seo";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Intro } from "@/components/motion/Intro";
import { IntroScript } from "@/components/motion/IntroScript";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s — ${profile.name}`,
  },
  description: siteDescription,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  keywords: [
    "Karan Panda",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    ".NET",
    "FastAPI",
    "Next.js",
    "MCP",
    "RAG",
    "GenAI",
    "Mumbai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — Software Engineer`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Engineer`,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <IntroScript />
      </head>
      <body>
        <div id="top" />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="schematic-grid" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Intro />
        <SmoothScroll />
        <Cursor />
        <SiteHeader />
        <ViewTransition default="page">
          <main id="main" className="relative z-10">
            {children}
          </main>
        </ViewTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
