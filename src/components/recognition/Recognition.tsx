import { academicProjects, interests, recognition } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";

export function Recognition() {
  const education = recognition.find((r) => r.kind === "education");
  const others = recognition.filter((r) => r.kind !== "education");

  return (
    <section id="recognition" aria-labelledby="rec-title" className="shell relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHeader
        index="06"
        label="Education, awards & leadership"
        id="rec-title"
        lines={["The foundation", <span key="b" className="text-text-dim">behind the work.</span>]}
      />

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
        {education && (
          <Reveal className="col-span-12 lg:col-span-6">
            <p data-reveal className="text-label text-accent">
              Education · {education.year}
            </p>
            <h3 data-reveal className="text-title mt-6">
              {education.title}
            </h3>
            <p data-reveal className="mt-2 text-text-dim">
              {education.org}
            </p>
            <div data-reveal className="mt-10 flex items-end gap-6">
              <p className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.85] tracking-[-0.05em]">
                9.83<span className="text-[0.35em] text-muted">/10</span>
              </p>
              <p className="text-label pb-2 text-text-dim">
                CGPA
                <br />
                <span className="text-accent">Department Topper</span>
              </p>
            </div>
          </Reveal>
        )}

        <Reveal as="ul" className="col-span-12 border-t border-line lg:col-span-6">
          {others.map((r) => (
            <li
              key={r.title}
              data-reveal
              className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-6 transition-colors"
            >
              <div>
                <p className="text-label text-muted">{r.kind === "award" ? "Award" : "Leadership"}</p>
                <p className="text-title mt-2 transition-colors group-hover:text-accent">{r.title}</p>
                <p className="mt-1 text-text-dim">{r.org}</p>
              </div>
              <p className="text-label text-text-dim">{r.year}</p>
            </li>
          ))}
        </Reveal>
      </div>

      {/* Academic work — deliberately separate from professional projects */}
      <Reveal className="mt-24 grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <p data-reveal className="text-label text-muted">
            <span className="text-accent">(06.1)</span> Academic projects
          </p>
          <p data-reveal className="mt-4 max-w-[36ch] text-text-dim">
            College work, kept separate from professional experience.
          </p>
        </div>
        <ul className="col-span-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {academicProjects.map((a) => (
            <li key={a.name} data-reveal className="flex flex-col bg-bg p-6">
              <h3 className="font-display text-xl tracking-tight">{a.name}</h3>
              <p className="mt-3 text-sm text-text-dim">{a.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {a.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Interests */}
      <Reveal className="mt-24 grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <p data-reveal className="text-label text-muted">
            <span className="text-accent">(06.2)</span> Curious about
          </p>
        </div>
        <p data-reveal className="text-title col-span-12 text-text-dim lg:col-span-8">
          {interests.map((it, i) => (
            <span key={it}>
              <span className="transition-colors hover:text-text">{it}</span>
              {i < interests.length - 1 && <span className="mx-3 text-accent">/</span>}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
