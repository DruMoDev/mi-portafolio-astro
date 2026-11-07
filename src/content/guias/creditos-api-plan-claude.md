---
title: "Cómo activar los créditos de API de tu plan de Claude"
description: "Claude Max trae 100 $ y Ultra 200 $ al mes en créditos de API, pero no llegan solos. Cómo vincular tu organización paso a paso y para qué sirven."
lede: "Si pagas Claude Max o Ultra, tu plan incluye créditos para la API cada mes: 100 $ en Max y 200 $ en Ultra. No te llegan solos: tienes que vincular una organización de la consola a tu plan. Se hace una vez y tardas un par de minutos."
tema: "Claude"
publishedAt: 2026-11-07
updatedAt: 2026-11-07
service: consultoria
keyword: "PLAN"
gateAfter: 1
videos:
  - title: "Claude te regala hasta 200 $ al mes y nadie lo reclama"
    url: "https://youtu.be/iJ9-oO3W92g"
  - title: "Claude te regala hasta 200 $ al mes y nadie lo reclama (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7705495217792929027"
  - title: "Claude te regala hasta 200 $ al mes y nadie lo reclama (Instagram)"
    url: "https://www.instagram.com/reel/Dfczh_DjAO1/"
---

## Comprueba que tienes derecho

- Tu plan Max o Ultra tiene que estar activo y llevar al menos 7 días contratado.
- Tienes que ser tú quien paga la suscripción.
- En la consola tienes que ser Owner, Admin o Billing de la organización (si la creas tú, ya eres Owner).
- Free, Pro y Enterprise no incluyen estos créditos.
- En Team también hay: 20 $ por asiento Standard y 100 $ por asiento Premium, todo en un mismo saldo con un tope de 500 $ al mes. Los reclama el propietario del equipo desde Ajustes de la organización > Facturación.
- Si pagas desde la app del móvil (iOS o Android), también tienes derecho, pero el paso se hace en [claude.ai](https://claude.ai) desde un navegador.
- No hace falta añadir ninguna tarjeta en la consola de la API.

## Ten una organización en la consola

Los créditos van a una organización de la Claude Console ([platform.claude.com](https://platform.claude.com)). Si nunca has usado la API, entra en [platform.claude.com](https://platform.claude.com) con el mismo email que usas en [claude.ai](https://claude.ai) y crea una. También puedes crearla durante el propio proceso de vinculación.

> Solo puedes vincular una organización y no la puedes cambiar tú después (habría que escribir a soporte). Elige la organización donde vayas a construir tus apps.

## Vincúlala desde claude.ai

1. Entra en [claude.ai](https://claude.ai) con tu cuenta.
2. Abre Ajustes y ve a Facturación (Settings > Billing si tienes la interfaz en inglés).
3. Busca la sección "Créditos de API" ("API credits"). Verás el texto "Tu plan Max incluye 100 $ USD en créditos de API cada mes" (o 200 $ si tienes Ultra).
4. Pulsa "Vincular organización" ("Link organization").
5. Se abre la ventana "Vincular una organización de API". En el desplegable "Organización", elige la organización donde quieres recibir los créditos.
6. Pulsa el botón negro "Vincular organización". Al hacerlo aceptas los términos complementarios de los créditos.

Si da error al vincular, Anthropic recomienda volver a intentarlo pasadas unas horas. Y si no ves la sección después de 7 días, revisa tu plan y tu rol; si sigue sin salir, escribe a soporte.

## Comprueba que han llegado

En la consola, ve a Settings > Billing ([platform.claude.com/settings/billing](https://platform.claude.com/settings/billing)). Los créditos aparecen en "Promotional credits", con su importe y su fecha de caducidad. Desde ahí ya puedes crear una API key y empezar a usarlos.

## Para qué sirven (y para qué no)

Sirven para:

- La API de Claude en tus propias apps, automatizaciones y scripts.
- Claude Managed Agents y el Claude Agent SDK.
- El Playground de la consola.

No sirven para:

- Claude Code en uso interactivo (terminal, IDE, escritorio o web).
- El uso extra de Claude, Claude Code o Cowork.
- Claude a través de Amazon Bedrock, Google Cloud Vertex AI o Microsoft Foundry.
- La GitHub Action de Claude Code, las extensiones de IDE ni la app de escritorio, aunque las lances con `-p`.

> Detalle útil: si lanzas `claude -p` o el Agent SDK tú mismo con una API key de la organización vinculada, sí tira de estos créditos. Si lo usas con la sesión de tu plan, cuenta contra los límites del plan.

## Lo que tienes que saber

- Llegan cada ciclo de facturación, poco después de que se cobre tu plan. Si pagas anual, llegan cada mes.
- Caducan al final de cada ciclo y no se acumulan: lo que no gastes, se pierde.
- Se gastan antes que cualquier crédito que hayas comprado tú.
- Todas las API keys de la organización vinculada comparten el mismo saldo. Si quieres poner tope a un proyecto, dale su propio workspace con límite de gasto.
- Lo que gastas con ellos cuenta para el tope de gasto mensual de tu organización en la API.
- Si se acaban y no tienes saldo comprado, las llamadas a la API se paran hasta la siguiente recarga. Nunca se cobra a tu plan de Claude.
- No cambian tus límites de uso de Claude ni de Claude Code: van aparte.
- Si cancelas o bajas a un plan sin créditos, dejan de llegar nuevos, pero los que ya tienes se pueden usar hasta que caduquen.
- Si subes de Max a Ultra, recibes al momento la parte proporcional y después 200 $ cada ciclo.

## ¿Te sale a cuenta subir de plan?

Si ya pagas la API de Claude cada mes para tus apps, haz la cuenta: Max (100 $ al mes) incluye 100 $ de API y Ultra (200 $ al mes) incluye 200 $ de API, además de todo el uso del plan. Si tu factura de API ronda esas cifras, el plan te sale prácticamente por lo mismo que ya pagas.

## Fuentes

- [Documentación de Anthropic: créditos de API para suscriptores](https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers)
- [Centro de ayuda de Claude: créditos mensuales de API en Max, Ultra y Team](https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans)
- [Precios de los planes de Claude](https://claude.com/pricing)
