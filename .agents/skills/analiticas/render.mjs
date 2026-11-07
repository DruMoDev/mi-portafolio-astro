#!/usr/bin/env node
// Pinta el informe de analítica de drumorera.com a partir de un JSON (ver SKILL.md).
// Uso: node render.mjs datos.json salida.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("Uso: node render.mjs datos.json salida.html");
  process.exit(1);
}
const d = JSON.parse(readFileSync(input, "utf8"));
const font = readFileSync(join(here, "assets/geist.woff2")).toString("base64");

// Por debajo de esto, un porcentaje o un "aquí se atascan" no significa nada.
const MUESTRA_MIN = 30;

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const n = (v) => (typeof v === "number" && isFinite(v) ? v.toLocaleString("es-ES") : "0");
const pct = (v) => (typeof v === "number" && isFinite(v) ? `${Math.round(v * 100)} %` : "–");
const dur = (s) => {
  if (typeof s !== "number" || !isFinite(s)) return "–";
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return m ? `${m} min ${r} s` : `${r} s`;
};
const fecha = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
// "Del 2 al 7 de noviembre de 2026", sin repetir mes ni año si coinciden.
function rango(a, b) {
  const [ya, ma] = a.split("-");
  const [yb, mb] = (b ?? a).split("-");
  const dia = (iso) => Number(iso.split("-")[2]);
  if (ya === yb && ma === mb) return `Del ${dia(a)} al ${fecha(b ?? a)}`;
  return `Del ${fecha(a)} al ${fecha(b ?? a)}`;
}
const arr = (v) => (Array.isArray(v) ? v : []);

const FUENTES = [
  [/instagram/, "Instagram"],
  [/facebook|fb\.|^fb$/, "Facebook"],
  [/tiktok/, "TikTok"],
  [/youtube|youtu\.be/, "YouTube"],
  [/google/, "Google"],
  [/bing|duckduckgo|yahoo|ecosia/, "Otros buscadores"],
  [/t\.co|twitter|x\.com/, "X"],
  [/linkedin|lnkd/, "LinkedIn"],
  [/whatsapp|wa\.me/, "WhatsApp"],
  [/chatgpt|openai|perplexity|claude|gemini|copilot/, "Asistentes de IA"],
];
// Junta los dominios de referencia por red: l.instagram.com e instagram.com son lo mismo.
function agruparFuentes(rows) {
  const out = new Map();
  for (const r of arr(rows)) {
    const raw = String(r.nombre ?? "").toLowerCase();
    let name = raw === "$direct" || raw === "" || raw === "directo" ? "Directo" : null;
    if (!name) name = FUENTES.find(([re]) => re.test(raw))?.[1] ?? raw.replace(/^www\./, "");
    out.set(name, (out.get(name) ?? 0) + (r.visitantes ?? 0));
  }
  return [...out]
    .map(([nombre, visitantes]) => ({ nombre, visitantes }))
    .sort((a, b) => b.visitantes - a.visitantes);
}

const SECCIONES = {
  intro: "Inicio",
  "who-t": "¿Qué te trae?",
  who: "¿Qué te trae?",
  servicios: "Servicios",
  services: "Servicios",
  videos: "Vídeos",
  video: "Vídeo",
  nets: "Redes",
  contacto: "Contacto",
  page: "Resto de la página",
  wrap: "Cabecera",
};
const seccion = (s) => SECCIONES[s] ?? s;
const PAGINAS = {
  "/": "Portada",
  "/links/": "Enlaces (bio)",
  "/links": "Enlaces (bio)",
  "/privacidad/": "Privacidad",
};
const pagina = (p) =>
  PAGINAS[p] ??
  (String(p).startsWith("/guias/") ? `Guía ${String(p).slice(7).replace(/\/$/, "")}` : p);
const SALIDAS = { whatsapp: "WhatsApp", email: "Email", phone: "Teléfono" };

// Lista con barras: la longitud es proporcional al máximo de la lista.
function barras(
  rows,
  {
    valor = "visitantes",
    etiqueta = (r) => r.nombre,
    extra = () => "",
    vacio = "Sin datos todavía.",
  } = {}
) {
  const list = arr(rows).filter((r) => (r[valor] ?? 0) > 0);
  if (!list.length) return `<p class="empty">${esc(vacio)}</p>`;
  const max = Math.max(...list.map((r) => r[valor]));
  return `<ol class="bars">${list
    .map(
      (r, i) => `<li${i === 0 ? ' class="top"' : ""}>
        <span class="lbl">${esc(etiqueta(r))}</span>
        <span class="track" aria-hidden="true"><span style="--w:${((r[valor] / max) * 100).toFixed(1)}%"></span></span>
        <span class="num">${n(r[valor])}</span>${extra(r) ? `<span class="sub">${extra(r)}</span>` : ""}
      </li>`
    )
    .join("")}</ol>`;
}

