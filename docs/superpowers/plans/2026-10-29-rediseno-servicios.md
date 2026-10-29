# Rediseño de drumorera.com como web de servicios: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sustituir el portfolio por una web de servicios de una página (más `/links`) que reproduce el prototipo aprobado, con envío real del formulario por Cloudflare `send_email`.

**Architecture:** Astro 5 en `output: "static"` con `@astrojs/cloudflare@12`; todo se prerenderiza salvo `src/pages/api/contact.ts` (`prerender = false`). El contenido vive en datos (`src/data/*`), la lógica pura en `src/lib/*` (con tests Vitest) y cada pieza visual es un componente `.astro` con su CSS con ámbito y un `<script>` vanilla TS que copia los tiempos y curvas del prototipo. Todo el contenido se renderiza en el servidor (SEO); el JS solo alterna estados.

**Tech Stack:** Astro 5.17, `@astrojs/cloudflare` 12.6, Tailwind 4 (solo base/reset), `@fontsource-variable/geist`, `@lucide/astro`, Vitest 4, wrangler.

**Spec:** `docs/superpowers/specs/2026-10-29-rediseno-servicios-design.md` · Referencia visual: `docs/superpowers/prototypes/2026-10-29-escenario-v2.html`

## Global Constraints

- Solo español. Se retira la i18n, las colecciones y los componentes del portfolio (quedan en la etiqueta `v1-portfolio-antiguo`).
- Colores: `#FFFFFF`, tinta `#000000`, gris `#6E6E73`, línea `#E6E6EA`, fondo suave `#F4F5F8`, acento `#2440FF`, éxito `#0E7A57`.
- Curvas: `--ease: cubic-bezier(.7,0,.2,1)`, `--spring: cubic-bezier(.2,.9,.3,1.3)`. Radios: escenario 28px, tarjetas 20px, botones píldora.
- Geist 300–800, títulos 500–550 con tracking −0,035em. Iconos de trazo 1,7px.
- Los tiempos del prototipo son contrato: texto sale 0,35s/−18px y entra escalonado (+0,05s por bloque); objeto 0,75s `--ease` con `scale(.94) rotate(tilt)` durante 420ms; caras con retardo .55s y elementos a .7/.95/1.2/1.45s; píldora 0,55s; barra 0,6s; fondo del panel 0,8s; pasos del modal 0,55s; hoja del modal 0,5s `--spring`.
- Nada atado al scroll. Con `prefers-reduced-motion` todo es instantáneo y el anillo no gira solo.
- Nada falso en producción: sin número no hay WhatsApp; con menos de 5 vídeos no hay sección de vídeos ni enlace "Vídeos"; sin "Últimos" (≥5 con fecha) no hay selector; redes sin URL no salen. Los datos de ejemplo solo se cargan con `import.meta.env.DEV`.
- Sin frameworks de UI ni librerías de animación.
- CI en verde: `npm run format:check`, `npm run type-check`, `npm test`, `npm run build`.
- No tocar `main` ni desplegar.

## Review Focus

1. Abrir con `/#mentoria` (o cualquier ancla) debe abrir ese servicio sin animación y sin saltar a un elemento oculto. → test de `serviceIndexFromHash` (Task 2).
2. Doble clic rápido en Siguiente o flechas mantenidas no debe desincronizar pestaña, texto y objeto. → bloqueo `busy` como en el prototipo; se verifica a mano en Task 4.
3. Envíos repetidos o bots: el campo trampa relleno devuelve 200 sin enviar; más de 5 envíos por IP en 10 min devuelve 429. → tests de `handleContact` (Task 7).
4. Nombres o mensajes con saltos de línea, acentos o `<script>` no deben romper las cabeceras del email ni inyectar cabeceras. → test de `buildMime` (Task 7).
5. Producción sin `CONTACT_TO` configurado: el endpoint responde 503 y el modal muestra solo las alternativas existentes. → test de `handleContact` + `contactAlternatives` (Task 7).

---

### Task 1: Base nueva, retirada del portfolio y adaptador

**Files:**

