import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function CaseSection({ id, index, title, children }: { id: string; index: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-line pt-6 pb-16">
      <Reveal>
        <p data-reveal className="text-label text-accent">
          {String(index).padStart(2, "0")}
        </p>
        <h2 id={`${id}-h`} className="text-title mt-4">
          <span className="mask-line">
            <span data-reveal>{title}</span>
          </span>
        </h2>
        <div data-reveal className="case-prose mt-6">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
