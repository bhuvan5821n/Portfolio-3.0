const fs=require('fs'),sharp=require('sharp'),path=require('path');
(async()=>{
 const dir='review-artifacts/chrono';
 const groups=[['home','projects','lab','achievements','profile'].map(r=>r+'-390x844.png'),['home','projects','lab','achievements','profile'].map(r=>r+'-320x568.png')];
 for(let n=0;n<groups.length;n++){
 const images=await Promise.all(groups[n].map(async(f,i)=>({input:await sharp(path.join(dir,f)).resize({width:390}).toBuffer(),left:i*390,top:30})));
 const heights=await Promise.all(groups[n].map(f=>sharp(path.join(dir,f)).metadata()));
 const label=Buffer.from('<svg width="1950" height="30"><rect width="1950" height="30" fill="#fff"/><text x="10" y="21" font-size="18">Home — Projects — Lab — Achievements — Profile | '+(n?'320x568':'390x844')+'</text></svg>');
 await sharp({create:{width:1950,height:Math.ceil(Math.max(...heights.map(h=>h.height*390/h.width)))+30,channels:4,background:'#fff'}}).composite([...images,{input:label,left:0,top:0}]).png().toFile(path.join(dir,'sheet-'+(n?'320':'390')+'.png'));
 }
})();
