export const projectNotes: Record<string, {title:string;body:string;source?:string}[]> = {
  hackscout: [
    {title:'Architecture / from source to result',body:'The UI calls a same-origin Express API. The API runs WebCMD against repository-owned opportunity URLs, validates the response, normalizes event facts and ranks the result. Nearby Scout separately validates GeoJSON and computes distance before presenting a Leaflet map.',source:'https://github.com/bhuvan5821n/HackScout-AI#how-hackscout-works'},
    {title:'Decision / explain the fallback',body:'A failed retrieval receives one retry. A previously verified snapshot can then preserve useful information, with its state distinguished from live data. Missing dates or registration details stay unknown; ranking uses deterministic matches with visible reasons.',source:'https://github.com/bhuvan5821n/HackScout-AI#built-to-fail-gracefully'},
    {title:'Next question / source coverage',body:'The documented opportunity set contains Luma and Devpost. A useful next evaluation would check how validation behaves when their page structures change, before expanding coverage. This is a proposed evaluation, not a completed reliability study.'},
  ],
  'finance-tracker': [
    {title:'Architecture / the device owns the record',body:'Compose UI sits above ViewModel and repository layers, with Room persistence underneath. Full-text search supports finding transactions. WorkManager handles scheduled work. A local notification parser is separate from the spending interface.',source:'https://github.com/bhuvan5821n/Finance-app'},
    {title:'Decision / separate capability from workflow',body:'Money calculations and AES-256-GCM backup encryption have separate implementation and test boundaries. An encryption layer does not make a finished backup experience: the README still lists the Android file-picker flow as planned.',source:'https://github.com/bhuvan5821n/Finance-app'},
    {title:'Next question / recovery, end to end',body:'The next documented workflow gap is saving and opening encrypted backups through Android’s Storage Access Framework. A complete recovery test on a second device would make the feature easier to assess; that test is not claimed here.'},
  ],
  markwell: [
    {title:'Architecture / discovery to enquiry',body:'Product and industry pages lead to quote forms that collect dimensions, quantity, printing and delivery requirements. Next.js server routes handle leads; Nodemailer provides SMTP delivery. The repository also documents a rule-based lead assistant.',source:'https://github.com/bhuvan5821n/Markwell'},
    {title:'Decision / collect useful context',body:'The quote flow asks for manufacturing details so an enquiry has more context than a generic message. Contact validation, a honeypot and rate limiting are documented. Delivery still depends on configured SMTP; development console output is not an email receipt.',source:'https://github.com/bhuvan5821n/Markwell'},
    {title:'Next question / business outcomes',body:'The website and public source are inspectable. A useful follow-up would connect enquiry quality to the form fields and buyer journey. No conversion lift, lead volume or revenue outcome has been supplied.'},
  ],
  'portfolio-evolution': [
    {title:'Architecture / content first, interaction where useful',body:'Route content is server rendered. Client components handle the portrait sequence, seasonal atmosphere, command menu and interactive Lab. Longer engineering notes use native disclosure elements, keeping their text crawlable without adding a client-side content system.'},
    {title:'Decision / preserve the originals',body:'All 160 portrait masters stay intact. Compact and large derivatives feed a bounded decoded-image cache. Scroll positions map directly to frames, while reduced motion, data saving and low memory can select a still portrait. Delayed decoding reduces prefetch without disconnecting input.'},
    {title:'Next question / beyond browser emulation',body:'The automated checks cover scrolling, reversal and fallback policies. The next useful evidence is a physical-device session on a slower phone and a real network. A local browser timing is not a field performance score.'},
  ],
};
