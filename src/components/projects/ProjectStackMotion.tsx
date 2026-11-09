"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Desktop: panels are CSS-sticky and stack on top of each other; as the next
 * panel slides over, the previous one scales back and dims (scrubbed).
 * Mobile / reduced motion: a normal vertical list.
 */
export function ProjectStackMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // matchMedia created inside useGSAP's context is reverted with it.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-stack-item]", ref.current);
        items.forEach((item, i) => {
          const next = items[i + 1];
          if (!next) return;
          const panel = item.querySelector(".project-panel");
          gsap.to(panel, {
            scale: 0.93,
            opacity: 0.35,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top+=120", scrub: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="flex flex-col gap-6 lg:gap-[12vh]">
      {children}
    </ol>
  );
}
