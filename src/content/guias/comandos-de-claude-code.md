---
title: "Comandos de Claude Code que más uso"
description: "Los comandos de Claude Code que uso a diario (/context, /rewind, /compact…) y 20 más agrupados por para qué sirven, comprobados con la documentación oficial."
lede: "Los comandos son atajos que escribes con «/» dentro de Claude Code y que casi nadie usa. Aquí tienes los 7 que uso a diario y 20 más, agrupados y explicados."
tema: "Claude Code"
publishedAt: 2026-06-26
updatedAt: 2026-11-07
service: automatizaciones
keyword: "COMANDOS"
gateAfter: 1
howTo: false
videos:
  - title: "Comandos de Claude Code que más uso"
    url: "https://youtu.be/xPA_jwa2N6c"
---

Esta lista la voy ampliando con cada vídeo de la serie.

> **Importante:** todos vienen **integrados** en Claude Code (la versión de terminal o IDE). No instalas nada: los escribes con «/» al principio del mensaje y ya. Si solo usas la app web o de escritorio, no te aplican, porque trabajan con tu terminal, tus ficheros y tu git.

## Los 7 que uso a diario

### /context

Te enseña qué se está comiendo la memoria de la IA (la ventana de contexto) en una rejilla de colores, con avisos y sugerencias. Por eso en conversaciones largas empieza a olvidarse de cosas y a fallar: aquí ves qué la está saturando.

### /rewind

Rebobina la conversación Y el código del proyecto a un punto anterior, sin tocar git. La IA tocó 8 archivos y no te convence: vuelves al estado exacto de hace 3 mensajes. Una máquina del tiempo. (Alias: `/checkpoint`, `/undo`.)

### /btw

Le sueltas una pregunta rápida sin llenar el contexto de la conversación principal. Se responde aparte y el hilo de la tarea sigue intacto.

### /code-review

Revisa tu código buscando bugs (y, según el modelo y el esfuerzo, limpiezas) antes del commit. Con `--fix` te aplica los arreglos; con `ultra` lo lleva a la nube para una revisión profunda con varios agentes.

### /mcp

Conecta la IA a tus herramientas (base de datos, Figma, Notion, lo que uses) y activas o apagas cada servidor cuando lo necesitas, para no petar el contexto. Eso es MCP.

### /usage

El coste de la sesión y los límites de tu plan, con el desglose de qué se lo come: skills, subagentes, plugins y cada servidor MCP. Para saber en qué se te va el gasto. (Alias: `/cost`, `/stats`.)

### /compact

El que más uso. Resume la conversación para liberar memoria sin perder el hilo, y te ahorras un montón de tokens. Cuando va lentísima, no la reinicies: la comprimes.

No es lo mismo que `/clear` (eso empieza de cero); `/compact` mantiene el contexto, y con `/compact [instrucciones]` enfocas el resumen en lo que importa.

```text title="Ejemplo"
/compact Céntrate en los cambios de código y en los tests que fallan
```

## Autonomía y escala

- **/goal**: le fijas una meta y sigue trabajando, turno tras turno, hasta cumplirla. `/goal clear` la cancela.
- **/batch**: parte una tarea enorme en trozos y, tras tu OK, lanza un agente por trozo, cada uno en su propio worktree y con su PR.
- **/loop**: repite un prompt cada X mientras la sesión sigue abierta (por ejemplo, `/loop 5m comprueba si terminó el deploy`).
- **/background**: desengancha la sesión para que siga corriendo sola y te libera la terminal.
- **/teleport**: trae a tu terminal una sesión que empezaste en la nube (Claude Code en la web).

## Que te conozca y delegue

- **/init**: te genera el `CLAUDE.md` de tu proyecto.
- **/memory**: edita ese `CLAUDE.md` y gestiona la memoria automática.
- **/agents**: te recuerda cómo montar subagentes con roles (revisor, explorador…): se los pides a Claude o los editas en `.claude/agents/`.
- **/effort**: subes o bajas cuánto razona el modelo (prueba `ultracode`).

## Calidad del código

- **/plan**: entra en modo plan; te enseña el plan y lo apruebas antes de que toque nada.
- **/simplify**: limpia el código con cuatro agentes en paralelo (no busca bugs: para eso, `/code-review`).
- **/security-review**: busca vulnerabilidades en los cambios de tu rama antes de subir.
- **/diff**: ves qué tocó la IA en cada turno, no solo el total.

## Paralelo e investigación

- **/fork**: copia tu conversación en una sesión nueva en segundo plano y la pone a hacer otra cosa mientras sigues.
- **/advisor**: la IA pide una segunda opinión a otro modelo en los momentos clave.
- **/deep-research**: lanza búsquedas en abanico, contrasta las fuentes y te da un informe con citas.

## Ejecutar y controlar

- **/run**: arranca tu app de verdad y comprueba el cambio.
- **/verify**: valida que funciona en la app real, no solo en los tests.
- **/permissions**: afinas qué hace sola y qué te tiene que preguntar.
- **/hooks**: ves los hooks, reglas que cumple sin recordárselo (formatear o pasar los tests al editar).

## Fuentes

- [Referencia de comandos de Claude Code](https://code.claude.com/docs/en/commands)
- [Costes y /usage en Claude Code](https://code.claude.com/docs/en/costs)
- [Modo interactivo (/diff y /btw)](https://code.claude.com/docs/en/interactive-mode)
