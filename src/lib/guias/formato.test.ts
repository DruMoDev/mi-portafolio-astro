import { describe, expect, it } from "vitest";
import { fechaCorta, minutosDeLectura } from "./formato";

describe("minutosDeLectura", () => {
  it("cuenta a 200 palabras por minuto, redondeando hacia arriba", () => {
    expect(minutosDeLectura("una dos tres")).toBe(1);
    expect(minutosDeLectura(Array(401).fill("x").join(" "))).toBe(3);
  });
  it("nunca baja de 1", () => {
    expect(minutosDeLectura("")).toBe(1);
  });
});

describe("fechaCorta", () => {
  it("formatea como 7 nov 2026, sin depender de la zona horaria", () => {
    expect(fechaCorta(new Date("2026-11-07T00:00:00Z"))).toBe("7 nov 2026");
  });
});
