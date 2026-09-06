import Link from 'next/link';
import {PageHeading} from '@/components/chrono/page-heading';
import {portfolioHistory} from '@/data/achievements';
import {routeMetadata} from '@/lib/metadata';
import {getPortfolioAchievements} from '@/lib/portfolio-api';
export const metadata=routeMetadata.presentations;
export default async function Achievements(){const result=await getPortfolioAchievements();const milestones=result.data;return <>
  <PageHeading season="Spring" era="The academy" title={<>Growth leaves<br/>a record.</>}><p>Study, building and creative publication. A growing archive of work, with the source beside each milestone.</p></PageHeading>
  <section className="wrap scholar-records" aria-labelledby="records-title" data-content-source={result.source}><div className="scholar-ledger-heading"><p className="eyebrow">The collected record</p><h2 id="records-title">From study to something tangible.</h2><p>Academic direction. Working projects. A published story.</p></div>{milestones.map((m,i)=><article key={m.title}><div className="record-index">{String(i+1).padStart(2,'0')}<span>{m.type}</span></div><div><h3>{m.title}</h3><p>{m.detail}</p>{m.date&&<time dateTime={m.date}>29 August 2026</time>}{m.source&&<a className="text-link" href={m.source} target="_blank" rel="noreferrer">{m.label} ↗</a>}</div></article>)}</section>
  <section className="chapter wrap scholar-note"><p className="eyebrow">The next folio</p><h2>Ideas worth<br/>working through.</h2><p>FleetMind explores an AI-assisted fleet-management concept. Its place in this archive is a concept study; event participation and award details are not established.</p><Link className="text-link" href="/projects/fleetmind">Read the FleetMind study ↗</Link></section>
  <section className="chapter wrap"><p className="eyebrow">Builder timeline</p><h2>Learning, through iteration.</h2><ol className="history">{portfolioHistory.map(h=><li key={h.version}><span>{h.version}</span><div><h3>{h.title}</h3><p>{h.detail}</p></div></li>)}</ol></section>
</>;}
