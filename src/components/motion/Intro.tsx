"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { INTRO_EVENT, INTRO_KEY } from "@/lib/motion";

function finish() {
  const d = document.documentElement;
  if (d.dataset.intro === "done") return;
  d.dataset.intro = "done";
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/**
 * ~1.3s branded intro, once per tab session. Nothing is "loading" — it is a
 * short title card, and any click or key press skips it.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (document.documentElement.dataset.intro !== "pending") {
        finish();
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
      tl.from("[data-intro-mark]", { yPercent: 110, duration: 0.7 })
        .fromTo("[data-intro-bar]", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, 0.1)
        .from("[data-intro-line]", { yPercent: 110, duration: 0.6, stagger: 0.06 }, 0.25)
        .to(root.current, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, "+=0.15");

      const skip = () => tl.progress(1);
      window.addEventListener("pointerdown", skip, { once: true });
      window.addEventListener("keydown", skip, { once: true });
      return () => {
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", skip);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="flex flex-col items-start gap-6">
        <span className="mask-line font-display text-[clamp(3.5rem,12vw,9rem)] leading-none font-medium tracking-[-0.06em]">
          <span data-intro-mark>
            K<span className="text-accent">/</span>P
          </span>
        </span>
        <span className="block h-px w-[min(70vw,28rem)] origin-left bg-line">
          <span data-intro-bar className="block h-full origin-left bg-accent" />
        </span>
        <span className="text-label flex flex-col gap-1 text-muted">
          <span className="mask-line">
            <span data-intro-line>Engineering ideas into reality</span>
          </span>
          <span className="mask-line">
            <span data-intro-line className="text-text">Karan Panda — Software Engineer</span>
          </span>
        </span>
      </div>
    </div>
  );
}
