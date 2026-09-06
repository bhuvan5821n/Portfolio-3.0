import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/chrono/case-study";
import { projects } from "@/data/projects";
import { getPortfolioProject, getPortfolioProjects } from "@/lib/portfolio-api";
import {
  createCreativeWorkJsonLd,
  createProjectMetadata,
  serializeJsonLd,
} from "@/lib/metadata";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? createProjectMetadata(project) : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [projectResult,projectsResult] = await Promise.all([getPortfolioProject(slug),getPortfolioProjects()]);
  const index = projectsResult.data.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projectResult.data;
  if (!project) notFound();
  const nextProject = projectsResult.data[(index + 1) % projectsResult.data.length];

  return (
    <>
      <CaseStudy project={project} nextProject={nextProject} />
      <script
        data-content-source={projectResult.source}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(createCreativeWorkJsonLd(project)) }}
      />
    </>
  );
}
