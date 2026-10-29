# Rediseño de drumorera.com: web de servicios

Fecha: 2026-10-29 · Rama: `rediseno-servicios` · Versión anterior: etiqueta `v1-portfolio-antiguo`

## Intención

Dru (Roger Morera) ya no busca empleo: es programador freelance y creador de contenido sobre IA (marca **@soydruia** en TikTok, Instagram, Facebook y YouTube). El portfolio actual (experiencia, skills y proyectos) está abandonado y no le sirve. La nueva web tiene que **vender sus servicios** y convertir a quien llega desde sus vídeos, casi siempre desde el móvil.

Quien entra tiene que entender en segundos quién es Dru, qué ofrece y si alguno de sus servicios es para él, y contactarle con el mínimo esfuerzo.

La trayectoria profesional (experiencia, estudios, skills) **sale de la web** y se queda en el CV.

## Metas

1. Explicar los servicios con claridad. Cada uno dice para quién es ("Es para ti si…"), qué hace y tiene un botón.
2. Contacto con poca fricción: email grande que se copia, WhatsApp y formulario en 3 pasos que envía el email solo.
3. Una experiencia diferente y memorable, con animaciones y transiciones cuidadas, sin dejar de ser **minimalista y profesional**.
4. Mostrar la prueba social: vídeos destacados y seguidores sumados de las 4 redes.
5. Página `/links` para la bio de las redes.

## Fuera de alcance

- Experiencia, estudios, skills y proyectos del portfolio antiguo.
- Blog, precios publicados y pasarela de pago.
- Versión en inglés: la web nueva es **solo en español** (decisión mía; el público es hispanohablante). Se puede retirar la i18n actual.

## Lo que la haría un fracaso aunque funcione

- Que parezca la típica web generada: cabecera con texto grande a la izquierda, imagen a la derecha y tres cajas debajo; mayúsculas espaciadas encima de cada título; una palabra destacada en otro color; flechas "→" en todos los botones.
- **Animaciones atadas al scroll** palabra a palabra o fotograma a fotograma. Dru las probó y las descartó: cuestan de leer. La animación va **por bloques**: un momento orquestado que se reproduce una vez o como respuesta a una acción del usuario.
- Secciones que obligan a hacer mucho scroll para entrar y salir de ellas.
- Que no se entienda cómo navegar entre servicios.

## Referencia visual obligatoria

El prototipo aprobado es [docs/superpowers/prototypes/2026-10-29-escenario-v2.html](../prototypes/2026-10-29-escenario-v2.html). Ábrelo en el navegador. **La web debe reproducir su estética, sus transiciones, sus tiempos y sus curvas de animación.** Dru dijo literalmente que le encantan esas animaciones. Se puede mejorar, pero no simplificar.

## Sistema de diseño

- **Tipografía:** Geist (Google Fonts, 300–800), una sola familia. Títulos en 500–550 con tracking de −0,035em; el texto, en 400.
- **Colores:**
  - Blanco `#FFFFFF`.
  - Tinta `#000000`.
  - Gris `#6E6E73`.
  - Línea `#E6E6EA`.
  - Fondo suave `#F4F5F8`.
  - Acento `#2440FF`, solo para lo interactivo o lo que es "para ti".
  - Éxito `#0E7A57`.
  - Cada servicio tiene además su tono de fondo para el escenario (ver la tabla).
- **Curvas:** `--ease: cubic-bezier(.7,0,.2,1)` para transformar y desplazar; `--spring: cubic-bezier(.2,.9,.3,1.3)` para pequeñas apariciones con rebote.
- **Formas:** botones en píldora, el escenario con radio de 28px y las tarjetas con 20px.
- **Iconos:** de trazo, a 1,7px. El repo ya tiene `@lucide/astro`, que vale.
- **Accesibilidad:** foco visible, `prefers-reduced-motion` respetado (las animaciones pasan a instantáneas), contraste AA, controles navegables con teclado y roles ARIA en pestañas, modal y grupo de selección.
- **Móvil primero.** Casi todo el tráfico llega de TikTok e Instagram.