function bloque(id, pregunta, respuesta, cuerpo, { aviso = "" } = {}) {
  return `<section id="${id}" aria-labelledby="${id}-h">
    <h2 id="${id}-h">${esc(pregunta)}</h2>
    ${respuesta ? `<p class="answer">${esc(respuesta)}</p>` : ""}
    ${aviso ? `<p class="warn">${esc(aviso)}</p>` : ""}
    ${cuerpo}
  </section>`;
}

const r = d.resumen ?? {};
const resp = d.respuestas ?? {};
const visitantes = r.visitantes ?? 0;
const pocos = visitantes < MUESTRA_MIN;
const avisoMuestra = pocos
  ? `Solo ${n(visitantes)} visitantes: tómalo como pista, no como conclusión. A partir de ${MUESTRA_MIN} empieza a ser fiable.`
  : "";

// 1. Contactos
const c = d.contactos ?? {};
const salidas = arr(c.salidas).map((s) => ({ ...s, nombre: SALIDAS[s.tipo] ?? s.tipo }));
const f = c.formulario ?? {};
const pasosForm = [
  ["Lo abren", f.abiertos],
  ["Pasan al email", f.paso2],
  ["Llegan al mensaje", f.paso3],
  ["Lo envían", f.enviados],
];
const formHtml = f.abiertos
  ? `<ol class="steps">${pasosForm
      .map(([l, v], i) => {
        const prev = i ? (pasosForm[i - 1][1] ?? 0) : null;
        const lost = prev !== null && prev > (v ?? 0) ? prev - (v ?? 0) : 0;
        return `<li><span class="num">${n(v ?? 0)}</span><span class="lbl">${l}</span>${lost ? `<span class="lost">se van ${n(lost)}</span>` : ""}</li>`;
      })
      .join(
        ""
      )}</ol>${f.fallidos ? `<p class="warn">${n(f.fallidos)} envío(s) fallaron en el servidor.</p>` : ""}${
      arr(f.desde).length
        ? `<p class="meta">Lo abren desde: ${arr(f.desde)
            .map((x) => `${esc(seccion(x.nombre))} (${n(x.personas)})`)
            .join(", ")}</p>`
        : ""
    }`
  : `<p class="empty">Nadie ha abierto el formulario todavía.</p>`;
const contactosHtml = `<div class="cols">
  <div><h3>Salidas directas</h3>${barras(salidas, {
    valor: "personas",
    extra: (s) =>
      arr(s.desde).length
        ? `desde ${arr(s.desde)
            .map((x) => esc(pagina(x)))
            .join(" y ")}`
        : "",
    vacio: "Nadie ha pulsado WhatsApp, email ni teléfono.",
  })}</div>
  <div><h3>Formulario de contacto</h3>${formHtml}</div>
</div>`;

// 2. Origen
const o = d.origen ?? {};
const fuentes = agruparFuentes(o.fuentes);
const origenHtml = `<div class="cols">
  <div><h3>Por dónde llegan</h3>${barras(fuentes)}</div>
  <div><h3>Campañas y vídeos (UTM)</h3>${barras(o.campanas, { vacio: "Ninguna visita con UTM. Añade ?utm_campaign=… a los enlaces de cada vídeo para saber cuál trae gente." })}</div>
  <div><h3>País</h3>${barras(o.paises, { vacio: "Sin país todavía: se registra desde el 7 de noviembre." })}</div>
  <div><h3>Dispositivo</h3>${barras(o.dispositivos)}</div>
</div>`;

