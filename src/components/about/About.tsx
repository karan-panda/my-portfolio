import { Reveal } from "@/components/motion/Reveal";
import { MaskLines } from "@/components/ui/MaskText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { principles } from "@/data/skills";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="shell relative py-[clamp(6rem,14vw,11rem)]">
      <Reveal className="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-line pt-6">
        <div className="col-span-12" data-reveal>
          <SectionLabel index="01">Engineering identity</SectionLabel>
        </div>

        <h2 id="about-title" className="text-display col-span-12 lg:col-span-7">
          <MaskLines
            lines={[
              "I build software that",
              "solves real problems\u00a0—",
              <>
                and make complex systems <span className="text-accent">simpler.</span>
              </>,
            ]}
          />
        </h2>

        <div className="col-span-12 flex flex-col gap-6 text-lead text-text-dim md:col-span-8 lg:col-span-5 lg:pt-3">
          <p data-reveal>
            I&apos;m a software engineer at ICICI Lombard in Mumbai, working across the stack on insurance products
            customers use every day. Some weeks that means migrating a legacy Angular journey to Next.js and moving its
            business rules into .NET services. Other weeks it means building the MCP tools that let an AI assistant look
            up a policy — safely, behind role-based access.
          </p>
          <p data-reveal>
            I care about the parts users never see but always feel: payload sizes, API round-trips, access boundaries
            and recovery plans. I&apos;d rather measure a problem than argue about it, and I&apos;d rather ship one reusable
            piece than write the same code twice.
          </p>
        </div>
      </Reveal>

      <Reveal as="ol" className="mt-20 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3" start="top 85%">
        {principles.map((p) => (
          <li
            key={p.n}
            data-reveal
            className="principle group relative border-r border-b border-line p-6 transition-colors duration-500 hover:bg-surface md:p-8"
          >
            <span className="text-label text-accent">{p.n}</span>
            <h3 className="text-title mt-10 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1">
              {p.title}
            </h3>
            <p className="mt-3 max-w-[34ch] text-text-dim">{p.body}</p>
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[var(--ease-out)] group-hover:w-full"
            />
          </li>
        ))}
      </Reveal>
    </section>
  );
}
