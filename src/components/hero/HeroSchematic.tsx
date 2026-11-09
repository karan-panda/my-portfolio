/**
 * Decorative "system dial": concentric rings for the layers Karan works
 * across (interface → API → AI → cloud). Pure SVG + CSS; HeroMotion adds
 * cursor parallax via the data-depth attributes.
 */
const layers = [
  { r: 92, label: "UI", angle: -38 },
  { r: 150, label: "API", angle: 24 },
  { r: 208, label: "AI", angle: 148 },
  { r: 266, label: "CLOUD", angle: 236 },
];

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: 300 + r * Math.cos(a), y: 300 + r * Math.sin(a) };
}

export function HeroSchematic() {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <svg
      viewBox="0 0 600 600"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <g data-depth="0.6" data-schematic-part>
        {ticks.map((d) => {
          const long = d % 30 === 0;
          const a = polar(286, d);
          const b = polar(long ? 300 : 294, d);
          return (
            <line
              key={d}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={long ? "var(--muted)" : "var(--line-strong)"}
              strokeWidth="1"
            />
          );
        })}
      </g>

      {layers.map((l, i) => {
        const p = polar(l.r, l.angle);
        return (
          <g key={l.label} data-depth={(0.25 + i * 0.18).toFixed(2)} data-schematic-part>
            <g className="schematic-spin" style={{ animationDuration: `${60 + i * 25}s`, animationDirection: i % 2 ? "reverse" : "normal" }}>
              <circle
                cx="300"
                cy="300"
                r={l.r}
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth="1"
                strokeDasharray={i % 2 ? "2 6" : "1 0"}
              />
              <circle cx={p.x} cy={p.y} r="4" fill={i === 2 ? "var(--accent)" : "var(--text)"} />
              <circle cx={p.x} cy={p.y} r="11" fill="none" stroke={i === 2 ? "var(--accent)" : "var(--muted)"} strokeWidth="1" />
              <text
                x={p.x + 16}
                y={p.y + 4}
                fill="var(--text-dim)"
                fontFamily="var(--font-mono)"
                fontSize="11"
                letterSpacing="1.5"
              >
                {l.label}
              </text>
            </g>
          </g>
        );
      })}

      <g data-depth="1" data-schematic-part>
        <line x1="270" y1="300" x2="330" y2="300" stroke="var(--accent)" strokeWidth="1" />
        <line x1="300" y1="270" x2="300" y2="330" stroke="var(--accent)" strokeWidth="1" />
        <circle cx="300" cy="300" r="22" fill="none" stroke="var(--accent)" strokeWidth="1" />
      </g>
    </svg>
  );
}
