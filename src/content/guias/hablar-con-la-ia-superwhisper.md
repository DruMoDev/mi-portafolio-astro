---
title: "Cómo dejar de escribirle a la IA y hablarle (gratis y sin internet)"
description: "Mi configuración de Superwhisper para dictar prompts por voz a ChatGPT o Claude: gratis, local y sin internet, con el modelo Whisper en tu Mac."
lede: "Mi configuración exacta de Superwhisper para dictarle los prompts a la IA en vez de escribirlos. En un Mac con chip Apple, con el plan gratis y sin que tu voz salga del ordenador."
tema: "IA"
publishedAt: 2026-11-04
updatedAt: 2026-11-07
service: consultoria
keyword: "DICTAR"
gateAfter: 1
videos:
  - title: "Deja de escribirle a la IA: app gratis para dictar tus prompts por voz"
    url: "https://youtu.be/JliFTze7Ino"
  - title: "Deja de escribirle a la IA: app gratis para dictar tus prompts por voz (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7704452675999386902"
---

La app es Superwhisper ([superwhisper.com](https://superwhisper.com)). Esta es mi configuración exacta, en un Mac con chip Apple. Plan gratis, sin pagar nada.

## Instálala con el plan gratis

Descárgala de [superwhisper.com](https://superwhisper.com) e instálala. Con el plan gratis basta, no hace falta Pro.

Al empezar te regala una prueba de Pro de unas 3.000 palabras. Cuando se acaba, todo lo de esta guía sigue funcionando igual, porque no usa nada de Pro.

## Dale los permisos

Al abrirla te pide permisos:

- **Micrófono**, para oírte.
- **Accesibilidad**, para pegar el texto donde tengas el cursor.

Dale los dos. El de audio del sistema solo sirve para grabar reuniones: no lo necesitas.

## Cambia al modo "Voice to text"

Este es el paso importante. La app arranca en el modo "Message", que pasa tu texto por una IA en la nube, y eso es de pago (solo va gratis mientras dura la prueba).

"Voice to text" transcribe tal cual, sin IA detrás, y por eso es gratis, sin límite y privado. Déjalo como modo activo.

## Elige un modelo Whisper local

Dentro de ese modo, en "Voice Model", elige **Whisper Medium** y descárgalo (pesa 1,5 GB). Es el que uso yo: rápido y preciso. Si tu ordenador va justo, **Whisper Small** (500 MB) también va bien.

Todos los Whisper son gratis y corren en tu Mac. Los de la nube, Parakeet y Cohere son de Pro, así que no los elijas. Los modelos los tienes también en Settings, en "Models library".

Deja el idioma en automático (auto): le hablas en el idioma que quieras y lo detecta solo en cada grabación.

## Configura el atajo y que arranque sola

De serie, Opción + espacio empieza a grabar y otra pulsación para y pega el texto. También puedes activar el modo "pulsar para hablar": mantienes una tecla mientras hablas y al soltarla te pega el texto. Los atajos se cambian en Settings > Configuration.

Yo lo tengo en el Comando de la derecha: lo pulso, hablo, lo vuelvo a pulsar y me pega el texto. Para prompts largos es más cómodo que mantenerlo apretado.

En Settings > Configuration activa también que se abra al iniciar sesión ("Launch at login"), para tenerla siempre a mano.

## Enséñale tus palabras (extra gratis)

En "Vocabulary" añade las palabras que te escribe mal, como nombres de marcas o herramientas que uses (yo tengo Vercel o HubSpot), y en "Replacements" las que quieras corregir siempre igual. Así acierta a la primera.

## Úsalo para tus prompts

Pon el cursor en la caja de ChatGPT, Claude o donde quieras, pulsa el atajo, cuéntale todo como se lo contarías a un compañero (qué quieres, para qué, ejemplos, lo que NO quieres) y vuelve a pulsar.

Para prompts largos es donde más se nota: lo dictas en un minuto y corriges dos palabras.

> En Windows, iPhone y Android también existe, pero esta guía es la de mi Mac.

## Fuentes

- [Superwhisper: modelos de voz (cuáles son gratis y cuáles Pro)](https://superwhisper.com/docs/models/voice)
- [Superwhisper: atajos de teclado](https://superwhisper.com/docs/get-started/settings-shortcuts)
- [Superwhisper: primeros pasos y permisos](https://superwhisper.com/docs/get-started/quickstart)