- Delete: `src/components/**` (todos), `src/content/**`, `src/content.config.ts`, `src/i18n/**`, `src/utils/**`, `src/pages/en/**`, `src/pages/proyectos/**`, `public/images/projects/**`, `src/assets/images/projects/**`
- Modify: `astro.config.mjs`, `wrangler.jsonc`, `src/data/site.ts`, `src/types/index.ts`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/404.astro`, `package.json`, `.gitignore`
- Create: `src/components/Head.astro`, `public/_redirects`, `src/data/site.example.ts`, `src/lib/config.ts`, `src/lib/config.test.ts`

**Interfaces:**

- Produces: `siteConfig` (`name`, `url`, `realName`, `handle: "@soydruia"`, `email: "hola@drumorera.com"`, `whatsapp: string` (vacío = no hay), `whatsappText: "Hola Dru, vengo de tu web…"`, `networks: Record<"tiktok"|"instagram"|"facebook"|"youtube", string>`, `extraLinks: {github, linkedin}`); `getPublicConfig(dev: boolean): PublicConfig` que rellena con `site.example.ts` solo si `dev`; `whatsappUrl(number: string, text: string): string | null` (`https://wa.me/<solo dígitos>?text=<encode>`, `null` si no hay dígitos); `BaseLayout` con props `{ title?, description?, noindex?: boolean }`.

- [ ] Tests: `whatsappUrl("+34 600 11 22 33", "Hola")` → `"https://wa.me/34600112233?text=Hola"`; `whatsappUrl("", "x")` → `null`; `getPublicConfig(false).whatsapp` es el de `siteConfig` y `getPublicConfig(true)` usa el de ejemplo cuando el real está vacío.
- [ ] Config: `adapter: cloudflare({ imageService: "compile" })`, `output: "static"`, sin `i18n`, sitemap con `filter` que excluye `/links`. `session: { driver: "memory" }` para no exigir KV. `wrangler.jsonc`: `send_email: [{ name: "SEND_EMAIL" }]`, `vars: { CONTACT_FROM: "web@drumorera.com" }` (`CONTACT_TO` lo pone Dru). `public/_redirects`: `/en /`, `/en/* /`, `/proyectos/* /` con 301. Scripts: `dev`/`build` sin cambios; `.gitignore` añade `.wrangler/` y `.dev.vars`.
- [ ] `global.css`: Tailwind (sin typography), tokens del diseño en `:root`, Geist desde `@fontsource-variable/geist`, `:focus-visible` con acento, `.wrap` (min(1240px, 100% − 32px)), botones `.cta`/`.cta.ghost`/`.big`, regla de reduced-motion del prototipo.
- [ ] `Head.astro`: título "Dru Morera · Automatizaciones, webs y IA para tu negocio", descripción de servicios, OG `/og-image.jpg` 1200×630, JSON-LD `Person` + `ProfessionalService` con los servicios de `services.ts`, CSP sin los dominios del chatbot, `robots` `noindex` si `noindex`.
- [ ] `npm test && npm run type-check && npm run build` verdes; commit `refactor: retira el portfolio y prepara la base de la web de servicios`.

### Task 2: Datos de servicios y lógica de encaje

**Files:** Create `src/data/services.ts`, `src/data/who.ts`, `src/lib/services.ts`, `src/lib/services.test.ts`

**Interfaces:**

- Produces: `type ServiceId = "automatizaciones"|"webs"|"shopify"|"consultoria"|"mentoria"|"colaboraciones"`; `type WhoId = "negocio"|"vender"|"aprender"|"marca"`; `interface Service { id; name; icon; who: WhoId[]; title; one; fit: string[]; cta; waitlist?: boolean; moreVideos?: boolean; shape: { w; h; r; bg; ob; tilt; ms } }`; `services: Service[]` (orden y textos del prototipo; ancla `colaboraciones`, no `marcas`); `whoOptions: { id: WhoId; title; sub; icon }[]`; `matchingServices(picked: Iterable<WhoId>, list?: Service[]): Service[]`; `serviceIndexFromHash(hash: string, list?: Service[]): number` (−1 si no hay); `summaryText(matches: Service[]): string`.

- [ ] Tests: `matchingServices(["vender"])` → ids `["webs","shopify"]`; `["negocio","aprender"]` → `automatizaciones, webs, consultoria, mentoria` en orden del escenario; `[]` → `[]`. `serviceIndexFromHash("#mentoria")` → 4; `"#nada"`, `""` → −1. `summaryText` con 1 → "Te encajan 1 servicio: …", con 2 → "2 servicios", nombres en minúscula separados por comas.
- [ ] Commit `feat: datos de servicios y lógica de "¿Qué te trae por aquí?"`.

