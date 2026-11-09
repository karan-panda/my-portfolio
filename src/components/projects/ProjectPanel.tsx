import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectDiagram } from "@/components/diagrams/ProjectDiagram";
import { Tag } from "@/components/ui/Tag";
import { MetricInline } from "./MetricInline";

export function ProjectPanel({ project, total }: { project: Project; total: number }) {
  const href = `/work/${project.slug}`;
  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className="project-panel grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12 border border-line bg-bg p-5 sm:p-8 lg:p-10"
    >
      <div className="flex min-w-0 flex-col lg:col-span-5">
        <p className="text-label text-muted">
          <span className="text-accent">{project.index}</span> / {String(total).padStart(2, "0")}
        </p>

        <p className="text-label mt-8 text-signal">{project.category}</p>
        <ViewTransition name={`project-title-${project.slug}`} share="morph" default="none">
          <h3 id={`p-${project.slug}`} className="text-title mt-4 text-[clamp(1.8rem,3.2vw,3rem)]">
            <Link href={href} prefetch className="link-underline">
              {project.name}
            </Link>
          </h3>
        </ViewTransition>
        <p className="mt-5 text-text-dim">{project.problem}</p>
        <p className="text-label mt-5 text-muted">
          <span className="text-text-dim">My role —</span> {project.role}
        </p>

        {project.highlights.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-6">
            {project.highlights.map((m) => (
              <MetricInline key={m.label} metric={m} />
            ))}
          </div>
        )}

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
          {project.stack.slice(0, 7).map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          prefetch
          className="group text-label mt-auto inline-flex min-h-12 items-center gap-3 pt-10 text-text hover:text-accent"
        >
          Read case study
          <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-accent">
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
          <span className="sr-only">: {project.name}</span>
        </Link>
      </div>

      <div className="min-w-0 lg:col-span-7">
        <ProjectDiagram kind={project.diagram} caption="Simplified, public-level view of the documented architecture" />
      </div>
    </article>
  );
}
