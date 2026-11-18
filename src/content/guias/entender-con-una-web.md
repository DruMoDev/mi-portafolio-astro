---
title: "Pídele a la IA que te lo explique en una web"
description: "El truco de Karpathy para aprender con IA: un prompt para que ChatGPT o Claude te convierta cualquier explicación en una web visual e interactiva, y mi skill."
lede: "Si ChatGPT te explica algo y no lo entiendes, no le pidas otra explicación: pídele una web con dibujos y botones que puedas tocar. Aquí tienes los prompts y la skill que uso yo para que salga bien a la primera."
tema: "Prompts"
publishedAt: 2026-11-18
updatedAt: 2026-11-18
service: mentoria
keyword: "SKILL"
gateAfter: 1
videos: []
---

Un texto largo te cuenta las cosas; una web te deja tocarlas. La idea es de Andrej Karpathy, cofundador de OpenAI: al final de tu pregunta, pídele a la IA que estructure su respuesta como HTML y ábrelo en el navegador. No necesitas saber programar ni instalar nada: la web la escribe la IA y la ves en el propio chat.

Vale con **ChatGPT** (la ves en el Canvas) y con **Claude** (sale como artefacto), también en el plan gratis.

## Pídele la web

Cuando una respuesta no te entre, escribe esto en la misma conversación:

```prompt title="Explícamelo en una web"
Explícamelo en una web, visual e interactiva, con un ejemplo paso a paso.

- Una sola página, que se vea en este chat sin instalar nada.
- Empieza por la idea principal en una frase y un dibujo o diagrama.
- Pon al menos un control que pueda tocar (una barra, un botón, un número que cambio) y que el resultado cambie al momento, para que entienda qué pasa si cambio las condiciones.
- Usa un ejemplo con números o casos reales de lo que estamos hablando, no uno genérico.
- Textos cortos y en español.
```

Funciona igual para unas finanzas, un contrato, un concepto de clase o un código. Lo que más merece web es lo que se entiende cambiando algo y viendo el resultado: el interés compuesto (mueves los años y ves crecer el dinero), una hipoteca, una cláusula con varios casos, un algoritmo.

Si la primera versión no te convence, díselo en el mismo chat: "más simple", "añade un diagrama del proceso", "pon el ejemplo con mis números".

## Instala mi skill para que salga bien a la primera

Una skill es un archivo de instrucciones que la IA sigue siempre que toca. La mía, `explicar-en-web`, le dice cómo tiene que ser la web (una idea por bloque, un ejemplo que se puede tocar, sin relleno) para que no tengas que repetirlo en cada prompt.

En **Claude Code, Codex u otro agente**, pégale esto:

```prompt title="Instalar la skill"
Instala la skill explicar-en-web de https://github.com/DruMoDev/skills (está en skills/explicar-en-web/SKILL.md) para que la uses en todos mis proyectos. Haz tú todo, no me pidas que ejecute nada. Si no puedes leer el repositorio, dímelo y te pego el contenido del SKILL.md.
```

En **Claude (web o app)** es lo único que haces a mano:

1. En [el repositorio](https://github.com/DruMoDev/skills/tree/main/skills/explicar-en-web) descarga la carpeta `explicar-en-web` y comprímela en un zip (la carpeta entera, no solo el archivo).
2. Comprueba que tienes activada la ejecución de código en Configuración > Capacidades.
3. Ve a Personalizar > Skills, pulsa "+", elige subir una skill y sube el zip.

Desde ahí, cuando le digas "explícamelo en una web", Claude la usará sola.

## Ponle tu estilo

Este es el paso que casi nadie hace. Cuando una web te guste, pídele que te convierta ese estilo en una skill (o que adapte la mía):

```prompt title="Mi estilo de web"
Esta web me gusta. Créame una skill (o ajusta la sección "Mi estilo" de mi skill explicar-en-web) para que todas las webs que me hagas a partir de ahora sigan este estilo: <más diagramas / más minimalista / colores oscuros / lo que te guste>. Si no lo digo, saca tú el estilo de esta web.
```

En Claude, la skill nueva te la da como archivo para subir en Personalizar > Skills; en un agente como Claude Code o Codex la guarda él. A partir de ahí te la hace a tu gusto a la primera.

## Compártela con un enlace (ChatGPT de pago)

Si quieres pasarle a alguien todo lo que habéis hablado, en ChatGPT con plan de pago (Plus, Pro, Business o Enterprise) escribe en la conversación:

```prompt title="Web para compartir"
Crea con Sites una web de esta conversación, que la entienda alguien que no ha leído el chat.
```

ChatGPT Sites la publica y te da un enlace para mandarla, sin instalar nada. En el plan gratis no está; en Claude puedes publicar el artefacto y compartir su enlace.

## Fuentes

- Post de Andrej Karpathy sobre pedir la respuesta en HTML: [x.com/karpathy](https://x.com/karpathy/status/2053872850101285137) ([copia archivada](https://htmlcapsule.pages.dev/voices/karpathy-html-progression-2026)).
- ChatGPT Sites, planes y cómo crear un sitio (consultado el 18-nov-2026): [ayuda de OpenAI](https://help.openai.com/articles/20001339), [walkthrough oficial](https://developers.openai.com/training/walkthroughs/build-a-shareable-site).
- Skills en Claude, planes (incluido el gratis) y cómo subir una (consultado el 18-nov-2026): [centro de ayuda de Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude).
- La skill: [DruMoDev/skills, explicar-en-web](https://github.com/DruMoDev/skills/tree/main/skills/explicar-en-web).
