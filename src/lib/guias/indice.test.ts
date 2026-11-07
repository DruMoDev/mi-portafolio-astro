import { describe, expect, it } from "vitest";
import { indexJsonLd, ordenarIndice, temasDe } from "./indice";

function guia(id: string, tema: string, publishedAt: string, orphan = false) {
  const fecha = new Date(publishedAt);
  return { id, data: { title: id, tema, publishedAt: fecha, updatedAt: fecha, orphan } };
}

const ids = (lista: { id: string }[]) => lista.map((g) => g.id);

describe("ordenarIndice", () => {
  it("destaca la más nueva que no es huérfana y no la repite en la lista", () => {
    const { destacada, resto } = ordenarIndice([
      guia("vieja", "IA", "2026-09-01"),
      guia("huerfana", "Claude", "2026-11-07", true),
      guia("nueva", "Claude Code", "2026-11-06"),
    ]);
    expect(destacada?.id).toBe("nueva");
    expect(ids(resto)).toEqual(["vieja", "huerfana"]);
  });

  it("deja las huérfanas al final, de la más nueva a la más vieja", () => {
    const { resto } = ordenarIndice([
      guia("destacada", "IA", "2026-11-07"),
      guia("h1", "IA", "2026-11-05", true),
      guia("a", "IA", "2026-10-01"),
      guia("h2", "IA", "2026-11-06", true),
      guia("b", "IA", "2026-10-15"),
    ]);
    expect(ids(resto)).toEqual(["b", "a", "h2", "h1"]);
  });

  it("con una sola guía solo hay destacada", () => {
    const { destacada, resto } = ordenarIndice([guia("unica", "IA", "2026-11-07")]);
    expect(destacada?.id).toBe("unica");
    expect(resto).toEqual([]);
  });

  it("si todas son huérfanas no destaca ninguna", () => {
    const { destacada, resto } = ordenarIndice([
      guia("h1", "IA", "2026-11-05", true),
      guia("h2", "IA", "2026-11-06", true),
    ]);
    expect(destacada).toBeUndefined();
    expect(ids(resto)).toEqual(["h2", "h1"]);
  });

  it("sin guías no hay nada", () => {
    expect(ordenarIndice([])).toEqual({ destacada: undefined, resto: [] });
  });
});

describe("temasDe", () => {
  it("lista cada tema una vez, en el orden en que aparece", () => {
    const temas = temasDe([
      guia("a", "Claude Code", "2026-11-07"),
      guia("b", "Webs", "2026-11-06"),
      guia("c", "Claude Code", "2026-11-05"),
    ]);
    expect(temas).toEqual(["Claude Code", "Webs"]);
  });
});

describe("indexJsonLd", () => {
  it("describe la colección con sus guías en orden y las migas", () => {
    const url = "https://drumorera.com/guias";
    const nodos = indexJsonLd([guia("a", "IA", "2026-11-07"), guia("b", "IA", "2026-11-06")], url);
    const pagina = nodos.find((n) => n["@type"] === "CollectionPage");
    expect(pagina?.url).toBe(url);
    expect(pagina?.mainEntity).toEqual({
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, url: "https://drumorera.com/guias/a", name: "a" },
        { "@type": "ListItem", position: 2, url: "https://drumorera.com/guias/b", name: "b" },
      ],
    });
    const migas = nodos.find((n) => n["@type"] === "BreadcrumbList");
    expect(migas?.itemListElement).toHaveLength(2);
  });
});
