"use client";
import {useEffect,useRef,useState} from "react";
import {compactHeroFrames,largeHeroFrames} from "@/data/hero-manifest";
type DeviceNavigator=Navigator & {deviceMemory?:number;connection?:{saveData?:boolean;effectiveType?:string}};
type Frame={image:ImageBitmap|HTMLImageElement;width:number;height:number};
const closeFrame=(f:Frame)=>{if('close' in f.image)f.image.close();};
export function ScrollIntro(){
  const section=useRef<HTMLElement>(null),canvas=useRef<HTMLCanvasElement>(null),counter=useRef<HTMLOutputElement>(null),range=useRef<HTMLInputElement>(null);
  const [mode,setMode]=useState<'sampling'|'active'|'static'|'paused'>('sampling');
  const [reason,setReason]=useState('Checking playback capability');
  const [replay,setReplay]=useState(0);
  const move=useRef<(n:number)=>void>(()=>{});
  useEffect(()=>{
    const root=section.current,el=canvas.current;if(!root||!el)return;
    // Replay must reveal the retained poster while its fresh cache is being prepared.
    el.style.opacity='0';
    let alive=true,raf=0,sampleRaf=0,target=0,drawn=-1,active=0,queue:number[]=[],ready=false,visible=false,slowDecodes=0;
    let width=1,height=1,dpr=1,start=0,travel=1,lean=false;
    const cache=new Map<number,Frame>(),pending=new Map<number,AbortController>(),failed=new Set<number>();
    const nav=navigator as DeviceNavigator, reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const compact=matchMedia('(pointer: coarse)').matches || innerWidth<900;
    const sources=compact?compactHeroFrames:largeHeroFrames,limit=compact?24:36;
    const context=el.getContext('2d',{alpha:false});
    function draw(index:number){
      if(!context||!cache.has(index))return;
      const f=cache.get(index)!;
      const begin=performance.now(),scale=Math.min(width/f.width,height/f.height);
      context.setTransform(dpr,0,0,dpr,0,0);
      context.fillStyle='#000';context.fillRect(0,0,width,height);
      context.drawImage(f.image,(width-f.width*scale)/2,(height-f.height*scale)/2,f.width*scale,f.height*scale);
      drawn=index;el!.style.opacity='1';root!.dataset.renderedFrame=String(index);
      root!.dataset.drawMs=(performance.now()-begin).toFixed(2);
    }
    function evict(){
      const candidates=[...cache.keys()].filter(i=>i!==target&&i!==drawn).sort((a,b)=>Math.abs(b-target)-Math.abs(a-target));
      while(cache.size>limit&&candidates.length){const i=candidates.shift()!;closeFrame(cache.get(i)!);cache.delete(i);}
      root!.dataset.cacheSize=String(cache.size);
    }
    function degrade(why:string){
      ready=false;queue=[];pending.forEach(c=>c.abort());setMode('paused');setReason(why);root!.dataset.capability='C';
    }
    function pump(){
      if(!alive||!ready||!visible||document.hidden)return;
      while(active<(lean?2:3)&&queue.length){
        // Reserve a loader for a new scroll target instead of filling every slot with neighbors.
        if(queue[0]!==target&&active>=(lean?1:2))break;
        const i=queue.shift()!;if(cache.has(i)||pending.has(i)||failed.has(i))continue;
        const controller=new AbortController();pending.set(i,controller);active++;
        const load=async()=>{
          try{
            const response=await fetch(sources[i],{signal:controller.signal,cache:'force-cache'});
            if(!response.ok)throw Error('frame unavailable');
            const blob=await response.blob(); const before=performance.now();let f:Frame;
            if(typeof createImageBitmap==='function'){const bitmap=await createImageBitmap(blob);f={image:bitmap,width:bitmap.width,height:bitmap.height};}
            else{const url=URL.createObjectURL(blob);try{const image=new Image();image.src=url;await image.decode();f={image,width:image.naturalWidth,height:image.naturalHeight};}finally{URL.revokeObjectURL(url);}}
            if(!alive||controller.signal.aborted){closeFrame(f);return;}
            const decode=performance.now()-before;root!.dataset.decodeMs=decode.toFixed(2);
            slowDecodes=decode>90?slowDecodes+1:Math.max(0,slowDecodes-1);
            cache.set(i,f);if(i===target)draw(i);evict();
            // Async bitmap latency includes browser scheduling; it is not a main-thread stall.
            // Reduce speculative work, but continue serving the visitor's current scroll position.
            if(slowDecodes>=3){lean=true;root!.dataset.prefetch='lean';queue=queue.filter(n=>Math.abs(n-target)<=2);}
          }catch{if(!controller.signal.aborted){failed.add(i);root!.dataset.frameError=String(i);if(failed.size>=4)degrade('Sequence unavailable — the portrait remains visible');}}
          finally{
            pending.delete(i);active--;
            // Rapid reversals can make an aborted in-flight frame the target again.
            // Requeue it after cancellation settles, even if there is no further scroll event.
            if(alive&&ready&&!cache.has(target)&&!pending.has(target)&&!failed.has(target)&&!queue.includes(target))queue.unshift(target);
            pump();
          }
        };void load();
      }
    }
    function schedule(index:number){
      const direction=index>=target?1:-1;target=Math.max(0,Math.min(159,index));
      root!.dataset.frameIndex=String(target);
      if(counter.current)counter.current.textContent=`${String(target+1).padStart(3,'0')} / 160`;
      if(range.current)range.current.value=String(target);
      if(!ready)return;
      if(cache.has(target)&&target!==drawn)draw(target);
      queue=[target];
      for(let n=1;n<=(lean?2:9);n++)queue.push(target+n*direction);
      for(let n=1;n<=(lean?1:4);n++)queue.push(target-n*direction);
      queue=queue.filter(i=>i>=0&&i<160&&!cache.has(i)&&!pending.has(i)&&!failed.has(i));
      pending.forEach((c,i)=>{if(Math.abs(i-target)>20)c.abort();});
      pump();
    }
    function readScroll(){raf=0;if(!visible||!ready)return;schedule(Math.round(Math.max(0,Math.min(1,(scrollY-start)/travel))*159));}
    function onScroll(){if(!raf)raf=requestAnimationFrame(readScroll);}
    function resize(){
      const rect=el!.getBoundingClientRect();width=rect.width;height=rect.height;dpr=Math.min(devicePixelRatio||1,compact?1.5:2);
      el!.width=Math.round(width*dpr);el!.height=Math.round(height*dpr);
      start=root!.getBoundingClientRect().top+scrollY-80;
      travel=Math.max(1,root!.offsetHeight-root!.querySelector<HTMLElement>('.sequence-stage')!.offsetHeight);
      if(drawn>=0)draw(drawn);onScroll();
    }
    const ro=new ResizeObserver(resize);ro.observe(el);ro.observe(root);
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){schedule(target);onScroll();}},{rootMargin:'250px'});
    observer.observe(root);
    const policy=()=>{
      if(reduced.matches||nav.connection?.saveData){setMode('static');setReason(reduced.matches?'Still portrait · reduced motion':'Still portrait · data saving');root.dataset.capability='D';return true;}
      if((nav.deviceMemory!==undefined&&nav.deviceMemory<=2)||['slow-2g','2g'].includes(nav.connection?.effectiveType??'')){setMode('static');setReason('Still portrait · lighter experience');root.dataset.capability='C';return true;}
      return false;
    };
    let times:number[]=[],last=0;
    function sample(now:number){
      if(!alive)return;
      if(last)times.push(now-last);last=now;
      if(times.length<20){sampleRaf=requestAnimationFrame(sample);return;}
      const sorted=[...times].sort((a,b)=>a-b),median=sorted[Math.floor(sorted.length/2)];
      root!.dataset.sampleMs=median.toFixed(2);
      if(median>35){setMode('static');setReason('Still portrait · lighter experience');root!.dataset.capability='C';}
      else{ready=true;setMode('active');setReason('Scroll to move the portrait');root!.dataset.capability=compact?'B':'A';resize();onScroll();}
    }
    if(!policy())sampleRaf=requestAnimationFrame(sample);
    const preferenceChange=()=>{if(reduced.matches){ready=false;queue=[];pending.forEach(c=>c.abort());setMode('paused');setReason('Still portrait · reduced motion');root.dataset.capability='D';}};
    reduced.addEventListener('change',preferenceChange);
    addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',resize);
    const visibility=()=>{if(!document.hidden)onScroll();};document.addEventListener('visibilitychange',visibility);
    move.current=(n)=>{schedule(n);window.scrollTo({top:start+travel*n/159,behavior:'instant'});};
    resize();
    return()=>{alive=false;cancelAnimationFrame(raf);cancelAnimationFrame(sampleRaf);ro.disconnect();observer.disconnect();removeEventListener('scroll',onScroll);removeEventListener('resize',resize);reduced.removeEventListener('change',preferenceChange);document.removeEventListener('visibilitychange',visibility);pending.forEach(c=>c.abort());cache.forEach(closeFrame);cache.clear();};
  },[replay]);
  const skip=()=>{const next=document.getElementById('selected-work');next?.scrollIntoView({behavior:'instant'});next?.focus({preventScroll:true});};
  return <section ref={section} className={`intro-sequence sequence-${mode}`} id="portrait-sequence" data-testid="intro-sequence" data-mode={mode} data-frame-index="0" aria-label="A portrait in 160 frames">
    <div className="sequence-stage">
      <div className="sequence-caption wrap"><div><p className="eyebrow">A portrait in time</p><h2>You set the pace.</h2></div><button type="button" className="text-link" onClick={skip}>Skip intro <span aria-hidden="true">↘</span></button></div>
      <div className="sequence-canvas-wrap">
        <img className="intro-poster" src={compactHeroFrames[79]} alt="Black-and-white personal portrait of Bhuvan Gowda P" width="640" height="360" loading="lazy"/>
        <canvas ref={canvas} className="intro-canvas" aria-hidden="true"/>
        <span className="sequence-corner" aria-hidden="true">BGP / PERSONAL ARCHIVE</span>
      </div>
      <div className="sequence-controls wrap"><p role="status">{reason}</p><button type="button" onClick={()=>{setReplay(n=>n+1);section.current?.scrollIntoView({behavior:'instant'});}} className="text-link">Replay intro ↺</button></div>
      <details className="sequence-options wrap"><summary>Portrait controls</summary><div className="sequence-scrubber"><output aria-live="off" ref={counter} aria-label="Selected frame">001 / 160</output>{mode==='active'&&<><label className="sr-only" htmlFor="frame-control">Choose a frame</label><input ref={range} id="frame-control" type="range" min="0" max="159" defaultValue="0" onChange={e=>move.current(Number(e.target.value))}/></>}</div><p className="media-caption">Original sequence · 160 frames. Use the arrow keys to explore.</p></details>
    </div>
  </section>;
}
