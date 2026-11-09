import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagram";
import { Counter } from "@/components/metrics/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { MaskLines } from "@/components/ui/MaskText";
import { Tag } from "@/components/ui/Tag";
import { Bullets, CaseSection } from "./CaseSection";
import { CaseToc } from "./CaseToc";

type Props = { project: Project; next: Project; total: number };

/**
 * Reusable case-study layout. Sections render only when the project data
 * contains them — nothing is padded out to fill the template.
 */
export function CaseStudy({ project, next, total }: Props) {
  const cs = project.caseStudy;

  const sections = [
    { id: "overview", label: "Overview", body: <p>{cs.overview}</p> },
    { id: "context", label: "Context", body: <p>{cs.context}</p> },
    { id: "problem", label: "Problem", body: <p>{cs.problem}</p> },
    cs.constraints && { id: "constraints", label: "Constraints", body: <Bullets items={cs.constraints} /> },
    { id: "contribution", label: "My contribution", body: <Bullets items={cs.contribution} /> },
    {
      id: "architecture",
      label: "Architecture",
      body: (
        <>
          <p className="text-text">{cs.architecture.heading}</p>
          {cs.architecture.body && <p>{cs.architecture.body}</p>}
          {cs.architecture.points && <Bullets items={cs.architecture.points} />}
        </>
      ),
    },
    cs.decisions && {
      id: "decisions",
      label: "Decisions & trade-offs",
      body: (
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {cs.decisions.map((d) => (
            <div key={d.choice} className="bg-bg p-5">
              <dt className="font-display text-lg text-text">{d.choice}</dt>
              <dd className="mt-2 text-[0.95rem]">{d.why}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    cs.challenges && { id: "challenges", label: "Challenges", body: <Bullets items={cs.challenges} /> },
    {
      id: "impact",
      label: "Impact",
      body: (
        <>
          {cs.impact.metrics.length > 0 && (
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {cs.impact.metrics.map((m) => (
                <li key={m.label} className="bg-bg p-5">
                  <p className="font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-none tracking-[-0.03em] text-text">
                    <Counter metric={m} />
                  </p>
                  <p className="text-label mt-3 text-text-dim">{m.label}</p>
                  <p className="mt-1 text-sm text-muted">{m.context}</p>
                </li>
              ))}
            </ul>
          )}
          {cs.impact.notes && <Bullets items={cs.impact.notes} />}
        </>
      ),
    },
    cs.learnings && { id: "learnings", label: "What I learned", body: <Bullets items={cs.learnings} /> },
  ].filter(Boolean) as { id: string; label: string; body: React.ReactNode }[];

  return (
    <article className="pt-[calc(var(--nav-h)+2rem)]">
      {/* Header */}
      <header className="shell">
        <Reveal className="border-b border-line pb-6">
          <div data-reveal className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/#work" className="text-label group inline-flex min-h-11 items-center gap-2 text-text-dim hover:text-accent">
              <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
            <p className="text-label text-muted">
              Case study <span className="text-accent">{project.index}</span> / {String(total).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10 pt-14 pb-12">
          <div className="col-span-12 lg:col-span-9">
            <p data-reveal className="text-label text-signal">
              {project.category}
            </p>
            <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
              <h1 className="text-display mt-6">
                <MaskLines lines={[project.name]} />
              </h1>
            </ViewTransition>
            <p className="text-lead mt-8 max-w-[60ch] text-text-dim">
              {project.summary}
            </p>
          </div>

          <dl data-reveal className="text-label col-span-12 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-3 lg:col-span-12">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-2 leading-relaxed text-text-dim">{project.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Company</dt>
              <dd className="mt-2 text-text-dim">ICICI Lombard</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-muted">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2 normal-case tracking-normal">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>
      </header>

      {/* Diagram */}
      <div className="shell">
        <ProjectDiagram kind={project.diagram} caption="Simplified, public-level view of the documented architecture" />
      </div>

      {/* Body */}
      <div className="shell grid grid-cols-12 gap-x-6 pt-24">
        <aside className="col-span-3 hidden lg:block">
          <CaseToc items={sections.map(({ id, label }) => ({ id, label }))} />
        </aside>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <CaseSection key={s.id} id={s.id} index={i + 1} title={s.label}>
              {s.body}
            </CaseSection>
          ))}
          <p className="text-label border-t border-line pt-6 pb-4 text-muted">
            Described at a public level — no confidential company, customer or system details.
          </p>
        </div>
      </div>

      {/* Next project */}
      <nav aria-label="Next case study" className="shell mt-24 mb-8">
        <Link
          href={`/work/${next.slug}`} prefetch
          className="group relative block overflow-hidden border border-line p-6 transition-colors duration-500 hover:border-accent sm:p-10"
        >
          <p className="text-label text-muted">
            Next case study <span className="text-accent">{next.index}</span>
          </p>
          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="text-display transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-2">
              {next.shortName}
            </p>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </div>
          <p className="mt-4 max-w-[60ch] text-text-dim">{next.problem}</p>
        </Link>
      </nav>
    </article>
  );
}
