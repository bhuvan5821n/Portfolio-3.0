import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ProjectObject } from "@/components/projects/project-object";
import type { Project } from "@/data/projects";

export function ProjectMap({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="quest-map">
      <div className="quest-cable" aria-hidden="true" />
      {projects.map((project, index) => (
        <article className={`quest-stop quest-stop--${index + 1}`} key={project.slug}>
          <div className="quest-stop__node" aria-hidden="true" />
          <div className="quest-stop__platform">
            <ProjectObject slug={project.slug} priority={index < 2} />
          </div>
          <div className="quest-stop__dossier">
            <span className="status-label">{project.status ?? "Documentation in progress"}</span>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <Link href={`/projects/${project.slug}`}>
              Read case study
              <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
