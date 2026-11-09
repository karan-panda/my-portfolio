import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectPanel } from "./ProjectPanel";
import { ProjectStackMotion } from "./ProjectStackMotion";

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="work" aria-labelledby="work-title" className="shell relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHeader
        index="02"
        label="Selected work"
        id="work-title"
        lines={["Production systems,", <span key="b" className="text-text-dim">explained.</span>]}
        aside={
          <p>
            Six pieces of production work at ICICI Lombard — AI, product, modernization, integrations and reliability.
            Every number shown carries its measurement scope.
          </p>
        }
      />
      <div className="mt-16">
        <ProjectStackMotion>
          {featured.map((p, i) => (
            <li
              key={p.slug}
              data-stack-item
              className="lg:sticky"
              style={{ top: `calc(var(--nav-h) + 1rem + ${i * 14}px)` }}
            >
              <ProjectPanel project={p} total={featured.length} />
            </li>
          ))}
        </ProjectStackMotion>
      </div>
    </section>
  );
}
