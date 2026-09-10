import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { CaseStudyContent } from "./CaseStudyContent";

export function generateStaticParams() {
  return siteConfig.portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = siteConfig.portfolio.find((p) => p.slug === slug);
  if (!project) return {};
  const url = `${siteConfig.url}/portfolio/${slug}`;
  return {
    title: `${project.title} — Case Study | Atif Malik`,
    description: `${project.description} Result: ${project.result}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Atif Malik Portfolio`,
      description: project.description,
      url,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = siteConfig.portfolio.find((p) => p.slug === slug);
  if (!project) notFound();
  return <CaseStudyContent project={project} />;
}
