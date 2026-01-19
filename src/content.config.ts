import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    // Required fields
    title: z.object({
      es: z.string(),
      en: z.string(),
    }),
    description: z.object({
      es: z.string(),
      en: z.string(),
    }),

    // Date
    publishedAt: z.coerce.date(),

    // Visual
    thumbnail: z.string(),
    thumbnailAlt: z.object({
      es: z.string(),
      en: z.string(),
    }),

    // Project details
    tags: z.array(z.string()),
    stack: z.array(z.string()),

    // Links
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),

    // Metadata
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
};
