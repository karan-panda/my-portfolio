import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskLines } from "@/components/ui/MaskText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-x-clip py-[clamp(6rem,14vw,11rem)]">
      <div aria-hidden="true" className="contact-glow pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" />
      <Reveal className="shell relative">
        <div className="border-t border-line pt-6" data-reveal>
          <SectionLabel index="07">Contact</SectionLabel>
        </div>
        <h2 id="contact-title" className="text-hero mt-12 max-w-[14ch]">
          <MaskLines
            lines={[
              "Have a complex",
              "problem?",
              <span key="c" className="text-text-dim">Let&apos;s engineer</span>,
              <span key="d" className="text-accent">
                a better solution.
              </span>,
            ]}
          />
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <p data-reveal className="text-label text-muted">
              Email
            </p>
            <a
              data-reveal
              href={`mailto:${profile.email}`}
              className="link-underline mt-3 inline-block font-display text-[clamp(1.2rem,3.4vw,3rem)] tracking-[-0.03em] [overflow-wrap:anywhere] hover:text-accent"
            >
              {profile.email}
            </a>
            <div data-reveal className="mt-6 flex flex-wrap gap-3">
              <CopyEmail email={profile.email} />
              <Magnetic>
                <Button href={`mailto:${profile.email}`} icon={<Mail size={16} strokeWidth={1.75} aria-hidden="true" />}>
                  Write to me
                </Button>
              </Magnetic>
            </div>
          </div>

          <ul data-reveal className="col-span-12 flex flex-col border-t border-line lg:col-span-4">
            {[
              { label: "LinkedIn", sub: "linkedin.com/in/karanpanda", href: profile.links.linkedin, icon: <LinkedinIcon size={18} /> },
              { label: "GitHub", sub: "github.com/karan-panda", href: profile.links.github, icon: <GithubIcon size={18} /> },
            ].map((l) => (
              <li key={l.label} className="border-b border-line">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span className="flex items-center gap-4">
                    {l.icon}
                    <span className="flex flex-col">
                      <span className="font-display text-xl">{l.label}</span>
                      <span className="text-[0.75rem] text-muted">{l.sub}</span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xl transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
            <li className="pt-6">
              <Button
                href={profile.links.resume}
                variant="ghost"
                download="Karan-Panda-Resume.pdf"
                icon={<Download size={16} strokeWidth={1.75} aria-hidden="true" />}
              >
                Download resume
              </Button>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
