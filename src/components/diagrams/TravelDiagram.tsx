import { Caption, Flow, Node, Svg } from "./primitives";

/** Travel GenAI: intent → context selection → generate/validate → NDJSON lines streaming in. */
export function TravelDiagram() {
  const lines = [
    '{"type":"day","n":1}',
    '{"type":"activity",...}',
    '{"type":"benefit",...}',
    '{"type":"place",...}',
    '{"type":"day","n":2}',
  ];
  return (
    <Svg title="Travel itinerary GenAI: user intent goes through context selection and generation with validation, and results stream to the client as NDJSON lines that render progressively.">
      <Node x={20} y={40} w={150} label="Traveller intent" sub="NEXT.JS" />
      <Flow d="M170 62 H206" tone="accent" />
      <Node x={206} y={40} w={150} label="Context selection" sub="SEMANTIC RETRIEVAL" tone="accent" />
      <Flow d="M356 62 H392" tone="accent" delay={0.2} />
      <Node x={392} y={40} w={148} label="Generate + validate" sub="FASTAPI · FALLBACKS" />
      <Caption x={206} y={108} tone="accent">~65% LESS TOKEN / MEMORY USE</Caption>
      <Node x={392} y={92} w={148} h={36} label="Google Maps" tone="muted" />

      <Flow d="M466 84 C466 160, 300 140, 300 176" tone="signal" delay={0.4} />
      <Caption x={20} y={168}>NDJSON STREAM · ONE OBJECT PER LINE (ILLUSTRATIVE)</Caption>
      <rect x={20} y={180} width={300} height={220} rx="3" fill="var(--bg-raised)" stroke="var(--line-strong)" />
      {lines.map((l, i) => (
        <text
          key={i}
          x={34}
          y={208 + i * 36}
          fill={i === lines.length - 1 ? "var(--muted)" : "var(--text-dim)"}
          fontFamily="var(--font-mono)"
          fontSize="11"
          className="stream-line"
          style={{ animationDelay: `${0.3 + i * 0.45}s` }}
        >
          {l}
        </text>
      ))}

      {/* progressive render */}
      <Caption x={340} y={168}>CLIENT RENDERS AS LINES ARRIVE</Caption>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="stream-line" style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
          <rect x={340} y={180 + i * 54} width={200} height={44} rx="3" fill="var(--surface)" stroke={i === 2 ? "var(--accent)" : "var(--line)"} />
          <rect x={352} y={192 + i * 54} width={i % 2 ? 90 : 130} height={7} rx="2" fill="var(--line-strong)" />
          <rect x={352} y={206 + i * 54} width={i % 2 ? 140 : 70} height={5} rx="2" fill="var(--line)" />
          {i === 2 && <circle cx={526} cy={202 + i * 54} r="4" fill="var(--accent)" />}
        </g>
      ))}
    </Svg>
  );
}
