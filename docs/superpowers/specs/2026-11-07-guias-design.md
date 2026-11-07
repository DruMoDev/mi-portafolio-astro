# Guías en drumorera.com: diseño

Fecha: 2026-11-07. Toca dos repos: este (`DruMoDev/mi-portafolio-astro`, la web) y `DruMoDev/video-editor` (tiktok-editor, en `/Users/drumorera/Documents/tiktok/tiktok-editor`).

## Intención y porqué

Hoy las guías que Dru promete en los vídeos ("comenta X y te paso la guía") viven en un hub público de Notion (`soydruia.notion.site`, catálogo en `studio/content/notion-hub.md` de tiktok-editor), con la indexación en buscadores apagada. Todo ese tráfico se va a Notion y no deja nada.

Dru quiere que las guías vivan en su web, para que:

1. el tráfico de los vídeos y de Google llegue a drumorera.com, donde vende sus servicios;
2. cada guía empuje hacia el servicio que le encaja;
3. se vaya formando una lista de leads (emails) para cuando lance cursos de pago, sabiendo qué guías ha leído cada persona;
4. desde tiktok-editor las guías nuevas se creen y publiquen directamente en la web, sin pasar por Notion nunca más.

El SEO tiene que estar al nivel del resto de la web ("brutal"), y las guías tienen que sentirse parte de la web, con su estética.

## Objetivos

- Sección `/guias` (índice) y `/guias/<slug>` (cada guía), prerenderizadas, en el estilo de la web.
- Muro de email suave en cada guía, indexable por Google.
- Base de leads propia con historial de guías vistas por persona.
- Bloque de servicio relacionado al final de cada guía.
- Migración de las guías actuales de Notion (revisándolas), cambio de todos los enlaces en tiktok-editor y aviso con enlace a la web en cada página de Notion.
- Flujo en tiktok-editor que crea una guía en la web y la publica sin revisión manual.

## No objetivos (por ahora)

- Cursos de pago, pagos, áreas de usuario, login.
- Enviar emails a los leads (ni newsletter, ni confirmación, ni doble opt-in). Solo se juntan.
- Herramienta externa de email marketing.
- CMS o colecciones "live" de Astro: las guías son Markdown en el repo y se construyen en el build.
- Actualizar a Astro 6.
- Panel de leads en el dashboard de tiktok-editor (posible más adelante).

## Anti-objetivos (sería un fracaso aunque funcione)

- Que Google no pueda leer el contenido de las guías, o las trate como cloaking.
- Un muro brusco: popup que tapa todo desde la primera línea, pedir más que el email, confirmaciones por correo.
- Mandar los emails a un tercero (PostHog u otro).
- Mezclar los leads con DForge (`dforge-api` / su D1): esto es del proyecto personal de Dru, no de DForge.
- Que tras la migración algún bot de comentarios de tiktok-editor siga mandando enlaces de Notion.

## Decisiones de Dru

- **Email sí**, para formar lista de leads, con un muro muy poco brusco: fondo difuminado, que quede claro que solo es el email y que la guía viene justo después.
- **Solo juntar emails** para cuando lance cursos; no se les escribe de momento.
- **Base separada**, propia de la web, sin relación con DForge.
- **Seguir las visitas** de quien ya dejó el email: saber cuántas guías y cuáles ha visto.
- **Después de la guía, sus servicios.**
- **Las guías nuevas se publican directamente** desde tiktok-editor, sin revisión previa; Dru retoca después si hace falta.
- Orden de trabajo: este diseño → diseños visuales y organización → construir → migrar las guías actuales (revisándolas) → aviso en Notion → automatización desde tiktok-editor.

## Decisiones del agente (propuestas, Dru puede tumbarlas)

### Contenido

- Colección de contenido de Astro (build-time) en `src/content/guias/<slug>.md`, definida en `src/content.config.ts` con el loader `glob`. Markdown simple; MDX solo si una guía lo necesita de verdad.
- Frontmatter (esquema zod, el builder afina nombres):
  - `title`, `description` (meta), `publishedAt`, `updatedAt`;
  - `service`: un `ServiceId` de `src/data/services.ts` (el servicio del bloque final);
  - `videos`: lista de enlaces a los vídeos de origen (opcional, para mostrarlos en la guía);
  - `keyword`: la palabra del CTA (opcional, solo informativa);
  - `gateAfter`: dónde empieza la parte bloqueada (ver muro). Por defecto, tras el primer `##`.
  - `draft` / `orphan`: las guías huérfanas (su vídeo se retiró) se publican igual pero no se destacan.