// 3. La web
const w = d.web ?? {};
const porPagina = new Map();
for (const s of arr(w.secciones)) {
  if (!porPagina.has(s.pagina)) porPagina.set(s.pagina, []);
  porPagina.get(s.pagina).push(s);
}
const tablaPaginas = arr(w.paginas).length
  ? `<table><thead><tr><th scope="col">Página</th><th scope="col">Visitantes</th><th scope="col">Vistas</th><th scope="col">Se van sin hacer nada</th></tr></thead><tbody>${arr(
      w.paginas
    )
      .map(
        (p) =>
          `<tr><th scope="row">${esc(pagina(p.ruta))} <span class="path">${esc(p.ruta)}</span></th><td>${n(p.visitantes)}</td><td>${n(p.vistas)}</td><td>${pct(p.rebote)}</td></tr>`
      )
      .join("")}</tbody></table>`
  : `<p class="empty">Sin páginas vistas.</p>`;
const webHtml = `${tablaPaginas}
<div class="cols">
  <div><h3>Servicios que abren</h3>${barras(w.servicios, { valor: "personas", vacio: "Nadie ha abierto el detalle de un servicio." })}</div>
  <div><h3>Redes que pulsan</h3>${barras(w.redes, { valor: "personas", vacio: "Nadie ha pulsado tus redes." })}</div>
  ${arr(w.who).length ? `<div><h3>«¿Qué te trae?»</h3>${barras(w.who, { valor: "personas" })}</div>` : ""}
</div>`;

// 4. Dónde se atascan
const embudo = arr(d.embudo);
let atascoHtml;
if (!embudo.length || visitantes < 10) {
  atascoHtml = `<p class="empty">Con menos de 10 visitantes no hay recorrido que leer.</p>`;
} else {
  const top = embudo[0].personas || 1;
  let peor = -1;
  let peorPerdida = 0;
  embudo.forEach((e, i) => {
    if (!i) return;
    const loss = (embudo[i - 1].personas ?? 0) - (e.personas ?? 0);
    if (loss > peorPerdida) [peor, peorPerdida] = [i, loss];
  });
  atascoHtml = `<ol class="funnel">${embudo
    .map((e, i) => {
      const loss = i ? (embudo[i - 1].personas ?? 0) - (e.personas ?? 0) : 0;
      return `${
        i
          ? `<li class="gap${i === peor && !pocos ? " worst" : ""}" aria-label="Se pierden ${n(loss)}"><span>${loss > 0 ? `se pierden ${n(loss)}` : "no se pierde nadie"}${i === peor && !pocos ? " · el mayor atasco" : ""}</span></li>`
          : ""
      }<li class="stage">
        <span class="lbl">${esc(e.paso)}</span>
        <span class="track" aria-hidden="true"><span style="--w:${(((e.personas ?? 0) / top) * 100).toFixed(1)}%"></span></span>
        <span class="num">${n(e.personas)}</span>
        ${e.detalle ? `<span class="sub">${esc(e.detalle)}</span>` : ""}
      </li>`;
    })
    .join("")}</ol>`;
  if (porPagina.size) {
    atascoHtml += `<div class="cols">${[...porPagina]
      .map(
        ([p, rows]) =>
          `<div><h3>Hasta dónde bajan en ${esc(pagina(p))}</h3>${barras(rows, { valor: "personas", etiqueta: (s) => seccion(s.seccion) })}</div>`
      )
      .join("")}</div>`;
  }
}

// 5. Google
const g = d.google;
const googleHtml = g
  ? `<p class="line"><span><b>${n(g.clics)}</b> clics</span><span><b>${n(g.impresiones)}</b> veces en resultados</span><span><b>${pct(g.ctr)}</b> pulsan</span><span>posición media <b>${typeof g.posicion === "number" ? g.posicion.toFixed(1) : "–"}</b></span></p>
<div class="cols">
  <div><h3>Búsquedas</h3>${barras(g.consultas, { valor: "impresiones", etiqueta: (q) => q.consulta, extra: (q) => `${n(q.clics)} clics · pos. ${typeof q.posicion === "number" ? q.posicion.toFixed(1) : "–"}`, vacio: "Sin búsquedas todavía." })}</div>
  <div><h3>Páginas en Google</h3>${barras(g.paginas, { valor: "impresiones", etiqueta: (q) => pagina(q.ruta), extra: (q) => `${n(q.clics)} clics`, vacio: "Sin páginas con impresiones." })}</div>
</div>`
  : `<p class="empty">Search Console aún no está conectado. Cuando lo esté, aquí saldrán las búsquedas por las que apareces, los clics y tu posición.</p>`;