### Task 3: Cabecera, intro, "¿Qué te trae por aquí?", contacto y pie

**Files:** Create `src/components/Header.astro`, `Intro.astro`, `WhoTiles.astro`, `ContactSection.astro`, `Footer.astro`, `src/pages/index.astro`

**Interfaces:**

- Consumes: `whoOptions`, `matchingServices`, `summaryText`, `getPublicConfig`.
- Produces (eventos de ventana): `who:change` con `detail: { picked: WhoId[] }` y `services:open` con `detail: { id: ServiceId }`. `localStorage["dru:who"]` guarda la selección (try/catch). Cualquier `[data-open]` (con `data-svc` opcional) abre el modal.

- [ ] Marcado y CSS del prototipo (tiles con check animado, `aria-pressed`, resumen `aria-live`, botón "Verlos" que hace scroll a `#servicios` y emite `services:open` con el primero tras 450 ms). Email grande que copia y muestra "Email copiado" 1,8 s. WhatsApp solo si `whatsappUrl` ≠ null. Header: "Vídeos" solo si hay sección de vídeos; en < 980px solo "Contactar".
- [ ] Captura escritorio y 390px. Commit.

### Task 4: El escenario de servicios

**Files:** Create `src/components/ServicesStage.astro`, `src/components/ServiceFaces.astro`

**Interfaces:** Consumes `services`, `serviceIndexFromHash`, eventos `who:change` / `services:open`.

- [ ] Pestañas `role="tablist"` con roving tabindex, `aria-selected`, `aria-controls`; píldora; barra y "N de 6"; seis bloques de texto prerenderizados (solo uno visible) con "Encaja con lo que buscas" oculto salvo encaje; seis caras del objeto con los mismos contenidos del prototipo; Anterior/Siguiente con nombre de destino; flechas del teclado solo con el escenario en pantalla, modal cerrado y foco fuera de campos; swipe > 50px; `history.replaceState` con el ancla; carga con ancla → instantáneo. Tiempos y `busy` idénticos al prototipo; con reduced motion, `go` es instantáneo.
- [ ] Mejora permitida: `aria-live` solo anuncia el título.
- [ ] Capturas de los 6 servicios en escritorio y en 390px; comprobar reduced motion con emulación. Commit.

### Task 5: Datos sociales y anillo de vídeos

**Files:** Create `src/data/social.json`, `src/data/social.example.json`, `src/lib/social.ts`, `src/lib/social.test.ts`, `src/components/VideoRing.astro`, `src/assets/videos/.gitkeep`

**Interfaces:**

- Produces: `interface Video { id; network: Network; title; url; thumbnail?: string; views: number; publishedAt?: string }`; `interface SocialData { updatedAt; followers: Record<Network, number>; videos: Video[] }`; `selectVideoSets(videos): { top: Video[]; latest: Video[] } | null` (válidos = con `url` https y `title`; `top` por vistas desc. máx. 8; `latest` por fecha desc. máx. 8 o `[]` si < 5 con fecha; `null` si < 5 válidos); `formatCount(n): string` (`5300` → `"5.300"`, `300` → `"300"`); `formatViews(n): string` (`210000` → `"210K"`, `1250000` → `"1,2M"`, `950` → `"950"`); `totalFollowers(f): number`; `getSocial(dev: boolean): SocialData` (ejemplo solo en dev); `hasVideoSection(dev)`.
- Miniaturas: `import.meta.glob("/src/assets/videos/*.{jpg,jpeg,png,webp}")` resueltas por `id`; si falta, degradado de reserva.

- [ ] Tests de las funciones anteriores, incluido `selectVideoSets` con 4 válidos → `null`, con 9 → `top.length === 8`, y con vídeos sin fecha → `latest` `[]`.
- [ ] `social.json` real: `updatedAt "2026-10-28"`, seguidores Facebook 2400, Instagram 2300, TikTok 300, YouTube 300, `videos: []`. `social.example.json` con 8 vídeos de ejemplo.
- [ ] Anillo: radio según N (`max(base, (w/2)/tan(π/N) + 24)`), giro automático −0,08°/frame salvo hover/reduced motion, arrastre con inercia ×0,94, botones ±3,2, tarjeta frontal con borde blanco, enlaces `target="_blank" rel="noopener"`, selector con animación `swap` escalonada 40 ms. Se pausa con `IntersectionObserver` fuera de pantalla (mejora de rendimiento, no ata nada al scroll).
- [ ] Capturas. Commit.

