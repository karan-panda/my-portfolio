import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0a",
        color: "#f2efe8",
        fontSize: 84,
        letterSpacing: -6,
      }}
    >
      K<span style={{ color: "#32f438" }}>/</span>P
    </div>,
    size,
  );
}