## Estructura de la página principal (`/`)

1. **Cabecera:** "Dru Morera" a la izquierda; "Servicios", "Vídeos" y un botón negro "Contactar" que abre el modal. En móvil solo se ve "Contactar".
2. **Intro:** una frase grande, sin imagen al lado: "Programo con IA desde hace cuatro años. *Construyo para negocios, enseño a usarla y lo cuento en vídeo.*" La segunda parte va en gris.
3. **¿Qué te trae por aquí?** Es opcional y de selección múltiple. Son cuatro tarjetas con icono:
   - Tengo un negocio → automatizaciones, webs, consultoría
   - Quiero vender online → webs, Shopify
   - Quiero aprender IA → consultoría, mentoría
   - Tengo una marca → colaboraciones

   Al marcar una: se anima el check, la tarjeta pasa a negro y aparece el resumen "Te encajan N servicios: …" con un botón "Verlos", que lleva al escenario y abre el primero. Las pestañas de los servicios que encajan muestran la insignia **"Para ti"** y el texto de esos servicios, "Encaja con lo que buscas". Hay un enlace "Ver todos los servicios" para saltárselo. Opcional: recordar la selección en `localStorage`.
4. **Mis servicios (el escenario).** Es el corazón de la web y se describe en la sección siguiente.
5. **Lo cuento en vídeo:** el anillo 3D (ver más abajo), las cifras sumadas y por red, y un selector "Más vistos / Últimos".
6. **Contacto:** "¿Tienes algo en mente?", el email `hola@drumorera.com` en grande (al hacer clic se copia y se ve "Email copiado"), el botón "Escríbeme aquí" (abre el modal) y el botón de WhatsApp.
7. **Pie:** nombre y @soydruia. Aquí sí pueden ir los enlaces a las redes.

## El escenario de servicios

- Una barra de **pestañas** con icono y nombre. Una píldora blanca se desliza hasta la activa. Debajo, una **barra de progreso** y el texto "N de 6".
- Debajo, un panel con el fondo tintado del servicio y dos columnas: a la izquierda el texto; a la derecha el **objeto que se transforma**. En móvil, el objeto va arriba y escalado.
- Abajo, los botones **Anterior / Siguiente**, con el nombre del servicio de destino.
- También se navega con las flechas del teclado (solo con el escenario en pantalla y el modal cerrado) y deslizando en táctil.
- **Cada servicio tiene su ancla** (`/#automatizaciones`, `/#webs`…). Al cargar con ancla se abre ese servicio. Así `/links` puede llevar directamente a uno.

**La transición entre servicios** es la pieza clave; copia los tiempos del prototipo:
1. El texto sale hacia arriba (−18px y fundido, 0,35s) y entra el nuevo desde abajo, escalonado por bloques.
2. La cara actual del objeto se apaga. El objeto cambia ancho, alto, radio y fondo (0,75s, `--ease`) y durante el cambio se encoge un poco y se inclina (`scale(.94) rotate(tilt)`).
3. La nueva cara aparece con retardo y sus elementos internos entran escalonados (0,7s, 0,95s, 1,2s, 1,45s).
4. El fondo del panel cambia de tono a la vez.

**Servicios** (orden, contenido, forma del objeto):

| # | Ancla | Pestaña | Objeto (an × al, radio) | Fondo | Cara |
|---|---|---|---|---|---|
| 1 | automatizaciones | Automatizaciones e IA | móvil 270×520, 38 | #EEF3F1 | Chat de WhatsApp que responde solo y deja la cita en el calendario |
| 2 | webs | Webs | navegador 520×360, 14 | #EFF1F5 | Web de un negocio local de ejemplo |
| 3 | shopify | Tiendas Shopify | 470×400, 22 | #F5F1EC | Tienda con 3 productos y "Pedido pagado" |
| 4 | consultoria | Consultoría | documento 380×470, 6 | #F2F2F4 | "Plan de IA para tu negocio" en 3 pasos |
| 5 | mentoria | Mentoría | videollamada 520×320, 18 | #EDEEF4 | Dru y Tú, con "Lista de espera abierta" |
| 6 | colaboraciones | Colaboraciones | vídeo vertical 260×462, 22 | #ECEFFC | Short de @soydruia con "Tu marca aquí" |

