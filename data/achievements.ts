export type Achievement = {title:string;type:string;detail:string;source:string|null;label:string;date:string|null};
export const milestones = [
  {title:"Business Administration",type:"Study",detail:"Studying business while building practical technology and creative experiments.", source:"https://github.com/bhuvan5821n",label:"Public profile",date:null},
  {title:"HackScout technical documentation",type:"Project record",detail:"A documented discovery system with source validation, explainable ranking, failure handling and a public hackathon judge brief.",source:"https://github.com/bhuvan5821n/HackScout-AI/blob/main/HACKATHON.md",label:"Read project brief",date:null},
  {title:"Everyday finance, on the device",type:"Build milestone",detail:"B.G. Finance has a native Android codebase, local persistence and installation documentation. Its public record distinguishes implemented layers from unfinished workflows.",source:"https://github.com/bhuvan5821n/Finance-app",label:"Inspect Android source",date:null},
  {title:"A business gets a digital front door",type:"Build milestone",detail:"The Markwell repository credits Bhuvan Gowda P as developer of its packaging website, connecting a product catalogue with quote and contact paths.",source:"https://github.com/bhuvan5821n/Markwell",label:"View credited project",date:null},
  {title:"A story becomes a series",type:"Creative milestone",detail:"ERROR 404: HERO NOT FOUND has a public home on WEBTOON CANVAS, connecting a builder's perspective with fantasy storytelling.",source:"https://www.webtoons.com/en/canvas/error-404-hero-not-found/list?title_no=1168738",label:"Read the series",date:"2026-08-29"},
] as const satisfies readonly Achievement[];
export const portfolioHistory = [
  {version:"1.0", title:"The first branch", detail:"An earlier portfolio in the evolution. Its source is not available in the local reference folder."},
  {version:"2.0", title:"The curiosity workspace", detail:"Projects as desk objects, experiments on a workbench, and a personal cinematic introduction."},
  {version:"3.0", title:"CHRONO//ROOTS", detail:"One personal archive across seasons. Technology, business, music and stories share the same roots."},
] as const;
