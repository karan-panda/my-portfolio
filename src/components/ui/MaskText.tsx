import type { ReactNode } from "react";

/**
 * Renders each line inside a clipping mask so it can slide in from below.
 * Lines are authored explicitly (intentional line breaks), so no runtime
 * text-splitting is needed and the HTML stays readable without JS.
 */
export function MaskLines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${className ?? ""}`}>
          <span data-reveal>{line}</span>
        </span>
      ))}
    </>
  );
}
