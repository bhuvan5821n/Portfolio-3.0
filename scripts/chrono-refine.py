from pathlib import Path
for file in ['lib/social-image.tsx','lib/icon-image.tsx']:
 p=Path(file);s=p.read_text(encoding='utf-8-sig').replace('#F4F5F2','#101a20').replace('#151719','#eef0e9').replace('#555B57','#b2bfc4').replace('#E5AA24','#acd3df')
 if 'social-image' in file:s=s.replace('M1230 190 C1010 175 1100 365 930 352 C815 344 874 532 716 554 C616 568 552 517 488 553','M1110 600 Q1080 420 1040 330 L970 240 M1068 410 Q1160 320 1170 220 M1040 330 Q1015 260 1050 160').replace('strokeWidth="13"','strokeWidth="3"').replace('<circle cx="930" cy="352" fill="#eef0e9" r="18" />','').replace('<circle cx="930" cy="352" fill="#acd3df" r="8" />','')
 p.write_text(s,encoding='utf-8')
for file in ['app/opengraph-image.tsx','app/twitter-image.tsx']:
 p=Path(file);s=p.read_text(encoding='utf-8-sig').replace('I build whatever makes me curious.','Curiosity, with roots.').replace('Portfolio · Bengaluru','CHRONO//ROOTS').replace('AI assistants, small games, websites and product ideas explored by Bhuvan Gowda P.','AI, automation, business, music and stories. The personal archive of Bhuvan Gowda P.')
 p.write_text(s,encoding='utf-8')
import re
p=Path('public/media/chrono/bhuvan-laser.svg')
s=p.read_text(encoding='utf-8')
print('Laser source bytes',len(s),'script:', '<script' in s)
s=re.sub(r'<animate(?:Transform)?\b[^>]*/>','',s)
s=s.replace('width="0" height="5.875"','width="690" height="5.875"').replace('animated binary laser-scan portrait','binary portrait')
Path('public/media/chrono/bhuvan-laser-static.svg').write_text(s,encoding='utf-8')
p=Path('components/chrono/laser-portrait.tsx');s=p.read_text(encoding='utf-8-sig').replace('<img src={scan?', '<picture>{scan&&<source media="(prefers-reduced-motion: reduce)" srcSet="/media/chrono/bhuvan-laser-static.svg"/>}<img src={scan?').replace('height="540"/>','height="540"/></picture>')
p.write_text(s,encoding='utf-8')
for f in ['components/site/site-shell.tsx','components/intro/scroll-intro.tsx']:
 p=Path(f);s=p.read_text(encoding='utf-8-sig').replace('<output ref={progress}', '<output aria-live="off" ref={progress}').replace('<output ref={counter}', '<output aria-live="off" ref={counter}')
 p.write_text(s,encoding='utf-8')