// 6. Guías
const gu = d.guias;
const guiasHtml =
  gu && arr(gu.lista).length
    ? `${typeof gu.leads_total === "number" ? `<p class="line"><span><b>${n(gu.leads_total)}</b> emails en total</span></p>` : ""}
<table><thead><tr><th scope="col">Guía</th><th scope="col">Visitantes</th><th scope="col">Vistas</th><th scope="col">Dejan el email</th></tr></thead><tbody>${arr(
        gu.lista
      )
        .map(
          (x) =>
            `<tr><th scope="row">${esc(x.titulo || pagina(x.guia))} <span class="path">${esc(x.guia)}</span></th><td>${n(x.visitantes)}</td><td>${n(x.vistas)}</td><td>${x.desbloqueos == null ? "–" : n(x.desbloqueos)}</td></tr>`
        )
        .join("")}</tbody></table>`
    : `<p class="empty">Todavía no hay guías con visitas. En cuanto /guias tenga tráfico saldrán aquí, con las que más se leen y cuántos dejan el email.</p>`;

const bloques = [
  ["contactos", "¿Me llegan contactos?", resp.contactos, contactosHtml],
  ["origen", "¿Qué vídeo o red trae gente?", resp.origen, origenHtml],
  ["web", "¿Qué parte de la web funciona?", resp.web, webHtml, { aviso: avisoMuestra }],
  ["atasco", "¿Dónde se atascan?", resp.atasco, atascoHtml, { aviso: avisoMuestra }],
  ["google", "¿Cómo voy en Google?", resp.google, googleHtml],
  ["guias", "¿Qué guías se leen?", resp.guias, guiasHtml],
];