Los textos (título, frase, "Es para ti si…" y botón) son los del prototipo. **Mentoría** está en *lista de espera*: botón secundario "Apuntarme a la lista" y la etiqueta "Sin plazas ahora mismo". **Colaboraciones** tiene además el enlace "Ver mis vídeos" a la sección de vídeos. Los botones de cada servicio abren el modal con ese servicio ya marcado.

El contenido de los servicios va en datos (colección de contenido o `src/data/services.ts`), no metido a mano en el marcado, para poder editarlo fácilmente.

## Vídeos en anillo 3D

- Ocho tarjetas verticales 9:16 en un anillo con `perspective` y `preserve-3d`. La tarjeta de delante lleva un borde blanco.
- Gira despacio sola; se para al pasar el ratón; se puede arrastrar con inercia, y tiene dos botones redondos para girar.
- "Más vistos / Últimos" cambia el conjunto con una animación de cambio escalonada.
- Cada tarjeta muestra la miniatura real del vídeo, la red, el título y las visualizaciones, y enlaza al vídeo (en otra pestaña).
- Sin movimiento automático si `prefers-reduced-motion`.
- **Datos:** un JSON versionado en el repo, por ejemplo `src/data/social.json`, con `updatedAt`, los seguidores por red y la lista de vídeos (`id`, `network`, `title`, `url`, `thumbnail`, `views`, `publishedAt`). La web lo lee al construirse.
  - **Fase 1:** Dru rellena el JSON a mano. Seguidores a 2026-10-28: Facebook ~2.400, Instagram ~2.300, TikTok ~300, YouTube ~300.
  - **Fase 2 (fuera de este proyecto):** la herramienta de Dru, tiktok-editor (que ya consulta las APIs de las redes), exporta ese JSON y hace commit, lo que vuelve a desplegar la web.

## Modal de contacto en 3 pasos

- Se abre desde cualquier `[data-open]`. Fondo difuminado; la ventana entra con `--spring`; se cierra con Esc, con la X o tocando fuera; bloquea el scroll.
- La barra de pasos muestra "Tu nombre / Tu email / Tu mensaje" y se va llenando. Los pasos se deslizan en horizontal (0,55s `--ease`). Enter avanza.
- **Paso 3:** chips de servicios con selección múltiple. Vienen marcados el servicio desde el que se abrió o, si no, los elegidos en "¿Qué te trae por aquí?". Hay un chip "Otra cosa" y un campo de mensaje.
- **Validación amable:** si algo falla, el campo tiembla y aparece un mensaje que explica cómo arreglarlo.
- **Al enviar:** check animado con "Mensaje enviado. Gracias, {nombre}. Te respondo a {email} lo antes posible."
- **El envío es real** y lo hace un endpoint del servidor que manda el email a Dru con `reply-to` = email del visitante. Lleva protección contra spam (campo trampa y un límite básico; Turnstile es opcional). Si falla el envío, se muestra un error que ofrece WhatsApp y el email como alternativa.
- **Enfoque recomendado (comprobar antes de construir):** pasar a `output: "static"` con el adaptador `@astrojs/cloudflare` para tener rutas bajo demanda (`/api/contact`), y enviar con el binding `send_email` de Cloudflare Email Routing hacia la dirección de destino verificada de Dru. Si no encaja, usar un proveedor de envío como Resend. Hoy la web es estática y se despliega en Cloudflare Workers (`wrangler.jsonc`, nombre `dru-portfolio`).

## Página `/links`

- Pensada para móvil y **sin enlace desde el menú**; es para la bio de las redes. Con la misma estética.
- Foto o avatar, @soydruia y una frase.
- Botón principal de WhatsApp y otro de "Escríbeme" (modal).
- Accesos a cada servicio (con anclas a `/#servicio`), el último vídeo y las redes.
- `noindex` (decisión mía).

