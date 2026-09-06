import Link from 'next/link';
import type {CreatorCapability} from '@/data/capabilities';

export function CapabilityDetails({capability:c}:{capability:CreatorCapability}) {
  if(!c.headline) return <div className="capability-body"><div><h3>{c.shortDescription}</h3><p>{c.statement}</p><p className="muted">{c.stageDetail}</p></div><div><ul>{c.actions.map(a=><li key={a}>{a}</li>)}</ul><p className="media-caption">{c.workingSet.join(' · ')}</p>{c.evidence.map(e=><Link className="text-link" key={e.route} href={e.route}>{e.label} ↗</Link>)}</div></div>;
  return <div className="technical-capability">
    <div className="technical-lead"><div><h3>{c.headline}</h3><p>{c.statement}</p><p className="technical-stage">{c.stageDetail}</p></div><div><h4>What I {c.id==='ai'?'work on':'do'}</h4><ul>{c.actions.map(a=><li key={a}>{a}</li>)}</ul></div></div>
    {c.languages&&<section className="capability-languages" aria-labelledby={`${c.id}-languages`}><h4 id={`${c.id}-languages`}>Languages / in the source</h4><ul>{c.languages.map(l=><li key={l.name}><div><strong>{l.name}</strong><span>{l.stage}</span></div><a href={l.source} target="_blank" rel="noreferrer" aria-label={`Inspect ${l.name} source in ${l.project}`}>{l.project}<span aria-hidden="true">↗</span></a></li>)}</ul></section>}
    <div className="technical-working-set"><div><h4>{c.id==='engineering'?'Application stack':'Working set'}</h4><ul className="capability-chips">{c.workingSet.map(item=><li key={item}>{item}</li>)}</ul></div>{c.tools&&<div><h4>Workflow tools / hands-on</h4><ul className="capability-chips">{c.tools.map(item=><li key={item}>{item}</li>)}</ul><a className="technical-profile-source" href="https://github.com/bhuvan5821n/bhuvan5821n#readme" target="_blank" rel="noreferrer">Listed in my public profile ↗</a></div>}</div>
    <section className="capability-evidence" aria-labelledby={`${c.id}-evidence`}><h4 id={`${c.id}-evidence`}>Proof, not percentages</h4><p>{c.evidenceNote}</p><div>{c.evidence.map(e=><Link key={e.route} href={e.route}><strong>{e.label}<span aria-hidden="true">↗</span></strong><span>{e.detail}</span></Link>)}</div></section>
  </div>;
}
