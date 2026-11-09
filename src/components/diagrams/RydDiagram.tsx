import { Caption, Node, Svg } from "./primitives";

const scale = 26; // px per MB

function Bar({ y, before, after, label, method }: { y: number; before: number; after: number; label: string; method: string }) {
  return (
    <g>
      <Caption x={20} y={y - 10} tone="text">{label}</Caption>
      <rect x={20} y={y} width={before * scale} height={18} fill="none" stroke="var(--line-strong)" strokeDasharray="3 4" />
      <Caption x={24 + before * scale} y={y + 13}>{before} MB</Caption>
      <rect x={20} y={y + 26} width={after * scale} height={18} fill="var(--accent)" className="bar-grow" />
      <Caption x={26 + after * scale} y={y + 39} tone="accent">≈{after} MB · {method}</Caption>
    </g>
  );
}

/** RYD Raksha: two-stage compression of reference data + KYC microfrontend reuse. */
export function RydDiagram() {
  return (
    <Svg title="RYD Raksha: reference-data API payload compressed from about 17 MB to 6 MB with Brotli and output caching, then the browser copy from about 6 MB to 1.1 MB with LZ-String; a KYC microfrontend is embedded in other journeys.">
      <Caption x={20} y={28} tone="accent">REFERENCE DATA · MAKE-MODEL + RTO</Caption>
      <Bar y={62} before={17} after={6} label="① API PAYLOAD — .NET OUTPUT CACHE (ECS MEMORY)" method="BROTLI" />
      <Bar y={150} before={6} after={1.1} label="② BROWSER COPY — LOCALSTORAGE, 1-DAY TTL" method="LZ-STRING" />

      <line x1={20} y1={232} x2={540} y2={232} stroke="var(--line)" />
      <Caption x={20} y={258}>REUSABLE KYC MICROFRONTEND · SCRIPT + CSS</Caption>
      <Node x={20} y={274} w={170} h={50} label="KYC widget" sub="VITE / WEBPACK BUNDLE" tone="accent" />
      <path d="M190 299 H230" stroke="var(--accent)" />
      <path d="M230 280 V392" stroke="var(--line-strong)" />
      {[
        { y: 262, label: "RYD Raksha journey" },
        { y: 318, label: "Motor renewal" },
        { y: 374, label: "Post-payment buying" },
      ].map((j) => (
        <g key={j.label}>
          <path d={`M230 ${j.y + 18} H262`} stroke="var(--line-strong)" />
          <Node x={262} y={j.y} w={190} h={36} label={j.label} tone="muted" />
        </g>
      ))}
    </Svg>
  );
}
