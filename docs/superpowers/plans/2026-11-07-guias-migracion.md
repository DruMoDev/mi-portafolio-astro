# Guías: migración desde Notion y publicación desde tiktok-editor

Continúa `2026-11-07-guias-web.md` (ya en producción). Diseño: `docs/superpowers/specs/2026-11-07-guias-design.md`.

## 1. Migrar las 14 guías restantes (repo web, contenido: commit directo a `main`)

Fuente: `ntn pages get <id>` de cada subpágina del hub "Recursos | Dru, IA & Tech" (`38a5a81d-ebda-810e-8177-fd154ca8376f`), descargadas en `~/.agents-kit/tmp/notion-guias/`.

| id Notion   | Guía                                            | Proyecto de tiktok-editor           | Slug                                |
| ----------- | ----------------------------------------------- | ----------------------------------- | ----------------------------------- |
| 38a5…cfc1   | Cómo instalar skills en Claude Code             | carruseles/skills-claude-nivel      | como-instalar-skills-en-claude-code |
| 38b5…582d   | Comandos de Claude Code que más uso             | carruseles/comandos-claude-code     | comandos-de-claude-code             |
| 38f5…30bf   | Configura Claude antes de usarlo                | carruseles/claude-empezar-bien      | configura-claude-antes-de-usarlo    |
| 3915…8111   | Carruseles PRO con Claude Design                | carruseles/carruseles-con-claude    | carruseles-con-claude-design        |
| 39a5…c30c   | Claude Code + Chrome: activación segura         | carruseles/claude-controla-chrome   | claude-code-chrome                  |
| 39a5…f9db   | Claude Cowork (huérfana)                        | —                                   | claude-cowork                       |
| 39a5…acc6e  | Claude `/watch`                                 | carruseles/claude-ve-videos         | claude-watch                        |
| 39a5…5dba   | System prompts: repositorio y guía de lectura   | carruseles/secretos-oficiales-ia    | system-prompts                      |
| 39a5…f5f3d6 | Plantilla para elegir la IA correcta (huérfana) | —                                   | elegir-la-ia-correcta               |
| 3a35…838f   | Prompts para aprovechar Fable 5                 | cortos/fable-5-incluido             | prompts-fable-5                     |
| 3af5…ec8d   | El método Opus 5 + SOL                          | cortos/new-opus-5                   | metodo-opus-5-sol                   |
| 3af5…33df   | Haz la web de tu negocio con IA                 | largos/web-negocio-con-ia           | web-de-tu-negocio-con-ia            |
| 40e5…165e   | Habla con la IA (Superwhisper)                  | cortos/habla-con-la-ia-superwhisper | hablar-con-la-ia-superwhisper       |
| 4115…33d6   | Créditos de API de tu plan de Claude            | cortos/claude-planes-ultra          | creditos-api-plan-claude            |

Por guía: Markdown con el frontmatter de `src/content.config.ts`, pasos como `##`, fences con `title=""`, prompts como ` ```prompt `; revisar al pasarla (comprobar en la web oficial lo que pueda haber cambiado: comandos, precios, nombres, enlaces; corregir y anotar lo corregido); `service` según el tema; `videos` con las URLs publicadas que el proyecto tenga registradas; `orphan: true` en las huérfanas. Verificación: `npm run test && npm run build`, y revisión visual de 3 guías largas.

## 2. Enlaces en tiktok-editor (contenido: commit directo a `main`)

- Una sola URL por proyecto (sin separar por red, decidido en el diseño): `engagement.cta.resource_url` → `https://drumorera.com/guias/<slug>/?utm_medium=video&utm_campaign=<slug-proyecto>`; `resource_url_short` → `https://drumorera.com/g/<slug>?utm_campaign=<slug-proyecto>` (el 301 conserva la UTM).
- `copy.md`, `carousel.json`, `final/*`, `NOTAS.md`, `workflow.json`: cada enlace de Notion por el de la web.
- `studio/content/notion-hub.md` pasa a histórico con la tabla Notion → web.

## 3. Aviso en Notion

Cada subpágina migrada lleva arriba un aviso con el enlace a su guía en la web (`ntn pages edit`). El hub, un aviso general hacia `/guias`.

## 4. Publicar guías desde tiktok-editor

Skill `publicar-guia` en tiktok-editor (`.agents/skills/`): escribe la guía en `src/content/guias/` del clon de la web, pasa `npm run test` y `npm run build`, commit y push a `main` (contenido; Workers Builds despliega), escribe las URLs en `engagement.cta` del proyecto y comprueba que la guía responde 200. Las skills que hoy mandan a Notion (`copy`, `nuevo-carrusel`, `comentarios-tiktok`, `montar-largo`, `proponer-broll`, `docs/criterio-editorial.md`) pasan a esta.
