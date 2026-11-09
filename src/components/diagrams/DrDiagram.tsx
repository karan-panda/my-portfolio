import { Caption, Node, Svg } from "./primitives";

function Region({ x, label, tone }: { x: number; label: string; tone: "accent" | "muted" }) {
  return (
    <g>
      <rect x={x} y={180} width={230} height={200} rx="4" fill="none" stroke={tone === "accent" ? "var(--accent)" : "var(--line-strong)"} strokeDasharray={tone === "accent" ? "0" : "4 4"} />
      <Caption x={x + 14} y={202} tone={tone === "accent" ? "accent" : "muted"}>{label}</Caption>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Node x={x + 14} y={218 + i * 50} w={150} h={38} label={`ECS service ${i + 1}`} tone={tone === "accent" ? "default" : "muted"} />
          <circle cx={x + 196} cy={237 + i * 50} r="5" fill={tone === "accent" ? "var(--accent)" : "var(--signal)"} className="health-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
    </g>
  );
}

/** Cross-region DR: config-in-code switches domain endpoint between ECS regions. */
export function DrDiagram() {
  return (
    <Svg title="Cross-region disaster recovery: a domain endpoint points at ECS services in the primary region; configuration managed in code repoints it to the recovery region during DR, while health checks monitor services in both.">
      <Node x={190} y={30} w={180} label="Domain endpoint" sub="CUSTOMER TRAFFIC" />
      <rect x={160} y={100} width={240} height={30} rx="15" fill="var(--accent-soft)" stroke="var(--accent)" />
      <Caption x={280} y={119} tone="accent" anchor="middle">DR CONFIG · MANAGED IN CODE</Caption>
      <path d="M280 74 V100" stroke="var(--accent)" />
      <path d="M280 130 C280 160, 135 150, 135 180" fill="none" stroke="var(--accent)" strokeWidth="1.25" className="flow-dash" />
      <path d="M280 130 C280 160, 425 150, 425 180" fill="none" stroke="var(--line-strong)" strokeDasharray="3 5" className="dr-standby" />
      <Region x={20} label="PRIMARY REGION" tone="accent" />
      <Region x={310} label="RECOVERY REGION" tone="muted" />
      <Caption x={20} y={406}>● HEALTH CHECKS · NO RTO/RPO FIGURES CLAIMED</Caption>
    </Svg>
  );
}
