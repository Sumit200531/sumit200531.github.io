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
  car: {
    back: svg(`
      <path d="M160 70L20 214M160 70L300 214" class="s-line" stroke-width="3" fill="none"/>
      ${[0,1,2,3].map(i => { const t = (i + 1) / 4.6, y = 70 + t * t * 150, h = 4 + t * 14; return `<rect x="${(160 - 1.5 - t * 3).toFixed(1)}" y="${y.toFixed(1)}" width="${(3 + t * 6).toFixed(1)}" height="${h.toFixed(1)}" rx="1.5" class="f-soft"/>`; }).join("")}
      <circle cx="160" cy="58" r="26" class="f-accent" opacity=".22"/>
      ${[[40,150,60,40],[66,128,34,56],[226,140,50,50],[262,118,34,76]].map(([x, y, w, h]) => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="2" class="f-soft" opacity=".75"/>`).join("")}
      ${[[24,40],[300,26],[120,24],[210,38]].map(([x, y]) => `<path d="M${x} ${y + 30}v-${y}" class="s-line" stroke-width="2"/>`).join("")}`),
    front: svg(`
      <g transform="translate(160 150)">
        <ellipse cx="0" cy="40" rx="78" ry="9" class="f-accent" opacity=".25"/>
        <path d="M-82 18 L-62 -4 L-34 -16 L34 -16 L62 -4 L82 18 L64 30 L-64 30 Z" class="f-card s-ink" stroke-width="3" stroke-linejoin="round"/>
        <path d="M-30 -16 Q0 -42 30 -16 Z" class="f-glass s-ink" stroke-width="3" stroke-linejoin="round"/>
        <rect x="-58" y="10" width="116" height="7" rx="3.5" class="f-accent"/>
        <circle cx="-52" cy="13" r="10" class="f-ink"/><circle cx="52" cy="13" r="10" class="f-ink"/>
        <circle cx="-52" cy="13" r="5" class="f-accent"/><circle cx="52" cy="13" r="5" class="f-accent"/>
        <path d="M-90 22h-34M-94 8h-22M90 22h34M94 8h22" class="s-ink" stroke-width="3" stroke-linecap="round" opacity=".5"/>
      </g>`)
  },
  sub: {
    back: svg(`
      <path d="M0 196 Q60 182 120 192 T240 188 T320 194 V220 H0Z" class="f-soft"/>
      <path d="M40 196 Q30 160 46 128 Q58 104 44 80M58 198 Q64 170 54 146M270 194 Q282 158 266 126 Q254 104 268 84" class="s-line" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M118 0 L150 0 L104 196 L64 196 Z M210 0 L232 0 L268 196 L238 196 Z" class="f-soft" opacity=".35"/>
      <g transform="translate(250 54)"><path d="M-22 0 A22 18 0 0 1 22 0 Z" class="f-soft"/><path d="M-14 2q-3 16 3 30M0 2q3 18-2 34M14 2q-3 16 3 28" class="s-line" stroke-width="2.5" stroke-linecap="round" fill="none"/></g>`),
    front: svg(`
      <path d="M196 108 L310 72 L310 150 Z" class="f-accent" opacity=".16"/>
      <g transform="translate(140 112)">
        <rect x="-16" y="-48" width="34" height="26" rx="5" class="f-card s-ink" stroke-width="3"/>
        <path d="M6 -48v-16" class="s-ink" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="0" cy="0" rx="64" ry="30" class="f-card s-ink" stroke-width="3"/>
        <circle cx="46" cy="-2" r="15" class="f-glass s-ink" stroke-width="3"/>
        <circle cx="49" cy="-5" r="6" class="f-accent"/>
        ${[-30,-8,14].map(x => `<circle cx="${x}" cy="4" r="6" class="f-glass s-ink" stroke-width="2.5"/>`).join("")}
        <path d="M-64 -14 L-84 -26 L-84 26 L-64 14" class="f-card s-ink" stroke-width="3" stroke-linejoin="round"/>
      </g>
      ${[[64,82,6],[54,58,4],[62,36,3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" class="s-ink f-none" stroke-width="2" fill="none" opacity=".5"/>`).join("")}`)
  },
  kernel: {
    back: svg(`
      ${[[0,[[0,46],[50,30],[84,58],[146,36],[186,52]]],[1,[[0,22],[26,64],[94,40],[138,60],[202,34]]],[2,[[10,70],[86,24],[114,48],[166,70]]]].map(([r, segs]) => segs.map(([x, w], k) => `<rect x="${34 + x}" y="${46 + r * 30}" width="${w - 4}" height="20" rx="3" class="${(r + k) % 4 === 1 ? "f-accent" : "f-soft"}" opacity="${(r + k) % 4 === 1 ? .7 : 1}"/>`).join("")).join("")}
      <line x1="30" y1="150" x2="290" y2="150" class="s-line" stroke-width="2"/>
      ${[0,1,2,3,4,5].map(i => `<rect x="${40 + i * 42}" y="164" width="34" height="24" rx="3" class="f-card s-line" stroke-width="1.5"/>`).join("")}
      <line x1="196" y1="34" x2="196" y2="196" class="s-ink" stroke-width="2" opacity=".5"/>`),
    front: svg(`
      <g transform="translate(160 106)">
        ${[-30,-15,0,15,30].map(d => `<path d="M${d} -52v-12M${d} 52v12M-52 ${d}h-12M52 ${d}h12" class="s-ink" stroke-width="4" stroke-linecap="round"/>`).join("")}
        <rect x="-52" y="-52" width="104" height="104" rx="12" class="f-card s-ink" stroke-width="3"/>
        <path d="M-22 -8a24 24 0 0 1 40 -12" class="s-ink f-none" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M22 8a24 24 0 0 1 -40 12" class="s-ink f-none" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M12 -27l7 7-9 4" class="s-ink f-none" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M-12 27l-7 -7 9 -4" class="s-ink f-none" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="0" cy="0" r="7" class="f-accent"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></circle>
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
