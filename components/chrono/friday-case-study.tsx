import Link from 'next/link';
import type { ArchiveProject } from '@/data/projects';
import { fridayChapters, fridaySource } from '@/data/friday-study';
import { FridayGallery } from './friday-gallery';

export function FridayCaseStudy({project:p,nextProject}:{project:ArchiveProject;nextProject:ArchiveProject}) {
  return <>
    <div className="case-back wrap"><Link className="text-link" href="/projects">← All projects</Link><span className="eyebrow">Personal AI / Prototype</span></div>
    <header className="friday-heading wrap"><div><p className="eyebrow">Flagship project / Intelligence System</p><h1>FRIDAY<span>.</span></h1></div><div><p className="friday-deck">An assistant built around<br/>the way I use my computer.</p><p className="muted">Voice, context and tools in one desktop workspace.</p></div></header>
    <FridayGallery/>
    <div className="case-layout wrap friday-story"><aside className="case-index"><details className="chapter-directory" open><summary>The project record</summary><nav aria-label="Case study chapters"><a href="#why">01 Why</a><a href="#interface">02 Interface</a>{fridayChapters.slice(1).map((c,i)=><a key={c.id} href={`#${c.id}`}>{String(i+3).padStart(2,'0')} {c.label}</a>)}</nav></details><h2>Working with</h2><p>{p.tools?.join(' · ')}</p><h2>My role</h2><p>{p.role}</p></aside>
    <div className="case-chapters">{fridayChapters.map((c,i)=><section key={c.id} id={c.id}><p className="eyebrow">{String(i===0?1:i+2).padStart(2,'0')} / {c.label}</p><h2>{c.title}</h2><p>{c.body}</p>{c.id==='architecture'&&<ol className="architecture-flow" aria-label="Application responsibilities"><li><strong>Interface</strong><span>PyQt6 / state & controls</span></li><li><strong>Conversation</strong><span>Voice / text & vision</span></li><li><strong>Context & actions</strong><span>Memory / desktop tools</span></li></ol>}<details className="engineering-note"><summary>Implementation & evidence</summary><p>{c.detail}</p><a className="text-link" href={fridaySource(c.source)} target="_blank" rel="noreferrer">Inspect {c.source} ↗</a></details></section>)}<aside className="source-note"><h2>Source, beside the story.</h2><p>The supplied image records the interface on 16 August 2026. Public source was inspected on 5 September 2026. A fresh end-to-end functional test of the assistant is outside this portfolio record.</p><a className="text-link" href={p.links?.[0]?.href} target="_blank" rel="noreferrer">Explore the full repository ↗</a></aside></div></div>
    <div className="chapter wrap"><p className="eyebrow">Continue through the archive</p><Link className="next-project" href={`/projects/${nextProject.slug}`}>{nextProject.name}<span aria-hidden="true">↗</span></Link></div>
  </>;
}