const desde = d.periodo?.desde;
const hasta = d.periodo?.hasta;
const generado = d.generado ? new Date(d.generado) : new Date();

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Analítica de drumorera.com</title>
<style>
@font-face{font-family:"Geist";src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:100 900;font-display:swap}
:root{--ink:#000;--soft:#5f5f66;--line:#e6e6ea;--tint:#f4f5f8;--bg:#fff;--accent:#2440ff;--bar:#d9dbe3;--warn:#8a5a00;--warn-bg:#fff6e0;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--ink:#f2f2f4;--soft:#a3a3ad;--line:#2a2b31;--tint:#16171b;--bg:#0c0d10;--accent:#7f8dff;--bar:#33353d;--warn:#f0c46a;--warn-bg:#2a2210}}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:72px}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{font-family:"Geist",system-ui,sans-serif;background:var(--bg);color:var(--ink);font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased;font-variant-numeric:tabular-nums}
::selection{background:var(--accent);color:#fff}
a{color:inherit;text-underline-offset:3px}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:4px}
.wrap{max-width:1040px;margin:0 auto;padding:0 24px}
header.top{padding-block:56px 28px}
.site{font-size:14px;color:var(--soft)}
h1{font-size:clamp(2rem,1.4rem + 2.4vw,3.25rem);line-height:1.05;letter-spacing:-0.03em;font-weight:650;margin-top:6px;text-wrap:balance}
.period{margin-top:10px;color:var(--soft)}
.line{display:flex;flex-wrap:wrap;gap:8px 28px;margin-top:22px;font-size:15px;color:var(--soft)}
.line b{color:var(--ink);font-weight:600;font-size:18px;margin-right:4px}
nav.index{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:saturate(1.4) blur(10px);-webkit-backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid var(--line)}
nav.index ol{list-style:none;display:flex;gap:4px;overflow-x:auto;padding-block:10px;scrollbar-width:none}
nav.index ol::-webkit-scrollbar{display:none}
nav.index a{display:block;white-space:nowrap;padding:7px 12px;border-radius:999px;text-decoration:none;font-size:14px;color:var(--soft);transition:background .18s,color .18s}
nav.index a:hover{background:var(--tint);color:var(--ink)}
nav.index a[aria-current="true"]{background:var(--ink);color:var(--bg)}
main section{padding:56px 0 8px;border-top:1px solid var(--line)}
main section:first-child{border-top:0}
h2{font-size:1.75rem;line-height:1.15;letter-spacing:-0.025em;font-weight:650;text-wrap:balance}
.answer{font-size:1.25rem;line-height:1.4;margin-top:10px;max-width:62ch;text-wrap:pretty}
h3{font-size:14px;font-weight:600;color:var(--soft);margin-bottom:12px}
.cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:36px 48px;margin-top:32px}
.bars{list-style:none;display:grid;gap:10px}
.bars li,.funnel .stage{display:grid;grid-template-columns:minmax(0,9.5rem) 1fr auto;align-items:center;gap:4px 12px}
.lbl{font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.track{height:8px;border-radius:999px;background:var(--tint);overflow:hidden}
.track>span{display:block;height:100%;width:var(--w);background:var(--bar);border-radius:inherit}
.top .track>span,.funnel .stage:first-child .track>span{background:var(--ink)}
.num{font-weight:600;min-width:2ch;text-align:right}
.sub{grid-column:1/-1;font-size:13px;color:var(--soft);margin-top:-2px}
.empty{color:var(--soft);max-width:60ch;margin-top:24px;padding:16px 18px;background:var(--tint);border-radius:12px}
.cols .empty{margin-top:0}
.warn{display:inline-block;margin-top:16px;font-size:14px;color:var(--warn);background:var(--warn-bg);padding:6px 12px;border-radius:8px}
.meta{font-size:14px;color:var(--soft);margin-top:14px}
.steps{list-style:none;display:grid;gap:2px}
.steps li{display:grid;grid-template-columns:3ch 1fr auto;gap:12px;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--line)}
.steps li:last-child{border-bottom:0}
.steps .num{text-align:left;font-size:18px}
.lost{font-size:13px;color:var(--soft)}
table{width:100%;border-collapse:collapse;margin-top:28px;font-size:15px}
th,td{text-align:right;padding:10px 0 10px 16px;border-bottom:1px solid var(--line)}
th:first-child{text-align:left;padding-left:0;font-weight:500}
thead th{font-size:13px;color:var(--soft);font-weight:500}
.path{font-size:13px;color:var(--soft);margin-left:6px}
.funnel{list-style:none;margin-top:28px;max-width:720px}
.funnel .stage{padding:6px 0}
.funnel .stage .track{height:14px}
.funnel .stage .lbl{font-weight:500}
.funnel .gap{padding:2px 0 2px 9.5rem;font-size:13px;color:var(--soft)}
.funnel .gap span{display:inline-block;padding-left:16px;border-left:1px dashed var(--line);line-height:26px}
.funnel .gap.worst span{color:var(--ink);font-weight:600;border-left-color:var(--ink)}
footer{margin:72px 0 56px;padding-top:24px;border-top:1px solid var(--line);font-size:14px;color:var(--soft)}
footer ul{list-style:none;display:grid;gap:6px;max-width:75ch}
@media (max-width:600px){.wrap{padding:0 16px}header.top{padding-top:36px}nav.index ol{margin-inline:-6px}main section{padding-top:44px}.bars li,.funnel .stage{grid-template-columns:minmax(0,7.5rem) 1fr auto}.funnel .gap{padding-left:7.5rem}.path{display:none}th,td{padding-left:10px}}
</style>
</head>
<body>
<header class="top wrap">
  <p class="site">drumorera.com</p>
  <h1>Así va la web</h1>
  <p class="period">${desde ? rango(desde, hasta) : ""} · generado el ${generado.toLocaleString("es-ES", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</p>
  <p class="line"><span><b>${n(r.visitantes)}</b> visitantes</span><span><b>${n(r.vistas)}</b> páginas vistas</span><span><b>${dur(r.duracion_s)}</b> por visita</span><span><b>${pct(r.rebote)}</b> se van sin hacer nada</span></p>
</header>
<nav class="index" aria-label="Preguntas"><ol class="wrap">${bloques.map(([id, q]) => `<li><a href="#${id}">${esc(q.replace(/[¿?]/g, ""))}</a></li>`).join("")}</ol></nav>
<main class="wrap">
${bloques.map(([id, q, a, body, opt]) => bloque(id, q, a, body, opt)).join("\n")}
</main>
<footer class="wrap">
  <ul>
    ${arr(d.notas)
      .map((x) => `<li>${esc(x)}</li>`)
      .join("")}
    <li>Datos de PostHog${g ? " y Search Console" : ""}, sin tus visitas ni las pruebas (filtro de cuentas internas).</li>
  </ul>
</footer>
<script>
// Marca en el índice la pregunta que se está leyendo.
const links=[...document.querySelectorAll("nav.index a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;links.forEach(l=>l.setAttribute("aria-current",String(l.hash==="#"+e.target.id)))}),{rootMargin:"-30% 0px -60% 0px"});
document.querySelectorAll("main section").forEach(s=>io.observe(s));
</script>
</body>
</html>`;

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, html);
console.log(output);
