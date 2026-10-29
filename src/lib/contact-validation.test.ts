import { describe, expect, it } from "vitest";
import { contactAlternatives, validateContact, validateField } from "./contact-validation";

describe("validateField", () => {
  it("explica cómo arreglar cada paso", () => {
    expect(validateField(0, "  ")).toBe("Escribe tu nombre para seguir.");
    expect(validateField(1, "ana@gmail")).toBe("Revisa el email, parece que falta algo.");
    expect(validateField(2, "")).toBe("Cuéntame en una frase qué necesitas.");
  });

  it("rechaza emails que no son una sola dirección ASCII", () => {
    expect(validateField(1, "a@b.co,otra@x.yz")).not.toBe("");
    expect(validateField(1, "a@b.c<otra@x.y>")).not.toBe("");
    expect(validateField(1, "a@b.co;c@d.ef")).not.toBe("");
    expect(validateField(1, "josé@ejemplo.es")).toBe(
      "Escribe el email sin acentos ni eñes, por favor."
    );
  });

  it("acepta valores correctos", () => {
    expect(validateField(0, "Ana")).toBe("");
    expect(validateField(1, " ana@gmail.com ")).toBe("");
    expect(validateField(2, "Quiero una web")).toBe("");
  });
});

describe("validateContact", () => {
  const ok = { name: " Ana ", email: "ana@gmail.com", message: "Hola", services: ["webs"] };

  it("recorta y devuelve los datos limpios", () => {
    const r = validateContact(ok);
    expect(r).toEqual({
      ok: true,
      data: {
        name: "Ana",
        email: "ana@gmail.com",
        message: "Hola",
        services: ["webs"],
        website: "",
      },
    });
  });

  it("filtra servicios desconocidos y acepta «otro»", () => {
    const r = validateContact({ ...ok, services: ["webs", "hack", "otro", 3] });
    expect(r.ok && r.data.services).toEqual(["webs", "otro"]);
  });

  it("rechaza tipos que no son texto y campos vacíos", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact({ ...ok, name: 42 }).ok).toBe(false);
    expect(validateContact({ ...ok, email: "no-es-email" }).ok).toBe(false);
    expect(validateContact({ ...ok, message: "   " }).ok).toBe(false);
  });

  it("rechaza textos demasiado largos", () => {
    expect(validateContact({ ...ok, name: "a".repeat(101) }).ok).toBe(false);
    expect(validateContact({ ...ok, message: "a".repeat(5001) }).ok).toBe(false);
  });
});

describe("contactAlternatives", () => {
  it("ofrece solo lo que existe", () => {
    expect(contactAlternatives({ email: "hola@drumorera.com", whatsappUrl: null })).toEqual([
      { label: "hola@drumorera.com", href: "mailto:hola@drumorera.com" },
    ]);
    expect(
      contactAlternatives({ email: "hola@drumorera.com", whatsappUrl: "https://wa.me/34" })
    ).toHaveLength(2);
  });
});
