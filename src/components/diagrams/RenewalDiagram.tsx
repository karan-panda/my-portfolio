import { Caption, Flow, Node, Svg } from "./primitives";

/** Motor Renewal: before (client orchestration) vs after (frontend-ready API) + Lighthouse. */
export function RenewalDiagram() {
  const r = 34;
  const circ = 2 * Math.PI * r;
  return (
    <Svg title="Motor renewal modernization: before, an Angular client called several services itself; after, a Next.js client calls one frontend-ready .NET API that talks to the core policy system directly. Lighthouse rose from 37 to 93 on the migrated journey.">
      <Caption x={20} y={28}>BEFORE</Caption>
      <Node x={20} y={44} w={140} label="Angular client" sub="BUSINESS RULES IN UI" tone="muted" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M160 66 C190 66, 190 ${40 + i * 30}, 220 ${40 + i * 30}`} fill="none" stroke="var(--line-strong)" strokeDasharray="2 4" />
          <rect x={220} y={30 + i * 30} width={86} height={20} rx="2" fill="none" stroke="var(--line)" />
          <Caption x={228} y={44 + i * 30}>SERVICE {i + 1}</Caption>
        </g>
      ))}
      <path d="M306 85 H340" stroke="var(--line-strong)" strokeDasharray="2 4" />
      <Node x={340} y={63} w={110} label="Intermediary" tone="muted" />
      <Caption x={20} y={128}>XML CORE INTEGRATION</Caption>

      <line x1={20} y1={160} x2={540} y2={160} stroke="var(--line)" />

      <Caption x={20} y={192} tone="accent">AFTER</Caption>
      <Node x={20} y={208} w={140} label="Next.js client" sub="SSR / SSG" tone="accent" />
      <Flow d="M160 230 H200" tone="accent" />
      <Node x={200} y={208} w={160} label="ASP.NET Core API" sub="FRONTEND-READY RESPONSES" tone="accent" />
      <Flow d="M280 252 V290" tone="accent" delay={0.3} />
      <Node x={200} y={290} w={160} label="Core policy system" sub="JSON (V2.0) SERVICES" />
      <Flow d="M280 334 V360" delay={0.5} />
      <Node x={200} y={360} w={160} h={38} label="PostgreSQL" sub="MIGRATED FROM ORACLE" />

      {/* Lighthouse dial */}
      <g transform="translate(462 300)">
        <circle r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
        <circle
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${circ * 0.93} ${circ}`}
          transform="rotate(-90)"
          className="dial-grow"
          style={{ ["--dial-from" as string]: circ * 0.37, ["--dial-to" as string]: circ * 0.93, ["--circ" as string]: circ }}
        />
        <text y="6" textAnchor="middle" fill="var(--text)" fontFamily="var(--font-display)" fontSize="20">93</text>
        <Caption x={0} y={56} anchor="middle">LIGHTHOUSE · FROM 37</Caption>
      </g>
      <Caption x={540} y={214} anchor="end" tone="text">~14% FEWER API CALLS</Caption>
      <Caption x={540} y={230} anchor="end" tone="text">~27% FASTER LOAD</Caption>
      <Caption x={540} y={246} anchor="end">MIGRATED RENEWAL JOURNEY</Caption>
    </Svg>
  );
}