- Las guías "maestras" que crecen con cada vídeo (instalar skills, comandos de Claude Code) son una sola guía que se amplía, igual que hoy en Notion.

### Rutas y SEO

- `/guias` (índice) y `/guias/<slug>`. Dejar libre `/cursos` para el futuro.
- Slugs cortos y legibles. Enlace corto opcional `drumorera.com/g/<slug>` → redirección 301 a `/guias/<slug>`, para comentarios de TikTok (sustituye a `resource_url_short`).
- Cada guía: `<title>` y description propios (vía `Head.astro`, ampliando sus props), canonical, `og:type=article`, imagen OG por guía (generada en build; el método es del builder), JSON-LD `Article` (o `HowTo` cuando sea un paso a paso) con `author` = el `#person` que ya define `Head.astro`, `BreadcrumbList`, y la marca de contenido con muro (abajo). Entran en el sitemap (ya lo genera `@astrojs/sitemap`).
- Enlazado interno: índice ↔ guías, guías relacionadas, enlace a `/guias` en header o footer (decisión de la fase de diseño).

### Muro de email

- El HTML lleva **la guía entera**. La parte bloqueada va dentro de un contenedor con clase fija (p. ej. `.guia-cerrada`) y el JSON-LD la declara con `isAccessibleForFree: false` + `hasPart` → `WebPageElement` con `cssSelector: ".guia-cerrada"`. Es la marca que documenta Google para contenido con muro; sin ella sería cloaking.
- Visible siempre: título, intro y el primer apartado. Desde ahí, el texto se difumina y encima hay una tarjeta: solo un campo de email, una línea de consentimiento con enlace a `/privacidad` y un botón. El texto deja claro que es solo el email y que la guía sigue justo debajo.
- Al enviar: se desbloquea al momento (se quita el difuminado). Sin confirmación por correo.
- El navegador guarda un identificador anónimo (no el email) en `localStorage` o en una cookie propia; con él no se vuelve a pedir el email en ninguna guía.
- Es un muro suave a propósito: se puede saltar con el inspector y se acepta. No se pone `noindex` ni se bloquean las guías en robots.
- Sin JS, la guía se ve entera (mejora progresiva).

### Leads y visitas

- Base Cloudflare D1 **nueva y propia de la web** (binding en `wrangler.jsonc` de `dru-portfolio`), nada en la D1 de DForge.
- Tablas (el builder fija el esquema exacto):
  - `leads`: id anónimo, email (único, normalizado), fecha de alta, texto y versión del consentimiento aceptado, guía de alta, origen (UTM: red, vídeo).
  - `visitas`: lead id, slug de guía, primera y última vez, número de visitas.
- Endpoint en el Worker (`prerender = false`, como `/api/contact`): alta de email (si el email ya existe, se reutiliza su id y se añade la guía) y registro de visita con el id guardado. Validación y límite por IP reutilizando `contact-validation.ts` y `rate-limit.ts`.
- Varios dispositivos: se pide el email de nuevo y, al ser el mismo, se une al mismo lead.
- Consentimiento (RGPD): dice que se guarda el email y qué guías lee, para avisarle de cursos y guías nuevas. `/privacidad` se amplía con esta sección. No depende del banner de cookies de PostHog.
- Ver los leads: un comando o script del repo (`wrangler d1 execute ...` o un `npm run leads`) que saque la lista con sus guías. Exportable a CSV para cuando haya cursos.

### Después de la guía

- Bloque con el servicio de `service` (nombre, frase y CTA salen de `src/data/services.ts`) y enlace a todos los servicios (`/#servicios` o lo que haya). Puede abrir el modal de contacto existente.
- Guías relacionadas debajo.

### Medición

- **Decisión del agente:** un solo enlace por proyecto, con `utm_campaign=<slug-proyecto>` (y `utm_medium=video`). Así se sabe de qué vídeo viene cada lead sin tocar `lib/` de tiktok-editor: los bots de TikTok, Instagram y YouTube siguen mandando la misma `resource_url` de siempre. Separar también por red exigiría cambiar `lib/social/engagement.py`, `tiktok_comentarios.py` y `config_schema.py` (zona protegida); queda como mejora posible, no entra en este trabajo. PostHog ya recoge las UTM; el endpoint de leads guarda también el origen.

