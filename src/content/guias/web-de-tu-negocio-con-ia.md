---
title: "Haz la web de tu negocio con IA (y que sea tuya)"
description: "Cómo hacer la web de tu negocio con IA sin saber programar: diseño en Claude Design, Astro, Claude Code y Netlify gratis. Con los tres textos para copiar."
lede: "La guía del vídeo, paso a paso: diseñas la web, Claude Code la construye con Astro y la subes gratis a Netlify. Con los tres textos que uso, listos para copiar: el prompt del diseño, el archivo con los datos del negocio y el prompt que construye la web."
tema: "Webs"
publishedAt: 2026-08-01
updatedAt: 2026-11-07
service: webs
keyword: "WEB"
gateAfter: 1
videos:
  - title: "Cómo hacer una WEB con IA sin saber programar (GRATIS y paso a paso)"
    url: "https://youtu.be/Wq99zKi8WhY"
---

La diferencia con las herramientas que te hacen la web en un clic es que aquí la web es tuya de verdad: vive en tu carpeta, la subes tú a donde quieras y dentro de un año puedes cambiar un precio sin depender de nadie.

Usas tres textos. Los dos primeros los editas con lo tuyo. El tercero no se toca nunca: es el mismo para cualquier negocio.

## Lo que necesitas

- **Node.js**, gratis y se instala una vez en la vida. Descárgalo de [nodejs.org](https://nodejs.org/en/download), elige tu sistema operativo e instala la versión LTS dándole a todo que sí.
- **La app de escritorio de Claude** ([claude.com/download](https://claude.com/download)), con Claude Code, que está en la pestaña **Code**. Es la parte de pago y es la que construye la web.
- **Una cuenta de GitHub y otra de Netlify**, las dos gratis. Las necesitas al final, para subir la web.
- **Claude Design** es opcional: si no lo tienes, el paso del diseño se hace con capturas de 2 o 3 webs que te gusten.

## Diseña primero

Antes de pedirle nada a la IA, decide cómo se ve la web. Es el paso que casi todo el mundo se salta, y la razón número uno de que las webs hechas con IA queden genéricas: si no le dices cómo se ve, se lo inventa, y siempre se inventa lo mismo.

Abre Claude Design y crea un diseño nuevo: en Claude, en la pestaña Artifacts, con la plantilla **Design**, o desde un chat eligiendo Output > Design. Pega este prompt cambiando el negocio, las secciones y la paleta por lo tuyo.

> En el vídeo lo hago en claude.ai/design con la plantilla Prototype. Anthropic ha metido Claude Design dentro de Claude y esa web independiente se cierra el 14 de diciembre de 2026: el prompt sirve igual en la versión nueva.

```prompt title="Prompt 1: el diseño (edítalo con lo tuyo)"
Diseña la landing page de una barbería de barrio. Una sola página con scroll,
pensada primero para móvil y también para escritorio.

EL NEGOCIO
Barbería Nogal, en Ruzafa (Valencia), abierta desde 2016. Barbería de hombre con
cita previa, especializada en corte clásico y arreglo de barba. Le habla a hombres
de 25 a 55 años del barrio, que reservan desde el móvil y valoran no esperar cola.
El único objetivo de la web es que el visitante pulse "Reservar por WhatsApp".

SECCIONES, EN ESTE ORDEN
1. Hero a pantalla completa: nombre, una frase corta, botón grande "Reservar por
   WhatsApp" y una foto del local de fondo.
2. Servicios: 5 tarjetas con nombre, precio y duración.
3. Por qué elegirnos: 3 motivos cortos, sin tarjetas, muy tipográficos.
4. El equipo: 3 barberos con foto de retrato, nombre y su especialidad en una línea.
5. Galería: 6 fotos de trabajos.
6. Reseñas: 3 citas de clientes, cortas.
7. Horario y ubicación: los horarios en una lista clara, la dirección, un mapa y
   un botón "Cómo llegar".
8. Preguntas frecuentes: 4 preguntas plegables.
9. Contacto y footer: teléfono, WhatsApp, Instagram, dirección.
10. Barra fija abajo en móvil, con el botón de WhatsApp siempre visible.

ESTILO
Oficio y confianza, no lujo ni tecnología. Que parezca un negocio real que lleva
años abierto, no una plantilla de SaaS. Mucho aire entre secciones, poco texto,
las fotos mandan.

PALETA
Verde bosque muy oscuro como color principal, crema roto como fondo, y un latón
mostaza solo para el botón de reservar y detalles pequeños. Nada de negro puro
ni de blanco puro.

TIPOGRAFÍA
Titulares en una serif de display con carácter, tamaño grande. Texto en una sans
neutra y muy legible. Solo dos tipografías en toda la web.

QUÉ NO QUIERO
Sin emojis. Sin degradados. Sin sombras difuminadas de tarjeta genérica. Sin
iconos de línea decorativos. Sin banner de cookies. Sin formulario de contacto.
Sin fotos de stock de gente en traje sonriendo.

No me hagas preguntas: dame ya la primera versión y la iteramos.
```

Cuando te dé la primera versión, itera. Pídele cambios hasta que te guste de verdad: colores, orden de secciones, tipografía, que una sección sea un carrusel en móvil. Míralo también en tamaño móvil. Aquí merece la pena pasar un rato, porque esto es exactamente lo que Claude Code va a construir, y cambiarlo después en código cuesta más.

Cuando lo tengas, expórtalo con **Export > Export as standalone HTML**. Te descarga un único archivo HTML con todo dentro: es la referencia visual de tu web.

## Crea el proyecto con Astro

1. Abre la app de Claude, ve a la pestaña **Code** y elige como carpeta del proyecto una carpeta nueva y vacía (por ejemplo `barberia`). Ahí vivirá tu web.
2. Abre la terminal integrada (botón **Terminal** de la sesión, o Ctrl+`) y pega este comando:

```bash title="Crea el proyecto con Astro y Tailwind"
npm create astro@latest . -- --add tailwind
```

3. Te hace un par de preguntas: plantilla **minimal**, instalar dependencias **sí** y crear un repositorio git **sí**.

Uso Astro porque para la web de un negocio es la mejor opción hoy: envía cero JavaScript por defecto, carga al instante incluso en un móvil con mala cobertura y Google la entiende bien. Los archivos que genera no hace falta que los entiendas.

## Mete el diseño, tus datos y tus fotos

El prompt que construye la web espera tres cosas en la carpeta del proyecto. Todo esto se lo puedes pedir a Claude en el chat.

### El diseño, en `diseno/`

Adjunta en el chat el HTML que exportaste y dile: «Añade este HTML exacto a una carpeta nueva llamada diseno». Sin la ñ, que a veces se lía con ella.

### Tus datos, en `negocio.md`

Aquí no se habla de la web: ni secciones, ni colores, ni fotos. Solo datos. Por eso el mismo archivo te vale aunque mañana cambies el diseño entero.

Cambia los datos de la barbería por los de tu negocio y párate un rato a completarlo: cuanto más concreto, mejor queda la web. Si algo no aplica, bórralo; si quieres añadir algo, mejor. Luego pégalo en el chat y dile: «Crea un documento negocio.md con este contenido exacto».

```markdown title="negocio.md (cámbialo por lo tuyo)"
# negocio.md

> Este es el único archivo que tienes que tocar. Borra los datos de la barbería y
> pon los de tu negocio. No hables aquí de cómo quieres la web ni de qué secciones
> tiene: esto son solo los datos. Cuanto más concreto seas, mejor queda la web.
> Si algo no aplica a tu negocio, borra la sección entera.

## Identidad

- **Nombre:** Barbería Nogal
- **Qué es, en una frase:** Barbería de barrio para hombre, con cita previa, especializada en corte clásico y arreglo de barba.
- **Desde:** 2016
- **Ciudad / barrio:** Valencia, barrio de Ruzafa

## A quién le habla

Hombres de 25 a 55 años del barrio y alrededores. Van cada 3 o 4 semanas, no quieren esperar cola y valoran que siempre les atienda el mismo barbero. Muchos reservan desde el móvil, de noche, después de trabajar.

## Tono

Cercano y directo, de tú. Nada de lenguaje corporativo ni de "excelencia y pasión por el servicio". Frases cortas. Oficio y confianza, no lujo. Sin exclamaciones y sin emojis.

## Qué queremos que haga el visitante

**Reservar por WhatsApp.** Todo lo demás existe para que acabe pulsando ese botón.

## Servicios

| Servicio                       | Precio | Duración |
| ------------------------------ | ------ | -------- |
| Corte de pelo                  | 15 €   | 30 min   |
| Corte + barba                  | 22 €   | 45 min   |
| Arreglo de barba               | 10 €   | 20 min   |
| Afeitado clásico a navaja      | 18 €   | 30 min   |
| Corte infantil (hasta 12 años) | 12 €   | 25 min   |

## Equipo

- **Marcos**: fundador. 15 años de oficio. Corte clásico y degradados.
- **Iván**: barbas y afeitado a navaja.
- **Rubén**: degradados y diseños.

## Horario

- Lunes a viernes: 9:30 a 20:00
- Sábado: 9:30 a 14:00
- Domingo: cerrado

## Dónde y cómo contactar

- **Dirección:** Carrer de Cadis 42, 46006 Valencia
- **Teléfono:** 960 00 00 00
- **WhatsApp:** +34 600 000 000
- **Email:** hola@barberianogal.es
- **Instagram:** @barberianogal

## Lo que nos hace distintos

- Siempre te atiende el mismo barbero si quieres.
- Cita previa de verdad: no esperas.
- Producto propio de barba a la venta en el local.

## Reseñas

- "Llevo cuatro años viniendo y nunca me han fallado un corte." (Javi R.)
- "Pides cita y entras a la hora. Eso ya no lo hace nadie." (Dani M.)
- "El afeitado a navaja de Iván no tiene comparación." (Sergio P.)

## Preguntas frecuentes

- **¿Hace falta cita?** Sí, trabajamos solo con cita previa. Se pide por WhatsApp.
- **¿Se puede pagar con tarjeta?** Sí, tarjeta y Bizum.
- **¿Cortáis a niños?** Sí, hasta 12 años tienen precio especial.
- **¿Hay parking?** Hay zona azul en la misma calle.
```

### Tus fotos, en `fotos/`

Crea una carpeta `fotos` dentro del proyecto y mete ahí todas las fotos del negocio. Lo más fácil es hacerlo a mano desde el Finder (o el Explorador de Windows): arrastrarlas al chat a veces falla porque Claude no encuentra los archivos originales.

## El prompt que construye la web

Éste se pega tal cual en el chat de Claude Code, sin tocar nada.

```prompt title="Prompt 3: construye la web (no lo toques)"
Eres el desarrollador de esta web. Vas a construir la landing page de un negocio
local, entera, en este proyecto de Astro que ya está creado.

FUENTES DE VERDAD (léelas antes de escribir nada)
- `negocio.md` es la ÚNICA fuente del CONTENIDO. Todos los textos, precios,
  horarios, nombres y datos de contacto salen de ahí. No inventes nada que no
  esté en ese archivo, y no dejes ningún texto de relleno tipo "Lorem ipsum" ni
  "Tu texto aquí".
- `diseno/` es la ÚNICA fuente del DISEÑO y de las SECCIONES: qué secciones hay,
  en qué orden, y con qué colores, tipografías, tamaños y espaciados. Puede traer
  un HTML de prototipo, capturas, o las dos cosas; con cualquiera te vale, no
  reclames la que falte.
  El prototipo traerá datos inventados (precios, nombres, horarios) que NO
  coinciden con negocio.md. Ignóralos: del prototipo solo coges lo visual.
  Puede venir empaquetado dentro de otro HTML: extrae de dentro el prototipo real.
  Y NO copies ese HTML al proyecto: reconstrúyelo con la estructura de abajo.
- `fotos/` tiene las fotos del negocio. Ábrelas, mira qué hay en cada una y decide
  a qué sección va. Éstas SÍ van en la web: muévelas a `src/assets/img/`.

STACK (no lo cambies)
- Astro y Tailwind, que ya están instalados. Usa la configuración de Tailwind que
  dejó el instalador, no la reescribas.
- El instalador deja `src/styles/global.css` con el import de Tailwind, pero NO lo
  importa desde ningún sitio. Impórtalo en el Layout, o no se aplicará ni un estilo.
- Ningún framework ni librería de JavaScript. Pero JavaScript propio SÍ, cuando
  aporte algo que el CSS no puede y quepa en unas pocas líneas: no te prives de
  eso. La regla no es "cero JS", es "cero dependencias". Lo que escribas tú, con
  dos condiciones: que funcione sin build, y que si el JS no llega a ejecutarse la
  página siga siendo correcta (renderiza un texto válido y que el JS lo sustituya).
- Abajo tienes resueltos los casos típicos, para que no tengas que preguntarme.
- Si necesitas un icono, escribe el SVG a mano.

ESTRUCTURA DEL PROYECTO
- `src/layouts/Layout.astro`: el <head> con todo el SEO, y el slot de la página.
- `src/components/`: un componente por sección, con el nombre de la sección
  (Hero.astro, Servicios.astro, Equipo.astro, ...). Ninguno pasa de 120 líneas.
- `src/pages/index.astro`: solo importa y ordena los componentes. Nada de HTML
  suelto aquí.
- `src/consts.ts`: los datos de negocio.md ya extraídos (servicios, equipo,
  horarios, contacto) como objetos tipados. Los componentes leen de aquí, no
  tienen textos incrustados.
- `src/assets/img/`: aquí mueves las fotos que hay en `fotos/`. Van aquí y no en
  `public/`, porque Astro solo optimiza lo que vive dentro de `src/`.

REGLAS DURAS
- Móvil primero. Compruébalo a 375px, 768px y 1440px de ancho.
- HTML semántico: header, main, section, footer, y un solo h1 en toda la página.
- Todas las imágenes con `alt` descriptivo de verdad, y con el componente <Image>
  de `astro:assets` para que se optimicen.
- Accesible: contraste suficiente en todo el texto, foco visible al tabular, y
  los botones son <a> o <button>, nunca un <div> con onclick.
- SEO en el Layout: `lang="es"`, title, meta description, Open Graph con imagen,
  favicon, un JSON-LD de tipo LocalBusiness con nombre, dirección, teléfono y
  horario, y si hay preguntas frecuentes, otro de tipo FAQPage.
- El botón principal es un enlace `https://wa.me/<numero>` con un mensaje ya
  escrito, y se repite al menos dos veces a lo largo de la página.
- Todo el texto visible en español de España.

CASOS TÍPICOS, YA RESUELTOS (no me preguntes por estos, hazlos así)
- MAPA: un <iframe> de openstreetmap.org/export/embed.html centrado en la
  dirección, con `loading="lazy"` y un `title` descriptivo. Nada de Leaflet ni de
  Google Maps embebido: para un mapa que nadie va a arrastrar, una librería de JS
  no se paga sola. Al lado, un botón "Cómo llegar" a
  `https://www.google.com/maps/search/?api=1&query=<direccion>`, que en móvil abre
  la app de mapas. Ése es el que la gente pulsa de verdad.
- TIPOGRAFÍAS: primero prueba `@fontsource/<nombre>`, que es la vía limpia. Si esa
  fuente no está ahí, descarga los .woff2 a `src/assets/fonts/` y decláralas con
  @font-face y `font-display: swap`. NUNCA con un <link> a Google Fonts: eso manda
  la IP de cada visitante a Google en cada visita, y esta web no rastrea a nadie.
  Las de @fontsource son la única dependencia nueva permitida.
- CARRUSEL O GALERÍA DESLIZABLE: el deslizamiento, con CSS puro (`overflow-x: auto`
  + `scroll-snap-type: x mandatory`): con el dedo en móvil y con el trackpad en
  escritorio. Y si el diseño lleva flechas, hazlas, que son cuatro líneas de JS
  propio con `scrollBy`. Lo que no quiero es una librería de carrusel.
- ACORDEÓN o preguntas plegables: `<details>` y `<summary>`, estilados. Es nativo,
  accesible y no necesita ni una línea de JS.
- MENÚ DE NAVEGACIÓN EN MÓVIL: si el diseño lo pide desplegable, con el truco del
  checkbox oculto y `:checked`. Si con el diseño cabe una barra simple sin
  desplegar, mejor todavía.
- HORARIO EN VIVO ("hoy abierto hasta las 20:30", "ahora cerrado"): hazlo, con JS
  propio a partir del horario de negocio.md. Es de lo que más convence en la web de
  un negocio local. Renderiza en el HTML un texto fijo y siempre cierto como
  respaldo, y que el JS lo sustituya al cargar.
- AÑO DEL FOOTER: con JS, para que no se quede viejo solo.
- VÍDEO DE FONDO: no. Pesa muchísimo en móvil y se lo come la batería. Usa la foto.
- ANIMACIONES AL HACER SCROLL: no. Retrasan lo que la gente ha venido a leer.
- MODO OSCURO: solo si el diseño lo trae. Si no, no lo inventes.

QUÉ NO HACER
- No quites secciones que estén en el diseño, ni le cambies el orden.
- No te inventes secciones que no salgan ni del diseño ni de negocio.md. Pero si
  negocio.md trae contenido que el diseño no cubre (unas preguntas frecuentes, unas
  reseñas), NO lo tires ni lo escondas en el <head>: móntalo como una sección más,
  con el mismo lenguaje visual del resto, en el sitio que tenga sentido, y avísame
  al final de cuáles has añadido. El diseño manda en cómo se ve; negocio.md manda
  en qué se cuenta, y no se calla nada.
- No metas banner de cookies, ni analítica, ni ningún script de terceros.
- No pongas formulario de contacto.
- No uses degradados, ni sombras difuminadas genéricas, ni animaciones de entrada
  al hacer scroll.
- Si negocio.md menciona algo para lo que no hay foto, NO falles el build: pon un
  bloque gris con la proporción correcta y avísame al final.
- No dejes comentarios explicando lo obvio.

CÓMO QUIERO QUE TRABAJES
1. Primero léete `negocio.md`, `diseno/` y `fotos/`, y dime en 5 líneas qué has
   entendido y qué secciones vas a montar. Espera a que te confirme.
2. Luego constrúyelo entero de una vez.
3. Al terminar, arranca `npm run dev` y dime la URL.
```

Antes de empezar te resume lo que ha entendido y las secciones que va a montar. Revísalo, confírmale y espera unos minutos a que construya la web entera. Te la enseña en vista previa dentro de la app. Mírala también en móvil y pídele los cambios que quieras.

Si otro día vuelves para cambiar algo y quieres verla en local, pídeselo a Claude o ejecuta en la terminal:

```bash title="Ver la web en local"
npm run dev
```

## Súbela a internet con Netlify

La web se conecta a GitHub y Netlify la publica. A partir de ahí, cada cambio que hagas se publica solo.

1. **GitHub.** Crea tu cuenta en [github.com](https://github.com). En tu perfil, ve a Repositories > New, ponle un nombre (por ejemplo `barberia`), visibilidad **Private** y créalo.
2. En la página del repositorio recién creado, copia el bloque de comandos «…or push an existing repository from the command line», pégalo en la terminal del proyecto y ejecútalo. Ya tienes todo tu proyecto en GitHub.
3. **Netlify.** Entra en [netlify.com](https://www.netlify.com) (Netlify, no Netflix) e inicia sesión. Ve a **Add new project > Import an existing project**, elige **GitHub**, autoriza el acceso y selecciona tu repositorio.
4. Deja la configuración que detecta sola (reconoce Astro) y confirma.
5. Vuelve al chat de Claude y dile «Pushea todo a main». Sube a GitHub la web que ha construido, Netlify la publica y en un minuto la tienes en una URL pública.

> Si la web te sale como privada, cámbiala a pública en la configuración de visibilidad del proyecto en Netlify.

### Cómo se actualiza a partir de ahora

Cada vez que cambies algo con Claude (un precio, una sección, una foto), termina diciéndole:

```prompt title="Para publicar cada cambio"
Pushea todo a main
```

Eso sube los cambios a GitHub, Netlify los detecta y en unos segundos están en vivo.

### Tu dominio

Si es para un negocio, conecta tu dominio propio: en Netlify, **Domain management > Production domains > Add a domain**. Puedes comprarlo ahí mismo o añadir uno que ya tengas.

## Checklist rápido

- Node.js instalado y la pestaña Code de la app de Claude abierta en una carpeta vacía.
- Diseño iterado hasta que te guste y exportado como HTML standalone.
- Proyecto creado con `npm create astro@latest . -- --add tailwind`.
- `diseno/`, `negocio.md` y `fotos/` dentro del proyecto.
- El prompt 3 pegado sin tocar.
- Repositorio en GitHub e importado en Netlify.
- Cada cambio, con «pushea todo a main».

## Fuentes

- [Astro: instalar y crear un proyecto](https://docs.astro.build/en/install-and-setup/)
- [Astro: Tailwind](https://docs.astro.build/en/guides/styling/#tailwind)
- [Claude Design: primeros pasos](https://support.claude.com/en/articles/14604416-get-started-with-claude-design)
- [Claude Code en la app de escritorio](https://code.claude.com/docs/en/desktop)
- [Netlify: desplegar desde un repositorio](https://docs.netlify.com/start/quickstarts/deploy-from-repository/)
