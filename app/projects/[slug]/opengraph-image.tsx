import { projects } from "@/data/projects";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Project case study artwork for Bhuvan Gowda P";
export const size = socialImageSize;
export const contentType = "image/png";

type SocialProject = {
  slug: string;
  name: string;
  description?: string | null;
  summary?: string | null;
};

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (projects as readonly SocialProject[]).find(
    (item) => item.slug === slug,
  );

  return createSocialImage({
    eyebrow: "Project case study",
    title: project?.name ?? "Project",
    description:
      project?.description ??
      project?.summary ??
      "Project documentation from Bhuvan Gowda P's portfolio.",
  });
}
