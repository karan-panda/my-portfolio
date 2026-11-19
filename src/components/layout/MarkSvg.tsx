import { MARK_PATHS, MARK_STROKE, MARK_VIEWBOX } from "@/components/ui/Monogram";

/** Static-colour K/P mark for next/og image generation (no CSS variables there). */
export function MarkSvg({ width, accent = "#32f438", ink = "#f2efe8" }: { width: number; accent?: string; ink?: string }) {
  const height = (width * 40) / 52;
  return (
    <svg width={width} height={height} viewBox={MARK_VIEWBOX} fill="none">
      <path d={MARK_PATHS.leg} stroke={ink} strokeWidth={MARK_STROKE} />
      <path d={MARK_PATHS.arm} stroke={accent} strokeWidth={MARK_STROKE} />
      <path d={MARK_PATHS.stem} stroke={ink} strokeWidth={MARK_STROKE} />
      <path d={MARK_PATHS.p} stroke={ink} strokeWidth={MARK_STROKE} />
    </svg>
  );
}
