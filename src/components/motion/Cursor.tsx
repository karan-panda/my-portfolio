"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Desktop-only cursor follower. The native cursor is kept — this ring is an
 * enhancement layered on top, so usability never depends on it.
 * States: default ring · grows over links/buttons · shows a label over
 * elements with `data-cursor="Label"`.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.dataset.visible = "true";
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const custom = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, [role='button'], summary, label");
      if (custom) {
        el.dataset.state = "label";
        if (label.current) label.current.textContent = custom.dataset.cursor ?? "";
      } else if (interactive) {
        el.dataset.state = "link";
      } else {
        el.dataset.state = "default";
      }
    };
    const leave = () => {
      el.dataset.visible = "false";
      shown = false;
    };
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={ring} className="cursor-ring" data-visible="false" data-state="default" aria-hidden="true">
      <span ref={label} className="cursor-label" />
    </div>
  );
}
