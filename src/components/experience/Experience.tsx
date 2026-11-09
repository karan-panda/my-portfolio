import Link from "next/link";
import { experience } from "@/data/experience";
import { getProject } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineMotion } from "./TimelineMotion";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="shell relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHeader
        index="04"
        label="Experience"
        id="exp-title"
        lines={["From trainee", <span key="b" className="text-text-dim">to end-to-end ownership.</span>]}
      />
      <div className="mt-16">
        <TimelineMotion>
          <ol className="flex flex-col gap-20">
            {experience.map((job) => (
              <li key={job.title}>
                <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-10">
                  <div data-reveal className="relative pl-8 md:pl-0">
                    <p className="text-label text-accent">
                      {job.start} — {job.end}
                    </p>
                    <p className="text-label mt-2 text-muted">{job.location}</p>
                  </div>
                  <div className="relative pl-8 md:col-span-3 md:pl-12">
                    <span aria-hidden="true" className="absolute top-1 left-0 grid size-[15px] place-items-center rounded-full border border-accent bg-bg md:-left-[8px]">
                      <span className="size-[5px] rounded-full bg-accent" />
                    </span>
                    <h3 data-reveal className="text-title">
                      {job.title}
                    </h3>
                    <p data-reveal className="text-label mt-2 text-text-dim">
                      {job.company}
                    </p>
                    <p data-reveal className="text-lead mt-6 max-w-[60ch] text-text-dim">
                      {job.summary}
                    </p>
                    <ul className="mt-6 flex max-w-[70ch] flex-col gap-3">
                      {job.points.map((pt) => (
                        <li data-reveal key={pt} className="flex gap-3 text-text-dim">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div data-reveal className="mt-8 flex flex-wrap items-center gap-2">
                      <span className="text-label mr-2 text-muted">Projects</span>
                      {job.projects.map((slug) => {
                        const p = getProject(slug);
                        if (!p) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/work/${slug}`} prefetch
                            className="inline-flex min-h-9 items-center rounded-full border border-line px-3 font-mono text-[0.72rem] text-text-dim transition-colors hover:border-accent hover:text-accent"
                          >
                            {p.shortName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </TimelineMotion>
      </div>
    </section>
  );
}
