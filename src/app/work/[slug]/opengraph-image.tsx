import { ImageResponse } from "next/og";
import { OgCard } from "@/components/layout/OgCard";
import { getProject, projects } from "@/data/projects";

export const alt = "Case study by Karan Panda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const metric = project?.highlights[0];
  return new ImageResponse(
    <OgCard
      eyebrow={`Case study ${project?.index ?? ""}`}
      title={project?.name ?? "Case study"}
      footer={metric ? `${metric.value} · ${metric.label} — ${metric.context}` : (project?.category ?? "Karan Panda")}
    />,
    size,
  );
}
