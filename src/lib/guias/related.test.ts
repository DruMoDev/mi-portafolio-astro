import { describe, expect, it } from "vitest";
import { relatedGuides, type GuiaOrdenable } from "./related";

function guia(
  id: string,
  tema: string,
  updatedAt: string,
  orphan = false
): GuiaOrdenable & { id: string } {
  return { id, data: { tema, updatedAt: new Date(updatedAt), orphan } };
}

const actual = guia("skill", "Claude Code", "2026-11-07");
const ids = (lista: { id: string }[]) => lista.map((g) => g.id);

describe("relatedGuides", () => {
  it("excluye la actual y las huérfanas", () => {
    const todas = [
      actual,
      guia("cowork", "Claude Code", "2026-11-06", true),
      guia("web", "Webs", "2026-11-01"),
    ];
    expect(ids(relatedGuides(todas, actual))).toEqual(["web"]);
  });

  it("prioriza el mismo tema", () => {
    const todas = [
      actual,
      guia("web", "Webs", "2026-11-06"),
      guia("prompts", "Prompts", "2026-11-05"),
      guia("comandos", "Claude Code", "2026-10-01"),
      guia("instalar", "Claude Code", "2026-10-20"),
    ];
    expect(ids(relatedGuides(todas, actual, 2))).toEqual(["instalar", "comandos"]);
  });

  it("rellena con las más recientes", () => {
    const todas = [
      actual,
      guia("viejo", "IA", "2026-09-01"),
      guia("comandos", "Claude Code", "2026-10-01"),
      guia("web", "Webs", "2026-11-06"),
      guia("prompts", "Prompts", "2026-11-05"),
    ];
    expect(ids(relatedGuides(todas, actual))).toEqual(["comandos", "web", "prompts"]);
  });

  it("devuelve menos si no hay", () => {
    expect(relatedGuides([actual], actual)).toEqual([]);
    const todas = [actual, guia("web", "Webs", "2026-11-06")];
    expect(ids(relatedGuides(todas, actual))).toEqual(["web"]);
  });

  it("no cambia el orden de la lista que recibe", () => {
    const todas = [actual, guia("a", "IA", "2026-01-01"), guia("b", "IA", "2026-02-01")];
    relatedGuides(todas, actual);
    expect(ids(todas)).toEqual(["skill", "a", "b"]);
  });
});
