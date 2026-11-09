"use client";

import { useSyncExternalStore } from "react";
import { INTRO_EVENT } from "@/lib/motion";

function subscribe(cb: () => void) {
  window.addEventListener(INTRO_EVENT, cb);
  return () => window.removeEventListener(INTRO_EVENT, cb);
}

/** True once the intro overlay has finished (or was skipped). */
export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.intro === "done",
    () => false,
  );
}
