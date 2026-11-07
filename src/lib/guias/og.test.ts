import { describe, expect, it } from "vitest";
import { OG_ALTO, OG_ANCHO, ogArbol, tamanoTitulo } from "./og";

describe("tamanoTitulo", () => {
  it("un título corto va a tamaño máximo", () => {
    expect(tamanoTitulo("Skills en Claude Code")).toBe(84);
  });
  it("baja a medida que el título crece, sin subir nunca", () => {
    const tamanos = [20, 45, 65, 85, 120].map((n) => tamanoTitulo("x".repeat(n)));
    expect(tamanos).toEqual([...tamanos].sort((a, b) => b - a));
    expect(tamanos[0]).toBeGreaterThan(tamanos[4] ?? 0);
  });
  it("cuenta caracteres sin los espacios de los extremos", () => {
    expect(tamanoTitulo(`  ${"x".repeat(40)}  `)).toBe(tamanoTitulo("x".repeat(40)));
  });
  it("un título de 90 caracteres no baja de 52", () => {
    expect(tamanoTitulo("x".repeat(90))).toBeGreaterThanOrEqual(52);
  });
});

describe("ogArbol", () => {
  const arbol = ogArbol("Cómo crear una skill");
  const texto = JSON.stringify(arbol);

  it("ocupa el lienzo de 1200×630 en blanco", () => {
    expect(OG_ANCHO).toBe(1200);
    expect(OG_ALTO).toBe(630);
    expect(arbol.props.style).toMatchObject({ width: 1200, height: 630, background: "#fff" });
  });
  it("lleva el título con su tamaño y el pie con dominio y autor", () => {
    expect(texto).toContain("Cómo crear una skill");
    expect(texto).toContain(`"fontSize":${String(tamanoTitulo("Cómo crear una skill"))}`);
    expect(texto).toContain("drumorera.com/guias");
    expect(texto).toContain("Dru Morera");
  });
});
