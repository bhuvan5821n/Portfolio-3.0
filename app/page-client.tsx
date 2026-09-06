"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, QuestionIcon, WrenchIcon, SparkleIcon, CircuitryIcon } from "@phosphor-icons/react";
import { ScrollIntro } from "@/components/intro/scroll-intro";
import { ReplayIntroButton } from "@/components/intro/replay-intro-button";
import { NextWorld } from "@/components/site/next-world";
import MobileIntro from "@/components/intro/mobile-intro";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { routeMetadata } from "@/lib/metadata";

export default function PageClient() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const selectedSlugs = ["friday", "grain-za", "procedural-frontier"];
  const selectedAssets: Record<string, string> = {
    friday: "/media/curiosity-arcade/microphone.webp",
    "grain-za": "/media/curiosity-arcade/grain-za.webp",
    "procedural-frontier": "/media/curiosity-arcade/terrain.webp",
  };

  const selectedProjects = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <>
      {isMobile ? <MobileIntro /> : <ScrollIntro />}
      <div className="home-world paper-world">
        <section className="home-hero scene-shell" id="home-hero" tabIndex={-1}>
          <div className="paper-grain" aria-hidden="true" />
          <div className="home-cable cable-path" aria-hidden="true" />
          <div className="home-hero__copy">
            <p className="hero-name">{profile.name}</p>
            <h1>{profile.headline}</h1>
            <p className="hero-intro">{profile.introduction}</p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/projects">
                See what I&apos;m building
                <ArrowRightIcon size={20} weight="bold" aria-hidden="true" />
              </Link>
              <Link className="button button--secondary" href="/profile">
                About me
              </Link>
            </div>
          </div>

          <div className="curiosity-desk" aria-hidden="true">
            <img className="desk-rover" src="/media/curiosity-arcade/rover.webp" alt="" width={334} height={375} />
            <img className="desk-controller" src="/media/curiosity-arcade/controller.webp" alt="" width={339} height={287} />
            <img className="desk-microphone" src="/media/curiosity-arcade/microphone.webp" alt="" width={186} height={375} />
            <img className="desk-chip" src="/media/curiosity-arcade/chip.webp" alt="" width={324} height={275} />
            <img className="desk-spacecraft" src="/media/curiosity-arcade/spacecraft.webp" alt="" width={356} height={306} />
            <div className="desk-note">Try it. Break it. Keep the useful bit.</div>
          </div>
          <ReplayIntroButton />
        </section>

        <section className="selected-work section-shell" aria-labelledby="selected-work-title">
          <div className="section-heading section-heading--stacked">
            <h2 id="selected-work-title">Selected work</h2>
            <p>Projects at different stages, shown with honest status and no pretend results.</p>
          </div>
          <div className="selected-work__grid">
            {selectedProjects.map((project, index) => (
              <article className={`paper-project paper-project--${index + 1}`} key={project.slug}>
                <div className="paper-project__visual" aria-hidden="true">
                  <img src={selectedAssets[project.slug]} alt="" sizes="(max-width: 767px) 80vw, 28vw" />
                </div>
                <div className="paper-project__body">
                  <span className="status-label">{project.status ?? "Documentation in progress"}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a href={`/projects/${project.slug}`} className="text-link">
                    Read case study
                    <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="working-method section-shell" aria-labelledby="method-title">
          <div className="method-note">
            <span>How I work</span>
            <h2 id="method-title">Curiosity gets a repeatable loop.</h2>
            <p>{profile.workingMethod.description}</p>
          </div>
          <ol className="method-loop" aria-label={profile.workingMethod.label}>
            <li>
              <QuestionIcon size={30} weight="bold" aria-hidden="true" />
              <strong>Question</strong>
              <span>Start with the thing I cannot stop wondering about.</span>
            </li>
            <li>
              <WrenchIcon size={30} weight="bold" aria-hidden="true" />
              <strong>Prototype</strong>
              <span>Make the smallest version that can teach me something.</span>
            </li>
            <li>
              <SparkleIcon size={30} weight="bold" aria-hidden="true" />
              <strong>Observe</strong>
              <span>Notice what works, what fails, and what was only a guess.</span>
            </li>
            <li>
              <CircuitryIcon size={30} weight="bold" aria-hidden="true" />
              <strong>Rebuild</strong>
              <span>Keep the useful parts and change the rest.</span>
            </li>
          </ol>
        </section>

        <section className="home-about section-shell" aria-labelledby="home-about-title">
          <div className="home-about__prop" aria-hidden="true">
            <img src="/media/curiosity-arcade/notebook.webp" alt="" width={422} height={347} />
          </div>
          <div>
            <h2 id="home-about-title">I do more than code.</h2>
            <p>
              I edit videos, design visuals, build experiments and use business thinking to turn unusual ideas into things people can try.
            </p>
            <a className="text-link" href="/profile">
              See my capabilities
              <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <p className="home-about__aside">{profile.personalityNote}</p>
        </section>

        <section className="home-contact section-shell" id="contact" aria-labelledby="home-contact-title">
          <div>
            <h2 id="home-contact-title">Want to compare notes?</h2>
            <p>My public contact details are being verified. The About page keeps the current ways to follow my work.</p>
            <a className="button button--primary" href="/profile#contact">
              Contact
              <ArrowRightIcon size={20} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <div className="home-contact__prop" aria-hidden="true">
            <img src="/media/curiosity-arcade/radio.webp" alt="" width={340} height={349} />
          </div>
        </section>
      </div>
      <NextWorld href="/projects" label="Continue to" title="Work" tone="graphite" />
    </>
  );
}