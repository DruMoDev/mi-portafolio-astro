---
title: "Cómo crear una skill que funcione (y comprobar que funciona)"
description: "Crea una skill copiando un prompt: tu agente la escribe con la guía oficial de Anthropic, la prueba y la corrige. Para Claude Code y Codex."
lede: "Una skill son instrucciones guardadas que tu IA sigue siempre igual. Aquí no la escribes tú: copias un prompt, tu agente la crea siguiendo la guía oficial y luego compruebas que la usa de verdad."
tema: "Claude Code"
publishedAt: 2026-11-06
updatedAt: 2026-11-17
service: consultoria
keyword: "SKILL"
gateAfter: 1
videos:
  - title: "La skill perfecta"
    url: "https://youtu.be/WaTNW-uuYmw"
  - title: "La skill perfecta (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7705062254894517526"
---

Una skill es una carpeta con un archivo `SKILL.md` que le dice a tu IA cómo hacer una tarea concreta, siempre igual. La puedes escribir a mano, pero no hace falta: tu agente sabe hacerlo mejor que tú si le das el criterio correcto. Tú haces la tarea una vez, le corriges, y él lo convierte en skill.

Necesitas **Claude Code** o **Codex**, cualquiera de los dos agentes que trabajan con archivos de tu ordenador.

## Pídele a tu agente que te escriba la skill

El método que recomienda Anthropic, y el que uso yo: primero haz la tarea con tu agente en una conversación normal y corrígele hasta que salga bien. Cada corrección («no, la fecha va aparte») es una regla que acabará en la skill. Al final, en ese mismo chat, pega esto:

```prompt title="Prompt de arranque"
Convierte lo que acabamos de hacer en una skill. Si en esta conversación no hemos hecho ninguna tarea, pregúntame primero qué tarea quiero guardar y hazme las preguntas que necesites.

Antes de escribirla, lee la guía oficial de buenas prácticas de Anthropic: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
y la especificación abierta: https://agentskills.io/specification
Si no puedes leerlas, dímelo y te las pego aquí.

- Nombre: <nombre-de-la-skill>. Si lo dejo así, elige tú uno corto en minúsculas y con guiones.
- Ubicación: <carpeta>. Si lo dejo así, créala donde la cargues en todos mis proyectos: en Claude Code, ~/.claude/skills/<nombre>/SKILL.md; en Codex, ~/.agents/skills/<nombre>/SKILL.md.
- La descripción decide si la usarás: que diga qué hace y cuándo usarla, en tercera persona, con las palabras que yo usaría al pedírtelo y el caso de uso principal primero.
- Incluye solo lo que no es obvio: las correcciones que te he hecho y los pasos en orden. Nada que ya sepas.
- Por debajo de 500 líneas. Si crece, deja el SKILL.md como índice y pasa cada tema a un archivo aparte, enlazado directamente desde el SKILL.md.
- Si un paso es delicado (borrar, tocar una base de datos, publicar), dale el comando exacto. Si hay varias formas buenas, dale la idea.
- Haz tú todo: carpetas y archivos. No me pidas que ejecute nada.

Cuando acabes, enséñame la descripción y dime en pocas líneas dónde está la skill y qué reglas has metido.
```

Lee la descripción que te enseña con calma: es lo único que tu agente ve de la skill hasta que decide abrirla. Si no dice cuándo usarla con palabras tuyas, pídele que la cambie.

Codex trae además su propio asistente para esto (`$skill-creator`). El prompt de arriba vale igual para los dos.

## Prepara las pruebas antes de probarla

Escribirla no es suficiente: hay que ver si salta cuando toca y si se queda quieta cuando no. En el mismo chat:

```prompt title="Preparar las pruebas"
Prepárame las pruebas de la skill que acabas de crear:

- 3 peticiones como las que yo te haría de verdad, sin nombrar la skill, que deberían activarla.
- 2 peticiones parecidas que NO deberían activarla.
- Para cada una de las 3 primeras, qué resultado espero, sacado de lo que corregimos en esta conversación.

Comprueba también tú que el SKILL.md cumple la especificación (nombre igual que la carpeta, solo minúsculas, números y guiones, descripción de menos de 1.024 caracteres, frontmatter válido) y arregla lo que no cumpla.

Dámelo en una lista que pueda copiar.
```

Guarda esa lista: la vas a usar en el paso siguiente y cada vez que cambies la skill.

## Pruébala en una conversación nueva

Este es el único paso que haces tú, porque la prueba solo vale si tu agente **no** tiene el contexto en el que creaste la skill. Abre una conversación nueva y:

1. Pregúntale `¿Qué skills tienes disponibles?`. Si la tuya no sale, salta al paso de "Si no aparece o no salta".
2. Pega una a una las 3 peticiones que deberían activarla. Fíjate en si la usa y si el resultado es el que esperabas.
3. Pega las 2 que no deberían. Si salta también ahí, la descripción es demasiado amplia.
4. Llámala a propósito para ver qué hace cuando sí la lee: en Claude Code escribe `/nombre-de-la-skill` al principio del mensaje; en Codex, `$nombre-de-la-skill`.

En Claude Code, los cambios dentro de un SKILL.md se aplican solos, sin reiniciar. En Codex también se detectan solos; si un cambio no aparece, reinicia Codex.

