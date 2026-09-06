import {projects} from "../../data/projects";
export const publicRoutes = [
{path:"/",heading:/Curiosity,\s*with roots\./i},
{path:"/projects",heading:/Ideas,\s*made tangible\./i},
{path:"/lab",heading:/Room for\s*the unknown\./i},
{path:"/achievements",heading:/Growth leaves\s*a record\./i},
{path:"/profile",heading:/Many branches\.\s*One Bhuvan\./i},
...projects.map(p=>({path:`/projects/${p.slug}`,heading:p.name}))
];
export const unknownRoute="/this-room-does-not-exist";
export const projectRouteCycle=projects.map((p,i)=>({slug:p.slug,name:p.name,nextSlug:projects[(i+1)%projects.length].slug}));
