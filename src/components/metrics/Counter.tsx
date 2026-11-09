"use client";

import { useRef } from "react";
import type { Metric } from "@/types/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Counts once to the reported value when it scrolls into view, then stops.
 * The server-rendered text is already the final value, so no-JS and
 * reduced-motion users see the real number immediately.
 */
export function Counter({ metric }: { metric: Metric }) {
  const num = useRef<HTMLSpanElement>(null);
  const { from, to, prefix = "", suffix = "", unit } = metric;
  const decimals = to !== undefined && !Number.isInteger(to) ? 1 : 0;
  const hasRange = from !== undefined && to !== undefined;

  useGSAP(() => {
    if (to === undefined || !num.current || prefersReducedMotion()) return;
    const el = num.current;
    const state = { v: hasRange ? from! : 0 };
    el.textContent = format(state.v, decimals);
    gsap.to(state, {
      v: to,
      duration: 1.8,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
      onUpdate: () => {
        el.textContent = format(state.v, decimals);
      },
    });
  });

  if (to === undefined) return <>{metric.value}</>;

  return (
    <span>
      {/* Screen readers get the final value once; the animated digits are hidden from them. */}
      <span className="sr-only">{metric.value}</span>
      <span aria-hidden="true">
        {hasRange && (
          <span className="text-muted">
            {from}
            <span className="mx-[0.15em] text-accent">→</span>
          </span>
        )}
        {prefix}
        <span ref={num} className="tabular-nums">
          {format(to, decimals)}
        </span>
        {suffix}
        {unit && <span className="ml-[0.15em] text-[0.45em] tracking-normal text-text-dim">{unit}</span>}
      </span>
    </span>
  );
}
