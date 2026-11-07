import { describe, expect, it } from "vitest";
import { clearLeadId, isValidEmail, LEAD_KEY, readLeadId, saveLeadId } from "./muro";

function memoria() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => {
      m.set(k, v);
    },
    removeItem: (k: string) => {
      m.delete(k);
    },
  };
}
const lanza = {
  getItem: (): string | null => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("QuotaExceededError");
  },
  removeItem: () => {
    throw new Error("SecurityError");
  },
};

describe("id del lead en el navegador", () => {
  it("guarda y lee el id", () => {
    const s = memoria();
    expect(readLeadId(s)).toBeNull();
    saveLeadId(s, "abc");
    expect(s.getItem(LEAD_KEY)).toBe("abc");
    expect(readLeadId(s)).toBe("abc");
    clearLeadId(s);
    expect(readLeadId(s)).toBeNull();
  });

  it("un id vacío cuenta como sin id", () => {
    const s = memoria();
    s.setItem(LEAD_KEY, "");
    expect(readLeadId(s)).toBeNull();
  });

  it("storage que lanza", () => {
    expect(readLeadId(lanza)).toBeNull();
    expect(() => {
      saveLeadId(lanza, "abc");
    }).not.toThrow();
    expect(() => {
      clearLeadId(lanza);
    }).not.toThrow();
  });

  it("storage null", () => {
    expect(readLeadId(null)).toBeNull();
    expect(() => {
      saveLeadId(null, "abc");
    }).not.toThrow();
    expect(() => {
      clearLeadId(null);
    }).not.toThrow();
  });
});

describe("isValidEmail", () => {
  it("acepta emails normales, también con espacios alrededor", () => {
    expect(isValidEmail("ana@gmail.com")).toBe(true);
    expect(isValidEmail(" Ana@Gmail.com ")).toBe(true);
  });

  it("rechaza lo que no es un email", () => {
    for (const v of ["", "ana@", "@gmail.com", "ana gmail.com", "ana@gmail", "a@b.co,c@d.es"]) {
      expect(isValidEmail(v)).toBe(false);
    }
  });
});
