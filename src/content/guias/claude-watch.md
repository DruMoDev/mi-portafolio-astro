---
title: "Claude /watch: instalación y uso"
description: "Instala /watch (claude-video) en Claude Code o Codex copiando un prompt y pregúntale a tu IA por cualquier vídeo o grabación de pantalla."
lede: "claude-video le da a tu agente la skill /watch: le pasas un enlace o un archivo de vídeo y responde a lo que le preguntes. Lo instala el propio agente con un prompt; tú no tocas la terminal."
tema: "Claude Code"
publishedAt: 2026-07-11
updatedAt: 2026-11-17
service: automatizaciones
keyword: "WATCH"
gateAfter: 1
videos:
  - title: "Claude puede analizar cualquier vídeo compatible"
    url: "https://youtu.be/WKKSOPFaohQ"
  - title: "No vuelvas a tragarte un vídeo de 2 horas (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7661078167397911830"
---

`claude-video` es un proyecto abierto que le añade a tu agente la skill `watch`: le das una URL pública o un archivo de vídeo y responde a tus preguntas sobre él, con timestamps. Aquí no escribes comandos: copias un prompt y tu agente lo instala, lo configura y lo usa.

Funciona en **Claude Code** (terminal, pestaña Code de Claude Desktop o VS Code) y en **Codex**. No funciona en el chat de claude.ai ni en Cowork.

## Pídele a tu agente que lo instale

En **Claude Code**, pega esto:

```prompt title="Instalar /watch en Claude Code"
Instálame el plugin "watch" del repositorio bradautomates/claude-video.
Lee antes su README: https://github.com/bradautomates/claude-video
Si no puedes leerlo, dímelo y te lo pego.

- Hazlo tú desde tu terminal con los comandos de shell de Claude Code (claude plugin marketplace add bradautomates/claude-video y luego claude plugin install watch@claude-video), en ámbito de usuario para tenerlo en todos mis proyectos. No me pidas que ejecute nada.
- Comprueba con claude plugin list que watch@claude-video aparece instalado.
- Añade a tus instrucciones globales (~/.claude/CLAUDE.md) una línea: cuando te pase un enlace a un vídeo o un archivo de vídeo y te pregunte por él, usa la skill watch.

Cuando acabes, dime en dos líneas qué has instalado y qué tengo que hacer para que se active en esta sesión.
```

En **Codex**, este:

```prompt title="Instalar /watch en Codex"
Usa $skill-installer para instalar la skill watch desde:
https://github.com/bradautomates/claude-video/tree/main/skills/watch

Hazlo tú, no me pidas que ejecute nada. Si no puedes descargarla, dímelo y te digo qué hacer.
Después añade a tus instrucciones globales (~/.codex/AGENTS.md) una línea: cuando te pase un enlace a un vídeo o un archivo de vídeo y te pregunte por él, usa la skill watch.
Cuando acabes, dime en dos líneas qué has instalado.
```

Lo único que haces tú: en Claude Code, escribe `/reload-plugins` en el chat o abre una sesión nueva; en Codex, si la skill no aparece, reinicia Codex.

En cualquier otro agente compatible con Agent Skills (Cursor, Copilot…), pídele que la instale él con `npx skills add bradautomates/claude-video -g --skill watch -y` y que lo reinicies al acabar.

## Tu primer vídeo

Pásale el enlace y la pregunta en el mismo mensaje:

```prompt title="Primer vídeo"
Usa la skill watch con este vídeo: <URL de YouTube o ruta del archivo>
¿Qué hook utiliza en los primeros cinco segundos?
```

La primera vez te hace unas preguntas de configuración. La importante es **cómo quieres que vea los vídeos**:

