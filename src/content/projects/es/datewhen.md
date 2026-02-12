---
title: "DateWhen"
description: "App de Shopify para selección de fechas de entrega con validación inteligente, franjas horarias y gestión de fechas bloqueadas."
publishedAt: 2026-02-12
thumbnail: "/images/projects/default.svg"
thumbnailAlt: "Panel de configuración de DateWhen mostrando el calendario de fechas de entrega"
tags:
  - "shopify-app"
  - "fullstack"
  - "saas"
stack:
  - "Node.js"
  - "React"
  - "TypeScript"
  - "MongoDB"
  - "Shopify Polaris"
  - "GraphQL"
liveUrl: "https://delivery-date-picker-app.onrender.com"
repoUrl: "https://github.com/DruMoDev/date-picker-shopify"
featured: true
draft: false
order: 3
---

## Descripción del Proyecto

**DateWhen** (anteriormente Delivery Date Picker) es una aplicación completa para Shopify diseñada para resolver un problema crítico en el comercio electrónico: permitir que los clientes elijan cuándo recibir sus pedidos. Desarrollada con una arquitectura limpia (DDD + Hexagonal) y tecnología moderna, esta app ofrece una experiencia de usuario fluida tanto para compradores como para comerciantes.

La aplicación se integra profundamente en el ecosistema de Shopify utilizando Metafields para almacenar configuraciones, evitando bases de datos externas innecesarias para la configuración de la tienda, lo que garantiza velocidad y fiabilidad.

## Características principales

- **Widget de Calendario**: selector de fecha intuitivo en el carrito y páginas de producto.
- **Validación Inteligente**: impide el checkout si no se selecciona una fecha válida cuando es requerido.
- **Configuración Flexible**: permite definir días de preparación (lead time), días bloqueados (festivos) y hora de corte (cutoff time).
- **Franjas Horarias**: soporte para entregas por la mañana, tarde o intervalos personalizados.
- **Reglas por Producto**: configuración avanzada para productos que requieren tiempos de preparación diferentes.
- **Arquitectura Robusta**: Backend en Node.js con TypeScript y Frontend en React con Shopify Polaris.
