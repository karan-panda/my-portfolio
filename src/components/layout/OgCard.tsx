/**
 * Shared layout for generated social preview images (rendered by next/og).
 * Uses inline styles only — ImageResponse supports a subset of CSS.
 */
export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0b0b0a",
        color: "#f2efe8",
        backgroundImage:
          "linear-gradient(rgba(242,239,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,232,0.05) 1px, transparent 1px)",
        backgroundSize: "96px 96px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 44, letterSpacing: -2 }}>
          K<span style={{ color: "#32f438" }}>/</span>P
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8a877f", textTransform: "uppercase" }}>{eyebrow}</div>
      </div>
      <div style={{ display: "flex", fontSize: 76, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#bdb9b0" }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#32f438" }} />
        {footer}
      </div>
    </div>
  );
}
