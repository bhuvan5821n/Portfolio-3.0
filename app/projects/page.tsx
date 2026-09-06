import {PageHeading} from "@/components/chrono/page-heading";
import {ProjectArchive} from "@/components/chrono/project-archive";
import {routeMetadata} from "@/lib/metadata";
import {getPortfolioProjects} from "@/lib/portfolio-api";
export const metadata=routeMetadata.work;
export default async function Projects(){const result=await getPortfolioProjects();return <><PageHeading season="Autumn" era="The inventor’s archive" title={<>Ideas,<br/>made tangible.</>}><p>Software, systems and business ideas. Follow a project from its first question to the thing you can inspect.</p></PageHeading><ProjectArchive projects={result.data} source={result.source}/></>;}
