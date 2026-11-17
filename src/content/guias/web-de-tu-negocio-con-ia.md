---
title: "Haz la web de tu negocio con IA (y que sea tuya)"
description: "Haz la web de tu negocio con IA sin saber programar: diseño en Claude Design, Claude Code la construye con Astro y la subes gratis a Netlify. Prompts listos."
lede: "La guía del vídeo en cuatro prompts para copiar y pegar: diseñas la web, Claude Code monta el proyecto con tus datos y tus fotos, la construye con Astro y la sube a internet. Tú no tocas la terminal."
tema: "Webs"
publishedAt: 2026-08-01
updatedAt: 2026-11-17
service: webs
keyword: "WEB"
gateAfter: 1
videos:
  - title: "Cómo hacer una WEB con IA sin saber programar (GRATIS y paso a paso)"
    url: "https://youtu.be/Wq99zKi8WhY"
---

La diferencia con las herramientas que te hacen la web en un clic es que aquí la web es tuya de verdad: vive en una carpeta de tu ordenador, la subes tú a donde quieras y dentro de un año puedes cambiar un precio sin depender de nadie.

Y no vas a escribir ni un comando. Copias prompts, los pegas y revisas lo que sale: instalar, crear el proyecto, mover archivos y subir la web lo hace el agente.

Necesitas:

