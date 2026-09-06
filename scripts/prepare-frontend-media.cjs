// Deterministic delivery derivatives. Original screenshot and environment masters stay intact.
const sharp=require('sharp');
const path=require('path');
const fs=require('fs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const out=path.join(root,'public/media/environments');
 fs.mkdirSync(out,{recursive:true});
 for(const season of ['winter','equinox']){
  const source=path.join(root,`review-artifacts/chrono/environments/${season}-master.png`);
  await sharp(source).resize({width:1536}).webp({quality:83}).toFile(path.join(out,`${season}.webp`));
  // Portrait crop keeps the empty planting area on the right and sky above the mobile copy.
  await sharp(source).extract({left:800,top:0,width:736,height:1024}).resize({width:736}).webp({quality:80}).toFile(path.join(out,`${season}-mobile.webp`));
 }
 const dir=path.join(root,'public/media/projects/friday');
 const original=path.join(dir,'friday-intelligence-system-dashboard.png');
 await sharp(original).webp({lossless:true}).toFile(path.join(dir,'friday-overview.webp'));
 const regions={system:{left:15,top:119,width:322,height:470},routing:{left:1530,top:119,width:366,height:321},assistant:{left:608,top:126,width:620,height:620},studios:{left:266,top:920,width:1388,height:88}};
 for(const [name,region] of Object.entries(regions))await sharp(original).extract(region).webp({lossless:true}).toFile(path.join(dir,`friday-${name}.webp`));
 console.log('Two responsive environment plates and five lossless FRIDAY views prepared.');
})();
