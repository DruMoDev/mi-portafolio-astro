---
title: "Conecta Claude Code o Codex a Edits y que te edite los Reels"
description: "Conecta Claude Code o Codex a Edits de Instagram en Mac por MCP copiando un prompt: tu agente se configura solo y te monta los Reels."
lede: "Edits, el editor de Instagram, ya está en Mac y trae un servidor MCP local para que tu IA lo maneje por dentro. Enciendes un interruptor, copias un prompt y tu agente se conecta, te monta el vídeo y guarda tu estilo en una skill."
tema: "IA"
publishedAt: 2026-11-12
updatedAt: 2026-11-17
service: automatizaciones
keyword: "EDITS"
gateAfter: 1
videos: []
---

Edits para Mac trae un servidor de automatización (MCP) que solo escucha en tu propio Mac. Tú enciendes un interruptor en la app; todo lo demás (conectarlo, preparar la carpeta de vídeos, montar el Reel) lo hace tu agente. A partir de ahí le hablas como a un editor: abre el vídeo, quita silencios, pon subtítulos, pásalo a vertical. Publicar sigue siendo cosa tuya.

Necesitas:

- Un Mac con Apple silicon (M1 o posterior). La versión de Edits que probé (454.0.0) pide macOS 15.1 o superior.
- Edits para Mac, gratis, con tu cuenta de Instagram iniciada, y abierto mientras trabajas: si cierras la app, tu agente pierde la conexión.
- **Claude Code** o **Codex** en ese mismo Mac. El servidor es local: no funciona desde la web ni desde otro ordenador.

## Conecta tu agente a Edits

Esto es lo único que haces tú, porque está dentro de la app:

1. En Edits, ve a **Ajustes** y entra en la pestaña **Automatización** (en inglés, _Settings > Automation_).
2. Activa **Enable Automation Server**. Viene apagado.
3. En **Connect an AI client** copia el comando de tu agente (el de Claude Code o el de Codex). Ya lleva tu token dentro.

Ahora abre Claude Code o Codex y pega esto, con tu comando en el hueco:

```prompt title="Prompt de conexión"
Quiero que manejes Edits, el editor de vídeo de Instagram para Mac, por su servidor MCP local. Edits ya está abierto con el servidor encendido. Este es el comando que me da la app para conectarte:

<pega aquí el comando que has copiado de Edits>

Haz tú todo, no me pidas que ejecute nada:

- Ejecuta ese comando. Si eres Codex, el token va en una variable de entorno: guárdala también en mi ~/.zshrc para que no se pierda al abrir otra terminal.
- Comprueba que el servidor queda registrado (claude mcp list o codex mcp list, según quién seas).
- Edits solo puede importar vídeos desde mi carpeta Películas (~/Movies). Crea ~/Movies/raw si no existe: ahí dejaré lo que grabe.
- Añade a tus instrucciones globales (las que lees en cualquier carpeta) que para editar mis vídeos uses Edits por MCP, que mis vídeos sin editar están en ~/Movies/raw y que, si te paso uno de otra carpeta, lo copies tú allí antes de importarlo.

Si dudas de algún paso, consulta la documentación oficial de MCP de tu agente: https://code.claude.com/docs/en/mcp (Claude Code) o https://developers.openai.com/codex/mcp (Codex). Si no puedes leerla, dímelo y te la pego.

Cuando acabes, dime en pocas líneas qué has hecho y si tengo que reiniciarte para que veas las herramientas de Edits.
```

Lo normal es que te pida cerrarlo y volver a abrirlo: un servidor MCP recién añadido suele cargarse al arrancar. En Claude Code, escribe `/mcp` en el chat y tiene que salir `metapilot-native` conectado; en Codex también tienes `/mcp`.

El token es como una llave: quien lo tenga puede editar tus proyectos mientras el servidor esté encendido. Pegarlo en el chat de tu agente vale; en capturas, vídeos o chats compartidos, no.

## Tu primer encargo

Con Edits abierto, pídeselo como a un editor:

```prompt title="Primer montaje"
Abre Edits y crea un proyecto nuevo con <el vídeo que quieres editar. Si lo dejo así, usa el último de ~/Movies/raw>. Quita los silencios cortando justo entre palabra y palabra, ponle subtítulos en español y pásalo a vertical 9:16 sin perderme del encuadre. Cuando acabes, mira unos fotogramas del resultado y corrige lo que no esté bien antes de decirme que has terminado.
```

Lo interesante es la última frase. Edits deja que tu IA vea lo que acaba de montar (puede sacar fotogramas y hojas de contacto del montaje), así que revisa su propio trabajo antes de dártelo.

