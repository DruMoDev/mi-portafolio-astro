---
title: "Prompts para aprovechar Fable 5 sin malgastar el crédito"
description: "Cuatro prompts para aprovechar Fable 5 en tareas grandes (app, web, auditoría de seguridad, migración) y cómo no malgastar crédito ni límites de tu plan."
lede: "Fable es el modelo más potente de Claude y también el que más rápido se come el crédito o los límites de tu plan. Estos son los cuatro prompts que uso para que cada mensaje merezca la pena."
tema: "Prompts"
publishedAt: 2026-07-20
updatedAt: 2026-11-07
service: consultoria
keyword: "FABLE"
gateAfter: 1
retirada:
  fecha: 2026-11-08
  motivo: "El crédito de 100 $ de Fable 5 caducó el 17 de septiembre de 2026"
videos:
  - title: "Fable 5, el modelo más potente de Claude, acaba de cambiar y afecta a tu plan"
    url: "https://youtu.be/ofZOx76loyk"
  - title: "Fable 5 cambia: qué te toca según tu plan (TikTok)"
    url: "https://www.tiktok.com/@soydruia/video/7664267248797748502"
---

Fable tiene sentido cuando la tarea exige investigar, decidir, ejecutar y comprobar. Para una pregunta rápida o un cambio pequeño, usa Sonnet. Guarda Fable para trabajos grandes como estos.

> Qué te toca según tu plan (noviembre de 2026): en **Max**, **Ultra** y los puestos **Team Premium**, Fable 5 y Fable 5.1 vienen incluidos hasta el 50 % de tus límites semanales. En **Pro** y **Team Standard** se pagan con créditos de uso (usage credits) a tarifa de API. En **Free** no está. El crédito único de 100 dólares que Anthropic dio en julio a Pro y Team Standard ya caducó (se podía reclamar hasta el 2 de agosto y expiró el 17 de septiembre de 2026).

Antes de pegar cualquier prompt, sustituye los campos entre `[corchetes]` y adjunta los archivos necesarios.

## Crea una aplicación completa

Para cuando quieres el producto entero, no una demo: le das objetivo, usuario y restricciones, y le obligas a cerrar con tests y build en verde.

```prompt title="Prompt: crear una aplicación completa"
Quiero que construyas una aplicación funcional de principio a fin.

Objetivo: [qué problema resuelve]
Usuario principal: [quién la usará]
Funciones imprescindibles:
- [función 1]
- [función 2]
- [función 3]

Stack y restricciones:
- [tecnologías obligatorias o “elige tú y justifica”]
- [base de datos, hosting, autenticación]
- [presupuesto, plazo o límites]

Trabaja en este orden:
1. Inspecciona el repositorio y resume la arquitectura actual
2. Señala ambigüedades o riesgos que cambien el diseño
3. Propón un plan breve con entregables verificables
4. Implementa el producto completo, no solo una demo visual
5. Añade validación, manejo de errores y estados vacíos
6. Escribe y ejecuta tests de los flujos críticos
7. Ejecuta lint, build y pruebas finales
8. Corrige cualquier fallo antes de terminar

Criterios de finalización:
- [flujo crítico 1] funciona de extremo a extremo
- [flujo crítico 2] funciona de extremo a extremo
- La interfaz funciona en móvil y escritorio
- No quedan errores de build, lint ni tests

No des la tarea por terminada con una explicación. Entrégala implementada y resume al final qué cambiaste, cómo lo verificaste y qué decisiones tomaste.
```

## Crea o rehaz una web

Pensado para una web que se pueda publicar, no un mockup. Cuanto más material real le des (textos, marca, referencias), menos genérica sale.

```prompt title="Prompt: crear o rehacer una web"
Diseña e implementa una web lista para publicar.

Negocio o producto: [descripción]
Audiencia: [perfil]
Conversión principal: [reservar, comprar, registrarse, contactar]
Contenido disponible: [textos, imágenes, testimonios, marca]
Referencias que me gustan: [URLs]
Lo que quiero evitar: [estilos o patrones]

Necesito:
- Una jerarquía clara centrada en la conversión
- Copy específico, sin frases genéricas de plantilla
- Una dirección visual propia y coherente con [marca/sector]
- Diseño responsive y accesible
- Estados hover, focus, carga y error cuando correspondan
- SEO técnico básico y metadatos sociales
- Buen rendimiento y assets optimizados

Proceso:
1. Analiza el material y define el recorrido del usuario
2. Propón estructura, mensajes y dirección visual
3. Implementa todas las páginas y componentes necesarios
4. Comprueba móvil y escritorio
5. Ejecuta auditoría de accesibilidad, rendimiento y build
6. Corrige los problemas encontrados

La web debe quedar ejecutable y publicable, no como un mockup. Al terminar, incluye comandos de despliegue y evidencia de las comprobaciones.
```

