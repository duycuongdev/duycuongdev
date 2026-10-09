const fs = require("fs");
const t = [{n:'JavaScript',c:'#facc15'},{n:'TypeScript',c:'#3b82f6'},{n:'Data Structures & Algorithms',c:'#a855f7'},{n:'ReactJS',c:'#38bdf8'},{n:'NodeJS',c:'#22c55e'},{n:'ExpressJS',c:'#cbd5e1'},{n:'MongoDB',c:'#10b981'},{n:'HTML5',c:'#f97316'},{n:'CSS3',c:'#3b82f6'},{n:'Tailwind CSS',c:'#38bdf8'},{n:'Material UI',c:'#60a5fa'},{n:'Git & GitHub',c:'#f8fafc'},{n:'Trello',c:'#3b82f6'}];
const e = [{n:'Frontend Dev',c:'#38bdf8'},{n:'Backend Dev',c:'#22c55e'},{n:'Database Design',c:'#3b82f6'},{n:'System Architecture',c:'#8b5cf6'},{n:'Unit Testing',c:'#f43f5e'},{n:'Web Security',c:'#10b981'},{n:'API Integration',c:'#eab308'},{n:'Git & Version Control',c:'#f97316'},{n:'Responsive Layout',c:'#38bdf8'},{n:'CI/CD Automation',c:'#0ea5e9'},{n:'Code Refactoring',c:'#a855f7'}];
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" width="900" height="400">
<style>.h{font-family:Arial,sans-serif;font-weight:bold;font-size:12px;fill:#f8fafc;text-transform:uppercase;letter-spacing:1px}.bn{font-family:Arial,sans-serif;font-size:12px;fill:#f8fafc}</style>
<g transform="translate(15, 10)">
  <rect width="870" height="160" rx="8" fill="#0d1117" stroke="#1e293b"/>
  <circle cx="20" cy="25" r="3" fill="#38bdf8"/>
  <text x="35" y="30" class="h">Core Technologies &amp; Skills</text>
  <rect x="740" y="15" width="110" height="20" rx="10" fill="#0f172a" stroke="#0ea5e9"/>
  <text x="750" y="29" font-family="Arial" font-size="10" fill="#38bdf8">13 Technologies</text>
  <g transform="translate(15, 60)">
    ${t.map((o,i)=>{let x=(i%5)*170;let y=Math.floor(i/5)*40;return `<g transform="translate(${x},${y})"><rect width="160" height="30" rx="6" fill="#161b22" stroke="#1e293b"/><circle cx="20" cy="15" r="4" fill="${o.c}"/><text x="35" y="19" class="bn">${o.n}</text></g>`}).join('')}
  </g>
</g>
<g transform="translate(15, 190)">
  <rect width="870" height="190" rx="8" fill="#0d1117" stroke="#1e293b"/>
  <circle cx="20" cy="25" r="3" fill="#10b981"/>
  <text x="35" y="30" class="h">Core Engineering Abilities</text>
  <rect x="740" y="15" width="110" height="20" rx="10" fill="#064e3b" stroke="#10b981"/>
  <text x="750" y="29" font-family="Arial" font-size="10" fill="#10b981">11 Competencies</text>
  <g transform="translate(15, 60)">
    ${e.map((o,i)=>{let x=(i%4)*210;let y=Math.floor(i/4)*40;return `<g transform="translate(${x},${y})"><rect width="200" height="30" rx="6" fill="#161b22" stroke="#1e293b"/><circle cx="20" cy="15" r="4" fill="${o.c}"/><text x="35" y="19" class="bn">${o.n}</text></g>`}).join('')}
  </g>
</g>
</svg>`;
fs.writeFileSync("skills.svg", svg);
