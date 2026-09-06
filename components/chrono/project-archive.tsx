"use client";
import Link from "next/link";
import {useState} from "react";
import type {ArchiveProject} from "@/data/projects";
const filters=['All work','AI & automation','Apps','Web & business','Concepts & experiments'];
export function ProjectArchive({projects,source}:{projects:readonly ArchiveProject[];source:"api"|"local"}){
 const [filter,setFilter]=useState('All work');
 const shown=projects.filter(p=>filter==='All work'||(p.category??'Concepts & experiments')===filter);
 return <div className="wrap archive" data-content-source={source}><div className="archive-toolbar"><div className="filter-list" aria-label="Filter projects">{filters.map(f=><button key={f} type="button" aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><p role="status">{shown.length} / {projects.length} projects</p></div>
 <div className="project-rows">{shown.map(p=><article key={p.slug} className={`project-row ${p.slug==='friday'?'project-featured':''}`}>
 {p.slug==='friday'&&<header className="archive-flagship-heading"><div className="project-meta"><span>Flagship / Personal AI</span><span>{p.status}</span></div><h2><Link href="/projects/friday">FRIDAY.</Link></h2></header>}
 {p.media?.[0]&&<Link href={`/projects/${p.slug}`} className="project-image"><img src={p.media[0].source} alt={p.media[0].alt} width={p.slug==='friday'?1920:1200} height={p.slug==='friday'?1080:750} loading="lazy"/></Link>}
 <div className="project-row-copy">{p.slug!=='friday'&&<><div className="project-meta"><span>{String(projects.indexOf(p)+1).padStart(2,'0')} / ARCHIVE</span><span>{p.status??'Documentation in progress'}</span></div><h2><Link href={`/projects/${p.slug}`}>{p.name}</Link></h2></>}<p>{p.description}</p><div className="project-row-bottom"><span>{p.tools?.slice(0,3).join(' / ')??(p.category??'Concepts & experiments')}</span><Link className="text-link" href={`/projects/${p.slug}`}>Read case study ↗</Link></div></div></article>)}</div></div>;
}
