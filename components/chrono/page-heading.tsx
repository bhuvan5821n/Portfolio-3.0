import type {ReactNode} from "react";
export function PageHeading({season,era,title,children}:{season:string;era:string;title:ReactNode;children:ReactNode}){return <header className="page-heading wrap"><p className="eyebrow">{season} <span>/</span> {era}</p><div className="heading-split"><h1>{title}</h1><div className="heading-description">{children}</div></div></header>;}
