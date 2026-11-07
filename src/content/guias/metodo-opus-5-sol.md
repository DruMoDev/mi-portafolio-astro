---
title: "El método Opus 5 + SOL: una IA hace el trabajo y otra lo revisa"
description: "El método Opus 5 + SOL: Claude Opus 5 hace el trabajo, SOL de ChatGPT lo revisa desde fuera y Opus aplica la revisión. Con los prompts para copiar."
lede: "El flujo exacto que uso para que dos modelos distintos hagan el trabajo mejor que uno solo: Claude Opus 5 escribe, SOL de ChatGPT revisa y Opus aplica la revisión. Con los tres prompts listos para copiar."
tema: "Prompts"
publishedAt: 2026-08-01
updatedAt: 2026-11-07
service: consultoria
keyword: "MÉTODO"
gateAfter: 1
videos:
  - title: "Claude Opus 5: el método que mejora sus resultados con ChatGPT"
    url: "https://youtu.be/jlYTO6OKHTs"
  - title: "Claude Opus 5: el método que mejora sus resultados con ChatGPT (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7667619755209116950"
---

La idea es simple: **quien escribe no revisa bien lo que ha escrito**. Un modelo que acaba de producir 40 líneas está tan cerca del problema como tú después de tres horas mirándolo. Así que separo los dos roles y los reparto entre dos IAs:

- **Claude Opus 5** hace el trabajo (el autor).
- **SOL de ChatGPT** lo revisa desde fuera (el revisor).
- Opus vuelve a entrar para aplicar la revisión.

Funciona con cualquier tarea donde una segunda mirada aporte: código, análisis, documentos, propuestas, estrategia, correos importantes.

**Por qué funciona.** No es magia de modelos, es separación de roles. Los dos modelos tienen puntos ciegos distintos porque están entrenados distinto, así que lo que a uno se le pasa el otro lo ve. Y cada uno entra con un encargo distinto: uno produce, el otro busca fallos. Un solo modelo haciendo las dos cosas tiende a validar lo que acaba de escribir.

> Los nombres de los modelos cambian rápido. Desde el 22 de septiembre de 2026 el Opus más reciente es Claude Opus 5.5, y el método funciona igual con él. Lo mismo en ChatGPT: usa la versión de SOL más reciente que te ofrezca tu plan.

## El encargo a Opus 5

Dale las cuatro cosas que casi todo el mundo se deja: objetivo, contexto, restricciones y formato de entrega. Pídele la versión completa, no un esbozo.

```prompt title="Prompt 1: el encargo a Opus"
Objetivo: [qué quiero conseguir, en una frase]
Contexto: [qué es esto, para quién, qué existe ya]
Restricciones: [longitud, tono, tecnología, lo que NO puede hacer]
Formato de entrega: [documento, código, tabla, guion...]

Dame la primera versión completa. Si algo te falta para hacerlo bien, pregúntamelo antes de empezar.
```

Esa última línea vale mucho: convierte los supuestos silenciosos en preguntas.

## La revisión externa con SOL

Abre un **chat separado** (esto importa: si revisa en la misma conversación, arrastra el sesgo del autor) y pega el resultado completo junto a este mensaje.

```prompt title="Prompt 2: la revisión con SOL"
Actúa como revisor externo. No rehagas el trabajo todavía.

Detecta errores, supuestos débiles, omisiones y mejoras posibles. Ordénalos por impacto y devuelve instrucciones concretas para corregir cada uno.

Para cada punto: qué falla, por qué importa y qué habría que hacer.
```

El "no rehagas el trabajo todavía" es la clave del prompt. Sin eso, el revisor te devuelve su propia versión y pierdes la revisión, que es lo que querías.

## Devolver la revisión a Opus

Vuelve al chat original de Opus 5 y pégale la revisión entera.

```prompt title="Prompt 3: aplicar la revisión"
Aplica esta revisión sobre tu trabajo.

Corrige cada punto que consideres válido, conserva lo que ya funciona y explica brevemente cualquier recomendación que decidas NO aplicar y por qué.
```

Que pueda rechazar puntos con argumento es deliberado. Un revisor externo no tiene todo tu contexto y a veces se equivoca. Si obligas a aplicarlo todo, empeoras el resultado.

## El cierre: comprueba solo lo que ha cambiado

Haz una última comprobación **solo sobre los puntos que han cambiado**. Nada de volver a revisar el documento entero.

Ahí es donde la gente se atasca: si reabres la revisión completa en cada vuelta, entras en un bucle infinito donde cada pasada encuentra algo nuevo y nunca cierras. Una vuelta de revisión, una de aplicación, una comprobación de lo tocado, y fuera.

## Variante rápida para tareas pequeñas

Para tareas pequeñas, junta la revisión y la aplicación: pega el resultado en SOL pidiendo solo **los tres fallos de mayor impacto**, y devuélvelos a Opus. Dos minutos y te ahorra la mayoría de los errores tontos.

## Checklist: errores que evitar

- **Revisar en el mismo chat.** El modelo defiende su trabajo. Chat nuevo siempre.
- **Pedir "revísalo" a secas.** Te dice que está muy bien. Hay que pedir explícitamente errores, supuestos débiles y omisiones.
- **Dejar que el revisor reescriba.** Pierdes la revisión y ganas una segunda versión sin criterio.
- **Más de una vuelta completa.** El rendimiento cae rápido y el texto se vuelve genérico.
- **No dar contexto al revisor.** Si el trabajo depende de restricciones que no ve, te marcará como error cosas que eran decisiones.
