"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Sticky contents list that highlights the section currently in view. */
export function CaseToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-[calc(var(--nav-h)+2rem)]">
      <p className="text-label mb-5 text-muted">Contents</p>
      <ol className="flex flex-col border-l border-line">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "text-label -ml-px flex min-h-9 items-center gap-3 border-l py-1 pl-4 transition-colors duration-300",
                active === item.id ? "border-accent text-text" : "border-transparent text-muted hover:text-text-dim",
              )}
            >
              <span className={active === item.id ? "text-accent" : ""}>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