- **Claude**, con Claude Design para el diseño (está en todos los planes, también el gratis) y **Claude Code** para construir la web, que es la parte de pago: no entra en el plan gratis y el más barato que lo incluye es Pro. Lo más cómodo es la app de escritorio ([claude.com/download](https://claude.com/download)), pestaña **Code**. Los prompts también deberían servirte en Codex, aunque yo los uso en Claude Code.
- **Una cuenta de GitHub y otra de Netlify**, las dos gratis. Solo hacen falta al final, para subir la web.

## Diseña la web en Claude Design

Antes de pedirle código a nadie, decide cómo se ve la web. Es el paso que casi todo el mundo se salta, y la razón número uno de que las webs hechas con IA queden genéricas: si no le dices cómo se ve, se lo inventa, y siempre se inventa lo mismo.

Abre un diseño nuevo en Claude: en un chat, **Output > Design**, o en la pestaña **Artifacts** con una plantilla de Design. Pega este prompt cambiando el negocio, las secciones y la paleta por lo tuyo.

> En el vídeo lo hago en claude.ai/design, la web independiente de Claude Design. Anthropic la ha metido dentro de Claude y esa web cierra el 14 de diciembre de 2026: el prompt sirve igual en la versión nueva.

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

Cuando te dé la primera versión, itera en el mismo chat hasta que te guste de verdad: colores, orden de secciones, tipografía, que una sección sea un carrusel en móvil. Míralo también en tamaño móvil. Aquí merece la pena pasar un rato, porque esto es exactamente lo que se va a construir, y cambiarlo después en código cuesta más.

Cuando lo tengas, pulsa **Export > Export as standalone HTML** (arriba a la derecha). Te descarga un único archivo HTML con todo dentro: es la referencia visual de tu web. Déjalo en Descargas, que de ahí lo coge el agente.

## Prepara el proyecto con tus datos y tus fotos

Abre la app de Claude, ve a la pestaña **Code**, crea una sesión nueva y elige como carpeta del proyecto una carpeta nueva y vacía (por ejemplo `barberia`). Ahí vivirá tu web.

En este prompt cambia los datos de la barbería por los de tu negocio y párate un rato a completarlos: cuanto más concreto, mejor queda la web. Si algo no aplica, bórralo. Aquí no se habla de la web (ni secciones, ni colores): solo datos, por eso te vale aunque mañana cambies el diseño entero. Pon también dónde tienes las fotos del negocio.

```prompt title="Prompt 2: prepara el proyecto (edita los datos)"
Prepárame en esta carpeta el proyecto de la web de mi negocio. Hazlo tú todo y no
me pidas que ejecute nada; si necesitas mi contraseña o que acepte algo en
pantalla, dime exactamente qué pulsar.

1. Comprueba que tengo Node.js 22 o superior (versión LTS). Si no, instálalo tú.
2. Crea aquí un proyecto de Astro con Tailwind, plantilla minimal, con las
   dependencias instaladas y un repositorio git. Sigue la documentación oficial
   (https://docs.astro.build/en/install-and-setup/ y
   https://docs.astro.build/en/guides/styling/#tailwind) y usa los flags del
   instalador para que no se quede esperando mis respuestas. Si no puedes leer
   esas páginas, dímelo.
3. Busca en mi carpeta de Descargas el HTML que exporté de Claude Design (el .html
   más reciente) y cópialo tal cual a una carpeta nueva llamada diseno. Si no lo
   encuentras o hay dudas de cuál es, pregúntame.
4. Copia mis fotos del negocio desde <carpeta donde tienes las fotos> a una carpeta
   nueva llamada fotos. Si lo dejo así, pregúntame dónde están.
5. Crea negocio.md con este contenido exacto:

# negocio.md

## Identidad
- Nombre: Barbería Nogal
- Qué es, en una frase: Barbería de barrio para hombre, con cita previa,
  especializada en corte clásico y arreglo de barba.
- Desde: 2016
- Ciudad / barrio: Valencia, barrio de Ruzafa

## A quién le habla
Hombres de 25 a 55 años del barrio y alrededores. Van cada 3 o 4 semanas, no
quieren esperar cola y valoran que siempre les atienda el mismo barbero. Muchos
reservan desde el móvil, de noche, después de trabajar.

## Tono
Cercano y directo, de tú. Nada de lenguaje corporativo ni de "excelencia y pasión
por el servicio". Frases cortas. Oficio y confianza, no lujo. Sin exclamaciones y
sin emojis.

## Qué queremos que haga el visitante
Reservar por WhatsApp. Todo lo demás existe para que acabe pulsando ese botón.

## Servicios
| Servicio                       | Precio | Duración |
| Corte de pelo                  | 15 €   | 30 min   |
| Corte + barba                  | 22 €   | 45 min   |
| Arreglo de barba               | 10 €   | 20 min   |
| Afeitado clásico a navaja      | 18 €   | 30 min   |
| Corte infantil (hasta 12 años) | 12 €   | 25 min   |

## Equipo
- Marcos: fundador. 15 años de oficio. Corte clásico y degradados.
- Iván: barbas y afeitado a navaja.
- Rubén: degradados y diseños.

## Horario
- Lunes a viernes: 9:30 a 20:00
- Sábado: 9:30 a 14:00
- Domingo: cerrado

## Dónde y cómo contactar
- Dirección: Carrer de Cadis 42, 46006 Valencia
- Teléfono: 960 00 00 00
- WhatsApp: +34 600 000 000
- Email: hola@barberianogal.es
- Instagram: @barberianogal

## Lo que nos hace distintos
- Siempre te atiende el mismo barbero si quieres.
- Cita previa de verdad: no esperas.
- Producto propio de barba a la venta en el local.

## Reseñas
- "Llevo cuatro años viniendo y nunca me han fallado un corte." (Javi R.)
- "Pides cita y entras a la hora. Eso ya no lo hace nadie." (Dani M.)
- "El afeitado a navaja de Iván no tiene comparación." (Sergio P.)

## Preguntas frecuentes
- ¿Hace falta cita? Sí, trabajamos solo con cita previa. Se pide por WhatsApp.
- ¿Se puede pagar con tarjeta? Sí, tarjeta y Bizum.
- ¿Cortáis a niños? Sí, hasta 12 años tienen precio especial.
- ¿Hay parking? Hay zona azul en la misma calle.

Todavía no construyas la web. Cuando acabes, dime en pocas líneas qué has
instalado y qué hay en diseno, fotos y negocio.md.
```

Revisa el resumen: que el HTML de `diseno/` sea el tuyo y que estén todas las fotos.

## Construye la web

Éste se pega tal cual en el mismo chat, sin tocar nada: es el mismo para cualquier negocio.

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

Antes de empezar te resume lo que ha entendido y las secciones que va a montar. Revísalo, confírmale y espera unos minutos a que construya la web entera. Te la enseña en el panel **Browser** de la sesión. Mírala también en móvil y pídele en el chat los cambios que quieras.

Si otro día vuelves y quieres verla en local, pídeselo: «arranca la web en local».

## Súbela a internet con Netlify

La web va a GitHub y Netlify la publica desde ahí. A partir de ese momento, cada cambio que subas se publica solo.

Lo único que haces tú en este paso: crear las cuentas gratis de [GitHub](https://github.com) y de [Netlify](https://www.netlify.com) (Netlify, no Netflix), iniciar sesión cuando te lo pida el agente y conectar el repositorio en Netlify. Lo demás, este prompt:

```prompt title="Prompt 4: sube la web a GitHub"
Sube este proyecto a un repositorio PRIVADO nuevo en mi cuenta de GitHub, llamado
<nombre del repositorio>. Si lo dejo así, usa el nombre de esta carpeta.

Hazlo tú con la CLI oficial de GitHub (gh): si no la tengo, instálala; si tengo que
iniciar sesión, dime exactamente qué hacer y espera. Haz commit de todo lo que haya
y súbelo a la rama main. Cuando acabes, dame el enlace del repositorio.
```

Luego, en Netlify:

1. **Add new project > Import an existing project**.
2. Elige **GitHub**, autoriza el acceso y selecciona tu repositorio.
3. Deja la configuración que detecta sola (reconoce Astro) y confirma con **Publish**.

En un minuto la tienes en una URL pública. Si te sale como privada, cámbiala a pública en la visibilidad del proyecto en Netlify.

## Cambia lo que quieras cuando quieras

Pídele el cambio a Claude Code en la carpeta del proyecto (un precio, una sección, una foto) y termina con:

```prompt title="Para publicar cada cambio"
Haz commit de los cambios y súbelos a main.
```

Netlify lo detecta y en unos segundos está en vivo. Para cambiar datos del negocio, lo más limpio es pedirle que actualice `negocio.md` y que la web lo refleje.

**Tu dominio.** Si es para un negocio, conecta un dominio propio. Esto también es manual, porque se paga y va con tu cuenta: en Netlify, **Domain management > Production domains > Add a domain**. Puedes comprarlo ahí mismo o añadir uno que ya tengas.

## Por qué así (Astro, Netlify y tres textos)

- **Astro** porque para la web de un negocio es la mejor opción hoy: envía cero JavaScript por defecto, carga al instante incluso con mala cobertura y Google la entiende bien. Los archivos que genera no hace falta que los entiendas.
- **Netlify** porque el plan Free cuesta 0 € para siempre, incluye dominio propio con SSL y publica solo cada vez que subes un cambio a GitHub.
- **Tres textos separados**: el diseño dice cómo se ve, `negocio.md` dice qué se cuenta y el prompt 3 dice cómo se construye. Por eso puedes rehacer el diseño sin tocar tus datos, o cambiar un precio sin tocar el diseño.

## Checklist

- Diseño iterado en Claude Design y exportado como HTML standalone.
- Prompt 2 con tus datos: proyecto de Astro creado con `diseno/`, `fotos/` y `negocio.md`.
- Prompt 3 pegado sin tocar y la web revisada en móvil.
- Repositorio privado en GitHub e importado en Netlify.
- Cada cambio, con «haz commit y súbelo a main».

## Fuentes

- Claude Help Center, [Get started with Claude Design](https://support.claude.com/en/articles/14604416-get-started-with-claude-design): acceso desde Output > Design y Artifacts, Export as standalone HTML, disponible en todos los planes y cierre de claude.ai/design el 14-dic-2026 (consultado el 17-nov-2026).
- Claude, [precios](https://claude.com/pricing): Claude Code no está en Free; el plan más barato que lo incluye es Pro (consultado el 17-nov-2026).
- Claude Code Docs, [Claude Code en la app de escritorio](https://code.claude.com/docs/en/desktop): pestaña Code, carpeta del proyecto, terminal integrada y panel Browser con el servidor de desarrollo (consultado el 17-nov-2026).
- Astro Docs, [instalar y crear un proyecto](https://docs.astro.build/en/install-and-setup/) (Node.js 22 o superior) y el [README de create-astro](https://github.com/withastro/astro/blob/main/packages/create-astro/README.md) con los flags `--template`, `--install`, `--git`, `--add` y `--yes` (consultados el 17-nov-2026).
- Astro Docs, [Tailwind](https://docs.astro.build/en/guides/styling/#tailwind): crea `src/styles/global.css` y hay que importarlo en el layout (consultado el 17-nov-2026).
- Astro Docs, [desplegar en Netlify](https://docs.astro.build/en/guides/deploy/netlify/): Netlify detecta Astro y un sitio estático no necesita adaptador (consultado el 17-nov-2026).
- GitHub CLI, [gh repo create](https://cli.github.com/manual/gh_repo_create): `--private`, `--source` y `--push` (consultado el 17-nov-2026).
- Netlify Docs, [desplegar desde un repositorio](https://docs.netlify.com/start/quickstarts/deploy-from-repository/) y [precios](https://www.netlify.com/pricing/): plan Free a 0 € con dominio propio y SSL, proyectos privados hasta que los publicas (consultado el 17-nov-2026).
