import { describe, it, expect } from "vitest";
import { sortProjects } from "./project";

// Helper to create mock project entries matching CollectionEntry<"projects"> shape
function createMockProject(overrides: {
  id?: string;
  title?: string;
  featured?: boolean;
  inProgress?: boolean;
  order?: number;
  publishedAt?: Date;
  draft?: boolean;
}) {
  const defaults = {
    id: overrides.id ?? "test-project",
    title: overrides.title ?? "Test Project",
    featured: overrides.featured ?? false,
    inProgress: overrides.inProgress ?? false,
    order: overrides.order ?? 0,
    publishedAt: overrides.publishedAt ?? new Date("2024-01-01"),
    draft: overrides.draft ?? false,
  };

  return {
    id: defaults.id,
    collection: "projects" as const,
    data: {
      title: defaults.title,
      description: "A test project",
      publishedAt: defaults.publishedAt,
      thumbnail: "/images/test.png",
      thumbnailAlt: "Test",
      tags: ["test"],
      stack: ["TypeScript"],
      featured: defaults.featured,
      inProgress: defaults.inProgress,
      draft: defaults.draft,
      order: defaults.order,
    },
  } as any;
}

describe("sortProjects", () => {
  it("should place featured projects before non-featured", () => {
    const projects = [
      createMockProject({ id: "normal", featured: false, order: 1 }),
      createMockProject({ id: "featured", featured: true, order: 1 }),
    ];

    const sorted = sortProjects(projects);

    expect(sorted[0].id).toBe("featured");
    expect(sorted[1].id).toBe("normal");
  });

  it("should place in-progress projects last", () => {
    const projects = [
      createMockProject({ id: "in-progress", inProgress: true, order: 1 }),
      createMockProject({ id: "completed", inProgress: false, order: 1 }),
    ];

    const sorted = sortProjects(projects);

    expect(sorted[0].id).toBe("completed");
    expect(sorted[1].id).toBe("in-progress");
  });

  it("should sort by order field (lower order first)", () => {
    const projects = [
      createMockProject({ id: "order-3", order: 3 }),
      createMockProject({ id: "order-1", order: 1 }),
      createMockProject({ id: "order-2", order: 2 }),
    ];

    const sorted = sortProjects(projects);

    expect(sorted[0].id).toBe("order-1");
    expect(sorted[1].id).toBe("order-2");
    expect(sorted[2].id).toBe("order-3");
  });

  it("should sort by date (newest first) when order is the same", () => {
    const projects = [
      createMockProject({
        id: "older",
        order: 1,
        publishedAt: new Date("2023-01-01"),
      }),
      createMockProject({
        id: "newer",
        order: 1,
        publishedAt: new Date("2024-06-15"),
      }),
    ];

    const sorted = sortProjects(projects);

    expect(sorted[0].id).toBe("newer");
    expect(sorted[1].id).toBe("older");
  });

  it("should prioritize featured over order", () => {
    const projects = [
      createMockProject({ id: "low-order", featured: false, order: 1 }),
      createMockProject({ id: "featured-high-order", featured: true, order: 99 }),
    ];

    const sorted = sortProjects(projects);

    expect(sorted[0].id).toBe("featured-high-order");
    expect(sorted[1].id).toBe("low-order");
  });

  it("should prioritize in-progress sorting over order", () => {
    const projects = [
      createMockProject({ id: "in-progress-low", inProgress: true, order: 1 }),
      createMockProject({ id: "completed-high", inProgress: false, order: 99 }),
    ];

    const sorted = sortProjects(projects);

    expect(sorted[0].id).toBe("completed-high");
    expect(sorted[1].id).toBe("in-progress-low");
  });

  it("should handle complex sorting with featured, in-progress, and order", () => {
    const projects = [
      createMockProject({ id: "normal-2", order: 2 }),
      createMockProject({ id: "in-progress", inProgress: true, order: 1 }),
      createMockProject({ id: "featured", featured: true, order: 3 }),
      createMockProject({ id: "normal-1", order: 1 }),
    ];

    const sorted = sortProjects(projects);

    // Featured first, then normal by order, then in-progress last
    expect(sorted[0].id).toBe("featured");
    expect(sorted[1].id).toBe("normal-1");
    expect(sorted[2].id).toBe("normal-2");
    expect(sorted[3].id).toBe("in-progress");
  });

  it("should return empty array when given empty array", () => {
    const sorted = sortProjects([]);
    expect(sorted).toEqual([]);
  });
});
