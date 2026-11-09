"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { duration, ease, stagger } from "@/lib/motion";
import { useIntroDone } from "@/hooks/useIntroDone";
import { isFinePointer, prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Orchestrates the hero:
 *  1. entrance timeline once the intro finishes,
 *  2. cursor parallax on the schematic (desktop),
 *  3. scroll parallax as the hero leaves the viewport.
 * Markup stays server-rendered; this component only animates it.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const introDone = useIntroDone();

  // Set initial (hidden) states immediately so nothing flashes before the intro ends.
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1 });
        return;
      }
      const masked = items.filter((el) => el.parentElement?.classList.contains("mask-line"));
      gsap.set(masked, { autoAlpha: 1, yPercent: 110 });
      gsap.set(items.filter((el) => !masked.includes(el)), { autoAlpha: 0, y: 20 });
      gsap.set("[data-schematic-part]", { autoAlpha: 0, scale: 0.92, transformOrigin: "50% 50%" });
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
      const masked = items.filter((el) => el.parentElement?.classList.contains("mask-line"));
      const plain = items.filter((el) => !masked.includes(el));

      const tl = gsap.timeline({ defaults: { ease: ease.out } });
      tl.to(masked, { yPercent: 0, duration: duration.slow, stagger: stagger.lines })
        .to("[data-schematic-part]", { autoAlpha: 1, scale: 1, duration: 1.6, stagger: 0.08 }, 0.1)
        .to(plain, { autoAlpha: 1, y: 0, duration: duration.base, stagger: stagger.items }, 0.45);

      // Scroll parallax as the hero exits.
      gsap.to("[data-parallax='headline']", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-parallax='schematic']", {
        yPercent: 18,
        rotate: 14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Cursor parallax on the schematic (desktop only).
      if (!isFinePointer()) return;
      const parts = gsap.utils.toArray<SVGGElement>("[data-depth]", ref.current).map((el) => ({
        depth: Number(el.dataset.depth ?? 0.5),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        for (const p of parts) {
          p.x(nx * 36 * p.depth);
          p.y(ny * 36 * p.depth);
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: ref, dependencies: [introDone] },
  );

  return (
    <section ref={ref} className={className} aria-labelledby="hero-title">
      {children}
    </section>
  );
}
