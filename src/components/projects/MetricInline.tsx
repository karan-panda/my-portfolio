import type { Metric } from "@/types/content";

/** A metric is never shown without its context line. */
export function MetricInline({ metric }: { metric: Metric }) {
  return (
    <div className="border-l border-accent pl-4">
      <p className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-none tracking-[-0.03em] text-text">{metric.value}</p>
      <p className="text-label mt-2 text-text-dim">{metric.label}</p>
      <p className="mt-1 text-[0.8rem] leading-snug text-muted">{metric.context}</p>
    </div>
  );
}
