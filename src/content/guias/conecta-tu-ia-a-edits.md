---
title: "Conecta Claude Code o Codex a Edits y que te edite los Reels"
description: "Cómo conectar Claude Code o Codex a Edits de Instagram en Mac por MCP: activar la automatización, el comando, la carpeta Películas y tu skill."
lede: "Edits, el editor de Instagram, ya está en Mac y trae un servidor MCP local para que tu IA lo maneje por dentro. Así lo conecto, qué le pido y cómo lo convierto en una skill que edita con mi estilo."
tema: "IA"
publishedAt: 2026-11-12
updatedAt: 2026-11-12
service: automatizaciones
keyword: "EDITS"
gateAfter: 1
videos: []
---

Edits para Mac trae un servidor de automatización (MCP) que solo escucha en tu propio Mac. Lo enciendes, le pasas a Claude Code o a Codex el comando que te da la app y, a partir de ahí, le hablas a tu IA como a un editor: abre el vídeo, quita silencios, pon subtítulos, pásalo a vertical. Publicar sigue siendo cosa tuya.

## Lo que necesitas

- Un Mac con Apple silicon (M1 o posterior). La versión de Edits que uso (454.0.0) pide macOS 15.1 o superior.
- Edits para Mac, gratis, con tu cuenta de Instagram iniciada.
- Claude Code o Codex instalado en ese mismo Mac. El servidor es local: no funciona desde la web ni desde otro ordenador.
- Edits abierto mientras trabajas. Si cierras la app, tu IA pierde la conexión.

## Activa la automatización en Edits

1. Abre Edits.
2. Ve a **Ajustes** y entra en la pestaña **Automatización** (en inglés, _Settings > Automation_).
3. Activa **Enable Automation Server**. Viene apagado.
4. En el apartado **Connect an AI client** verás tu **Access token** y los comandos ya preparados para Claude Code y para Codex.

El token es como una llave: quien lo tenga puede editar tus proyectos mientras el servidor esté encendido. No lo pegues en capturas, vídeos ni chats compartidos.

## Conéctalo a Claude Code o a Codex

Lo más seguro es copiar el comando tal cual desde la pestaña de Edits, porque ya lleva tu token. Si prefieres escribirlo a mano, es este (cambia `TU_TOKEN` por el tuyo):

```bash title="Claude Code"
claude mcp add --transport http --scope user metapilot-native http://127.0.0.1:19501/mcp --header "Authorization: Bearer TU_TOKEN"
```

Con `--scope user` queda disponible en todos tus proyectos. Para comprobarlo, abre Claude Code y escribe `/mcp`: tiene que salir `metapilot-native` conectado.

```bash title="Codex"
export METAPILOT_TOKEN=TU_TOKEN
codex mcp add metapilot-native --url http://127.0.0.1:19501/mcp --bearer-token-env-var METAPILOT_TOKEN
```

Codex guarda solo el nombre de la variable, no el token. Si abres Codex en otra terminal y no conecta, es que esa terminal no tiene `METAPILOT_TOKEN`: añade la línea `export` a tu `~/.zshrc`.

## Pon tus vídeos en Películas

Edits funciona dentro de la caja de seguridad de macOS. Cuando es tu IA la que importa el vídeo, solo puede leer de la carpeta **Películas** (`~/Movies`). Si le pasas un vídeo del Escritorio o de Descargas, fallará al importarlo.

Mi costumbre: una carpeta `~/Movies/raw` donde suelto lo que grabo.

## Tu primer encargo

Con Edits abierto, pídeselo como a un editor:

```prompt title="Primer montaje"
Abre Edits y crea un proyecto nuevo con el último vídeo de ~/Movies/raw. Quita los silencios cortando justo entre palabra y palabra, ponle subtítulos en español y pásalo a vertical 9:16 sin perderme del encuadre. Cuando acabes, mira unos fotogramas del resultado y corrige lo que no esté bien antes de decirme que has terminado.
```

Lo interesante es la última frase. Edits deja que tu IA vea lo que acaba de montar (puede sacar fotogramas y hojas de contacto del montaje), así que revisa su propio trabajo antes de dártelo.

Otras cosas que le puedes pedir:

- Música o efectos de sonido del catálogo de Edits.
- Aislar la voz y normalizar el volumen.
- Transiciones, filtros, animaciones de texto o que siga un objeto que le describas.
- Exportar el vídeo terminado.

Lo que no hace: **publicar**. No hay ninguna herramienta para subir a Instagram. El último clic es tuyo, desde Edits o desde la app.

## Conviértelo en una skill

Cuando un montaje te guste, no repitas el prompt cada vez. Pídele que guarde el método:

```prompt title="Guardar tu estilo"
El montaje me gusta así. Conviértelo en una skill llamada "editar-reel" con todos los pasos que has seguido: silencios, subtítulos, formato, música y la revisión final con fotogramas. Que use siempre el último vídeo de ~/Movies/raw si no le digo otro.
```

La próxima vez basta con decir "edita este vídeo" y lo hará con tu estilo. Si no sabes cómo funcionan las skills, aquí tienes [cómo crear una skill que funcione](/guias/como-crear-una-skill-que-funcione/).

## Si algo falla

- **"Unauthorized" o pide el token:** el token está mal copiado o lo has regenerado. Cópialo otra vez desde Ajustes > Automatización y vuelve a añadir el servidor.
- **No conecta nada:** comprueba que Edits está abierto y que el interruptor del servidor sigue encendido.
- **"Sandbox bookmark unavailable" al importar:** el vídeo no está en Películas. Muévelo a `~/Movies`.
- **Ves menos herramientas de las que esperabas:** las herramientas cambian según la pantalla en la que esté Edits. En la pantalla de inicio hay unas 30; dentro del editor, más de 270 (274 contadas en la versión 454.0.0, noviembre de 2026).
- **Algo que antes funcionaba deja de ir:** es una función nueva y Meta actualiza la app a menudo; puede cambiar o apagar la automatización. Revisa que tienes la última versión.

## Fuentes

- Comprobado en Edits para Mac 454.0.0 el 6 y el 12 de noviembre de 2026: pestaña Automation, comandos `claude mcp add` y `codex mcp add` que genera la propia app, puerto local 19501, carpeta Películas y lista de herramientas.
- [Anuncio de Edits para escritorio (Instagram)](https://edits.instagram.com/blog/edits-desktop-video-editor/)
- [Cobertura del lanzamiento: Mac con Apple silicon, gratis y soporte MCP (AlternativeTo)](https://alternativeto.net/news/2026/11/instagram-launches-edits-app-on-macos-with-multi-tracks-4k-export-luts-and-mcp-support/)
- [Conectar servidores MCP en Claude Code (Anthropic)](https://code.claude.com/docs/en/mcp)
- [Model Context Protocol en Codex (OpenAI)](https://developers.openai.com/codex/mcp)
