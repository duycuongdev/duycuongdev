const fs = require("fs");

function buildBanner() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" width="900" height="240">
    <style>
      .glitch { animation: glitch 3s infinite; }
      @keyframes glitch {
        0% { opacity: 1; transform: translate(0) }
        5% { opacity: 0.8; transform: translate(2px, -2px) }
        10% { opacity: 1; transform: translate(-2px, 2px) }
        15% { opacity: 1; transform: translate(0) }
        100% { opacity: 1; transform: translate(0) }
      }
      .pulse { animation: pulse 2s infinite; }
      @keyframes pulse {
        0% { opacity: 0.7; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
      }
      .shift { animation: shift 5s infinite alternate; }
      @keyframes shift {
        0% { stop-color: #38bdf8; }
        100% { stop-color: #a855f7; }
      }
      .float { animation: float 6s ease-in-out infinite; }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0px); }
      }
      .btn { transition: opacity 0.3s ease; }
      .btn:hover { opacity: 0.8; }
    </style>
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#060a14"/><stop offset="100%" stop-color="#0a0f1c"/>
      </linearGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" class="shift"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>
      <clipPath id="round"><rect width="900" height="240" rx="16"/></clipPath>
    </defs>
    <g clip-path="url(#round)">
      <rect width="900" height="240" fill="url(#bgGrad)"/>
      <g stroke="#1e293b" stroke-width="1" opacity="0.5">
        ${Array.from({length: 12}).map((_, i) => \`<line x1="0" y1="\${i*20}" x2="900" y2="\${i*20}"/>\`).join('')}
      </g>
      <text x="30" y="30" font-family="monospace" font-size="10" fill="#334155" class="pulse">
        <tspan x="30" dy="0">01 11</tspan><tspan x="30" dy="14">11 00</tspan><tspan x="30" dy="14">00 10</tspan>
      </text>
      <text x="870" y="30" text-anchor="end" font-family="monospace" font-size="10" fill="#334155" class="pulse">
        <tspan x="870" dy="0">10 01</tspan><tspan x="870" dy="14">11 00</tspan><tspan x="870" dy="14">00 11</tspan>
      </text>
      <text x="450" y="90" text-anchor="middle" font-family="monospace" font-size="14" fill="#94a3b8" class="float">
        <tspan fill="#475569">&lt;</tspan><tspan fill="#38bdf8">div</tspan><tspan fill="#475569">&gt;</tspan>Hello there,<tspan fill="#475569">&lt;/</tspan><tspan fill="#38bdf8">div</tspan><tspan fill="#475569">&gt;</tspan>
      </text>
      <text x="450" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="46" fill="#fff" class="glitch float">
        I'm <tspan fill="url(#textGrad)">Duy Cuong</tspan> Dev
      </text>
      <g transform="translate(320, 175)" class="float">
        <a class="btn" href="https://github.com/duycuongdev" target="_blank">
          <rect x="0" y="0" width="80" height="30" rx="6" fill="#111827" stroke="#374151"/>
          <text x="40" y="19" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff" font-weight="bold">GitHub</text>
        </a>
        <a class="btn" href="https://www.facebook.com/duycuongdev" target="_blank">
          <rect x="90" y="0" width="85" height="30" rx="6" fill="#1e3a8a" stroke="#1e40af"/>
          <text x="132" y="19" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff" font-weight="bold">Facebook</text>
        </a>
        <a class="btn" href="https://www.instagram.com/nguyenduycuong1900/" target="_blank">
          <rect x="185" y="0" width="85" height="30" rx="6" fill="#831843" stroke="#be185d"/>
          <text x="227" y="19" text-anchor="middle" font-family="Arial" font-size="12" fill="#fff" font-weight="bold">Instagram</text>
        </a>
      </g>
    </g>
  </svg>\`;
  fs.writeFileSync("banner.svg", svg);
}
buildBanner();
