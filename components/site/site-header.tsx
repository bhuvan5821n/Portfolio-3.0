"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState,useSyncExternalStore} from "react";
import {ArrowUpRightIcon, ListIcon, XIcon} from "@phosphor-icons/react";
import {seasons,seasonForPath} from "@/data/seasons";
import {projects} from "@/data/projects";
const commands=[...seasons.map(s=>({label:s.label,detail:`${s.id} · ${s.era}`,href:s.href,terms:`season ${s.id} ${s.label}`})),{label:'Music',detail:'Creative signals · Spotify',href:'/profile#music',terms:'music spotify'},{label:'Manhwa',detail:'ERROR 404: HERO NOT FOUND',href:'/profile#manhwa',terms:'manhwa webtoon story'},...projects.map(p=>({label:p.name,detail:'Project case study',href:`/projects/${p.slug}`,terms:p.slug}))];
export function SiteHeader(){
  const shortcut=useSyncExternalStore(subscribePlatform,()=>/Mac|iPhone|iPad/.test(navigator.platform)?'⌘':'Ctrl',()=> 'Ctrl');
  const pathname=usePathname(); const current=seasonForPath(pathname);
  const dialog=useRef<HTMLDialogElement>(null);const input=useRef<HTMLInputElement>(null);const trigger=useRef<HTMLElement|null>(null);
  const [open,setOpen]=useState(false);const [search,setSearch]=useState('');
  const show=(command=false)=>{trigger.current=document.activeElement as HTMLElement;setSearch('');dialog.current?.showModal();setOpen(true);if(command)input.current?.focus();};
  const close=()=>dialog.current?.close();
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.current?.open)dialog.current.close();else{trigger.current=document.activeElement as HTMLElement;setSearch('');dialog.current?.showModal();setOpen(true);input.current?.focus();}}};addEventListener('keydown',key);return()=>removeEventListener('keydown',key);},[]);
  useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[open]);
  const results=commands.filter(c=>`${c.label} ${c.detail} ${c.terms}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="CHRONO ROOTS home">CHRONO<span>//</span>ROOTS<span className="brand-edition">BGP / 03</span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{seasons.map(s=><Link key={s.id} href={s.href} aria-current={current.id===s.id?'page':undefined}>{s.label}</Link>)}</nav>
      <button className="map-trigger" type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={open} onClick={()=>show()}><span>Menu</span><ListIcon size={22} aria-hidden="true"/></button>
      <button className="command-trigger" type="button" aria-label={`Open command menu, ${shortcut} K`} aria-keyshortcuts={`${shortcut==='⌘'?'Meta':'Control'}+K`} onClick={()=>show(true)}><span>{shortcut} K</span></button>
    </header>
    <dialog ref={dialog} className="chrono-dialog" aria-labelledby="chrono-title" onClose={()=>{setOpen(false);trigger.current?.focus();}} onClick={e=>{if(e.target===dialog.current)close();}}>
      <div className="dialog-top"><div><p className="eyebrow">One world. Five seasons.</p><h2 id="chrono-title">Chrono map</h2></div><button type="button" className="icon-button" aria-label="Close navigation" onClick={close}><XIcon size={24}/></button></div>
      <label className="search-label" htmlFor="command-search">Find a page, project or creative work</label>
      <input ref={input} id="command-search" type="search" name="command" autoComplete="off" spellCheck={false} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Try music, projects or season winter…" onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();dialog.current?.querySelector<HTMLAnchorElement>('.command-results a')?.focus();}}}/>
      <nav className="command-results" aria-label="Chrono map navigation">{(search?results:commands.slice(0,7)).map((c,i)=><Link key={c.href} href={c.href} onClick={close}><span className="map-number">{String(i+1).padStart(2,'0')}</span><span><strong>{c.label}</strong><small>{c.detail}</small></span><ArrowUpRightIcon size={22} aria-hidden="true"/></Link>)}{!results.length&&<p role="status">No matching page. Try a project name or a season.</p>}</nav>
      <p className="dialog-help">{shortcut} K to open · Tab to explore · Escape to close</p>
    </dialog>
  </>;
}
function subscribePlatform(){return ()=>{};}
