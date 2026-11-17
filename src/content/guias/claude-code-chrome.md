---
title: "Claude Code + Chrome: guía de activación segura"
description: "Conecta Claude Code con Chrome copiando un prompt: instalas la extensión oficial Claude in Chrome y tu agente hace el resto, con permisos por sitio."
lede: "Claude Code puede usar tu navegador real para probar webs, leer la consola y trabajar en páginas donde ya has iniciado sesión. Tú instalas la extensión; lo demás se lo pides con un prompt."
tema: "Claude Code"
publishedAt: 2026-07-11
updatedAt: 2026-11-17
service: automatizaciones
keyword: "CLAUDE"
gateAfter: 1
videos:
  - title: "Claude ya puede controlar tu navegador"
    url: "https://youtu.be/36bq3B-fH_E"
---

Claude abre sus propias pestañas, comparte tus sesiones iniciadas y trabaja en una ventana de Chrome visible, en tiempo real. No es un MCP que tengas que configurar: usa la extensión oficial Claude in Chrome. Lo único que haces tú es instalarla y aprobar los permisos; lo demás se lo pides a Claude Code.

Necesitas Chrome (o Edge), Claude Code y un plan de pago de Anthropic. Los requisitos exactos están al final.

## Pídele que use tu navegador

Abre Claude Code y pega esto:

```prompt title="Prompt de arranque"
Quiero que uses mi navegador con la integración oficial Claude in Chrome.
Lee primero la documentación: https://code.claude.com/docs/en/chrome
Si no puedes leerla, dímelo y te la pego.

Comprueba tú lo que puedas (tu versión, que estoy en un plan compatible y con sesión iniciada con /login) y dime solo lo que tenga que hacer yo con mis manos.

Cuando esté listo, haz una prueba de solo lectura: abre code.claude.com/docs, busca "hooks" y dime qué resultados aparecen. No envíes formularios ni cambies nada en ninguna página.
```

Si Claude Code no detecta la extensión, te sale un aviso que se llama "Claude wants to use your browser". Elige **Install extension**: te abre la página de la extensión y espera a que la instales. Esta es la parte que haces tú:

1. Pulsa **Add to Chrome** en la Chrome Web Store.
2. Inicia sesión con tu cuenta de Claude: la misma cuenta y organización que usas en Claude Code.
3. Vuelve a Claude Code y elige **Continue with browser tools**.

Si no te sale el aviso, escribe `/chrome` en el chat de Claude Code: ahí ves si está conectado y puedes reconectar. Funciona cuando el panel muestra "Status: Enabled" y "Extension: Installed".

La primera vez, antes de cada acción en una web te pide permiso con un aviso que empieza por "Claude in Chrome wants to". Puedes permitir todo en ese sitio para la sesión, así que piensa bien en cuál lo haces.

## Déjalo activado (opcional)

Por defecto lo conectas cuando lo necesitas. Si lo usas a diario, escribe `/chrome` en el chat y elige **Enabled by default**: desde la siguiente sesión arranca con el navegador sin pedírselo.

> Tenerlo siempre activado gasta más contexto, porque las herramientas del navegador se cargan en todas las sesiones. Si no lo usas a diario, déjalo apagado y pídeselo cuando haga falta.

Y para que lo use con cabeza sin repetírselo, pega esto una vez:

```prompt title="Reglas del navegador en tus instrucciones globales"
Añade a tus instrucciones globales (~/.claude/CLAUDE.md) unas reglas para cuando uses mi navegador con Claude in Chrome:

- Úsalo para comprobar en la web real lo que cambies (mi app en local, una página publicada), no para adivinar.
- Los login y los CAPTCHA los hago yo: párate y pídemelo.
- Antes de enviar un formulario, publicar, comprar o borrar algo, pregúntame.
- No entres en mi correo, mi banco ni documentos sensibles salvo que te lo pida en esa conversación.

Hazlo tú y dime en una línea qué has añadido.
```

## Pruébalo en tu app

Con la app arrancada en local:

```prompt title="Probar tu app local"
Abre <la URL de tu app>. Si la dejo así, usa localhost:3000.
Reproduce el flujo de login con datos inválidos, comprueba que salen los mensajes de error y revisa la consola.
Si encuentras un error, dime la causa antes de editar código.
```

Para la consola, pide algo concreto ("errores al cargar la página") en vez de "todo lo que salga": los logs pueden ser enormes.

## Casos útiles

- Probar formularios y validaciones de tu aplicación.
- Leer errores de consola y corregir el archivo que los causa.
- Redactar dentro de Google Docs, Gmail o Notion con tu sesión iniciada, sin configurar APIs.
- Extraer una tabla de una web y guardarla como CSV.
- Rellenar datos repetitivos desde un archivo local.
- Subir archivos de tu ordenador a un formulario web.
- Grabar un GIF de un flujo para documentarlo, o guardar una captura en disco.

> Los GIF capturan todo lo visible en el navegador, incluidos los datos de las cuentas con sesión iniciada. Revísalos antes de compartirlos.

## Si no conecta

```prompt title="Diagnosticar la conexión"
Claude in Chrome no conecta. Sigue la sección de problemas de https://code.claude.com/docs/en/chrome (si no puedes leerla, dímelo y te la pego).
Comprueba tú todo lo que puedas desde aquí: tu versión, si existe el archivo de configuración del native messaging host para mi navegador y en qué organización tengo la sesión iniciada.
Dime solo lo que tenga que hacer yo a mano, paso a paso.
```

Lo que te tocará a ti, normalmente:

- Comprobar en `chrome://extensions` que la extensión está habilitada.
- Escribir `/chrome` en el chat y elegir **Reconnect extension**.
- Reiniciar Chrome. La primera vez es normal: Claude Code instala un archivo de configuración que Chrome solo lee al arrancar.
- Si sale "Browser extension is not connected", la extensión suele tener sesión en otra cuenta u organización que Claude Code. `/status` te dice la organización de Claude Code.

## Requisitos y límites

- Google Chrome o Microsoft Edge. Según la documentación de Claude Code, también detecta otros navegadores basados en Chromium (Brave, Arc, Vivaldi, Opera); el centro de ayuda de la extensión solo da como soportado Chrome. No funciona en WSL.
- La extensión [Claude in Chrome](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn), versión 1.0.36 o superior.
- Un plan directo de Anthropic: Pro, Max, Ultra, Team o Enterprise.
- Sesión iniciada en Claude Code con `/login`. Con una API key o un token de `claude setup-token`, la integración se queda apagada.
- No está disponible si solo accedes por Amazon Bedrock, Google Cloud o Microsoft Foundry.
- Los permisos por sitio se gestionan en los ajustes de la extensión. Empieza con los mínimos dominios posibles.

## Fuentes

- Anthropic, [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome): requisitos, aviso de instalación guiada, Enabled by default, permisos y problemas (consultado el 17-nov-2026).
- Anthropic, [CLI reference](https://code.claude.com/docs/en/cli-reference): flags `--chrome` y `--no-chrome` (consultado el 17-nov-2026).
- Anthropic, [Manage Claude's memory](https://code.claude.com/docs/en/memory): instrucciones globales en `~/.claude/CLAUDE.md` (consultado el 17-nov-2026).
- Claude Help Center, [Getting started with Claude in Chrome](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome): instalación, planes y navegadores soportados (consultado el 17-nov-2026).