Otras cosas que le puedes pedir:

- Música o efectos de sonido del catálogo de Edits.
- Aislar la voz y normalizar el volumen.
- Transiciones, filtros, animaciones de texto o que siga un objeto que le describas.
- Exportar el vídeo terminado.

Lo que no hace: **publicar**. Entre sus herramientas no hay ninguna para subir a Instagram. El último clic es tuyo, desde Edits o desde la app.

## Conviértelo en una skill

Cuando un montaje te guste, no repitas el prompt cada vez. Pídele que guarde el método:

```prompt title="Guardar tu estilo"
El montaje me gusta así. Conviértelo en una skill llamada "editar-reel" con todos los pasos que has seguido: silencios, subtítulos, formato, música y la revisión final con fotogramas. Que use siempre el último vídeo de ~/Movies/raw si no le digo otro. Créala tú donde la encuentres en cualquier carpeta y dime dónde la has guardado.
```

La próxima vez basta con decir "edita este vídeo" y lo hará con tu estilo. Si no sabes cómo funcionan las skills, aquí tienes [cómo crear una skill que funcione](/guias/como-crear-una-skill-que-funcione/).

## Si algo falla

Casi todo se arregla pegándole el error a tu agente. Lo que solo puedes mirar tú:

- **No conecta nada:** comprueba que Edits está abierto y que el interruptor del servidor sigue encendido.
- **"Unauthorized" o pide el token:** lo has regenerado o se copió mal. Copia otra vez el comando desde Ajustes > Automatización y pégaselo a tu agente para que vuelva a añadir el servidor.
- **"Sandbox bookmark unavailable" al importar:** el vídeo no está en Películas. Pídele que lo copie a `~/Movies/raw` y lo vuelva a intentar.
- **Ves menos herramientas de las que esperabas:** cambian según la pantalla en la que esté Edits. En la pantalla de inicio hay unas 30; dentro del editor, más de 270 (274 contadas en la versión 454.0.0, noviembre de 2026).
- **Algo que antes funcionaba deja de ir:** es una función nueva y Meta actualiza la app a menudo; puede cambiar o apagar la automatización. Revisa que tienes la última versión.

## Cómo funciona por dentro

- Edits abre un servidor MCP en tu propio Mac (`http://127.0.0.1:19501/mcp`) protegido con tu token. El comando que copias lo registra en tu agente con el nombre `metapilot-native`: Claude Code lo guarda para todos tus proyectos (`--scope user`) y Codex guarda solo el nombre de la variable con el token (`--bearer-token-env-var`), no el token.
- Edits funciona dentro de la caja de seguridad de macOS. Cuando es tu IA la que importa, solo puede leer de **Películas**; por eso el prompt de conexión le enseña a copiar ahí los vídeos.

## Checklist

- Servidor de automatización encendido en Edits.
- Prompt de conexión pegado y agente reiniciado.
- Edits añadido a las instrucciones globales de tu agente.
- Un primer montaje revisado y guardado como skill.

## Fuentes

- Comprobado en Edits para Mac 454.0.0 el 6 y el 12 de noviembre de 2026: pestaña Automation, comandos `claude mcp add` y `codex mcp add` que genera la propia app, puerto local 19501, carpeta Películas y lista de herramientas. El 17-nov-2026 no pude volver a abrir la app; si tu versión cambia algún nombre, manda lo que veas en ella.
- Instagram, [Edits para escritorio](https://edits.instagram.com/blog/edits-desktop-video-editor/): versión para macOS, gratis y conexión de agentes por MCP (consultado el 17-nov-2026).
- [Cobertura del lanzamiento: Mac con Apple silicon, gratis y soporte MCP (AlternativeTo)](https://alternativeto.net/news/2026/11/instagram-launches-edits-app-on-macos-with-multi-tracks-4k-export-luts-and-mcp-support/)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp): `claude mcp add --transport http` con `--header`, `--scope user`, `claude mcp list` y `/mcp` (consultado el 17-nov-2026).
- OpenAI, [Model Context Protocol en Codex](https://developers.openai.com/codex/mcp): servidores en `~/.codex/config.toml`, `bearer_token_env_var`, `codex mcp list` y `/mcp`; el flag `--bearer-token-env-var` de `codex mcp add`, comprobado en la ayuda de codex-cli 0.167.0 (consultado el 17-nov-2026).
- Anthropic, [Manage Claude's memory](https://code.claude.com/docs/en/memory) y OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md): instrucciones globales en `~/.claude/CLAUDE.md` y `~/.codex/AGENTS.md` (consultado el 17-nov-2026).
