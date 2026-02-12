import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string(),

    // Date
    publishedAt: z.coerce.date(),

    // Visual
    thumbnail: z.string(),
    thumbnailAlt: z.string(),

    // Project details
    tags: z.array(z.string()),
    stack: z.array(z.string()),

    // Links
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),

    // Metadata
    featured: z.boolean().default(false),
    inProgress: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
  experience: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
    schema: z.object({
      company: z.string(),
      role: z.object({
        es: z.string(),
        en: z.string(),
      }),
      location: z.object({
        es: z.string(),
        en: z.string(),
      }),
      startDate: z.string(),
      endDate: z.string(),
      highlights: z.object({
        es: z.array(z.string()),
        en: z.array(z.string()),
      }),
      technologies: z.array(z.string()),
    }),
  }),
  skills: defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/skills" }),
    schema: z.object({
      name: z.string(),
      icon: z.string(),
      category: z.enum([
        "frontend",
        "backend",
        "database",
        "devops",
        "ai",
        "tools",
      ]),
    }),
  }),
};
