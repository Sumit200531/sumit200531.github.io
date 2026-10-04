(function(){
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const S = window.SITE, P = window.PROJECTS, ART = window.ART;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const repoURL = r => `https://github.com/${S.github}/${r}`;

/* ---------- contact links ---------- */
function contactLinks(){
  const out = [];
  if (S.email) out.push(`<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`);
  if (S.linkedin) out.push(`<a href="${esc(S.linkedin)}" rel="noopener" target="_blank">LinkedIn</a>`);
  out.push(`<a href="https://github.com/${esc(S.github)}" rel="noopener" target="_blank">GitHub</a>`);
  if (S.resume) out.push(`<a href="${esc(S.resume)}" target="_blank">Résumé</a>`);
  return out.join("");
}
$("#contactLinks").innerHTML = contactLinks();
$("#ghTop").href = `https://github.com/${S.github}`;
$("#year").textContent = new Date().getFullYear();

/* ---------- 3D project ring ---------- */
const stage = $("#stage"), ring = $("#ring"), n = P.length, step = 360 / n;
const plates = P.map((p, i) => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "plate";
  b.style.setProperty("--a", (i * step) + "deg");
  b.setAttribute("aria-label", `${p.title}: ${p.line} Jump to the write-up.`);
  b.innerHTML = `
    <span class="face front">
      <span class="plate-art"><span class="pa-back">${ART[p.art].back}</span><span class="pa-front">${ART[p.art].front}</span></span>
      <span class="plate-name">${esc(p.title)}</span>
      <span class="plate-line">${esc(p.line)}</span>
    </span>
    <span class="face back" aria-hidden="true"><span class="back-name">${esc(p.title)}</span></span>`;
  b.addEventListener("click", () => { if (dragMoved) return; const t = document.getElementById("p-" + p.id); if (t) t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); });
  b.addEventListener("focus", () => { target = -i * step; snapping = true; });
  ring.appendChild(b);
  return b;
});

let angle = 0, target = null, vel = 0, hover = false, dragging = false, dragMoved = false, lastX = 0, snapping = false;
let tiltX = -9, tiltTarget = -9;
function sizeRing(){
  const w = Math.min(250, Math.max(170, stage.clientWidth * .34));
  const r = (w / 2) / Math.tan(Math.PI / n) + 90;
  stage.style.setProperty("--w", w + "px");
  stage.style.setProperty("--r", r + "px");
}
sizeRing(); addEventListener("resize", sizeRing);

stage.addEventListener("pointerenter", () => hover = true);
stage.addEventListener("pointerleave", () => { hover = false; tiltTarget = -9; });
let startX = 0;
stage.addEventListener("pointerdown", e => { if (e.button !== 0) return; dragging = true; dragMoved = false; startX = lastX = e.clientX; vel = 0; target = null; snapping = false; });
stage.addEventListener("pointermove", e => {
  const r = stage.getBoundingClientRect();
  tiltTarget = -9 + ((e.clientY - r.top) / r.height - .5) * -10;
});
addEventListener("pointermove", e => {
  if (!dragging) return;
  const dx = e.clientX - lastX; lastX = e.clientX;
  angle += dx * .32; vel = dx * .32;
  if (Math.abs(e.clientX - startX) > 5) dragMoved = true;
});
const endDrag = () => {
  if (!dragging) return; dragging = false;
  setTimeout(() => { dragMoved = false; }, 30);
};
addEventListener("pointerup", endDrag);
addEventListener("pointercancel", endDrag);
$("#prev").addEventListener("click", () => { target = Math.round((angle + step) / step) * step; snapping = true; });
$("#next").addEventListener("click", () => { target = Math.round((angle - step) / step) * step; snapping = true; });

