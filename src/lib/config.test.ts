import { describe, expect, it } from "vitest";
import { getPublicConfig, whatsappUrl } from "./config";
import { siteConfig } from "../data/site";
import { exampleConfig } from "../data/site.example";

describe("whatsappUrl", () => {
  it("deja solo los dígitos y codifica el texto", () => {
    expect(whatsappUrl("+34 600 11 22 33", "Hola")).toBe("https://wa.me/34600112233?text=Hola");
    expect(whatsappUrl("34600112233", "Hola Dru, vengo de tu web…")).toBe(
      "https://wa.me/34600112233?text=Hola%20Dru%2C%20vengo%20de%20tu%20web%E2%80%A6"
    );
  });

  it("devuelve null si no hay número", () => {
    expect(whatsappUrl("", "x")).toBeNull();
    expect(whatsappUrl("  +  ", "x")).toBeNull();
  });
});

describe("getPublicConfig", () => {
  it("en producción usa solo los datos reales", () => {
    const cfg = getPublicConfig(false);
    expect(cfg.whatsapp).toBe(siteConfig.whatsapp);
    expect(cfg.networks).toEqual(siteConfig.networks);
  });

  it("en desarrollo completa lo que falta con los datos de ejemplo", () => {
    const cfg = getPublicConfig(true);
    expect(cfg.whatsapp).toBe(siteConfig.whatsapp || exampleConfig.whatsapp);
    expect(cfg.networks.tiktok).toBe(siteConfig.networks.tiktok || exampleConfig.networks.tiktok);
  });

  it("da la URL de WhatsApp solo si hay número", () => {
    const cfg = getPublicConfig(false);
    expect(cfg.whatsappUrl).toBe(whatsappUrl(cfg.whatsapp, siteConfig.whatsappText));
  });
});