## Contacto: datos y cuentas

- **Email público:** `hola@drumorera.com`. Dru tiene que crearlo con Cloudflare Email Routing (reenvío a su Gmail) y configurar "Enviar como" en Gmail con el SMTP de Google. Esto lo hace Dru, no es código. Ojo: el `siteConfig` actual usa `contacto@drumorera.com`, que hay que cambiar.
- **WhatsApp:** enlace `wa.me/<número>?text=Hola Dru, vengo de tu web…`. El número lo pone Dru en la configuración. Puede que use un número de WhatsApp Business aparte (pendiente de que lo decida).

## SEO y técnico

- Mantener: Astro 5, Tailwind 4, sitemap, Prettier, Husky, Vitest, CI (formato, tipos, tests y build) y el despliegue en Cloudflare.
- Título y descripción orientados a servicios. Nueva imagen OG. `llms.txt` actualizado con los servicios.
- Retirar los componentes, colecciones y textos del portfolio antiguo que ya no se usen (siguen disponibles en la etiqueta `v1-portfolio-antiguo`).
- La interactividad se hace con scripts ligeros en los componentes de Astro (vanilla TS), sin frameworks de UI ni librerías de animación: el prototipo demuestra que no hacen falta.
- Rendimiento: Lighthouse móvil ≥ 90. Fuentes con `display=swap` o servidas desde el propio sitio.
- Tests de lógica pura: qué servicios encajan según la selección, validación del formulario y el endpoint de contacto.

## Decisiones tomadas tras la revisión del diseño (2026-10-29)

- **Email Routing ya está activo** en drumorera.com. Lo comprobé el 2026-10-29: los registros MX apuntan a `route*.mx.cloudflare.net` y el SPF incluye `_spf.mx.cloudflare.net`. Por tanto, el envío del formulario usa el binding **`send_email`** de Cloudflare. Dru tiene que confirmar que su Gmail es un destino verificado y crear la regla de `hola@` (puede que ya exista una para `contacto@`). Resend queda como alternativa solo si `send_email` no funciona.
- **Nada falso en producción.** Cada pieza se esconde si le faltan datos: sin número no salen los botones de WhatsApp; sin vídeos reales no sale la sección de vídeos (y si "Últimos" está vacío, no sale el selector); sin email verificado, el mensaje de error solo ofrece las alternativas que existan. El anillo se adapta a entre 5 y 8 vídeos. En desarrollo se pueden usar datos de ejemplo, en un fichero aparte que no se usa al construir la versión de producción.
- **Pasar a `main` (que publica la web) solo con el visto bueno de Dru.**
- **Miniaturas en el repo:** van en `src/assets/videos/<id>.jpg` y el JSON usa rutas locales, para que Astro las optimice. Nada de enlazar las de TikTok o Instagram, porque caducan. En la fase 2, tiktok-editor descargará las imágenes y hará el commit.
- **Redes:** las URLs de TikTok, Instagram, Facebook y YouTube van en `siteConfig` como datos que Dru tiene que completar. GitHub y LinkedIn se quedan en el pie, porque dan credibilidad a los servicios de desarrollo (decisión mía).
- Las URLs antiguas (`/en`, páginas de proyectos) redirigen a `/`.

## Decisiones que deja Dru al constructor

- El código: arquitectura de componentes, cómo se organizan los datos y los detalles técnicos del endpoint de contacto.
- Mejorar las animaciones respecto al prototipo, siempre que no se pierdan ni se aten al scroll.

## Pendiente de Dru (no bloquea la construcción; usar marcadores en la configuración)

- Número de WhatsApp.
- Vídeos reales (enlaces, miniaturas y visualizaciones) para el JSON.
- Crear `hola@drumorera.com`.
- Si usa su foto en `/links` (ya existe `public/images/yo.jpg`).
- Las URLs de sus perfiles en TikTok, Instagram, Facebook y YouTube.
- Confirmar que su Gmail es un destino verificado de Email Routing.

## Fuera de este proyecto

- La exportación automática de métricas desde tiktok-editor (fase 2).
- Precios publicados.
