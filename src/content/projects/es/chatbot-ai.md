---
title: "Plataforma Chatbot AI"
description: "Plataforma RAG multi-tenant completa que permite a empresas desplegar chatbots entrenados con sus propios documentos y web, con widgets personalizables."
publishedAt: 2024-10-01
thumbnail: "/images/projects/chatbot-ai.png"
thumbnailAlt: "Interfaz del Chatbot AI y Panel de Administración"
tags:
  - "ai"
  - "rag"
  - "fullstack"
  - "python"
  - "in-progress"
stack:
  - "FastAPI"
  - "React"
  - "TypeScript"
  - "Supabase"
  - "Pinecone"
  - "OpenAI"
  - "Docker"
# liveUrl: removed, the demo is this site's chatbot
featured: true
draft: false
order: 1
---

## Descripción del Proyecto

> **🚀 Pruébalo ahora:** ¡Este mismo portafolio utiliza una instancia del Chatbot AI! Puedes interactuar con él haciendo clic en la burbuja de chat en la esquina inferior derecha.

Una plataforma **RAG (Retrieval-Augmented Generation)** multi-tenant lista para producción. Permite a negocios crear chatbots inteligentes entrenados con su propia base de conocimiento (PDFs, DOCX, Webs). Cada 'tenant' tiene su propia base de datos vectorial aislada, una personalidad de IA configurable y un widget embebible.

El sistema utiliza **FastAPI** para el backend robusto y asíncrono, **React** para el panel de administración y el widget, y una arquitectura de datos moderna con **Supabase** y **Pinecone**.

## Características Principales

### Arquitectura RAG Avanzada

- **Procesamiento de Documentos**: Pipeline automatizado con LlamaParse V2 para ingesta de PDFs y DOCX.
- **Web Scraping Inteligente**: Sistema de scraping con validación SSRF y detección de cambios (hash) para mantener la base de conocimiento actualizada.
- **Búsqueda Híbrida**: Retrieval semántico con Pinecone y re-ranking inteligente basado en el tipo de consulta.

### Multi-Tenancy & Seguridad

- **Aislamiento Total**: Namespaces dedicados en Pinecone y Row-Level Security (RLS) en Supabase para cada cliente.
- **Widget Seguro**: Autenticación por API Key, limitación de dominios (CORS/Allowlist) y protección contra abusos.

### Panel de Administración

- Gestión completa de fuentes de conocimiento (subida de archivos, indexación de URLs).
- Configuración de la "Persona" del Chatbot (tono, instrucciones base).
- Analíticas de conversaciones y logs de seguridad.

### Stack Tecnológico Detallado

- **Backend**: Python 3.12+, FastAPI, LangChain.
- **Frontend**: React 19, TypeScript, TailwindCSS, Vite.
- **AI/ML**: OpenAI GPT-4o-mini, text-embedding-3-small.
- **Infraestructura**: Docker, Render.com, Cloudflare Pages.
