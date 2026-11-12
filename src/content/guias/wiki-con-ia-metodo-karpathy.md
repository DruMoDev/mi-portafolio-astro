---
title: "La wiki de Karpathy: haz que la IA te escriba tu segundo cerebro"
description: "Cómo montar la LLM Wiki de Karpathy con Codex o Claude Code: el archivo llm-wiki.md, el prompt de arranque en español y cómo verla en Obsidian."
lede: "Deja de subirle PDFs a la IA. Este es el archivo que Andrej Karpathy publicó para que tu agente te escriba y te mantenga una wiki que crece sola, y el prompt en español con el que la monto."
tema: "IA"
publishedAt: 2026-11-12
updatedAt: 2026-11-12
service: automatizaciones
keyword: "WIKI"
gateAfter: 1
videos: []
---

Cuando le subes un PDF a ChatGPT, la IA lo busca desde cero en cada pregunta y no acumula nada. La idea de Karpathy es la contraria: le das a tu agente una carpeta con tus fuentes y él te escribe una wiki en markdown, con una página por tema y enlaces entre ellas, que actualiza cada vez que añades algo. Tú lees; la IA escribe y mantiene.

## Cómo funciona la LLM Wiki

Karpathy lo publicó en GitHub como un "idea file", un archivo de texto pensado para pegárselo a tu agente (él cita Codex, Claude Code, OpenCode y Pi). No es una app: describe el patrón y tu agente construye los detalles contigo. Tiene tres capas:

- **Fuentes en bruto** (`raw/`): artículos, PDFs, notas, imágenes. La IA las lee pero no las modifica nunca. Son tu fuente de verdad.
- **La wiki** (`wiki/`): páginas en markdown que escribe la IA entera (resúmenes, personas, conceptos, comparaciones), con enlaces entre ellas.
- **El esquema**: un archivo de reglas (`AGENTS.md` para Codex, `CLAUDE.md` para Claude Code) que le dice al agente cómo está organizada la wiki y qué hacer en cada operación.

Y tres operaciones:

- **Ingest**: metes una fuente nueva y la IA la lee, escribe su resumen y actualiza todas las páginas a las que afecta. Según Karpathy, una sola fuente puede tocar 10 o 15 páginas.
- **Query**: le preguntas y responde a partir de la wiki, citando páginas. Lo que casi nadie hace: **las buenas respuestas se guardan como páginas nuevas**, así que cada pregunta deja la wiki más completa.
- **Lint**: de vez en cuando le pides una revisión: contradicciones, datos que una fuente nueva ha dejado viejos, páginas huérfanas sin enlaces.

Dos archivos fijos la ordenan: `index.md`, el catálogo de todas las páginas con una línea de resumen, y `log.md`, el registro de lo que se ha hecho y cuándo.

La razón de fondo está en su frase: "Humans abandon wikis because the maintenance burden grows faster than the value". Las wikis se abandonan porque mantenerlas cuesta más de lo que aportan. Aquí el mantenimiento lo hace la IA.

## Lo que necesitas

- Un agente que trabaje con archivos de tu ordenador: **Codex** (el agente de ChatGPT) o **Claude Code**.
- **Obsidian** (opcional, pero es lo que la hace brillar). Es gratis, también para uso comercial.
- Una carpeta vacía para la wiki. La mía se llama `mi-wiki`.

## Descarga el archivo de Karpathy

Es el archivo `llm-wiki.md` de su gist público. Puedes abrirlo y copiarlo desde el navegador, o descargarlo directamente dentro de tu carpeta:

```bash title="Crea la carpeta y descarga llm-wiki.md"
mkdir -p ~/mi-wiki && cd ~/mi-wiki
curl -L https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f/raw -o llm-wiki.md
```

Está en inglés y no hace falta traducirlo: tu agente lo entiende igual y te contestará en español si se lo pides.

## Pídele que te monte la wiki

Abre Codex o Claude Code dentro de `~/mi-wiki` y pégale esto:

```prompt title="Prompt de arranque"
Lee llm-wiki.md: es el patrón de Andrej Karpathy para una wiki personal mantenida por un LLM. Móntamela en esta carpeta:

1. Crea raw/ para mis fuentes (nunca modifiques nada de raw/) y wiki/ para las páginas que escribes tú.
2. Crea wiki/index.md (catálogo de páginas con una línea de resumen cada una, por categorías) y wiki/log.md (registro con entradas que empiecen por "## [AAAA-MM-DD] tipo | título").
3. Escribe el esquema en AGENTS.md (si eres Codex) o en CLAUDE.md (si eres Claude Code): estructura de carpetas, formato de las páginas con enlaces [[así]] para Obsidian, y los pasos exactos de ingest, query y lint.
4. Escribe todo en español.

Cuando acabes, enséñame el árbol de carpetas y dime en una frase cómo te paso mi primera fuente.
```

Revisa el esquema que te propone: es el archivo que hace que el agente se porte como un bibliotecario disciplinado y no como un chat cualquiera. Cámbiale lo que no te encaje; Karpathy dice que se va ajustando con el uso.

## Mete tu primera fuente

Copia un artículo, un PDF o tus apuntes en `raw/` y pídeselo así:

```prompt title="Ingest"
He añadido raw/<nombre-del-archivo>. Haz el ingest: léelo, cuéntame en 5 líneas lo más importante, escribe su página de resumen, actualiza todas las páginas de la wiki a las que afecta, el índice y el log.
```

Karpathy prefiere meter las fuentes de una en una y leer lo que cambia, para guiar a la IA en lo que importa. Cuando tengas unas cuantas, prueba a preguntar:

```prompt title="Query"
Usando solo la wiki, respóndeme: <tu pregunta>. Cita las páginas en las que te basas. Si la respuesta es buena, guárdala como página nueva y enlázala desde las relacionadas.
```

Y de vez en cuando:

```prompt title="Lint"
Haz un lint de la wiki: busca contradicciones entre páginas, afirmaciones que una fuente más nueva ha dejado viejas, páginas sin enlaces entrantes y conceptos que se mencionan pero no tienen página. Arregla lo que sea seguro y lístame lo que necesite mi decisión.
```

## Ábrela en Obsidian y mira el mapa

1. Abre Obsidian y, en la ventana de bóvedas, elige **Open folder as vault** y selecciona `~/mi-wiki`.
2. Pulsa **Open graph view** en la barra lateral izquierda.

Ese grafo es el mapa de todo lo que sabes: cada punto es una página y cada línea un enlace. Las páginas más conectadas son tus temas centrales, y los puntos sueltos son lo que el lint debería enlazar. Karpathy trabaja así: el agente abierto en un lado y Obsidian en el otro, viendo cómo la wiki cambia en tiempo real.

## Checklist

- `llm-wiki.md` en tu carpeta.
- `raw/`, `wiki/`, `index.md`, `log.md` y el esquema (`AGENTS.md` o `CLAUDE.md`) creados.
- Primera fuente ingerida y páginas actualizadas.
- Una buena respuesta guardada como página nueva.
- La carpeta abierta como bóveda en Obsidian.

## Fuentes

- Andrej Karpathy, [LLM Wiki (llm-wiki.md)](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), gist público en GitHub, consultado el 12-nov-2026 (más de 5.000 estrellas ese día).
- Obsidian, [precios](https://obsidian.md/pricing): gratis, sin licencia obligatoria para uso comercial (consultado el 12-nov-2026).
- Obsidian Help, [Manage vaults](https://obsidian.md/help/manage-vaults) y [Graph view](https://obsidian.md/help/plugins/graph).
