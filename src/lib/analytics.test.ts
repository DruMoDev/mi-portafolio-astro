import { describe, expect, it } from "vitest";
import { linkKind, networkOf } from "./analytics";

const origin = "https://drumorera.com";

describe("linkKind", () => {
  it("separa WhatsApp, email y teléfono", () => {
    expect(linkKind("https://wa.me/34617587034", origin)).toBe("whatsapp");
    expect(linkKind("https://api.whatsapp.com/send?phone=34", origin)).toBe("whatsapp");
    expect(linkKind("mailto:contacto@drumorera.com", origin)).toBe("email");
    expect(linkKind("tel:+34617587034", origin)).toBe("phone");
  });

  it("reconoce las redes, también con www y subdominios", () => {
    expect(linkKind("https://www.tiktok.com/@soydruia", origin)).toBe("social");
    expect(linkKind("https://m.youtube.com/watch?v=x", origin)).toBe("social");
    expect(linkKind("https://youtu.be/x", origin)).toBe("social");
  });

  it("los enlaces de la propia web no son salidas", () => {
    expect(linkKind("/#webs", origin)).toBeNull();
    expect(linkKind("https://drumorera.com/links", origin)).toBeNull();
  });

  it("el resto es externo", () => {
    expect(linkKind("https://example.com", origin)).toBe("external");
  });
});

describe("networkOf", () => {
  it("da el nombre corto de la red", () => {
    expect(networkOf("https://www.instagram.com/soydruia")).toBe("instagram");
    expect(networkOf("https://m.youtube.com/@soydruia")).toBe("youtube");
    expect(networkOf("https://youtu.be/x")).toBe("youtube");
  });
});