## Audita la seguridad de una web o aplicación

Solo sobre proyectos tuyos o que estés autorizado a revisar, y en local o staging. Le pido evidencia de cada hallazgo para que no infle la lista.

```prompt title="Prompt: auditoría de seguridad"
Haz una auditoría defensiva de seguridad de este proyecto autorizado.

Contexto:
- Aplicación: [qué hace]
- Stack: [tecnologías]
- Entorno permitido: [local/staging]
- Activos sensibles: [datos, pagos, sesiones, secretos]
- Fuera de alcance: [producción, terceros, acciones destructivas]

Revisa como mínimo:
- Autenticación, autorización y separación entre usuarios
- Validación de entradas y salidas
- Gestión de sesiones, cookies, CORS y CSRF
- Inyección, XSS, SSRF, subida de archivos y traversal
- Exposición de secretos y datos personales
- Dependencias vulnerables y configuración insegura
- Logs, errores y límites de abuso

Reglas:
- No ataques sistemas externos ni producción
- No ejecutes acciones destructivas
- Demuestra cada hallazgo con evidencia reproducible segura
- No marques como vulnerabilidad algo que no puedas justificar

Entrega:
1. Modelo de amenazas breve
2. Hallazgos ordenados por severidad y probabilidad
3. Archivo y línea afectados
4. Impacto real
5. Pasos de reproducción seguros
6. Corrección concreta
7. Tests que eviten la regresión

Después del informe, corrige los hallazgos críticos y altos que estén dentro del alcance, ejecuta los tests y vuelve a comprobarlos. Separa claramente lo confirmado de las recomendaciones preventivas.
```

## Migra o refactoriza código sin romperlo

Para migraciones de framework, versión o arquitectura. La clave está en los tests de caracterización antes de tocar nada.

```prompt title="Prompt: migrar o refactorizar"
Migra este proyecto de [estado actual] a [objetivo].

Motivo: [por qué se hace]
Restricciones:
- Debe conservar [APIs, datos persistidos, comportamiento público]
- No debe introducir [dependencias, downtime, cambios incompatibles]
- Entorno objetivo: [versiones y plataforma]

Antes de cambiar código:
1. Inspecciona arquitectura, tests, dependencias y puntos de entrada
2. Identifica contratos públicos y datos que deban conservarse
3. Localiza riesgos de compatibilidad y zonas sin cobertura
4. Define una secuencia incremental con rollback claro

Durante la migración:
- Haz cambios pequeños y verificables
- Añade tests de caracterización antes de tocar comportamiento dudoso
- Evita duplicar lógica o mantener dos caminos sin necesidad real
- Migra datos con scripts idempotentes si corresponde
- Actualiza configuración y documentación operativa
- Ejecuta tests, lint y build en cada etapa relevante

Criterios de finalización:
- Todo el comportamiento acordado sigue funcionando
- Los datos existentes se conservan
- No quedan imports, flags ni código antiguo sin uso
- La suite y el build pasan
- Hay instrucciones claras de despliegue y rollback

Implementa la migración completa. Al terminar, resume riesgos, pruebas ejecutadas y cualquier decisión que requiera seguimiento.
```

## Ahorra crédito

- Empieza con Sonnet para aclarar una idea pequeña y usa Fable cuando el alcance ya esté definido.
- Adjunta el repositorio y el contexto desde el principio para evitar rondas inútiles.
- Escribe criterios de finalización comprobables.
- Pídele que ejecute tests y corrija fallos, no solo que proponga código.
- Divide los proyectos enormes por hitos, pero deja cada hito cerrado y verificable.
- No uses Fable para resumir, traducir o responder preguntas rápidas.

La diferencia no está en pedirle que "lo haga mejor", sino en darle una tarea que de verdad necesite planificación, ejecución larga y validación.

## Fuentes

- [Modelos Fable en tu plan (centro de ayuda de Claude)](https://support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan)
- [Promoción de créditos únicos de Fable 5](https://support.claude.com/es/articles/15862783-promocion-de-creditos-gratuitos-unicos-de-claude-fable-5)
- [Planes y precios de Claude](https://claude.com/pricing)