### Migración

- Guías actuales: las 13 subpáginas del hub, listadas con sus ids en `studio/content/notion-hub.md` de tiktok-editor (2 huérfanas: Cowork y "elegir la IA"). Se leen con `ntn pages get <id>`, se pasan a Markdown en `src/content/guias/` y **las revisa el agente** (Dru no las revisa antes; se publican y se cambian los enlaces en una sola tirada) (datos caducados, comandos, prompts, enlaces) al pasarlas. Si alguna tiene fuente local en tiktok-editor (p. ej. `projects/cortos/como-hacer-una-skill-que-funcione/premio-notion.md`, `studio/content/ideas/largos/web-negocio-con-ia/`), se parte de ella.
- En tiktok-editor, todos los enlaces `soydruia.notion.site` (39 ficheros hoy: `config.json` con `engagement.cta.resource_url` / `resource_url_short`, `copy.md`, `carousel.json`, docs y skills) pasan a la URL de la web. Prioridad: los `engagement.cta` activos, porque responden comentarios solos.
- En cada página de Notion se añade arriba un aviso con el enlace a la nueva guía (Notion no permite redirigir). El hub deja de recibir guías nuevas; `notion-hub.md` queda como histórico con la tabla Notion → web.

### Automatización desde tiktok-editor

- Una skill (nueva o dentro de la de `copy`, a decidir al construir) que, para un proyecto de vídeo: escribe la guía en `src/content/guias/` del clon de la web (`/Users/drumorera/Code/freelance/mi-portafolio-astro`), pasa `format:check`, `type-check`, tests y build, hace commit y push a `main` y despliega; luego guarda la URL final en el `engagement.cta` del proyecto y comprueba que la URL responde 200.
- Sin revisión manual (decisión de Dru). Las verificaciones automáticas sí son obligatorias: si el build falla, no se hace push y la skill lo dice.
- **Cuándo:** en el paso del copy y CTA del proyecto, **antes de publicar el vídeo**. La URL se escribe en `engagement.cta` al momento, sin esperar al despliegue (decisión de Dru): el vídeo aún no está publicado, así que nadie puede comentar en los minutos que tarda el deploy. Al final, la skill hace una sola comprobación de que la URL da 200 y avisa si no.
- **Despliegue:** hoy es manual (`wrangler deploy` desde el Mac; comprobado el 2026-11-07 con `wrangler deployments list`: autor Dru, origen "Unknown"). Pasa a **Workers Builds** de Cloudflare: el repo se conecta una vez al Worker `dru-portfolio` desde el panel de Cloudflare (paso manual de Dru, guiado) y Cloudflare construye y despliega en cada push a `main`. Sin tokens ni secretos en GitHub. El CI de GitHub sigue como verja de comprobaciones. Así publicar funciona igual desde el Mac que desde la nube, y una guía en `main` siempre llega a producción. `main` de la web no está protegida, así que el push directo vale. Se documenta en `docs/proyectos/web-servicios.md` de `yo-ai-context`.
- Reglas de tiktok-editor que aplican: los cambios en `lib/` o `cli/` necesitan OK de Dru; si cambia infraestructura (D1 nueva, despliegue), se actualiza `INFRASTRUCTURE.md` en el mismo commit; documentación en `docs/proyectos/web-servicios.md` de `yo-ai-context`.

## Restricciones

- Stack actual: Astro 5.17, Tailwind 4, salida estática con adaptador de Cloudflare, Worker `dru-portfolio`. Sin dependencias nuevas salvo justificadas.
- Estética: la de la web (Geist, animaciones por bloques, no atadas al scroll).
- Sin rayas largas en el copy. Español.
- Prettier, `astro check`, Vitest y build en verde (el CI de la web).

## Lo que queda para el builder

- Esquema exacto de frontmatter y tablas, y nombres de rutas de la API.
- Cómo se generan las imágenes OG.
- `localStorage` o cookie para el id.
- Cómo se marca el corte del muro en el Markdown (por defecto tras el primer `##`, con override).
- El mecanismo de despliegue (ver arriba).
- Diseño visual de índice, guía, tarjeta del muro y bloque de servicio: se hace en una fase de diseño con Dru antes de construir, con prototipos.
