---
title: "Cómo crear una skill que funcione (y comprobar que funciona)"
description: "Qué es una skill, cómo escribirla en cuatro pasos y cómo comprobar que tu IA la usa de verdad, con la guía oficial de Anthropic y agentskills.io."
lede: "Qué es una skill, cómo escribirla en cuatro pasos y cómo comprobar que tu IA la usa de verdad. Basada en la guía oficial de Anthropic y en la especificación abierta de agentskills.io."
tema: "Claude Code"
publishedAt: 2026-11-06
updatedAt: 2026-11-07
service: consultoria
keyword: "SKILL"
gateAfter: 1
videos:
  - title: "La skill perfecta"
    url: "https://youtu.be/WaTNW-uuYmw"
  - title: "La skill perfecta (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7705062254894517526"
---

## Qué es una skill

Una skill es una carpeta con instrucciones guardadas que tu IA sigue siempre igual. Vale para Claude Code, Codex y cualquier agente que siga la especificación abierta de agentskills.io. La mínima es un solo archivo:

```text title="Estructura de una skill"
extraer-pdf/
  SKILL.md          (obligatorio: instrucciones)
  references/       (opcional: documentación que se lee solo si hace falta)
  scripts/          (opcional: código que la IA ejecuta)
  assets/           (opcional: plantillas, imágenes)
```

Dónde va en Claude Code:

- Para todos tus proyectos: `~/.claude/skills/extraer-pdf/SKILL.md`
- Solo para un proyecto (y compartida por git): `.claude/skills/extraer-pdf/SKILL.md`

## La descripción decide si se usa

Al arrancar, tu IA **no** lee tus skills enteras. Solo carga el nombre y la descripción de cada una (unos 100 tokens por skill) y con eso decide si la abre. El SKILL.md completo se lee solo cuando se activa, y lo de `references/` o `scripts/` solo cuando hace falta.

Por eso la descripción tiene que decir dos cosas: qué hace y cuándo usarla.

```yaml title="Frontmatter del SKILL.md"
---
name: extraer-pdf
description: Saca las tablas de un PDF y las pasa a una hoja de cálculo. Úsala cuando el usuario te pase una factura, un extracto o cualquier PDF con tablas.
---
```

### Reglas del formato

- `name`: hasta 64 caracteres, solo minúsculas, números y guiones, igual que el nombre de la carpeta.
- `description`: hasta 1.024 caracteres. Escríbela en tercera persona.
- El `---` de apertura tiene que ser la primera línea del archivo. Si no, la IA no lee el frontmatter.

> Descripciones que no funcionan, literales de la guía de Anthropic: «Helps with documents», «Processes data». Son tan vagas que la IA nunca sabe cuándo usarlas.

## Que sea corta

- Tu IA ya es lista: no le expliques lo que ya sabe (qué es un PDF, cómo se escribe Python). Solo lo que es propio de tu tarea.
- Mantén el SKILL.md por debajo de 500 líneas.
- Si crece, conviértelo en un índice: cada tema va a su propio archivo dentro de la carpeta, y el SKILL.md solo dice cuándo leer cada uno.

```markdown title="Índice dentro del SKILL.md"
## Índice

- Tablas normales: lee references/tablas.md
- Facturas: lee references/facturas.md
```

- Enlaza a un solo nivel de profundidad: del SKILL.md a un archivo, no de archivo en archivo.
- Grados de libertad: si la tarea es delicada (tocar una base de datos), dale el comando exacto; si hay muchas formas buenas de hacerla, dale la idea y deja que piense.

## No la escribas de cero

El método que recomienda Anthropic, y el que uso yo:

1. Haz la tarea una vez con la IA, en una conversación normal.
2. Corrígela hasta que salga bien. Cada corrección («no, la fecha va aparte») es una regla que acabará en la skill.
3. Al final dile que lo convierta en una skill: te escribe el SKILL.md con todo lo que has corregido.

```prompt title="Prompt para copiar"
Conviértelo en una skill. Incluye solo lo que no es obvio: las correcciones que te he hecho y los pasos en orden. Escribe una descripción que diga qué hace y cuándo usarla.
```

## Comprueba que funciona

Escribirla no es suficiente. Esto es lo que compruebo antes de darla por buena.

### ¿La ve tu IA?

En Claude Code, escribe `/skills`: lista las skills disponibles en la sesión. Si la tuya no sale, revisa la ruta y que la carpeta se llame igual que el `name`.

Los cambios dentro de un SKILL.md se aplican solos, sin reiniciar. Si creas una carpeta de skills nueva que no existía al abrir la sesión, ejecuta `/reload-skills`.

### ¿Se activa sola cuando toca?

Abre una conversación **nueva** (sin el contexto en el que la creaste) y pide la tarea como la pedirías de verdad, sin nombrar la skill: «sácame las tablas de esta factura». Si no la usa, el problema casi siempre es la descripción: pon primero el caso de uso y las palabras que tú dirías.

### ¿Se queda quieta cuando no toca?

Prueba también algo parecido que **no** debería activarla. Si salta en todo, la descripción es demasiado amplia. Si solo quieres llamarla tú a mano, añade esto al frontmatter y úsala con `/extraer-pdf`:

```yaml title="Solo a mano"
disable-model-invocation: true
```

### ¿Hace lo que esperabas?

Llámala a propósito (`/extraer-pdf` al principio del mensaje) y compara el resultado con el que conseguiste a mano. Lo que falle, corrígelo en la conversación y pide que actualice el SKILL.md. Repite en otra conversación nueva hasta que salga a la primera.

### Pruebas antes de escribirla

El truco pro de la guía de Anthropic es hacerlo al revés: antes de escribir la skill, pide la tarea **sin** skill y apunta dónde falla. Esos fallos son tus pruebas. La skill está terminada cuando los pasa todos.

### Si algo raro pasa

Arranca Claude Code en modo depuración para ver los errores al cargar skills:

```bash title="Ver errores al cargar skills"
claude --debug
```

Y `/skill-doctor` te dice cuánto contexto gasta cada skill y cuáles no se han usado nunca.

## Checklist rápido

- La descripción dice qué hace y cuándo usarla.
- El `name` coincide con la carpeta (minúsculas y guiones).
- SKILL.md por debajo de 500 líneas; lo largo, en archivos aparte.
- Nada que la IA ya sepa.
- Sale en `/skills`.
- Se activa sola en una conversación nueva y no salta cuando no toca.
- Da el mismo resultado que conseguiste a mano.

## Fuentes

- [Guía de buenas prácticas de Anthropic](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Especificación abierta de agentskills.io](https://agentskills.io/specification)
- [Skills en Claude Code](https://code.claude.com/docs/en/skills)
