# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Quien llega desde un vídeo de @soydruia** (TikTok, Instagram, Facebook, YouTube), casi siempre desde el móvil, hispanohablante. Viene a algo concreto: la guía que Dru prometió en el vídeo, para aplicarla ya, o a ver qué servicios ofrece.
- **Negocios y personas que buscan ayuda con IA, webs o tiendas**: quieren entender en segundos quién es Dru, qué ofrece y si les encaja, y contactar sin esfuerzo.
- **Quien llega desde Google** a una guía (desde 2026-11): busca cómo hacer algo con IA.

## Product Purpose

drumorera.com es la web de servicios de Dru Morera (programador freelance y creador de contenido sobre IA). Vende sus servicios (automatizaciones e IA, webs, tiendas Shopify, consultoría, mentoría, colaboraciones con marcas) y convierte el tráfico de sus vídeos en contactos.

La sección de guías (diseño en `docs/superpowers/specs/2026-11-07-guias-design.md`) trae a la web el tráfico que antes iba a Notion: cada guía resuelve lo prometido en un vídeo, junta leads (email) para futuros cursos de pago y lleva al servicio que encaja. Éxito: la guía se sigue sin perderse, el lector deja el email sin sentirse atrapado y una parte acaba mirando los servicios.

## Positioning

Dru programa con IA desde hace cuatro años, construye para negocios, enseña a usarla y lo cuenta en vídeo. Las guías son la continuación directa de vídeos concretos que el lector acaba de ver, escritas por quien hace el trabajo, no un blog genérico de IA.

## Operating Context

- El lector de una guía la usa **copiando prompts y comandos y siguiendo pasos** mientras lo hace en su ordenador o móvil.
- Llega por el enlace del vídeo (DM, comentario, descripción) o desde Google.
- Las guías nuevas se crean desde tiktok-editor (otro repo de Dru) y se publican sin revisión manual.

## Capabilities and Constraints

- Astro 5, Tailwind 4, salida estática con adaptador de Cloudflare (Worker `dru-portfolio`). Interactividad con scripts ligeros en vanilla TS, sin frameworks de UI ni librerías de animación.
- Solo en español.
- SEO es prioritario en toda la web, y en las guías especialmente: contenido completo en el HTML, datos estructurados, nada que Google pueda tomar por cloaking.
- Muro de email suave en las guías: solo el email, se desbloquea al momento.
- Contacto: `contacto@drumorera.com`, WhatsApp y modal de 3 pasos.
- Sin precios publicados ni pasarela de pago (cursos de pago: futuro, no decidido).

## Brand Commitments

- Nombre: Dru Morera; marca en redes @soydruia ("Dru | IA & Tech").
- Minimalista y profesional, pero diferente y con animaciones cuidadas **por bloques**, nunca atadas al scroll (Dru las probó y las descartó).
- La estética del prototipo aprobado `docs/superpowers/prototypes/2026-10-29-escenario-v2.html` es la referencia de la web.
- Sin rayas largas en el copy.

## Evidence on Hand

- Métricas reales de redes en `src/data/social.json` (sincronizadas desde tiktok-editor).
- Fotos de Dru: `src/assets/images/yo.jpg`, `avatar.jpg`.
- Contenido de las guías: 13 páginas del hub de Notion, catálogo en `studio/content/notion-hub.md` de tiktok-editor.
- No hay testimonios ni casos de clientes publicados: no inventarlos.

## Product Principles

1. Quien llega desde un vídeo consigue lo que vino a buscar sin fricción.
2. Claridad antes que efecto: una guía se sigue con un hilo claro de principio a fin.
3. La web es de Dru: ni plantilla genérica ni copia de Notion.
4. Pedir lo mínimo (solo el email) y dar valor antes de pedir.
5. Todo lo público se escribe pensando en el SEO.

## Accessibility & Inclusion

Foco visible, `prefers-reduced-motion` respetado, contraste AA, navegable con teclado. Móvil primero.
