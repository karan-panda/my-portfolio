import Link from "next/link";
import { impactMetrics } from "@/data/skills";
import { getProject } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { Counter } from "./Counter";

export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="shell relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHeader
        index="05"
        label="Measured impact"
        id="impact-title"
        lines={["Numbers with", <span key="b" className="text-text-dim">their context attached.</span>]}
        aside={<p>Reported figures from specific projects and journeys — not totals, and not continuously live.</p>}
      />
      <Reveal as="ul" className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" start="top 85%">
        {impactMetrics.map((m, i) => {
          const p = m.projectSlug ? getProject(m.projectSlug) : undefined;
          return (
            <li key={m.label + m.context} data-reveal className={cn("flex flex-col bg-bg p-6 md:p-8", i === 0 && "sm:col-span-2 lg:row-span-2")}>
              <p className="text-label text-muted">{m.label}</p>
              <p
                className={cn(
                  "mt-6 font-display leading-none tracking-[-0.04em] text-text",
                  i === 0 ? "text-[clamp(3.5rem,9vw,8.5rem)]" : "text-[clamp(2.4rem,4vw,3.5rem)]",
                )}
              >
                <Counter metric={m} />
              </p>
              <p className="mt-4 text-sm text-text-dim">{m.context}</p>
              {p && (
                <Link href={`/work/${p.slug}`} prefetch className="text-label link-underline mt-auto self-start pt-8 text-signal">
                  {p.shortName} →
                </Link>
              )}
            </li>
          );
        })}
        <li className="hidden bg-bg p-8 lg:col-span-2 lg:flex lg:items-end" aria-hidden="true">
          <span className="text-label text-muted">
            <span className="text-accent">✦</span> All figures approximate as reported
          </span>
        </li>
      </Reveal>
    </section>
  );
}
