import { cn } from "@/lib/cn";

/** K/P wordmark — the slash is the accent, echoing a path separator. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-medium tracking-[-0.06em]", className)} aria-hidden="true">
      K<span className="text-accent">/</span>P
    </span>
  );
}