- **Gemini** (la que recomienda el proyecto): el modelo de vídeo de Google ve el vídeo entero, con audio, y le pasa la respuesta a tu agente. Necesita una clave de [Google AI Studio](https://aistudio.google.com/apikey), que según el README es gratuita. Sacarla es lo único que haces tú, porque pide tu cuenta de Google; luego se la pegas en el chat o le pides que te abra el archivo de configuración para pegarla tú. Ojo: los vídeos de YouTube van directos a Google y los archivos locales se suben a Google y se borran tras la respuesta.
- **Local**: saca fotogramas y transcript en tu ordenador, sin clave y sin que el vídeo salga de tu máquina. Si faltan `ffmpeg` o `yt-dlp`, la propia skill los instala (en Mac, con Homebrew).

Si no quieres decidir ahora, elige local con detalle `balanced` y sin transcripción de respaldo: es lo más rápido para ver que funciona.

En Claude Code también puedes escribir `/watch` y elegir `/watch:watch` del menú: es la misma skill.

## Pregunta por cosas concretas

No le pidas «resúmelo» sin más. Pregunta por momentos, decisiones o mecanismos:

```prompt title="Solo lo que no es obvio"
Usa watch con <URL> y dime únicamente las ideas que no sean obvias.
```

```prompt title="Cambios visuales"
Usa watch con <URL>: ¿qué cambia visualmente durante los primeros diez segundos?
```

```prompt title="Notas con timestamps"
Usa watch con <URL> y conviértelo en notas estructuradas con timestamps.
```

```prompt title="Localizar un error"
Usa watch con <ruta de la grabación de pantalla> y encuentra el momento exacto en que aparece el error y qué puede estar causándolo.
```

## Vídeos largos

La precisión es mejor en vídeos de menos de diez minutos. En uno largo, dile el tramo:

```prompt title="Analizar solo un tramo"
Usa watch con <URL> solo entre el minuto 2:15 y el 2:45 y dime qué explica ahí.
```

Con el motor local también puedes pedirle el nivel de detalle:

- `transcript`: solo el texto, sin fotogramas.
- `efficient`: pasada visual rápida (hasta 50 fotogramas).
- `balanced`: el análisis normal (hasta 100 fotogramas).
- `token-burner`: sin límite de fotogramas. Gasta mucho contexto; úsalo solo en tramos cortos.

Si el vídeo tiene texto en pantalla que se lee mal, pídele que suba la resolución de los fotogramas.

## Costes y límites

- Si el vídeo tiene subtítulos, el transcript sale de ahí y no cuesta nada.
- Si no los tiene y usas el motor local, tira de Whisper: en tu ordenador con WhisperX (sin clave, unos 3 GB de disco y 8 GB de RAM) o en la nube con Groq u OpenAI (con su clave). Las claves y ajustes viven en `~/.config/watch/.env`, y de eso se encarga el agente.
- Con Gemini no hay fallback silencioso: si falla, el agente te lo dice y te ofrece repetirlo en local.
- No todos los vídeos privados ni todas las plataformas cerradas son accesibles. Si un vídeo es privado o no debe salir de tu ordenador, pídele que use el motor local.

## Actualizarlo

```prompt title="Actualizar /watch"
Actualiza el plugin watch@claude-video a la última versión (en Claude Code, con claude plugin update watch@claude-video desde tu terminal). Hazlo tú y dime qué versión queda instalada.
```

Después, otra vez `/reload-plugins` o una sesión nueva. En Codex, pídele que actualice la skill watch desde el mismo repositorio.

## Fuentes

- bradautomates, [repositorio de claude-video en GitHub](https://github.com/bradautomates/claude-video): instalación por agente, motores Gemini y local, niveles de detalle y requisitos de WhisperX (consultado el 17-nov-2026).
- bradautomates, [CHANGELOG y release v0.3.2](https://github.com/bradautomates/claude-video/releases/latest), del 25-sep-2026: motor Gemini desde la v0.3.0 (consultado el 17-nov-2026).
- Anthropic, [Install and manage plugins](https://code.claude.com/docs/en/discover-plugins): `claude plugin marketplace add`, `claude plugin install` en ámbito de usuario por defecto, `/reload-plugins` y nombres `/<plugin>:<skill>` (consultado el 17-nov-2026).
- OpenAI, [Build skills](https://learn.chatgpt.com/docs/build-skills): `$skill-installer` y reinicio de Codex si la skill no aparece (consultado el 17-nov-2026).
- Vercel Labs, [Skills CLI](https://github.com/vercel-labs/skills/blob/main/docs/commands.md): opciones `-g`, `--skill` y `-y` de `npx skills add` (consultado el 17-nov-2026).
