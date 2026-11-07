import { describe, expect, it } from "vitest";
import { comprobarSustitutas, enUso, slugsRetirados } from "./retirada";

const g = (id: string, retirada?: { fecha: Date; motivo: string; sustituta?: string }) => ({
  id,
  data: { retirada },
});
const r = (sustituta?: string) => ({
  fecha: new Date("2026-11-08"),
  motivo: "caducó",
  ...(sustituta ? { sustituta } : {}),
});

describe("enUso", () => {
  it("una guía sin retirada está en uso; una retirada, no", () => {
    expect(enUso(g("a"))).toBe(true);
    expect(enUso(g("a", r()))).toBe(false);
  });
});

describe("comprobarSustitutas", () => {
  it("acepta una sustituta que existe y está en uso", () => {
    expect(() => {
      comprobarSustitutas([g("vieja", r("nueva")), g("nueva")]);
    }).not.toThrow();
  });

  it("falla si la sustituta no existe", () => {
    expect(() => {
      comprobarSustitutas([g("vieja", r("no-existe"))]);
    }).toThrow(/vieja.*no-existe/);
  });

  it("falla si se apunta a sí misma", () => {
    expect(() => {
      comprobarSustitutas([g("vieja", r("vieja"))]);
    }).toThrow(/vieja/);
  });

  it("falla si la sustituta también está retirada", () => {
    expect(() => {
      comprobarSustitutas([g("a", r("b")), g("b", r())]);
    }).toThrow(/b/);
  });
});

describe("slugsRetirados", () => {
  it("saca los slugs con `retirada:` en el frontmatter, no en el cuerpo", () => {
    const ficheros = {
      "a.md": "---\ntitle: A\nretirada:\n  fecha: 2026-11-08\n  motivo: x\n---\ncuerpo",
      "b.md": "---\ntitle: B\n---\nretirada: esto es cuerpo",
    };
    expect(slugsRetirados(ficheros)).toEqual(["a"]);
  });
});
