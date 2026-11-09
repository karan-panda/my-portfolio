import { ArrowDown, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroMotion } from "./HeroMotion";
import { HeroSchematic } from "./HeroSchematic";
import { LocalTime } from "./LocalTime";
import { FocusTicker } from "./FocusTicker";

export function Hero() {
  const [first, second] = profile.headline;
  return (
    <HeroMotion className="relative flex min-h-[100svh] flex-col overflow-x-clip pt-[calc(var(--nav-h)+1.25rem)]">
      {/* Meta strip */}
      <div className="shell">
        <div
          data-reveal
          className="text-label grid grid-cols-2 gap-y-2 border-b border-line pb-4 text-muted md:grid-cols-4"
        >
          <span>
            <span className="text-accent">(00)</span> Index
          </span>
          <span className="hidden md:block">19.0760° N · 72.8777° E</span>
          <span className="hidden md:block">{profile.employer}</span>
          <span className="text-right">
            <LocalTime />
          </span>
        </div>
      </div>

      <div className="shell relative grid flex-1 grid-cols-12 items-end gap-x-6 gap-y-10 pt-10 pb-8 md:pt-14">
        {/* Schematic */}
        <div
          data-parallax="schematic"
          className="pointer-events-none absolute top-[4%] right-[-30%] aspect-square w-[95vw] opacity-60 sm:right-[-14%] sm:w-[70vw] md:top-[2%] md:right-[-4%] md:w-[min(52vw,720px)] md:opacity-100"
        >
          <HeroSchematic />
        </div>

        {/* Headline */}
        <div data-parallax="headline" className="relative col-span-12 lg:col-span-11">
          <p className="mb-6 flex items-center gap-3">
            <span data-reveal className="text-label text-text-dim">
              {profile.role} — {profile.location}
            </span>
          </p>
          <h1 id="hero-title" className="text-hero">
            <span className="mask-line">
              <span data-reveal>Building systems</span>
            </span>
            <span className="mask-line">
              <span data-reveal>
                that <em className="text-accent not-italic">scale.</em>
              </span>
            </span>
            <span className="sr-only"> </span>
            <span className="mt-3 block text-display text-text-dim md:mt-5 md:pl-[24%]">
              <span className="mask-line">
                <span data-reveal>Engineering experiences</span>
              </span>
              <span className="mask-line">
                <span data-reveal>that matter.</span>
              </span>
            </span>
          </h1>
          <p className="sr-only">
            {first} {second}
          </p>
        </div>

        {/* Summary + CTAs */}
        <div className="relative col-span-12 md:col-span-7 lg:col-span-6">
          <p data-reveal className="text-lead max-w-[38ch] text-text-dim">
            {profile.summary}
          </p>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href="#work" icon={<ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" />}>
                Explore my work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href={profile.links.resume}
                variant="ghost"
                download="Karan-Panda-Resume.pdf"
                icon={<Download size={16} strokeWidth={1.75} aria-hidden="true" />}
              >
                Download resume
              </Button>
            </Magnetic>
            <Button href="#contact" variant="text" className="ml-1">
              Let&apos;s connect
            </Button>
          </div>
        </div>

        {/* Status panel */}
        <aside
          data-reveal
          aria-label="Current status"
          className="relative col-span-12 border border-line bg-bg-raised/70 backdrop-blur-sm md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
        >
          <p className="text-label flex items-center gap-3 border-b border-line px-5 py-4 text-text">
            <span className="pulse-dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <dl className="text-label grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 px-5 py-4">
            <dt className="text-muted">Role</dt>
            <dd className="text-right text-text-dim">{profile.role}</dd>
            <dt className="text-muted">At</dt>
            <dd className="text-right text-text-dim">{profile.employer}</dd>
            <dt className="text-muted">Base</dt>
            <dd className="text-right text-text-dim">{profile.location}</dd>
            <dt className="text-muted">Focus</dt>
            <dd className="text-right text-accent">
              <FocusTicker items={profile.focus} />
            </dd>
          </dl>
        </aside>
      </div>

      {/* Bottom rail: scroll cue + stack marquee */}
      <div data-reveal className="relative border-y border-line">
        <div className="flex items-center">
          <a
            href="#about"
            className="text-label flex shrink-0 items-center gap-3 border-r border-line px-[var(--gutter)] py-4 text-text-dim hover:text-accent"
          >
            <span className="scroll-cue relative block h-6 w-px overflow-hidden bg-line-strong" aria-hidden="true" />
            Scroll
          </a>
          <div className="relative overflow-hidden" aria-hidden="true">
            <div className="marquee-track text-label flex w-max gap-10 py-4 pl-10 text-muted">
              {[0, 1].map((k) => (
                <span key={k} className="flex gap-10">
                  {["Backend systems", "Full-stack products", "Enterprise modernization", "Cloud infrastructure", "Production GenAI", "Performance engineering", "API architecture"].map((t) => (
                    <span key={t} className="flex items-center gap-10">
                      {t}
                      <span className="text-accent">✦</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HeroMotion>
  );
}
