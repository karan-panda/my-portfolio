"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Figure wrapper that plays one-shot diagram animations (bars, dial, stream)
 * when it scrolls into view. Classes are toggled after hydration, so the
 * server HTML (final state) and the first client render always match.
 */
export function DiagramFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      el.classList.add("in-view");
      return;
    }
    el.classList.add("is-armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="diagram-frame relative border border-line bg-bg-raised/60 p-4 sm:p-6">
      {children}
    </figure>
  );
}
