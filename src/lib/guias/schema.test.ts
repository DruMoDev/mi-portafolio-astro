import { describe, expect, it } from "vitest";
import { guideJsonLd, type GuiaSchema } from "./schema";

const URL_GUIA = "https://drumorera.com/guias/como-crear-una-skill-que-funcione";
const base: GuiaSchema = {
  title: "Cómo crear una skill que funcione",
  description: "Qué es una skill y cómo comprobar que funciona.",
  publishedAt: new Date("2026-11-06T00:00:00Z"),
  updatedAt: new Date("2026-11-07T00:00:00Z"),
  howTo: true,
  cerrada: true,
  pasos: [
    { id: "que-es-una-skill", titulo: "Qué es una skill" },
    { id: "que-sea-corta", titulo: "Que sea corta" },
  ],
};

const tipo = (nodos: Record<string, unknown>[], t: string) => nodos.find((n) => n["@type"] === t);

describe("guideJsonLd", () => {
  it("con parte cerrada la marca como contenido con muro", () => {
    const nodos = guideJsonLd(base, URL_GUIA);
    const guia = tipo(nodos, "HowTo");
    expect(guia).toBeDefined();
    expect(guia?.isAccessibleForFree).toBe(false);
    expect(guia?.hasPart).toEqual({
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".guia-cerrada",
    });
    expect(guia).toMatchObject({
      name: base.title,
      description: base.description,
      datePublished: "2026-11-06T00:00:00.000Z",
      dateModified: "2026-11-07T00:00:00.000Z",
      author: { "@id": "https://drumorera.com/#person" },
      inLanguage: "es",
      url: URL_GUIA,
    });
    expect(guia?.step).toEqual([
      {
        "@type": "HowToStep",
        position: 1,
        name: "Qué es una skill",
        url: `${URL_GUIA}#que-es-una-skill`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Que sea corta",
        url: `${URL_GUIA}#que-sea-corta`,
      },
    ]);
  });

  it("sin parte cerrada es gratis y sin hasPart", () => {
    const guia = tipo(guideJsonLd({ ...base, cerrada: false }, URL_GUIA), "HowTo");
    expect(guia?.isAccessibleForFree).toBe(true);
    expect(guia).not.toHaveProperty("hasPart");
  });

  it("howTo false da un Article sin pasos", () => {
    const nodos = guideJsonLd({ ...base, howTo: false }, URL_GUIA);
    expect(tipo(nodos, "HowTo")).toBeUndefined();
    const art = tipo(nodos, "Article");
    expect(art?.headline).toBe(base.title);
    expect(art).not.toHaveProperty("step");
  });

  it("breadcrumb con 3 elementos y la URL final de la guía", () => {
    const bc = tipo(guideJsonLd(base, URL_GUIA), "BreadcrumbList");
    const items = bc?.itemListElement as { position: number; name: string; item: string }[];
    expect(items).toHaveLength(3);
    expect(items.map((i) => i.name)).toEqual(["Inicio", "Guías", base.title]);
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(items[2]?.item).toBe(URL_GUIA);
    expect(items[0]?.item).toBe("https://drumorera.com/");
  });
});
