"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

/** Cycles through current focus areas. Reduced motion: shows a static list. */
export function FocusTicker({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 2200);
    return () => window.clearInterval(id);
  }, [items.length, reduce]);

  if (reduce) return <span>{items.slice(0, 3).join(" · ")}</span>;

  return (
    <span className="relative block h-[1.2em] overflow-hidden" aria-label={`Focus: ${items.join(", ")}`} role="img">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={items[i]}
          className="absolute inset-0"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.6, ease: ease.outBezier }}
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
