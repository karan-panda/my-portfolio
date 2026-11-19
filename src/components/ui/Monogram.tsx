import { cn } from "@/lib/cn";

/**
 * K/P mark. The K's upper arm is the green slash, breaking out above the
 * cap height. That's the "/" of K/P, drawn as part of the letter.
 *
 * Geometry (viewBox 52 × 40, 5.5 stroke) is shared with the favicon,
 * Apple icon and OG images through MARK_PATHS, so every surface matches.
 * Draw order matters: leg → arm → stem → P, so each stroke end tucks
 * cleanly under the next and no clipping is needed.
 */
export const MARK_VIEWBOX = "0 0 52 40";
export const MARK_STROKE = 5.5;
export const MARK_PATHS = {
  leg: "M14.6 18.2 L23.87 35.8",
  arm: "M7 27.6 L27.5 2.5",
  stem: "M7 7 V37",
  p: "M34 37 V9.75 H41.25 A7.25 7.25 0 0 1 41.25 24.25 H34",
} as const;

export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={cn("block h-7 w-auto overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g fill="none" strokeWidth={MARK_STROKE} strokeLinejoin="miter">
        <path d={MARK_PATHS.leg} stroke="currentColor" />
        <path d={MARK_PATHS.arm} stroke="var(--accent)" />
        <path d={MARK_PATHS.stem} stroke="currentColor" />
        <path d={MARK_PATHS.p} stroke="currentColor" />
      </g>
    </svg>
  );
}