### Task 6: Modal de contacto en 3 pasos (cliente)

**Files:** Create `src/components/ContactModal.astro`, `src/lib/contact-validation.ts`, `src/lib/contact-validation.test.ts`

**Interfaces:**

- Produces: `interface ContactInput { name: string; email: string; message: string; services: string[]; website?: string }`; `validateField(step: 0|1|2, value: string): string` (mensaje o `""`: "Escribe tu nombre para seguir.", "Revisa el email, parece que falta algo.", "Cuéntame en una frase qué necesitas."); `validateContact(input: unknown): { ok: true; data: ContactInput } | { ok: false; error: string }` (recorta, nombre ≤ 100, email ≤ 200 y con la regex del prototipo, mensaje ≤ 5000, `services` ⊂ ids + `"otro"`); `contactAlternatives(cfg): { label; href }[]`.

- [ ] Tests de `validateField` y `validateContact` (vacíos, email sin dominio, tipos no string, servicios desconocidos filtrados).
- [ ] Modal del prototipo + trampa de foco, devolver el foco al cerrar, campo trampa `website` oculto, estado "Enviando…", vista de éxito ("Mensaje enviado" / "Gracias, {nombre}. Te respondo a {email} lo antes posible.") y vista de error con alternativas. Chips preseleccionados (servicio del botón o encajes de `who:change`).
- [ ] Capturas de los 3 pasos, error de validación y éxito. Commit.

### Task 7: Endpoint `/api/contact`

**Files:** Create `src/lib/contact-handler.ts`, `src/lib/contact-handler.test.ts`, `src/lib/rate-limit.ts`, `src/pages/api/contact.ts`, `src/env.d.ts`

**Interfaces:**

- Produces: `buildMime({ from, to, replyTo, subject, text, date, messageId }): string` (cabeceras sin CR/LF, `Subject` en RFC 2047 UTF-8 base64, cuerpo `text/plain; charset=utf-8` en base64); `createRateLimiter(limit: number, windowMs: number): (key: string, now: number) => boolean`; `handleContact(request: Request, deps: { send?: (raw: string, from: string, to: string) => Promise<void>; from?: string; to?: string; dev: boolean; limiter; now: () => number }): Promise<Response>` → `200 {ok:true}`, `400 {ok:false,error}`, `429`, `503 {ok:false,error:"unavailable"}`, `502` si `send` lanza.
- `api/contact.ts`: `prerender = false`; `POST` obtiene `locals.runtime.env.SEND_EMAIL`, `CONTACT_FROM`, `CONTACT_TO`; `send` hace `import("cloudflare:email")` dinámico y `env.SEND_EMAIL.send(new EmailMessage(from, to, raw))`. En dev sin binding: registra en consola y responde 200.

- [ ] Tests: JSON inválido → 400; trampa rellena → 200 sin llamar a `send`; sin `to` en prod → 503; 6.º envío en 10 min misma IP → 429; `send` que lanza → 502; `buildMime` con nombre `"Ana\r\nBcc: x@y.z"` no produce línea `Bcc:` y el asunto con acentos va codificado; `Reply-To` es el email del visitante.
- [ ] `npm run build` genera `dist/_worker.js` y el resto estático. Commit.

### Task 8: `/links`, SEO, OG y llms.txt

**Files:** Create `src/pages/links.astro`, `public/og-image.jpg` (1200×630, generada con Chrome headless desde un HTML en el scratchpad), Modify `public/llms.txt`, `public/robots.txt`, `src/pages/404.astro`

- [ ] `/links`: `noindex`, foto (`src/assets/images/yo.jpg` con `<Image>`), @soydruia, frase, botón WhatsApp (si hay) y "Escríbeme" (modal), accesos a `/#<servicio>`, último vídeo (si hay sección) y redes con URL. Misma estética.
- [ ] Capturas en 390px. Commit.

### Task 9: Verificación final

- [ ] `npm run format:check && npm run type-check && npm test && npm run build`.
- [ ] Recorrido completo con capturas (1440px y 390px), emulación de reduced motion, teclado (Tab, flechas, Esc), envío del modal en dev.
- [ ] Revisión del diff completo por un revisor nuevo; corregir lo que salga.
- [ ] Dejar `npm run dev` en marcha y pasar la URL.
