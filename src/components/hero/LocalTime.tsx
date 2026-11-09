"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
  hour12: false,
});

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
}

/** Current time in Mumbai. Server renders a placeholder; client fills it in. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "--:--");
  return (
    <time suppressHydrationWarning>
      {time} <span className="text-muted">IST</span>
    </time>
  );
}
