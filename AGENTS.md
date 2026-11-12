# AGENTS.md

## Qué es

drumorera.com: la web de servicios de Dru Morera (programador freelance y creador de contenido sobre IA, @soydruia). Vende sus servicios (automatizaciones e IA, webs, tiendas Shopify, consultoría, mentoría, colaboraciones) y convierte en contactos el tráfico de sus vídeos, que llega casi siempre desde el móvil. Producto y usuarios en `PRODUCT.md`; diseños y planes en `docs/superpowers/`.

## Stack

- Astro 5.17 (salida estática con rutas `prerender = false` para la API), Tailwind 4, TypeScript 5.9.
- Cloudflare Workers con el adaptador `@astrojs/cloudflare`: Worker `dru-portfolio`, dominio drumorera.com. Email Routing (`send_email`) para el formulario de contacto; service binding `DFORGE` al Worker `dforge-api` de tiktok-editor para las métricas de redes.
- PostHog (UE) para analítica, con aviso de cookies.
- Vitest, Prettier, ESLint (typescript-eslint estricto + eslint-plugin-astro), knip, Husky + lint-staged.

## Comandos

- preparar un clon o worktree: `bash scripts/preparar-entorno.sh`
- dev: `npm run dev`
- test: `npm run test`
- lint: `npm run lint`
- tipos: `npm run type-check` (astro check) y `npm run typecheck` (tsc con la deuda congelada)
- formato: `npm run format` / `npm run format:check`
- build: `npm run build`
- métricas de redes: `npm run social:sync`
- desplegar: automático con Workers Builds en cada push a `main` (ver README); a mano solo en una emergencia, `npm run build && npx wrangler deploy`
- leads: `npm run leads`

## Mapa del código

- `src/pages/`: rutas (portada, `/links`, `/privacidad`, `api/` con contacto y redes, `relay/`).
- `src/components/`: componentes de Astro de la web (escenario de servicios, anillo de vídeos, modal de contacto...).
- `src/lib/`: lógica pura y testeada (validación y envío de contacto, redes, configuración, analítica).
- `src/data/`: datos editables (`site.ts`, `services.ts`, `social.json`).
- `src/styles/`, `src/assets/`: estilos globales e imágenes.
- `public/`: estáticos servidos tal cual (`_redirects`, `robots.txt`, iconos); `llms.txt` lo genera `src/pages/llms.txt.ts`.
- `scripts/`: preparación del entorno y sincronización de métricas.
- `docs/superpowers/`: diseños (`specs/`), planes (`plans/`) y prototipos HTML aprobados (`prototypes/`).

## Reglas del proyecto

- Español en el código nuevo, los textos y los commits. Sin rayas largas (—) en ningún texto visible.
- La estética la fijan el prototipo aprobado de cada parte (`docs/superpowers/prototypes/`) y `PRODUCT.md`: minimalista y profesional, animaciones por bloques, nunca atadas al scroll.
- Interactividad con scripts ligeros en vanilla TS dentro de los componentes; sin frameworks de UI ni librerías de animación.
- Móvil primero; foco visible, `prefers-reduced-motion`, contraste AA.
- SEO prioritario: todo lo público lleva title, description, canonical y datos estructurados.
- Lógica de servidor como función pura con dependencias inyectadas y testeada (patrón de `src/lib/contact-handler.ts`); el endpoint de `src/pages/api/` solo conecta bindings.
