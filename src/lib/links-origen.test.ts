import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { origenLinks, scriptOrigenLinks } from "./links-origen";

describe("origenLinks", () => {
  it("reconoce la bio de TikTok", () => {
    expect(origenLinks("?from=tiktok")).toBe("tiktok");
  });

  it("no distingue mayúsculas ni espacios", () => {
    expect(origenLinks("?from=TikTok")).toBe("tiktok");
    expect(origenLinks("?from=%20TIKTOK%20")).toBe("tiktok");
  });

  it("convive con otros parámetros", () => {
    expect(origenLinks("?utm_source=x&from=tiktok&b=1")).toBe("tiktok");
  });

  it("con otro valor o sin él no hay origen", () => {
    expect(origenLinks("?from=instagram")).toBeNull();
    expect(origenLinks("?from=")).toBeNull();
    expect(origenLinks("?from=tiktokk")).toBeNull();
    expect(origenLinks("")).toBeNull();
    expect(origenLinks("?x=tiktok")).toBeNull();
  });
});

describe("scriptOrigenLinks", () => {
  // El script va inline en <head>, sin imports: tiene que funcionar suelto.
  const ejecutar = (search: string) => {
    const dataset: Record<string, string> = {};
    runInNewContext(scriptOrigenLinks(), {
      URLSearchParams,
      location: { search },
      document: { documentElement: { dataset } },
    });
    return dataset;
  };

  it("marca <html> con data-from=tiktok", () => {
    expect(ejecutar("?from=TikTok")).toEqual({ from: "tiktok" });
  });

  it("no marca nada con otro origen", () => {
    expect(ejecutar("?from=instagram")).toEqual({});
    expect(ejecutar("")).toEqual({});
  });
});
