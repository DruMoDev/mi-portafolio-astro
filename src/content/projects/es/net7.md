---
title: "Net7"
description: "SaaS de facturación y gestión fiscal para autónomos españoles. App completa + web de marketing con blog SEO. Simplifica impuestos, facturas y clientes por 7,99 €/mes."
publishedAt: 2026-02-25
thumbnail: "/images/projects/default.svg"
thumbnailAlt: "Dashboard de Net7 mostrando KPIs mensuales, facturación y simulador fiscal"
inProgress: true
tags:
  - "saas"
  - "fullstack"
  - "fintech"
  - "monorepo"
stack:
  - "Next.js"
  - "Astro"
  - "TypeScript"
  - "Supabase"
  - "Stripe"
  - "Tailwind CSS"
  - "shadcn/ui"
  - "React PDF"
  - "Resend"
  - "Vitest"
  - "Playwright"
liveUrl: "https://net7.drumorera.com/"
webUrl: "https://net7-web.drumorera.com/"
featured: true
draft: false
order: 2
---

## Descripción del Proyecto

**Net7** es una plataforma SaaS dirigida a autónomos españoles que quieren dejar de depender de una gestoría tradicional. Por **7,99 €/mes** cubre todo el ciclo fiscal y de facturación: crear y enviar facturas, registrar gastos, gestionar clientes y simular automáticamente los modelos tributarios trimestrales obligatorios (130, 303 y 349).

La competencia (Holded, Quipu, Declarando, TaxDown) resuelve bien la facturación _o_ los impuestos, pero rara vez los dos con la misma interfaz. Net7 los integra en un único flujo pensado para el autónomo individual que no tiene tiempo para aprender fiscalidad.

---

## Arquitectura: Monorepo de dos sub-proyectos

El proyecto se compone de dos aplicaciones independientes con dominios separados:

- **`net7-app`** → `app.net7.es` — La aplicación SaaS con autenticación y todas las funcionalidades
- **`net7-web`** → `net7.es` — El sitio web de marketing, landing y blog SEO

---

## net7-app — La Aplicación SaaS (Next.js)

### Funcionalidades principales

**Facturación completa**

- Creación, edición, envío y cobro de facturas con numeración automática `YYYY-NNN`
- Generación de **PDF profesional server-side** con `react-pdf` (renderizado en el servidor, sin depender del navegador)
- **Facturas rectificativas** (`R-YYYY-NNN`) con motivo, referencia a la original y cancelación total o parcial
- Soporte de IVA (21%, 10%, 4%, 0%) e IRPF (15%, 7%, 0%) configurables por perfil
- Clientes intracomunitarios UE con **reverse charge automático** (0% IVA, 0% IRPF)
- Plantillas de factura reutilizables para agilizar la creación

**Control de gastos**

- Registro de gastos con IVA soportado, categoría deducible/no deducible
- **Gastos recurrentes** con modelo template+hijo: el template actúa como gasto del mes de creación; los hijos se generan automáticamente en cada visita al dashboard
- **Cuota de autónomos (RETA)** auto-insertada mensualmente desde el perfil del usuario

**Gestión de clientes**

- Clientes nacionales (NIF) e intracomunitarios (número ROI de la UE)
- Condiciones de pago configurables por cliente con fecha de vencimiento automática
- Soft-delete para preservar el historial de facturas sin borrar datos

**Simulador fiscal trimestral**

- **Modelo 130** (IRPF): cálculo acumulado anual, 20% del beneficio neto, con deducción de pagos previos del año
- **Modelo 303** (IVA): IVA repercutido menos IVA soportado del trimestre; si es negativo, queda a compensar
- **Modelo 349** (intracomunitarias): resumen de operaciones con clientes de la UE agrupadas por VAT number
- Todos los datos se calculan automáticamente desde las facturas y gastos reales del usuario
- Guardado del modelo, marcado como "presentado" y generación de PDF del resumen fiscal

**Dashboard y métricas**

- KPIs del mes: ingresos, gastos, balance neto y estimación de impuestos a pagar
- Gráfico mensual de ingresos/gastos (recharts)
- Balance anual acumulado

**Suscripción y pagos con Stripe**

