import type { CSSProperties } from "react";
import type { Season } from "@/data/seasons";
type Branch = { d:string; width:number };
type Tip = {x:number;y:number;angle:number;group:number};
/** Deterministic recursive branching. Geometry persists between seasons. */
function grow() {
  const branches:Branch[]=[]; const tips:Tip[]=[]; let seed=5821;
  const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
  function branch(x:number,y:number,length:number,angle:number,depth:number,group:number) {
    const rad=angle*Math.PI/180, nx=x+Math.cos(rad)*length, ny=y+Math.sin(rad)*length;
    const bend=(random()-.5)*length*.3;
    branches.push({d:`M${x.toFixed(1)},${y.toFixed(1)} Q${(x+(nx-x)*.4+bend).toFixed(1)},${(y+(ny-y)*.6).toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`,width:Math.max(.65,depth*depth*.20)});
    if(depth===0){tips.push({x:nx,y:ny,angle,group});return;}
    branch(nx,ny,length*(.70+random()*.07),angle-23-random()*15,depth-1,depth===7?0:group);
    branch(nx,ny,length*(.66+random()*.08),angle+22+random()*15,depth-1,depth===7?2:group);
    if(depth===5) branch(nx,ny,length*.63,angle-3,depth-2,group+1);
  }
  branch(370,670,142,-94,7,0);
  return {branches,tips};
}
const geometry=grow();
export function Tree({season}:{season:Season}) {
  return <svg className="world-tree" viewBox="0 0 740 760" fill="none" aria-hidden="true" data-tree-season={season}>
    <g className="tree-instrument" stroke="currentColor" strokeWidth=".6">
      <circle cx="370" cy="365" r="285"/><circle cx="370" cy="365" r="300" strokeDasharray="1 14"/>
      <path d="M30 670H710M370 40V711M90 365H650" strokeDasharray="2 8"/>
      <ellipse cx="370" cy="682" rx="230" ry="22"/>
      {[0,90,180,270].map(a=><g key={a} transform={`rotate(${a} 370 365)`}><path d="M370 65v14"/><circle cx="370" cy="80" r="3"/></g>)}
    </g>
    <g className="tree-organism">
      <g className="tree-branches" strokeLinecap="round">{geometry.branches.map((b,i)=><path key={i} d={b.d} strokeWidth={b.width}/>)}</g>
      <g className="tree-foliage">{geometry.tips.map((p,i)=>{
        const s=season==='equinox'?['winter','spring','summer','autumn'][p.group%4]:season;
        return <g key={i} className={`leaf-cluster leaf-${s}`} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.angle.toFixed(1)})`}>
          <ellipse rx="9" ry="3.4"/><ellipse cx="-4" cy="6" rx="7" ry="3" transform="rotate(-45)"/><circle className="blossom" r="3.8"/>
        </g>;
      })}</g>
    </g>
    <g className={`season-drift drift-${season}`}>{Array.from({length:12},(_,i)=><ellipse key={i} cx={80+(i*137)%580} cy={100+(i*97)%510} rx={season==='winter'?1.1:3.5} ry={season==='winter'?1.1:1.6} style={{'--drift':`${(i%4+1)*12}px`} as CSSProperties}/>)}</g>
    <g className="tree-root" stroke="currentColor" strokeWidth="1"><path d="M370 670q-20 35-110 57M370 670q30 25 125 48M370 670q-8 34-50 63M370 670q8 40 38 69"/></g>
  </svg>;
}
