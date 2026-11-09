"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay before the group starts */
  delay?: number;
  /** Viewport position that triggers the reveal */
  start?: string;
};

/**
 * Scroll-triggered reveal for every descendant marked `data-reveal`.
 * Masked lines (`.mask-line > span`) slide up; other items fade + lift.
 * Content is in the server HTML; this only animates it.
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0, start = "top 82%" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
      if (!items.length) return;
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1 });
        return;
      }
      const masked = items.filter((el) => el.parentElement?.classList.contains("mask-line"));
      const plain = items.filter((el) => !masked.includes(el));
      if (masked.length) gsap.set(masked, { opacity: 1, yPercent: 110 });
      if (plain.length) gsap.set(plain, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        delay,
        // play once, never reverse (avoids `once`, which self-kills mid-refresh)
        scrollTrigger: { trigger: ref.current, start, toggleActions: "play none none none" },
        defaults: { ease: ease.out, duration: duration.base },
      });
      if (masked.length) tl.to(masked, { yPercent: 0, stagger: stagger.lines, duration: duration.slow }, 0);
      if (plain.length) tl.to(plain, { opacity: 1, y: 0, stagger: stagger.items }, masked.length ? 0.15 : 0);
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