- **Plan Gratuito**: 3 clientes activos, 5 facturas/mes, sin acceso a modelos fiscales
- **Plan Pro** (7,99 €/mes o 79,99 €/año): ilimitado en todo
- Checkout de Stripe con redirect, portal de cliente para gestionar o cancelar
- Webhooks como **única fuente de verdad** del estado del plan: nunca se actualiza manualmente
- Banner de upgrade contextual cuando se alcanza el límite del plan gratuito

**Recordatorios fiscales por email**

- Opt-in en perfil con días de antelación configurables
- Emails transaccionales con Resend (plantilla en React)
- Cron job protegido por token (`/api/cron/tax-reminders/`) con tabla de deduplicación para no enviar el mismo recordatorio dos veces

---

### Decisiones de arquitectura destacables

**Server Actions exclusivos para mutaciones** — Ninguna mutación se realiza desde componentes de cliente directamente; toda escritura pasa por Server Actions de Next.js, lo que simplifica la autorización y elimina endpoints de API innecesarios.

**`React.cache()` para deduplicar la sesión** — `getAuthUser()` se llama desde múltiples Server Components en el mismo request sin duplicar queries a Supabase gracias a `cache()`.

**PDF server-side sin JSX en route handlers** — El endpoint `/api/pdf/[id]` usa `React.createElement()` + `renderToBuffer()` explícitamente porque los route handlers de Next.js no tienen compilación JSX. El componente de plantilla está separado para reutilizarlo en ambos contextos.

**Plan limits enforced en el servidor** — `checkPlanLimit()` se llama en cada Server Action antes de cualquier inserción. El cliente nunca es la única barrera de protección del límite.

**RLS a nivel de aplicación** — Todas las queries de Supabase filtran explícitamente por `user_id` del usuario autenticado. Aunque Supabase soporta RLS nativo, este enfoque hace las políticas explícitas y auditables en el código.

**Tests E2E con skip condicional** — Los tests de Playwright nunca fallan por estado vacío de datos ni por límite de plan. Usan `test.skip()` de forma inteligente para adaptarse al estado real del entorno.

---

## net7-web — El Sitio Web de Marketing (Astro)

Sitio estático de alto rendimiento construido con **Astro 5**. Su objetivo es captar tráfico SEO y convertirlo en usuarios de la app.

### Páginas

- **Landing page** con secciones de features, cómo funciona, pricing preview y CTA
- **Página de precios** con comparativa Free/Pro, toggle mensual/anual, tabla de features y FAQ
- **Blog** con 10 artículos optimizados para SEO, RSS feed y sitemap automático

### Blog SEO (10 artículos)

Los artículos atacan las búsquedas de mayor volumen del segmento, con picos trimestrales en las fechas de presentación fiscal:

- _Cómo rellenar el Modelo 130 paso a paso_
- _Cómo rellenar el Modelo 303 paso a paso_
- _Modelo 349: qué es y cuándo presentarlo_
- _Calendario fiscal autónomos 2026_
- _Gastos deducibles del autónomo_
- _Cómo hacer una factura siendo autónomo_
- _Factura rectificativa: cuándo y cómo emitirla_
- _IRPF para autónomos: guía completa_
- _El mejor software de facturación para autónomos 2026_ (comparativa directa con competidores)
- _Autónomo sin gestoría: ¿es posible?_ (artículo ancla de conversión)

Todos incluyen structured data JSON-LD (`Article`, `SoftwareApplication`), internal linking entre posts y CTAs mid-article y final hacia la app.

---

## Stack Tecnológico Detallado

**net7-app (Next.js)**

- **Framework**: Next.js 16 con App Router, Server Components y Server Actions
- **Base de datos**: Supabase (PostgreSQL + Auth + RLS)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS v4
- **Formularios**: react-hook-form + Zod v4
- **PDF**: @react-pdf/renderer (server-side)
- **Gráficos**: Recharts
- **Pagos**: Stripe (checkout, portal y webhooks)
- **Email**: Resend
- **Testing**: Vitest (unit) + Playwright (E2E)

**net7-web (Astro)**

- **Framework**: Astro 5 (SSG, cero JS por defecto)
- **Styling**: Tailwind CSS v4 + @tailwindcss/typography
- **Contenido**: Astro Content Collections (Markdown tipado)
- **SEO**: sitemap automático, RSS feed, JSON-LD estructurado
