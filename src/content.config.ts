// Colección de guías: Markdown en src/content/guias/<slug>.md, construido en el build.
// Convenciones del cuerpo (pasos, cierre, bloques copiables): src/lib/guias/pasos.ts.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { services, type ServiceId } from "./data/services";

const serviceIds = services.map((s) => s.id) as [ServiceId, ...ServiceId[]];

const guias = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guias" }),
  schema: z.object({
    title: z.string(),
    /** Meta description. */
    description: z.string().max(160),
    /** Entradilla bajo el título. */
    lede: z.string(),
    /** Tema para el filtro del índice, p. ej. "Claude Code". */
    tema: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    /** Servicio del bloque final. */
    service: z.enum(serviceIds),
    videos: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    /** Palabra del CTA del vídeo (solo informativa). */
    keyword: z.string().optional(),
    /** Pasos visibles antes del muro. */
    gateAfter: z.number().int().min(0).default(1),
    /** Su vídeo se retiró: se publica pero no se destaca. */
    orphan: z.boolean().default(false),
    /** JSON-LD HowTo en vez de Article. */
    howTo: z.boolean().default(true),
  }),
});

export const collections = { guias };