let last = performance.now();
function tick(now){
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!dragging){
    if (snapping && target != null){
      let d = target - angle; d = ((d + 180) % 360 + 360) % 360 - 180;
      angle += d * Math.min(1, dt * 6);
      if (Math.abs(d) < .05){ snapping = false; target = null; }
    } else {
      angle += vel; vel *= Math.pow(.05, dt);
      if (Math.abs(vel) < .02 && !hover && !reduce) angle -= 7 * dt;
    }
  }
  tiltX += (tiltTarget - tiltX) * Math.min(1, dt * 5);
  ring.style.transform = `translate3d(0,0,calc(var(--r) * -.45)) rotateX(${tiltX.toFixed(2)}deg) rotateY(${angle.toFixed(2)}deg)`;
  plates.forEach((pl, i) => {
    const rel = ((i * step + angle) % 360 + 540) % 360 - 180;
    const f = Math.cos(rel * Math.PI / 180);
    pl.style.setProperty("--f", Math.max(0, f).toFixed(3));
    pl.classList.toggle("is-front", Math.abs(rel) < step / 2);
  });
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ---------- case studies ---------- */
$("#work").innerHTML = P.map((p, i) => `
  <article class="case ${i % 2 ? "flip" : ""}" id="p-${esc(p.id)}">
    <div class="specimen" data-tilt>
      <div class="sp-stage">
        <div class="sp-back">${ART[p.art].back}</div>
        <div class="sp-front">${ART[p.art].front}</div>
        <span class="sp-tag">${esc(p.stack.slice(0, 3).join(" + "))}</span>
        <span class="sp-sheen"></span>
      </div>
    </div>
    <div class="case-text">
      <h3>${esc(p.title)}</h3>
      <p class="line">${esc(p.line)}</p>
      <dl>
        <dt>The problem</dt><dd>${esc(p.problem)}</dd>
        <dt>What I built</dt><dd>${esc(p.built)}</dd>
        <dt>The hard part</dt><dd>${esc(p.hard)}</dd>
      </dl>
      <p class="stack">Built with ${p.stack.map(esc).join(", ")}.</p>
      <p class="links">
        <a href="${repoURL(esc(p.repo))}" target="_blank" rel="noopener">Read the code</a>
        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">Open the live demo</a>` : ""}
      </p>
    </div>
  </article>`).join("");

document.querySelectorAll("[data-tilt]").forEach(el => {
  const st = $(".sp-stage", el);
  el.addEventListener("pointermove", e => {
    if (reduce) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    st.style.transform = `rotateX(${((.5 - y) * 16).toFixed(2)}deg) rotateY(${((x - .5) * 22).toFixed(2)}deg)`;
    st.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
    st.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    el.classList.add("live");
  });
  el.addEventListener("pointerleave", () => { st.style.transform = ""; el.classList.remove("live"); });
});

/* ---------- the rest of GitHub ---------- */
const FALLBACK = [
  { name: "Student-Management-System", description: "A student records front end with separate CSS and JavaScript.", language: "HTML", html_url: repoURL("Student-Management-System") },
  { name: "profile-gif", description: "Serves a random animation on every request. Used on my GitHub profile, deployed on Vercel.", language: "JavaScript", html_url: repoURL("profile-gif") },
  { name: "2305110100057", description: "", language: "TypeScript", html_url: repoURL("2305110100057") },
  { name: "js-.hindi-learing", description: "Learning JavaScript with Chai and Code.", language: "JavaScript", html_url: repoURL("js-.hindi-learing") },
  { name: "JAva_test_clone", description: "", language: "", html_url: repoURL("JAva_test_clone") }
];
const pretty = s => s.replace(/[-_]+/g, " ").replace(/\s+\./g, " ").trim();
const fmtDate = d => { try { return new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" }); } catch { return ""; } };

async function loadRepos(){
  const list = $("#repos"), note = $("#repoNote");
  const skip = new Set(P.map(p => p.repo.toLowerCase()).concat((S.hideRepos || []).map(s => s.toLowerCase())));
  let repos = null, live = false;
  try {
    const cached = sessionStorage.getItem("repos");
    if (cached) { repos = JSON.parse(cached); live = true; }
  } catch {}
  if (!repos){
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch(`https://api.github.com/users/${encodeURIComponent(S.github)}/repos?per_page=100&sort=pushed`, { signal: ctl.signal });
      clearTimeout(t);
      if (r.ok){ repos = await r.json(); live = Array.isArray(repos); try { sessionStorage.setItem("repos", JSON.stringify(repos)); } catch {} }
    } catch {}
  }
  if (!Array.isArray(repos)) repos = FALLBACK;
  const rest = repos.filter(r => !r.fork && !skip.has(String(r.name).toLowerCase()));
  list.innerHTML = rest.length ? rest.map(r => `
    <li><a href="${esc(r.html_url)}" target="_blank" rel="noopener">
      <span class="rn">${esc(pretty(r.name))}</span>
      <span class="rd">${esc(r.description || "No description yet.")}</span>
      <span class="rl">${esc(r.language || "")}</span>
      <span class="ru">${r.pushed_at ? esc(fmtDate(r.pushed_at)) : ""}</span>
    </a></li>`).join("") : `<li class="none">Everything public is already up above.</li>`;
  note.textContent = live ? "Pulled live from GitHub, so new repos show up here on their own." : "";
}
loadRepos();
})();
