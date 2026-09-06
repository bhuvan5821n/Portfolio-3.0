import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileImageIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ProjectObject } from "@/components/projects/project-object";
import type { Project } from "@/data/projects";

const supportingAssets: Partial<Record<string, { src: string; width: number; height: number }>> = {
  friday: { src: "/media/curiosity-arcade/chip.webp", width: 324, height: 275 },
  fleetmind: { src: "/media/curiosity-arcade/joystick.webp", width: 272, height: 356 },
  "grain-za": { src: "/media/curiosity-arcade/notebook.webp", width: 422, height: 347 },
  markwell: { src: "/media/curiosity-arcade/notebook.webp", width: 422, height: 347 },
  "space-shooter": { src: "/media/curiosity-arcade/joystick.webp", width: 272, height: 356 },
  "procedural-frontier": { src: "/media/curiosity-arcade/notebook.webp", width: 422, height: 347 },
};

function DetailValue({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ContentList({ title, items }: { title: string; items: readonly string[] | null }) {
  if (!items?.length) return null;
  return (
    <section className="case-content-block">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function MissionRoom({ project, nextProject }: { project: Project; nextProject: Project }) {
  const support = supportingAssets[project.slug];
  const hasMeta = Boolean(project.year || project.duration || project.role || project.team);

  return (
    <article className={`mission-page mission-page--${project.slug}`}>
      <div className="mission-room graphite-world">
        <Link className="return-link" href={project.slug === "space-shooter" || project.slug === "procedural-frontier" ? "/lab" : "/projects"}>
          <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
          Back to {project.slug === "space-shooter" || project.slug === "procedural-frontier" ? "Experiments" : "Work"}
        </Link>

        <div className="mission-room__cable" aria-hidden="true" />
        <header className="mission-dossier">
          <span className="status-label">{project.status ?? "Project documentation in progress"}</span>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          {hasMeta ? (
            <dl>
              <DetailValue label="Year" value={project.year} />
              <DetailValue label="Duration" value={project.duration} />
              <DetailValue label="Role" value={project.role} />
              <DetailValue label="Team" value={project.team} />
            </dl>
          ) : (
            <p className="documentation-note">Project dates, role, and team details are being documented.</p>
          )}
          {project.links?.length ? (
            <div className="mission-links">
              {project.links.map((link) => (
                <a href={link.href} key={link.href}>{link.label}</a>
              ))}
            </div>
          ) : null}
        </header>

        <div className="mission-platform" aria-hidden="true">
          <ProjectObject slug={project.slug} priority />
          {support ? <Image className="mission-support" src={support.src} alt="" width={support.width} height={support.height} /> : null}
          <div className="platform-shadow" />
        </div>

        <aside className="mission-scene-note">
          <strong>{project.missionRoom.centralObject}</strong>
          <p>{project.missionRoom.evidenceNotice}</p>
        </aside>
      </div>

      <div className="case-study-paper paper-world">
        <section className="evidence-section section-shell" aria-labelledby="evidence-title">
          <div className="section-heading section-heading--stacked">
            <h2 id="evidence-title">Project evidence</h2>
            <p>Real captures and supporting files will appear here when they can be verified.</p>
          </div>
          {project.media?.length ? (
            <div className="evidence-grid">
              {project.media.map((item) => (
                <figure key={item.source}>
                  <Image src={item.source} alt={item.alt} width={1200} height={800} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="missing-evidence">
              <FileImageIcon size={44} weight="duotone" aria-hidden="true" />
              <div>
                <strong>Visual documentation in progress</strong>
                <p>No screenshot, video, deck, or source file is published here yet.</p>
              </div>
            </div>
          )}
        </section>

        <div className="case-content section-shell">
          {project.context || project.problem || project.targetUser ? (
            <section className="case-content-block case-content-block--lead">
              <h2>What this project is about</h2>
              {project.context ? <p>{project.context}</p> : null}
              {project.problem ? <p>{project.problem}</p> : null}
              {project.targetUser ? <p>Intended for: {project.targetUser}</p> : null}
            </section>
          ) : (
            <section className="case-content-block case-content-block--lead">
              <WarningCircleIcon size={34} weight="duotone" aria-hidden="true" />
              <h2>Case-study notes are being organized.</h2>
              <p>Known facts stay visible above. Unsupported implementation claims and results have been left out.</p>
            </section>
          )}
          <ContentList title="My contribution" items={project.contribution} />
          <ContentList title="Implemented" items={project.implemented} />
          <ContentList title="Being tested" items={project.testing} />
          <ContentList title="Planned" items={project.planned} />
          <ContentList title="Decisions" items={project.decisions} />
          <ContentList title="Tools" items={project.tools} />
          <ContentList title="What I learned" items={project.learning} />
          <ContentList title="Limitations" items={project.limitations} />
          {project.nextStep ? (
            <section className="case-content-block">
              <h2>Next test</h2>
              <p>{project.nextStep}</p>
            </section>
          ) : null}
        </div>
      </div>

      <aside className="next-project graphite-world">
        <div className="next-project__cable" aria-hidden="true" />
        <Link href={`/projects/${nextProject.slug}`} data-testid="next-project">
          <span>Next project</span>
          <strong>{nextProject.name}</strong>
          <ArrowRightIcon size={28} weight="bold" aria-hidden="true" />
        </Link>
      </aside>
    </article>
  );
}
