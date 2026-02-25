---
title: "Net7"
description: "SaaS for invoicing and tax management for Spanish freelancers. Full app + marketing website with SEO blog. Simplifies taxes, invoices and clients for €7.99/month."
publishedAt: 2026-02-25
thumbnail: "/images/projects/default.svg"
thumbnailAlt: "Net7 dashboard showing monthly KPIs, invoicing and tax simulator"
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

## Project Overview

**Net7** is a SaaS platform built for Spanish freelancers who want to stop relying on a traditional accountant. For **€7.99/month** it covers the entire tax and invoicing cycle: create and send invoices, record expenses, manage clients and automatically simulate the mandatory quarterly tax forms (130, 303 and 349).

The competition (Holded, Quipu, Declarando, TaxDown) handles invoicing _or_ taxes well, but rarely both in the same interface. Net7 integrates them in a single workflow designed for the individual freelancer who doesn't have time to learn tax law.

---

## Architecture: Two-app Monorepo

The project is made up of two independent applications with separate domains:

- **`net7-app`** → `app.net7.es` — The SaaS application with authentication and all features
- **`net7-web`** → `net7.es` — The marketing website, landing page and SEO blog

---

## net7-app — The SaaS Application (Next.js)

### Core Features

**Full Invoicing**

- Create, edit, send and collect invoices with automatic numbering `YYYY-NNN`
- **Server-side professional PDF generation** with `react-pdf` (rendered on the server, no browser dependency)
- **Credit notes** (`R-YYYY-NNN`) with reason, reference to the original invoice and full or partial cancellation
- VAT (21%, 10%, 4%, 0%) and income tax withholding (15%, 7%, 0%) configurable per profile
- EU intra-community clients with **automatic reverse charge** (0% VAT, 0% withholding)
- Reusable invoice templates to speed up creation

**Expense Tracking**

- Record expenses with supported VAT, deductible/non-deductible category
- **Recurring expenses** with a template+child model: the template acts as the expense for the creation month; children are generated automatically on each dashboard visit
- **Self-employed social security quota (RETA)** auto-inserted monthly from the user profile

**Client Management**

- National clients (NIF) and intra-community EU clients (ROI/VAT number)
- Configurable payment terms per client with automatic due date calculation
- Soft-delete to preserve invoice history without losing data

**Quarterly Tax Simulator**

- **Form 130** (Income Tax): annual cumulative calculation, 20% of net profit, deducting prior payments of the year
- **Form 303** (VAT): output VAT minus input VAT for the quarter; negative result is carried forward
- **Form 349** (Intra-community): summary of operations with EU clients grouped by VAT number
- All data calculated automatically from the user's real invoices and expenses
- Save the form, mark as "filed" and generate a PDF summary

**Dashboard & Metrics**

- Monthly KPIs: revenue, expenses, net balance and estimated tax to pay
- Monthly revenue/expense chart (recharts)
- Annual cumulative balance

**Subscription & Payments with Stripe**

- **Free Plan**: 3 active clients, 5 invoices/month, no access to tax forms
- **Pro Plan** (€7.99/month or €79.99/year): unlimited everything
- Stripe checkout with redirect, customer portal to manage or cancel
- Webhooks as the **single source of truth** for plan state: never updated manually
- Contextual upgrade banner when the free plan limit is reached

**Tax Reminder Emails**

- Opt-in in profile with configurable days in advance
- Transactional emails with Resend (React template)
- Token-protected cron job (`/api/cron/tax-reminders/`) with a deduplication table to avoid sending the same reminder twice

---

### Notable Architecture Decisions

**Server Actions exclusively for mutations** — No mutation happens directly from client components; all writes go through Next.js Server Actions, simplifying authorization and eliminating unnecessary API endpoints.

**`React.cache()` to deduplicate the session** — `getAuthUser()` is called from multiple Server Components in the same request without duplicating Supabase queries, thanks to `cache()`.

**Server-side PDF without JSX in route handlers** — The `/api/pdf/[id]` endpoint uses `React.createElement()` + `renderToBuffer()` explicitly because Next.js route handlers don't have JSX compilation. The template component is separated so it can be reused in both contexts.

**Plan limits enforced server-side** — `checkPlanLimit()` is called in every Server Action before any insert. The client is never the only barrier protecting the plan limit.

**Application-level RLS** — All Supabase queries explicitly filter by the authenticated user's `user_id`. While Supabase supports native RLS, this approach makes policies explicit and auditable in code.

**E2E tests with conditional skipping** — Playwright tests never fail due to empty data state or plan limits. They use `test.skip()` intelligently to adapt to the real environment state.

---

## net7-web — The Marketing Website (Astro)

High-performance static site built with **Astro 5**. Its goal is to capture SEO traffic and convert it into app users.

### Pages

- **Landing page** with feature sections, how it works, pricing preview and CTA
- **Pricing page** with Free/Pro comparison, monthly/annual toggle, feature table and FAQ
- **Blog** with 10 SEO-optimized articles, RSS feed and automatic sitemap

### SEO Blog (10 Articles)

The articles target the highest-volume searches in the segment, with quarterly spikes around tax filing deadlines:

- _How to fill in Form 130 step by step_
- _How to fill in Form 303 step by step_
- _Form 349: what it is and when to file it_
- _Spanish freelancer tax calendar 2026_
- _Deductible expenses for self-employed workers_
- _How to create an invoice as a freelancer_
- _Credit notes: when and how to issue them_
- _Income tax withholding for freelancers: complete guide_
- _Best invoicing software for freelancers 2026_ (direct competitor comparison)
- _Freelancer without an accountant: is it possible?_ (anchor conversion article)

All include JSON-LD structured data (`Article`, `SoftwareApplication`), internal linking between posts and mid-article and final CTAs to the app.

---

## Full Tech Stack

**net7-app (Next.js)**

- **Framework**: Next.js 16 with App Router, Server Components and Server Actions
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **UI**: shadcn/ui + Radix UI + Tailwind CSS v4
- **Forms**: react-hook-form + Zod v4
- **PDF**: @react-pdf/renderer (server-side)
- **Charts**: Recharts
- **Payments**: Stripe (checkout, portal and webhooks)
- **Email**: Resend
- **Testing**: Vitest (unit) + Playwright (E2E)

**net7-web (Astro)**

- **Framework**: Astro 5 (SSG, zero JS by default)
- **Styling**: Tailwind CSS v4 + @tailwindcss/typography
- **Content**: Astro Content Collections (typed Markdown)
- **SEO**: automatic sitemap, RSS feed, structured JSON-LD
