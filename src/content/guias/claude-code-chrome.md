---
title: "Claude Code + Chrome: guía de activación segura"
description: "Cómo conectar Claude Code con Chrome o Edge con la extensión oficial Claude in Chrome: requisitos, activación, primera prueba segura y permisos por sitio."
lede: "Claude Code puede usar tu navegador real para probar webs, leer la consola, rellenar formularios y trabajar en páginas donde ya has iniciado sesión. No es un MCP que tengas que configurar: usa la extensión oficial Claude in Chrome."
tema: "Claude Code"
publishedAt: 2026-07-11
updatedAt: 2026-11-07
service: automatizaciones
keyword: "CLAUDE"
gateAfter: 1
videos:
  - title: "Claude ya puede controlar tu navegador"
    url: "https://youtu.be/36bq3B-fH_E"
---

Claude abre sus propias pestañas, comparte tus sesiones iniciadas y trabaja en una ventana de Chrome visible, en tiempo real. Así lo activo sin darle más acceso del necesario.

## Requisitos

- Google Chrome o Microsoft Edge. También detecta otros navegadores basados en Chromium, como Brave, Arc, Vivaldi u Opera. No funciona en WSL.
- La extensión [Claude in Chrome](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn), versión 1.0.36 o superior.
- Claude Code actualizado.
- Un plan directo de Anthropic: Pro, Max, Ultra, Team o Enterprise.
- Haber iniciado sesión en Claude Code con `/login`. Si te autenticas con una API key o con un token de `claude setup-token`, la integración se queda apagada.
- No está disponible si solo accedes mediante Amazon Bedrock, Google Cloud o Microsoft Foundry.

## Actívalo

1. Instala la extensión oficial Claude in Chrome desde la Chrome Web Store.
2. Abre Chrome y comprueba que la extensión está activa y con sesión iniciada en la misma cuenta y organización que Claude Code.
3. Inicia Claude Code con Chrome:

```bash title="Arrancar Claude Code con Chrome"
claude --chrome
```

La primera vez te sale un aviso que explica cómo funcionan los permisos por sitio. Pulsa Enter para seguir.

Usa `/chrome` en cualquier momento para comprobar la conexión, gestionar permisos, reconectar la extensión o elegir navegador si tienes más de uno conectado. Funciona cuando el panel muestra "Status: Enabled" y "Extension: Installed".

Si quieres tenerlo siempre, entra en `/chrome` y selecciona **Enabled by default**.

> Activarlo por defecto gasta más contexto, porque las herramientas del navegador se cargan en todas las sesiones. Si no lo usas a diario, mejor arrancar con `--chrome` cuando lo necesites.

## Haz una primera prueba segura

Empieza por una acción de lectura en una página pública:

```prompt title="Prueba de solo lectura"
Abre code.claude.com/docs, busca "hooks" y dime qué resultados aparecen. No hagas cambios en ninguna página.
```

Después prueba tu aplicación local:

```prompt title="Prueba en tu app local"
Abre localhost:3000, reproduce el flujo de login y revisa la consola. Si encuentras un error, dime la causa antes de editar código.
```

## Controla los permisos

- Los permisos por sitio se gestionan desde los ajustes de la extensión. Empieza con el mínimo número posible de dominios.
- Antes de una acción en el navegador, Claude Code te pide permiso (el aviso empieza por "Claude in Chrome wants to"). Puedes permitir todo en ese sitio para la sesión, así que piensa bien en cuál lo haces.
- En modo plan te pide permiso antes de grabar un GIF, abrir una pestaña nueva o ejecutar un atajo.
- Los login y CAPTCHA los completas tú: Claude se para y te lo pide.
- No empieces probando con correo, banca o documentos sensibles.

> Los GIF que graba capturan todo lo visible en el navegador, incluidos los datos de cuentas con sesión iniciada. Revísalos antes de compartirlos.

## Casos útiles

- Probar formularios y validaciones de tu aplicación.
- Leer errores de consola y corregir el archivo que los causa.
- Redactar dentro de Google Docs.
- Extraer una tabla pública y guardarla como CSV.
- Completar datos repetitivos desde un archivo local.
- Subir archivos de tu ordenador a un formulario web.
- Grabar un GIF de un flujo para documentarlo.

## Si no conecta

1. Comprueba en `chrome://extensions` que la extensión está instalada y habilitada.
2. Actualiza Claude Code (`claude --version` para ver tu versión) y la extensión.
3. Comprueba que Chrome está abierto.
4. Ejecuta `/chrome` y selecciona **Reconnect extension**.
5. Si sigue sin ir, reinicia Claude Code y Chrome. La primera vez es normal tener que reiniciar Chrome para que lea la configuración nueva.

Si te sale "Browser extension is not connected", revisa que la extensión tenga sesión iniciada en la misma cuenta y organización que Claude Code (`/status` te dice en cuál estás).

## Fuentes

- [Usar Claude Code con Chrome (documentación oficial)](https://code.claude.com/docs/en/chrome)
- [Primeros pasos con Claude in Chrome](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome)
