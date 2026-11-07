---
title: "Claude /watch: instalación y uso"
description: "Cómo instalar /watch (claude-video) en Claude Code, Claude Desktop o Codex y usarlo para preguntarle a Claude por cualquier vídeo o grabación de pantalla."
lede: "claude-video añade a Claude el comando /watch: le pasas un enlace o un archivo local y analiza subtítulos, audio y fotogramas para responder a lo que le preguntes. Así lo instalo y así lo uso."
tema: "Claude Code"
publishedAt: 2026-07-11
updatedAt: 2026-11-07
service: automatizaciones
keyword: "WATCH"
gateAfter: 1
videos:
  - title: "Claude puede analizar cualquier vídeo compatible"
    url: "https://youtu.be/WKKSOPFaohQ"
  - title: "No vuelvas a tragarte un vídeo de 2 horas (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7661078167397911830"
---

`claude-video` es un proyecto abierto que añade a Claude la capacidad de analizar vídeos a partir de subtítulos, audio y fotogramas. Puedes usar una URL pública compatible o un archivo local.

## Instálalo en Claude Code

Ejecuta estos dos comandos dentro de una sesión de Claude Code:

```text title="Instalar /watch"
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
```

Si prefieres hacerlo desde la terminal normal, sin abrir Claude Code:

```bash title="Desde la terminal"
claude plugin marketplace add bradautomates/claude-video
claude plugin install watch@claude-video
```

Para actualizarlo más adelante:

```text title="Actualizar"
/plugin update watch@claude-video
```

> Como viene en un plugin, en el menú de comandos te aparece como `/watch:watch`.

## Otras formas de instalarlo

### Claude Desktop

1. Abre **Customize → Plugins → Add → Add marketplace → Add from a repository**.
2. Pega `https://github.com/bradautomates/claude-video` y pulsa **Sync**.
3. Instala **Watch** y úsalo en una sesión de **Code**.

> No funciona dentro de tareas de Cowork, y tampoco en el chat de claude.ai: subir `watch.skill` como skill personalizada ya no está soportado.

### Codex y otros agentes

En Codex, con la CLI:

```bash title="Codex"
codex plugin marketplace add bradautomates/claude-video
codex plugin add watch@claude-video
```

En cualquier otro agente compatible con Agent Skills:

```bash title="Otros agentes"
npx skills add bradautomates/claude-video -g --skill watch
```

## Primer uso

Pásale un enlace y la pregunta en el mismo mensaje:

```prompt title="Con una URL"
/watch https://youtube.com/watch?v=... ¿qué hook utiliza en los primeros cinco segundos?
```

También admite archivos locales:

```prompt title="Con un archivo local"
/watch ~/Movies/bug.mov ¿en qué segundo falla la interfaz y qué puede estar causándolo?
```

## Pregunta por cosas concretas

No le pidas «resúmelo» sin más. Pregunta por momentos, decisiones o mecanismos:

```prompt title="Solo lo que no es obvio"
/watch [URL] dime únicamente las ideas que no sean obvias
```

```prompt title="Cambios visuales"
/watch [URL] ¿qué cambia visualmente durante los primeros diez segundos?
```

```prompt title="Notas con timestamps"
/watch [URL] convierte este vídeo en notas estructuradas con timestamps
```

```prompt title="Localizar un error"
/watch [archivo] encuentra el momento exacto donde aparece el error
```

## Vídeos largos

Para ganar precisión, limita el intervalo:

```text title="Analizar solo un tramo"
/watch [URL] --start 2:15 --end 2:45
```

Y elige el nivel de detalle con `--detail`:

- `transcript`: solo el texto.
- `efficient`: pasada visual rápida (hasta 50 fotogramas).
- `balanced`: el análisis normal (hasta 100 fotogramas).
- `token-burner`: sin límite de fotogramas. Gasta mucho contexto; úsalo solo en tramos cortos.

## Costes y límites

- Si el vídeo tiene subtítulos, el transcript sale gratis.
- Si no los tiene, tira de Whisper: en local con `whisperx` (sin clave de API) o en la nube con Groq (`GROQ_API_KEY`) u OpenAI (`OPENAI_API_KEY`). Las claves van en `~/.config/watch/.env`.
- No todos los vídeos privados ni todas las plataformas cerradas son accesibles.
- En vídeos largos, una ventana concreta funciona mejor que analizarlo todo.

## Fuentes

- [Repositorio de claude-video en GitHub](https://github.com/bradautomates/claude-video)
- [Última release](https://github.com/bradautomates/claude-video/releases/latest)
