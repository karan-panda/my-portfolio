import { skills } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const spans: Record<string, string> = {
  backend: "lg:col-span-4",
  frontend: "lg:col-span-2",
  ai: "lg:col-span-2",
  cloud: "lg:col-span-2",
  data: "lg:col-span-2",
  quality: "lg:col-span-6",
};

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="cap-title" className="shell relative py-[clamp(4rem,10vw,8rem)]">
      <SectionHeader
        index="03"
        label="Technical capabilities"
        id="cap-title"
        lines={["Breadth across the stack,", <span key="b" className="text-text-dim">depth where it shipped.</span>]}
        aside={<p>No skill bars. Each group points to the production work that used it.</p>}
      />
      <Reveal as="ul" className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-6" start="top 85%">
        {skills.map((s, i) => (
          <li
            key={s.id}
            data-reveal
            className={cn("group relative flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-bg-raised md:p-8", spans[s.id], s.id === "quality" && "sm:col-span-2")}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-title">{s.title}</h3>
              <span className="text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="mt-3 max-w-[42ch] text-text-dim">{s.blurb}</p>
            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${s.title} technologies`}>
              {s.items.map((item) => (
                <li key={item} className="font-mono text-[0.78rem] text-text transition-colors group-hover:text-text">
                  <span className="mr-2 text-accent" aria-hidden="true">
                    /
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-label mt-auto pt-10 text-muted">
              <span className="text-signal">Evidence →</span> {s.evidence}
            </p>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
          </li>
        ))}
      </Reveal>
    </section>
  );
}
