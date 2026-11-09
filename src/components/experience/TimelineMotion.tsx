"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Fills the timeline rail as the section scrolls through the viewport. */
export function TimelineMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-rail-fill]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="relative">
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-[calc(25%+7px)]">
        <span data-rail-fill className="block h-full w-full origin-top bg-accent" />
      </span>
      {children}
    </div>
  );
}
