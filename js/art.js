// Small SVG drawings for each project. Each one has a back and a front layer,
// so the cards can push them apart in 3D when you tilt them.
(function(){
"use strict";
const svg = (inner) => `<svg viewBox="0 0 320 220" aria-hidden="true" focusable="false">${inner}</svg>`;
const lines = (x, y, w, n, gap) => Array.from({length:n}, (_, i) => `<rect x="${x}" y="${y + i * gap}" width="${w * (i % 3 === 2 ? .6 : i % 2 ? .85 : 1)}" height="3" rx="1.5" class="f-soft"/>`).join("");

const ART = {
  lens: {
    back: svg(`
      <g transform="rotate(-6 160 110)"><rect x="70" y="30" width="150" height="175" rx="4" class="f-card s-line"/>${lines(86, 52, 110, 9, 15)}</g>
      <g transform="rotate(4 160 110)"><rect x="104" y="22" width="150" height="175" rx="4" class="f-card s-line"/>${lines(120, 44, 110, 4, 15)}
        <rect x="118" y="104" width="118" height="12" rx="3" class="f-accent" opacity=".35"/>${lines(120, 108, 110, 1, 0)}${lines(120, 128, 110, 4, 15)}</g>`),
    front: svg(`
      <circle cx="196" cy="108" r="40" class="f-glass s-ink" stroke-width="5"/>
      <path d="M224 137l36 36" class="s-ink" stroke-width="10" stroke-linecap="round"/>
      <path d="M176 92c6-8 16-12 26-10" class="s-paper" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>`)
  },
  queue: {
    back: svg(`
      ${[38,52,70,96,120,108,84,60,44,30,26,34].map((h, i) => `<rect x="${40 + i * 21}" y="${190 - h}" width="15" height="${h}" rx="2" class="${i === 10 ? "f-accent" : "f-soft"}"/>`).join("")}
      <line x1="34" y1="190" x2="294" y2="190" class="s-line" stroke-width="2"/>`),
    front: svg(`
      <g transform="translate(92 34)">
        <rect width="136" height="70" rx="10" class="f-card s-ink" stroke-width="2.5"/>
        <text x="18" y="46" class="t-big">18 min</text>
        <circle cx="116" cy="20" r="6" class="f-accent"><animate attributeName="opacity" values="1;.25;1" dur="1.6s" repeatCount="indefinite"/></circle>
      </g>`)
  },
  gate: {
    back: svg(`
      <rect x="226" y="40" width="70" height="44" rx="6" class="f-card s-line" stroke-width="2"/><rect x="226" y="136" width="70" height="44" rx="6" class="f-card s-line" stroke-width="2"/>
      ${[0,1,2,3,4].map(i => `<circle cx="${28 + i * 16}" cy="110" r="6" class="${i > 2 ? "f-accent" : "f-soft"}"/>`).join("")}
      <path d="M200 110C214 110 214 62 226 62M200 110C214 110 214 158 226 158" class="s-line" stroke-width="2.5" fill="none"/>`),
    front: svg(`
      <path d="M120 180V78a40 40 0 0180 0v102" class="s-ink f-none" stroke-width="7" fill="none"/>
      <rect x="138" y="108" width="44" height="64" rx="4" class="f-card s-ink" stroke-width="2.5"/>
      <rect x="146" y="148" width="28" height="16" rx="2" class="f-accent"/>
      <rect x="146" y="130" width="28" height="14" rx="2" class="f-accent" opacity=".55"/>
      <rect x="146" y="116" width="28" height="10" rx="2" class="f-soft"/>`)
  },
  spiral: {
    back: svg((() => { let s = ""; let a = 9; for (let i = 0; i < 70; i++){ a = (a * 9301 + 49297) % 233280; const x = a / 233280 * 320; a = (a * 9301 + 49297) % 233280; const y = a / 233280 * 220; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i % 7 === 0 ? 1.8 : 1}" class="f-soft"/>`; } return s; })()),
    front: svg((() => { let s = ""; for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 46; i++){ const r = 6 + i * 2.3, t = arm * Math.PI + Math.log(r / 6) * 2.2; const x = 160 + Math.cos(t) * r * 1.25, y = 110 + Math.sin(t) * r * .62; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 - i / 22).toFixed(2)}" class="${i % 9 === 4 ? "f-accent" : "f-ink"}" opacity="${(1 - i / 60).toFixed(2)}"/>`; } return s + `<circle cx="160" cy="110" r="9" class="f-accent" opacity=".9"/>`; })())
  },
  letter: {
    back: svg(`
      <rect x="56" y="70" width="210" height="130" rx="6" class="f-soft"/>
      <path d="M56 76l105 70 105-70" class="s-card" stroke-width="3" fill="none"/>`),
    front: svg(`
      <g transform="rotate(-4 160 100)">
        <rect x="88" y="20" width="150" height="58" class="f-card s-line"/><rect x="88" y="78" width="150" height="58" class="f-card s-line"/><rect x="88" y="136" width="150" height="58" class="f-card s-line"/>
        ${lines(102, 36, 110, 3, 12)}
        <rect x="100" y="92" width="96" height="11" rx="3" class="f-accent" opacity=".45"/>${lines(102, 96, 110, 2, 14)}
        ${lines(102, 150, 110, 3, 12)}
        <path d="M244 96c14-4 22 2 28 12" class="s-ink" stroke-width="2" fill="none" stroke-linecap="round"/>
      </g>`)
  },
  tree: {
    back: svg(`
      <path d="M56 40v140M56 70h30M56 110h30M56 150h30M100 110v40M100 130h24" class="s-line" stroke-width="2.5" fill="none"/>
      ${[[56,40],[90,70],[90,110],[90,150],[128,130]].map(([x, y]) => `<rect x="${x - 6}" y="${y - 7}" width="${x === 56 ? 12 : 44}" height="14" rx="3" class="f-soft"/>`).join("")}`),
    front: svg(`
      ${[70,110,150].map((y, i) => `<g><path d="M150 ${y}h${100 - i * 26}" class="s-ink" stroke-width="5" stroke-linecap="round"/><path d="M${250 - i * 26} ${y - 9}l12 9-12 9" class="s-ink f-none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>`).join("")}
      <rect x="268" y="48" width="30" height="124" rx="5" class="f-accent" opacity=".85"/>`)
  }
};
window.ART = ART;
})();
