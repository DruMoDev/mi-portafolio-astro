---
title: "AI Chatbot Platform"
description: "A production-ready multi-tenant RAG platform empowering businesses to deploy custom AI chatbots trained on their own documents and websites."
publishedAt: 2024-10-01
thumbnail: "/images/projects/chatbot-ai.webp"
thumbnailAlt: "AI Chatbot Interface and Admin Dashboard"
tags:
  - "ai"
  - "rag"
  - "fullstack"
  - "python"
  - "in-progress"
stack:
  - "FastAPI"
  - "React"
  - "Supabase"
  - "Pinecone"
  - "OpenAI"
  - "Docker"
liveUrl: "https://university-chatbot-im7j.onrender.com"
featured: true
draft: false
order: 1
---

## Project Description

A production-ready, **multi-tenant RAG (Retrieval-Augmented Generation)** platform. It enables businesses to deploy intelligent chatbots trained on their proprietary knowledge base (PDFs, DOCX, Web pages). Each tenant benefits from an isolated vector database, a configurable AI persona, and a secure, embeddable widget.

The system leverages **FastAPI** for a high-performance asynchronous backend, **React** for both the admin dashboard and the chat widget, and a modern data architecture using **Supabase** and **Pinecone**.

## Key Features

### Advanced RAG Architecture

- **Document Processing**: Automated pipeline using LlamaParse V2 for high-fidelity PDF and DOCX ingestion.
- **Smart Web Scraping**: Scraping system with SSRF validation and content hashing to keep the knowledge base in sync efficiently.
- **Hybrid Search**: Semantic retrieval with Pinecone and intelligent re-ranking based on query intent.

### Multi-Tenancy & Security

- **Data Isolation**: Dedicated Pinecone namespaces and Row-Level Security (RLS) in Supabase for every tenant.
- **Secure Widget**: API Key authentication, domain allowlisting (CORS), and abuse protection.

### Admin Dashboard

- Comprehensive management of knowledge sources (file uploads, URL indexing).
- Chatbot "Persona" configuration (tone, base instructions, custom rules).
- Conversation analytics and security event logs.

### Detailed Tech Stack

- **Backend**: Python 3.12+, FastAPI, LangChain.
- **Frontend**: React 19, TypeScript, TailwindCSS, Vite.
- **AI/ML**: OpenAI GPT-4o-mini, text-embedding-3-small.
- **Infrastructure**: Docker, Render.com, Cloudflare Pages.
