import { Caption, Flow, Node, Svg } from "./primitives";

/** KYP: query → FastAPI + routing → RBAC → 4 MCP tools → sources → Vertex AI → response. */
export function KypDiagram() {
  const tools = [
    { label: "Policy lookup", sub: "CORE POLICY SYSTEM" },
    { label: "Workflow guidance", sub: "STEP-BY-STEP" },
    { label: "Company profile", sub: "ANSWERS" },
    { label: "Product RAG", sub: "VERTEX AI SEARCH" },
  ];
  return (
    <Svg title="KYP architecture: a user query is routed by a FastAPI service through role-based access control to one of four MCP tools, whose context grounds a Vertex AI response.">
      <Caption x={20} y={28}>INPUT</Caption>
      <Node x={20} y={40} w={130} label="User query" sub="NEXT.JS CLIENT" />
      <Flow d="M150 62 H190" tone="accent" />
      <Node x={190} y={40} w={150} label="FastAPI service" sub="CODE-BASED ROUTING" tone="accent" />

      {/* RBAC gate */}
      <Flow d="M265 84 V118" tone="accent" delay={0.2} />
      <rect x={160} y={118} width={210} height={26} rx="13" fill="var(--accent-soft)" stroke="var(--accent)" />
      <Caption x={265} y={135} tone="accent" anchor="middle">RBAC · SIGNED TOKEN CLAIMS</Caption>

      <Caption x={20} y={178}>MCP TOOLS</Caption>
      {tools.map((t, i) => {
        const x = 20 + i * 132;
        return (
          <g key={t.label}>
            <Flow d={`M265 144 C265 165, ${x + 61} 160, ${x + 61} 188`} tone="accent" delay={0.35 + i * 0.12} />
            <Node x={x} y={188} w={122} h={50} label={t.label} sub={t.sub} />
          </g>
        );
      })}

      {[0, 1, 2, 3].map((i) => (
        <Flow key={i} d={`M${81 + i * 132} 238 C${81 + i * 132} 270, 280 262, 280 292`} tone="signal" delay={0.8 + i * 0.1} />
      ))}
      <Node x={180} y={292} w={200} label="Vertex AI" sub="GROUNDED GENERATION" tone="signal" />
      <Flow d="M280 336 V366" tone="signal" delay={1.2} />
      <Node x={180} y={366} w={200} h={40} label="Grounded response" />
      <Caption x={540} y={404} anchor="end">12,000+ PEAK DAU · REPORTED</Caption>
    </Svg>
  );
}