## Corrígela con lo que ha fallado

Vuelve al chat donde la creaste y cuéntale qué ha pasado:

```prompt title="Corregir la skill"
He probado la skill en una conversación nueva. Esto es lo que ha pasado:

<pega aquí qué peticiones la activaron, cuáles no, y en qué se equivocó>

Corrige el SKILL.md para arreglarlo. Si no saltó cuando debía, el problema casi siempre es la descripción: pon primero el caso de uso y las palabras que yo usé. Si saltó cuando no debía, hazla más concreta. Si una regla se la saltó, ponla más arriba y más clara. Hazlo tú y dime qué has cambiado.
```

Repite pruebas y corrección en otra conversación nueva hasta que salga a la primera. La skill está terminada cuando pasa todas las pruebas.

Si prefieres que la skill no salte nunca sola y llamarla solo tú, pídeselo:

```prompt title="Solo a mano"
Haz que la skill <nombre> no se active sola, solo cuando yo la llame. En Claude Code eso es disable-model-invocation: true en el frontmatter; en Codex, policy.allow_implicit_invocation: false en agents/openai.yaml dentro de la carpeta de la skill. Hazlo tú.
```

## Si no aparece o no salta

```prompt title="Diagnosticar la skill"
Mi skill <nombre> no aparece o no se activa. Revisa tú:

- Que está en una carpeta que cargas (Claude Code: ~/.claude/skills o .claude/skills del proyecto; Codex: ~/.agents/skills o .agents/skills del repositorio).
- Que el frontmatter del SKILL.md se lee bien. Si estás en Claude Code y tu versión lo tiene, ejecuta tú claude plugin validate sobre esa carpeta de skills.
- Que la descripción dice cuándo usarla con palabras que yo diría.

Arregla lo que encuentres y dime qué era.
```

Dos cosas que en Claude Code tienes que escribir tú, porque son comandos de la sesión:

- Si creaste una carpeta de skills que no existía al abrir la sesión, escribe `/reload-skills`.
- `/skill-doctor` te dice cuánto contexto gasta cada skill y cuáles no se usan nunca. Si tienes muchas, Claude Code recorta descripciones para que quepan y las que menos usas son las primeras en perderlas.

## Por qué funciona así

Si te pica la curiosidad, esto es lo que tu agente ha tenido en cuenta al escribirla:

- **Tu IA no lee tus skills enteras.** Al arrancar solo carga el nombre y la descripción de cada una (unos 100 tokens por skill, según la especificación) y con eso decide si la abre. El SKILL.md completo se lee al activarse, y los archivos de al lado solo cuando hacen falta. Por eso la descripción lo decide todo.
- **Descripciones que no funcionan**, literales de la guía de Anthropic: «Helps with documents», «Processes data». Tan vagas que la IA nunca sabe cuándo usarlas.
- **Corta.** La IA ya es lista: no hace falta explicarle qué es un PDF. Una vez cargada, cada línea de la skill ocupa contexto en cada turno.
- **Un nivel de enlaces.** Del SKILL.md a un archivo, no de archivo en archivo: con enlaces anidados la IA puede leer solo un trozo.
- **Pruebas antes que skill.** El truco de la guía de Anthropic es justo lo que has hecho: ver dónde falla la IA sin skill y escribir solo lo necesario para que deje de fallar.

Así queda una skill por dentro, para que la reconozcas:

```text title="Estructura de una skill"
extraer-pdf/
  SKILL.md          (obligatorio: nombre, descripción e instrucciones)
  references/       (opcional: documentación que se lee solo si hace falta)
  scripts/          (opcional: código que la IA ejecuta)
  assets/           (opcional: plantillas, imágenes)
```

## Checklist

- La descripción dice qué hace y cuándo usarla, con tus palabras.
- El nombre coincide con la carpeta (minúsculas, números y guiones).
- SKILL.md por debajo de 500 líneas; lo largo, en archivos aparte.
- Nada que la IA ya sepa.
- Sale al preguntar qué skills tiene.
- Se activa sola en una conversación nueva y no salta cuando no toca.
- Da el mismo resultado que conseguiste a mano.

## Fuentes

- Anthropic, [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices): límites de `name` y `description`, menos de 500 líneas, un nivel de enlaces, pruebas antes de escribir la skill y el método de crearla con Claude (consultado el 17-nov-2026).
- Anthropic, [Extend Claude with skills](https://code.claude.com/docs/en/skills): rutas `~/.claude/skills` y `.claude/skills`, `disable-model-invocation`, cambios sin reiniciar, `/reload-skills`, `/skill-doctor`, `claude plugin validate` y la prueba "What skills are available?" (consultado el 17-nov-2026).
- Agent Skills, [Specification](https://agentskills.io/specification): estructura de carpetas, reglas del `name` y carga progresiva de unos 100 tokens por skill (consultado el 17-nov-2026).
- OpenAI, [Build skills](https://learn.chatgpt.com/docs/build-skills) (antes developers.openai.com/codex/skills): rutas `~/.agents/skills` y `.agents/skills`, `$skill-creator`, invocación con `$`, `allow_implicit_invocation` y detección automática de cambios (consultado el 17-nov-2026).
