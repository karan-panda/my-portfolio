import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Monogram } from "@/components/ui/Monogram";
import { FooterYear } from "./FooterYear";

export function SiteFooter() {
  const links = [
    { label: "LinkedIn", href: profile.links.linkedin, icon: <LinkedinIcon size={16} /> },
    { label: "GitHub", href: profile.links.github, icon: <GithubIcon size={16} /> },
    { label: "Email", href: `mailto:${profile.email}`, icon: <Mail size={16} aria-hidden="true" /> },
  ];
  return (
    <footer id="site-footer" className="relative z-10 border-t border-line">
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Monogram className="text-3xl" />
          <p className="text-label text-muted">
            © <FooterYear /> {profile.name} · {profile.location}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-label inline-flex min-h-11 items-center gap-2 text-text-dim transition-colors hover:text-accent"
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.icon}
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="text-label inline-flex min-h-11 items-center gap-2 text-text hover:text-accent">
              Back to top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
