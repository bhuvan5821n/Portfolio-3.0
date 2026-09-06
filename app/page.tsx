import Link from "next/link";
import {ScrollIntro} from "@/components/intro/scroll-intro";
import {getPortfolioProfile,getPortfolioProjects} from "@/lib/portfolio-api";
import {routeMetadata} from "@/lib/metadata";
import {seasons} from "@/data/seasons";
import {fridayEvidence} from "@/data/friday-views";
export const metadata=routeMetadata.home;
export default async function Home(){const [profileResult,projectsResult]=await Promise.all([getPortfolioProfile(),getPortfolioProjects()]);const profile=profileResult.data,projects=projectsResult.data;return <>
  <section className="home-cover wrap" id="home-hero" tabIndex={-1} data-profile-source={profileResult.source} data-projects-source={projectsResult.source}>
    <div className="home-cover-copy"><p className="eyebrow">Winter / System boot</p><h1>Curiosity,<br/>with roots.</h1><p className="identity">{profile.name}</p><p className="home-deck">AI builder. Business student.<br/>Exploring software, stories &amp; sound.</p><div className="actions"><Link className="button primary" href="/projects">Explore projects <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/profile">Meet Bhuvan <span aria-hidden="true">↗</span></Link></div></div>
    <div className="home-world-label"><span>01 / WINTER</span><p>Every idea starts<br/>with a small branch.</p></div>
    <a className="cover-scroll" href="#portrait-sequence"><span>Scroll into the archive</span><span aria-hidden="true">↓</span></a>
  </section>
  <ScrollIntro/>
  <section className="chapter wrap home-selected" id="selected-work" tabIndex={-1}><div className="section-top"><div><p className="eyebrow">Things I’ve built</p><h2>Questions, given form.</h2></div><Link href="/projects" className="text-link">Open the archive ↗</Link></div><article className="home-flagship"><Link className="home-flagship-art" href="/projects/friday"><img src={fridayEvidence.overview} alt="The real FRIDAY Intelligence System desktop interface" width="1920" height="1080" loading="lazy"/></Link><div><p className="eyebrow">Flagship / Personal AI</p><h3>FRIDAY.</h3><p>A personal assistant built around the way I use my computer. Voice, context and tools, brought into one workspace.</p><Link className="text-link" href="/projects/friday">Inside FRIDAY ↗</Link></div></article><div className="home-projects">{projects.slice(1,3).map((p,i)=><Link className="home-project" key={p.slug} href={`/projects/${p.slug}`}><span className="project-number">0{i+2}</span><div><p className="eyebrow">{p.category}</p><h3>{p.name}</h3><p>{p.description}</p><span className="text-link">Explore case study ↗</span></div></Link>)}</div></section>
  <section className="chapter wrap home-manifesto"><p className="eyebrow">A builder has more than one language.</p><h2>Some ideas become systems.<br/>Others become stories.<br/>Or sound.</h2><div><p>I’m a business student who builds with technology, edits videos, creates music and tells stories. Different ways of following the same curiosity.</p><Link className="text-link" href="/profile#creative-signals">Discover creative signals ↗</Link></div></section>
  <section className="chapter wrap"><div className="section-top"><div><p className="eyebrow">Choose your season</p><h2>One world. Many ways in.</h2></div></div><nav className="season-index" aria-label="Explore the seasons">{seasons.slice(1).map(s=><Link key={s.id} href={s.href}><span className={`season-dot dot-${s.id}`}/><small>{s.id}</small><strong>{s.label}</strong><span>{s.note}</span><b aria-hidden="true">↗</b></Link>)}</nav></section>
</>;}
