import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/data/profile";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Intro } from "@/components/motion/Intro";
import { IntroScript } from "@/components/motion/IntroScript";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s — ${profile.name}`,
  },
  description: `${profile.summary} ${profile.positioning}`,
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
        <SiteHeader />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
