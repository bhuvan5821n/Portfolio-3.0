'use client';

import { useEffect, useRef, useState } from 'react';
import { fridayEvidence as evidence } from '@/data/friday-views';

export function FridayGallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const restoreScroll = () => {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  };
  useEffect(() => () => restoreScroll(), []);
  const view = evidence.views[selected];
  function open() {
    dialog.current?.showModal();
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  return <section className="friday-gallery wrap" id="interface" aria-labelledby="interface-title">
    <div className="evidence-heading"><h2 id="interface-title">Inside the interface.</h2><span>Real application capture</span></div>
    <button className="interface-overview" type="button" ref={trigger} onClick={open} aria-label="Expand the original FRIDAY screenshot" aria-haspopup="dialog">
      <img src={evidence.overview} alt="FRIDAY Intelligence System: system overview at left, central assistant, AI routing and workspace controls at right, creative studios below." width="1920" height="1080" fetchPriority="high"/>
      <span className="image-expand">Inspect original <span aria-hidden="true">↗</span></span>
    </button>
    <p className="media-caption">{evidence.caption}</p>
    <div className="interface-detail">
      <div className="detail-intro"><p className="eyebrow">Four views / one capture</p><h3>A closer look.</h3><p>Explore the system panels, central assistant, routing controls and studio navigation.</p></div>
      <div className="detail-browser">
        <div className="detail-tabs" role="group" aria-label="Choose an interface detail">{evidence.views.map((v,i)=><button key={v.id} type="button" aria-pressed={selected===i} aria-controls="friday-detail" onClick={()=>setSelected(i)}>{v.label}</button>)}</div>
        <figure id="friday-detail" className={`interface-crop crop-${view.id}`}>
          <div className="crop-scroll" tabIndex={view.id==='studios'?0:undefined} role={view.id==='studios'?'region':undefined} aria-label={view.id==='studios'?'Scroll the original studio navigation':undefined}>
            <img src={view.source} alt={view.description} width={view.width} height={view.height} loading="lazy"/>
          </div>
          <figcaption>{view.description}</figcaption>
        </figure>
      </div>
    </div>
    <p className="evidence-boundary">{evidence.boundary}</p>
    <dialog ref={dialog} className="image-dialog" aria-labelledby="image-dialog-title" onClose={()=>{restoreScroll();trigger.current?.focus();}} onClick={e=>{if(e.target===dialog.current)dialog.current?.close();}}>
      <div className="image-dialog-bar"><h2 id="image-dialog-title">FRIDAY / original capture</h2><button type="button" className="button" autoFocus onClick={()=>dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></div>
      <p>Scroll to inspect the original pixels. <a href={evidence.original} target="_blank" rel="noreferrer">Open the original image ↗</a></p>
      <div className="image-dialog-scroll" tabIndex={0} role="region" aria-label="Full resolution screenshot, scroll horizontally and vertically"><img src={evidence.original} alt="Unmodified original FRIDAY Intelligence System screenshot" width="1920" height="1080" loading="lazy"/></div>
    </dialog>
  </section>;
}
