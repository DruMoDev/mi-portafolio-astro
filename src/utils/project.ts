import type { CollectionEntry } from "astro:content";

export function sortProjects(projects: CollectionEntry<"projects">[]) {
  return projects.sort((a, b) => {
    // 1. Featured first
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;

    // 2. In Progress last
    if (a.data.inProgress && !b.data.inProgress) return 1;
    if (!a.data.inProgress && b.data.inProgress) return -1;

    // 3. By Order (lower order first)
    if (a.data.order !== b.data.order) {
      return a.data.order - b.data.order;
    }

    // 4. By Date (newest first)
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });
}
