"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one frame loop. Only enabled for fine pointers with motion allowed —
 * touch devices and reduced-motion users keep native scrolling.
 * Native keyboard scrolling and in-page anchors keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    document.documentElement.dataset.motion = "ready";
    if (prefersReducedMotion() || !isFinePointer()) return;

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("kp:scroll-lock", stop);
    window.addEventListener("kp:scroll-unlock", start);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("kp:scroll-lock", stop);
      window.removeEventListener("kp:scroll-unlock", start);
      lenis.destroy();
    };
  }, []);

  return null;
}
