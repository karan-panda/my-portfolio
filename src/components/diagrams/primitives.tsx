/**
 * Shared SVG building blocks for the architecture diagrams.
 * All diagrams use a 560×420 viewBox and theme colours via CSS variables.
 */
import type { ReactNode } from "react";

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: "default" | "accent" | "signal" | "muted";
};

const stroke = {
  default: "var(--line-strong)",
  accent: "var(--accent)",
  signal: "var(--signal)",
  muted: "var(--line)",
};

export function Node({ x, y, w, h = 44, label, sub, tone = "default" }: NodeProps) {
  return (
    <g data-node>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="var(--surface)" stroke={stroke[tone]} strokeWidth="1" />
      <text
        x={x + 12}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        fill={tone === "muted" ? "var(--muted)" : "var(--text)"}
        fontFamily="var(--font-display)"
        fontSize="13"
        letterSpacing="-0.2"
      >
        {label}
      </text>
      {sub && (
        <text x={x + 12} y={y + h / 2 + 12} fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.6">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Animated connector. `d` is an SVG path; `tone` picks the colour. */
export function Flow({ d, tone = "default", delay = 0 }: { d: string; tone?: "default" | "accent" | "signal"; delay?: number }) {
  const c = tone === "accent" ? "var(--accent)" : tone === "signal" ? "var(--signal)" : "var(--muted)";
  return (
    <g data-flow>
      <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
      <path d={d} fill="none" stroke={c} strokeWidth="1.25" className="flow-dash" style={{ animationDelay: `${delay}s` }} />
    </g>
  );
}

export function Caption({ x, y, children, tone = "muted", anchor = "start" }: { x: number; y: number; children: ReactNode; tone?: "muted" | "accent" | "signal" | "text"; anchor?: "start" | "middle" | "end" }) {
  const fill = { muted: "var(--muted)", accent: "var(--accent)", signal: "var(--signal)", text: "var(--text-dim)" }[tone];
  return (
    <text x={x} y={y} fill={fill} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.2" textAnchor={anchor}>
      {children}
    </text>
  );
}

export function Svg({ title, children }: { title: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 560 420" className="h-auto w-full" role="img" aria-label={title}>
      <title>{title}</title>
      {children}
    </svg>
  );
}
