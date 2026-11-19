import type { Profile } from "@/types/content";

/**
 * Sources: Career_Master_Profile_Karan_Panda.md §1, §7 and the approved
 * resume (public/resume/karan-panda-resume.pdf). Contact links are identical
 * across every resume variant.
 *
 * To change contact links, edit `email` and `links` below — every component
 * (nav, hero, contact, footer, JSON-LD) reads from here.
 */
export const profile: Profile = {
  name: "Karan Panda",
  shortName: "Karan",
  monogram: "KP",
  role: "Software Engineer",
  exactTitle: "Associate Software Engineer",
  employer: "ICICI Lombard",
  location: "Mumbai, India",
  availability: "Open to relevant engineering opportunities",
  headline: ["Building systems that scale.", "Engineering experiences that matter."],
  summary:
    "Software Engineer focused on backend systems, full-stack engineering, cloud infrastructure and production AI.",
  positioning:
    "I build production-grade systems, simplify complex engineering problems, modernize enterprise applications and bring AI capabilities into real products.",
  focus: [".NET / C#", "Python / FastAPI", "Next.js", "TypeScript", "MCP + RAG", "AWS ECS", "GCP"],
  email: "karanpanda1206@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/karanpanda",
    github: "https://github.com/karan-panda",
    resume: "/resume/karan-panda-resume.pdf",
  },
  // Canonical URL, sitemap and Open Graph URLs. NEXT_PUBLIC_SITE_URL overrides it (e.g. for previews).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://karan-panda.is-a.dev",
};

export const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;
