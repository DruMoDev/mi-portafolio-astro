---
title: "Cómo instalar skills en Claude Code"
description: "Cómo instalar skills y plugins en Claude Code desde el marketplace oficial, con el comando exacto de las 5 que recomiendo: superpowers, code-review y más."
lede: "Las skills (plugins) le dan superpoderes a Claude: planificar como un senior, revisar tu código, diseñar interfaces o vigilar la seguridad. Aquí tienes cómo instalarlas y las que recomiendo, con el comando exacto de cada una."
tema: "Claude Code"
publishedAt: 2026-06-25
updatedAt: 2026-11-07
service: automatizaciones
keyword: "SKILL"
gateAfter: 1
videos:
  - title: "Skills de Claude Code de nivel"
    url: "https://youtu.be/EfK4sfMiMrE"
---

Esta guía la voy ampliando con cada vídeo de skills.

> **Importante:** estas skills son para **Claude Code** (la versión de terminal, IDE o la pestaña Code de la app de escritorio), porque trabajan con tus ficheros, tu repositorio y tu git. La app de chat (web y escritorio) tiene su propio sistema de skills, pero es para otra cosa. Lo explico en el paso 2.

## Instala una skill en Claude Code

La mayoría están en el **marketplace oficial** de Anthropic (`claude-plugins-official`), que Claude Code añade solo la primera vez que lo abres en la terminal. El patrón es siempre el mismo:

```text title="Instalar desde el marketplace oficial"
/plugin install NOMBRE@claude-plugins-official
```

Dentro de una sesión, ese comando no instala a ciegas: abre el panel del plugin para que veas qué añade y elijas el alcance:

- **Para ti** (en todos tus proyectos).
- **Para todo el repositorio** (lo activa para quien trabaje en él).
- **Solo para ti y solo en este repositorio.**

Al terminar te dice si ya está activo. Si te pide recargar, ejecuta:

```text title="Recargar plugins sin reiniciar"
/reload-plugins
```

Para comprobar que funciona, escribe `/` y busca sus skills con la forma `/plugin:skill`. También lo ves en la pestaña **Installed** de `/plugin`.

### Si te sale «not found»

Si te dice `Plugin "NOMBRE" not found in any marketplace`, actualiza el catálogo y vuelve a intentarlo:

```text title="Actualizar el catálogo oficial"
/plugin marketplace update claude-plugins-official
```

Si el marketplace oficial ni siquiera aparece en la pestaña **Marketplaces** de `/plugin`, añádelo a mano:

```text title="Añadir el marketplace oficial"
/plugin marketplace add anthropics/claude-plugins-official
```

### Skills que no están en el oficial

¿Una skill de la comunidad que no está en el oficial? Añade su marketplace (su repositorio de GitHub) y luego instálala con el nombre de ese marketplace:

```text title="Instalar desde otro marketplace"
/plugin marketplace add USUARIO/REPO
/plugin install NOMBRE@MARKETPLACE
```

> Anthropic no revisa los marketplaces de terceros. Un plugin puede ejecutar hooks y servidores MCP en tu máquina, así que lee bien qué añade antes de instalarlo.

## ¿Y en la app de escritorio o web?

Claude (escritorio y web) también tiene skills, en **Personalizar → Skills**: ahí activas las integradas o subes una propia (un .zip con la carpeta de la skill). Para usarlas tienes que tener activada la ejecución de código en **Ajustes → Capacidades** (en inglés sale como "Code execution and file creation" o, en el diseño nuevo, "Create and edit files"). Esas trabajan dentro del chat: documentos, formatos, etc.

Las de esta guía son **de desarrollo**: necesitan tu terminal, tus ficheros y tu git, así que se usan en **Claude Code**, no en la app de chat. Si solo usas Claude web, estas no te aplican. Para sacarles partido, instala Claude Code.

## Las skills que recomiendo

Cada una con su comando exacto. Las cinco están en el marketplace oficial.

### superpowers

```text title="Instalar superpowers"
/plugin install superpowers@claude-plugins-official
```

Hace que Claude deje de improvisar: primero piensa el plan, luego programa con tests y depura paso a paso, como un ingeniero senior. La que más cambia el juego. (Es de la comunidad: Jesse Vincent, obra en GitHub.)

### skill-creator

```text title="Instalar skill-creator"
/plugin install skill-creator@claude-plugins-official
```

Le enseñas tus flujos de trabajo y los guarda como skills reutilizables. Claude se vuelve experto en lo tuyo.

### frontend-design

```text title="Instalar frontend-design"
/plugin install frontend-design@claude-plugins-official
```

Diseña interfaces con criterio de verdad, sin ese look genérico que delata a la IA.

### code-review

```text title="Instalar code-review"
/plugin install code-review@claude-plugins-official
```

Varios agentes revisan tu código en paralelo, cada uno desde un ángulo, y filtran los falsos positivos. Caza bugs antes del merge.

### security-guidance

```text title="Instalar security-guidance"
/plugin install security-guidance@claude-plugins-official
```

Revisa la seguridad de cada cambio: inyección, XSS, SSRF, secretos hardcodeados y más de 25 tipos de vulnerabilidad.

## Fuentes

- [Instalar y gestionar plugins en Claude Code](https://code.claude.com/docs/en/discover-plugins)
- [Marketplaces de Anthropic](https://code.claude.com/docs/en/plugins/anthropic-marketplaces)
- [Catálogo del marketplace oficial en GitHub](https://github.com/anthropics/claude-plugins-official)
- [Usar skills en Claude (app de chat)](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
