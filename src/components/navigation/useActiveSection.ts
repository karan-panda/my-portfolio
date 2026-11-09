"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Returns the id of the home-page section currently in view (scrollspy). */
export function useActiveSection(ids: string[]) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (pathname !== "/") return;
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      setActive(null);
    };
  }, [pathname, key]);

  return pathname === "/" ? active : null;
}
