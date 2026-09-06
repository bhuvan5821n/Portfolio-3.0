const folder = '/media/projects/friday';
export const fridayEvidence = {
  original: `${folder}/friday-intelligence-system-dashboard.png`,
  overview: `${folder}/friday-overview.webp`,
  source: 'User-supplied Screenshot 2026-08-16 192403.png',
  caption: 'FRIDAY Intelligence System · original interface capture, 16 August 2026.',
  boundary: 'This capture shows the interface. Visible controls and studio names do not establish that every module is complete or operational.',
  views: [
    {id:'system',label:'System overview',source:`${folder}/friday-system.webp`,width:322,height:470,description:'CPU, GPU, memory, storage and network panels as captured in the running interface.'},
    {id:'assistant',label:'Assistant',source:`${folder}/friday-assistant.webp`,width:620,height:620,description:'The central FRIDAY identity and voice-state presentation from the same screenshot.'},
    {id:'routing',label:'AI controls',source:`${folder}/friday-routing.webp`,width:366,height:321,description:'The provider, model and routing controls. This capture is waiting for its first routed request.'},
    {id:'studios',label:'Studio navigation',source:`${folder}/friday-studios.webp`,width:1388,height:88,description:'The complete studio navigation. Scroll sideways to inspect it at its original size.'},
  ],
} as const;
