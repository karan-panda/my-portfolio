import { cn } from "@/lib/cn";

/** Schematic section marker: "(02) — About". */
export function SectionLabel({ index, children, className }: { index: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-label flex items-center gap-3 text-muted", className)}>
      <span className="text-accent">({index})</span>
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}
