import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const siteUrl = profile.siteUrl.replace(/\/$/, "");

export const siteDescription =
  "Karan Panda — Software Engineer at ICICI Lombard building backend systems, full-stack products, cloud infrastructure and production GenAI. Case studies on KYP (MCP + RAG), RYD Raksha, Motor Renewal modernization and more.";

/** schema.org Person + WebSite graph for the home page. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        url: siteUrl,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
        worksFor: { "@type": "Organization", name: "ICICI Lombard General Insurance" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Thakur College of Engineering and Technology" },
        sameAs: [profile.links.linkedin, profile.links.github],
        knowsAbout: [
          "Backend engineering",
          "Full-stack development",
          ".NET",
          "Python",
          "FastAPI",
          "Next.js",
          "TypeScript",
          "Model Context Protocol",
          "Retrieval-augmented generation",
          "AWS ECS",
          "Google Cloud",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.name} — Software Engineer`,
        author: { "@id": `${siteUrl}/#person` },
        hasPart: projects.map((p) => ({
          "@type": "CreativeWork",
          name: p.name,
          url: `${siteUrl}/work/${p.slug}`,
          about: p.category,
        })),
      },
    ],
  };
}

/** Safely serialise JSON-LD for a <script> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
