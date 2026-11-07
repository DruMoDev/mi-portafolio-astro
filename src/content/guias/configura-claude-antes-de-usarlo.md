---
title: "Configura Claude antes de usarlo"
description: "Los 5 ajustes que haría al empezar con Claude web o escritorio: memoria, importar tu contexto de ChatGPT, conectores, un curso oficial e instrucciones."
lede: "La mayoría abre Claude, escribe un prompt y espera magia. Pero Claude no sabe quién eres, cómo trabajas ni qué contexto arrastras de otras IAs. Haz estos 5 ajustes antes de pedirle nada importante."
tema: "Claude"
publishedAt: 2026-06-30
updatedAt: 2026-11-07
service: consultoria
keyword: "GUÍA"
gateAfter: 1
videos:
  - title: "Configura Claude antes de usarlo"
    url: "https://youtu.be/uh1Q4GyRhnc"
---

Esta guía es para dejar Claude bien configurado desde el principio, sobre todo si usas Claude web o la app de escritorio.

> Anthropic ha reorganizado los ajustes hace poco: casi todo lo de memoria e instrucciones vive ahora en **Ajustes → Your Claude**. En el diseño antiguo estaba repartido entre **Capacidades** y **Perfil**. Te pongo los nombres del menú tal y como salen en inglés; si tienes la app en español, puede que los veas traducidos.

## Activa la memoria

En Claude, ve a **Ajustes → Your Claude** y comprueba que tienes encendidos estos 2 interruptores:

- **Search and reference chats** (buscar y referenciar conversaciones).
- **Generate memory from chats** (generar memoria a partir de tus conversaciones).

Después pulsa **Manage**, junto a **Your memory**, para revisar lo que Claude está guardando.

En los planes Free, Pro, Max y Ultra la memoria viene activada por defecto; en Team y Enterprise depende de lo que decida el administrador. La búsqueda en conversaciones antiguas es de los planes de pago.

Por qué importa: sin esto, Claude empieza cada conversación mucho más frío. Con memoria, puede recordar preferencias, proyectos, decisiones previas y formas de trabajar.

## Importa tu contexto desde ChatGPT u otra IA

Si vienes de ChatGPT, Gemini, Perplexity u otra IA, no empieces desde cero. Pega este prompt en tu otra IA:

```prompt title="Prompt para exportar tu memoria"
Export all of my stored memories and any context you've learned about me from past conversations. Preserve my words verbatim where possible, especially for instructions and preferences.

Organize the output in these sections:

1. Core identity and profile
2. Preferences and working style
3. Ongoing projects and goals
4. Tools, apps, workflows and constraints
5. Personal details I explicitly shared
6. Anything I explicitly asked you to remember

For each memory, include enough context to make it useful in Claude. Do not include speculation. If you are unsure, label it as uncertain.
```

Cuando te responda, quita lo que sea sensible, copia la respuesta completa y pégala en Claude desde **Ajustes → Your Claude → Start import**. Pulsa **Add to memory** y revisa lo que ha guardado.

> La importación de memoria todavía es experimental, y la memoria de Claude se centra en temas de trabajo: puede que no guarde detalles personales que no tengan que ver con eso.

Por qué importa: si has usado otra IA durante meses, ahí ya hay contexto valioso sobre ti. Tus proyectos, tu estilo, tus preferencias y tus decisiones no deberían perderse.

## Conecta tus apps

Ve a **Personalizar → Conectores** y pulsa **+** para ver el catálogo. Conecta solo las apps que uses de verdad.

Ejemplos típicos:

- Gmail, si quieres que Claude entienda correos o contexto de comunicación.
- Slack, si trabajas con conversaciones de equipo.
- Atlassian, si usas Jira, Confluence o documentación interna.
- Google Drive u otras herramientas disponibles en tu cuenta.

No conectes por conectar. El objetivo es que Claude pueda trabajar con tu mundo real, no meterle ruido.

> Error común: conectar muchas cosas sin pensar y luego pedir tareas vagas. Mejor conecta poco, pero pide con contexto claro.

## Haz un curso oficial de Anthropic

Abre la Claude Academy: [academy.claude.com/courses](https://academy.claude.com/courses).

Ahí tienes cursos oficiales de Claude, Claude Code, Cowork, la API, MCP, skills, subagentes y fluidez con IA.

No elijas al azar. Pega este prompt en Claude:

```prompt title="Prompt para elegir curso"
Revisa estos cursos y recomiéndame cuáles hacer según lo que sabes de mí. Ordénalos por impacto práctico para mi caso, dime cuál haría primero, cuál dejaría para después y qué resultado debería buscar en cada uno.
```

Si Claude todavía sabe poco de ti, añade contexto antes:

```prompt title="Tu contexto"
Mi perfil: [explica quién eres]
Mis objetivos: [qué quieres conseguir con IA]
Mi nivel actual: [principiante, intermedio, avanzado]
Mis herramientas: [Claude, ChatGPT, Claude Code, Notion, Drive, etc.]
Tiempo disponible: [ej. 30 min al día]
```

Por qué importa: no todos los cursos te aportan lo mismo. El mejor depende de si quieres escribir mejor, programar, automatizar, estudiar, crear contenido o usar IA en tu empresa.

## Escribe tus instrucciones personales

Ve a **Ajustes → Your Claude → Instructions** (en el diseño antiguo, **Ajustes → Perfil → Preferencias personales**). Lo que pongas ahí se aplica a todas tus conversaciones.

Pega algo así y adáptalo a ti:

```prompt title="Instrucciones personales"
Respóndeme siempre en español salvo que te pida lo contrario. Prefiero respuestas directas, prácticas y con ejemplos. Si falta contexto, hazme como máximo 1 o 2 preguntas clave. No me des listas enormes si no aportan.

Cuando me expliques algo técnico, dame primero la idea simple y después los pasos. Si ves una forma mejor de hacer lo que pido, dímelo con claridad.

Evita sonar genérico. Adapta el nivel de detalle a mi experiencia. Si estoy creando contenido, prioriza claridad, gancho y utilidad práctica.
```

Ideas para personalizarlo:

- Idioma principal.
- Tono: directo, técnico, cercano, ejecutivo, creativo.
- Formato: bullets, pasos, tablas, ejemplos, resúmenes.
- Nivel de detalle.
- Cosas que no quieres: relleno, respuestas largas, disclaimers, tono corporativo.
- Cómo quieres que te corrija.
- Herramientas que usas a menudo.

## Checklist final

Antes de empezar a usar Claude en serio, revisa esto:

- Memoria activada.
- Importación hecha si vienes de otra IA.
- Conectores relevantes enlazados.
- Curso oficial elegido con ayuda de Claude.
- Instrucciones personales escritas.

Si haces esto, Claude deja de ser un chat vacío y empieza a trabajar con tu contexto real.

## Fuentes

- [Memoria y búsqueda en conversaciones](https://support.claude.com/en/articles/11817273)
- [Importar tu memoria desde otras IAs](https://support.claude.com/en/articles/12123587)
- [Funciones de personalización de Claude](https://support.claude.com/en/articles/10185728)
- [Usar conectores](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [Cursos de la Claude Academy](https://academy.claude.com/courses)
