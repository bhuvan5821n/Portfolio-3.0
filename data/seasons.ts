export const seasons = [
  {id:"winter", href:"/", label:"Home", era:"System boot", note:"Enter the archive", color:"#acd3df"},
  {id:"autumn", href:"/projects", label:"Projects", era:"The inventor’s archive", note:"Ideas made tangible", color:"#e0b58a"},
  {id:"summer", href:"/lab", label:"Lab", era:"Experimental systems", note:"Make room for the unknown", color:"#dfce88"},
  {id:"spring", href:"/achievements", label:"Achievements", era:"The academy", note:"Keep the record", color:"#87a180"},
  {id:"equinox", href:"/profile", label:"Profile", era:"Chrono nexus", note:"Meet the person behind it", color:"#d5c395"},
] as const;
export type Season = (typeof seasons)[number]["id"];
export function seasonForPath(path: string) { return seasons.find(s=>s.href!=="/" && path.startsWith(s.href)) ?? seasons[0]; }
