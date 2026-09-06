"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Tree } from "@/components/chrono/tree";
import { seasonForPath } from "@/data/seasons";
export function SiteShell({children}:{children:ReactNode}) {
  const pathname=usePathname(); const season=seasonForPath(pathname);
  const shell=useRef<HTMLDivElement>(null); const progress=useRef<HTMLOutputElement>(null);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',({winter:'#101a20',autumn:'#211b18',summer:'#14251e',spring:'#eeeade',equinox:'#1c2020'})[season.id]);
    document.documentElement.style.colorScheme=season.id==='spring'?'light':'dark';
    let raf=0;
    const reduce=matchMedia('(prefers-reduced-motion: reduce)');
    function paint(){
      raf=0; const max=document.documentElement.scrollHeight-innerHeight;
      const t=Math.max(0,Math.min(1,max>0?scrollY/max:0));
      if(progress.current) progress.current.textContent=`t = ${t.toFixed(3)}`;
      if(shell.current) shell.current.style.setProperty('--travel',paused||reduce.matches?'0':String(t));
      if(shell.current) shell.current.style.setProperty('--cover-fade',String(1-Math.min(1,scrollY/(innerHeight*.8))));
    }
    const schedule=()=>{if(!raf) raf=requestAnimationFrame(paint);};
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);paint();
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);};
  },[pathname,paused,season.id]);
  return <div ref={shell} className={`site-shell season-${season.id}`} data-season={season.id} data-case={pathname.startsWith('/projects/')}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="world-environment" aria-hidden="true"><picture className="world-plate"><source media="(max-width: 767px)" srcSet={`/media/environments/${season.id==='winter'?'winter':'equinox'}-mobile.webp`}/><img src={`/media/environments/${season.id==='winter'?'winter':'equinox'}.webp`} alt="" width="1536" height="1024" fetchPriority={season.id==='winter'||season.id==='equinox'?'high':'low'}/></picture><div className="world-atmosphere"/><div className="world-grid"/><Tree season={season.id}/><div className="world-horizon"/></div>
    <SiteHeader/>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <div className="world-status"><span>{season.id} / {season.label}</span><output aria-live="off" ref={progress} aria-label="Page scroll progress">t = 0.000</output><button type="button" aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?'Resume atmosphere':'Pause atmosphere'}</button></div>
    <SiteFooter/>
  </div>;
}
