import { ImageResponse } from "next/og";
import { OgCard } from "@/components/layout/OgCard";

export const alt = "Karan Panda — Software Engineer. Building systems that scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Software Engineer · Mumbai"
      title="Building systems that scale. Engineering experiences that matter."
      footer="Karan Panda — backend, full-stack, cloud & production GenAI"
    />,
    size,
  );
}
