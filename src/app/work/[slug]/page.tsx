import type { Metadata } from "next";
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

/**
 * Every known slug is fully prerendered and case-study links are prefetched,
 * so navigations are effectively instant in production. Reading `params`
 * directly (no Suspense) keeps a fallback out of the static HTML, which
 * would otherwise be swapped for the content and shift the layout.
 */
export const instant = false;

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index]!;
  const next = projects[(index + 1) % projects.length]!;
  return <CaseStudy project={project} next={next} total={projects.length} />;
}
