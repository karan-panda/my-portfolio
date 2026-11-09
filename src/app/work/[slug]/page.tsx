import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { CaseStudy } from "@/components/case-study/CaseStudy";

/** Every case study is prerendered at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = project.name;
  const description = project.summary;
  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${title} — ${profile.name}`, description, type: "article", url: `/work/${project.slug}` },
    twitter: { card: "summary_large_image", title: `${title} — ${profile.name}`, description },
  };
}

type Params = PageProps<"/work/[slug]">["params"];

async function CaseStudyContent({ params }: { params: Params }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index]!;
  const next = projects[(index + 1) % projects.length]!;
  return <CaseStudy project={project} next={next} total={projects.length} />;
}

/** Shown only for slugs that were not prerendered, while they resolve. */
function CaseStudyFallback() {
  return (
    <div className="shell min-h-[80svh] pt-[calc(var(--nav-h)+2rem)]" aria-busy="true">
      <p className="text-label text-muted">Loading case study…</p>
    </div>
  );
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  return (
    <Suspense fallback={<CaseStudyFallback />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}
