---
title: "La wiki de Karpathy: haz que la IA te escriba tu segundo cerebro"
description: "Monta la LLM Wiki de Karpathy con Codex o Claude Code copiando un prompt: tu agente lee su documento, crea la wiki y la usa como memoria."
lede: "Deja de subirle PDFs a la IA. Copias un prompt y tu agente lee el documento de Andrej Karpathy, te monta una wiki y la convierte en su memoria. Sin tocar la terminal."
tema: "IA"
publishedAt: 2026-11-12
updatedAt: 2026-11-17
service: automatizaciones
keyword: "WIKI"
gateAfter: 1
videos: []
---

Cuando le subes un PDF a ChatGPT, la IA lo busca desde cero en cada pregunta y no acumula nada. La idea de Karpathy es la contraria: tu agente te escribe una wiki con una página por tema y enlaces entre ellas, y la actualiza cada vez que le das algo nuevo. Tú lees; la IA escribe y mantiene. Aquí no vas a crear carpetas ni escribir comandos: todo lo hace tu agente.

Necesitas **Codex** o **Claude Code**, cualquiera de los dos agentes que trabajan con archivos de tu ordenador.

## Pídele a tu agente que te monte la wiki

Abre Codex o Claude Code y pega esto:

```prompt title="Prompt de arranque"
Lee el documento "LLM Wiki" de Andrej Karpathy: https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f/raw
Si no puedes leerlo entero, dímelo y te lo pego aquí.

Luego móntame esa wiki en mi ordenador:

- Ubicación: <carpeta donde la quieres>. Si la dejo así, créala en una carpeta llamada mi-wiki dentro de mi carpeta de usuario.
- Haz tú todo lo que haga falta (carpetas, archivos, el esquema con las reglas de la wiki). No me pidas que ejecute nada.
- Escríbelo todo en español y usa enlaces [[así]] entre páginas para que pueda verla en Obsidian.
- Conviértela en mi memoria: añade a tus instrucciones globales (las que lees en cualquier carpeta) que mi wiki está ahí, que la consultes antes de responder cuando la pregunta toque algo que pueda estar en ella, y que cuando en una conversación salga algo que valga la pena conservar, lo guardes en la wiki siguiendo su esquema y me avises en una línea de qué has guardado.

Cuando acabes, dime en pocas líneas dónde está, qué has creado y qué has añadido a tus instrucciones globales.
```

El documento está en inglés y no hace falta traducirlo. Karpathy lo escribió justo para esto: dice que es un "idea file" pensado para pasárselo a tu agente, que construye los detalles contigo.

Las instrucciones globales son las que tu agente lee siempre, trabajes donde trabajes: en Claude Code es `~/.claude/CLAUDE.md` y en Codex, `~/.codex/AGENTS.md`. Por eso la wiki deja de ser una carpeta que tienes que acordarte de abrir y pasa a ser la memoria de tu agente.

Si algo del esquema que te propone no te encaja, díselo en el mismo chat ("quiero una página por persona", "no guardes nada sin preguntarme"). Se va ajustando con el uso.

## Úsala sin pensar en ella

A partir de aquí no tienes que decir "mete esto en la wiki" ni "mira en mi wiki". Trabaja normal con tu agente: cuando le cuentes algo o le pases un artículo que valga la pena, lo guardará y te avisará; cuando preguntes algo que ya está en la wiki, la consultará.

Para meter algo a fondo (un PDF largo, un libro, un artículo clave), sí conviene pedirlo:

```prompt title="Meter una fuente a fondo"
Mete esto a fondo en mi wiki: guarda la fuente original, cuéntame en 5 líneas lo más importante, escribe su página de resumen y actualiza todas las páginas a las que afecta.

<pega aquí el enlace o el texto, o adjunta el archivo>
```

Mejor de una en una: lees lo que cambia y le corriges el rumbo si se va por donde no te interesa.

## Pásale una revisión de vez en cuando

```prompt title="Revisar la wiki"
Revisa mi wiki: busca contradicciones entre páginas, datos que una fuente más nueva ha dejado viejos, páginas sin enlaces y conceptos que se mencionan pero no tienen página. Arregla lo que sea seguro y dime lo que necesite mi decisión.
```

## Mírala en Obsidian (opcional)

Este es el único paso que haces tú. [Obsidian](https://obsidian.md) es gratis.

1. En la ventana de bóvedas elige **Open folder as vault** y selecciona la carpeta de tu wiki. Si no sabes dónde está, pregúntaselo a tu agente.
2. Pulsa **Open graph view** en la barra lateral izquierda.

Cada punto del grafo es una página y cada línea, un enlace. Lo más conectado son tus temas centrales. Karpathy trabaja así: el agente abierto a un lado y Obsidian al otro, viendo cómo cambia la wiki en tiempo real.

## Cómo funciona por dentro

Si te pica la curiosidad, esto es lo que te ha montado el agente siguiendo el documento:

- **Fuentes** (`raw/`): lo que le das. Las lee pero no las toca nunca.
- **La wiki** (`wiki/`): las páginas que escribe y mantiene él, más un índice (`index.md`) y un registro de cambios (`log.md`).
- **El esquema** (`AGENTS.md` en Codex, `CLAUDE.md` en Claude Code): las reglas que hacen que se porte como un bibliotecario disciplinado y no como un chat cualquiera.

La razón de fondo la da Karpathy: "Humans abandon wikis because the maintenance burden grows faster than the value". Las wikis se abandonan porque mantenerlas cuesta más de lo que aportan. Aquí el mantenimiento lo hace la IA.

## Checklist

- Prompt de arranque pegado y wiki creada.
- La wiki añadida a las instrucciones globales de tu agente.
- Una primera fuente metida a fondo.
- (Opcional) La carpeta abierta como bóveda en Obsidian.

## Fuentes

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md): instrucciones globales en `~/.codex/AGENTS.md` (consultado el 17-nov-2026).
- Anthropic, [Manage Claude's memory](https://code.claude.com/docs/en/memory): instrucciones de usuario en `~/.claude/CLAUDE.md` (consultado el 17-nov-2026).
- Andrej Karpathy, [LLM Wiki (llm-wiki.md)](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), gist público en GitHub, consultado el 17-nov-2026.
- Obsidian, [precios](https://obsidian.md/pricing): gratis, sin licencia obligatoria para uso comercial (consultado el 12-nov-2026).
- Obsidian Help, [Manage vaults](https://obsidian.md/help/manage-vaults) y [Graph view](https://obsidian.md/help/plugins/graph).
