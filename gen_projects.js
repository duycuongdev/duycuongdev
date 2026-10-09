const fs = require("fs");
const cards = [
  { t: 'Trello_Web & API', tg: 'Clone', d: 'Full-featured project and workflow management app clone with interactive drag-and-drop boards and workspace collaboration.', tc: 'React · REST API', c: '#38bdf8' },
  { t: 'AquaLife Web & API', tg: 'System', d: 'Automated aquarium management system for monitoring water parameters, feeding cycles, and life-cycle analytics.', tc: 'Node.js · MongoDB', c: '#10b981' },
  { t: 'TikTok Downloader', tg: 'Tool', d: 'High-speed video downloading tool and media scraper supporting watermark removal and batch audio extractions.', tc: 'TypeScript · Scraper', c: '#f43f5e' }
];
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 200" width="900" height="200">
<style>.t{font-family:Arial,sans-serif;font-weight:bold;font-size:14px;fill:#f8fafc}.d{font-family:Arial,sans-serif;font-size:11px;fill:#94a3b8}.tc{font-family:monospace;font-size:10px;fill:#cbd5e1}.tg{font-family:monospace;font-size:9px;fill:#94a3b8}</style>`;
cards.forEach((c, i) => {
  const x = i * 290 + 15;
  const words = c.d.split(' '); let lines = []; let cur = '';
  words.forEach(w => { if(cur.length + w.length < 40) cur += w + ' '; else { lines.push(cur); cur = w + ' '; } }); lines.push(cur);
  svg += `<g transform="translate(${x},10)">
    <rect width="270" height="160" rx="8" fill="#0d1117" stroke="#1e293b" stroke-width="1"/>
    <rect x="220" y="15" width="35" height="18" rx="9" fill="#1e293b"/>
    <text x="237" y="27" text-anchor="middle" class="tg">${c.tg}</text>
    <circle cx="30" cy="24" r="12" fill="${c.c}" opacity="0.2"/>
    <text x="15" y="60" class="t">${c.t}</text>
    ${lines.map((l, j) => `<text x="15" y="${80 + j * 16}" class="d">${l}</text>`).join('')}
    <circle cx="20" cy="140" r="3" fill="${c.c}"/>
    <text x="30" y="143" class="tc">${c.tc}</text>
  </g>`;
});
svg += `</svg>`;
fs.writeFileSync("projects.svg", svg);
