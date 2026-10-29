import { describe, expect, it } from "vitest";
import { matchingServices, serviceIndexFromHash, summaryText } from "./services";
import { services } from "../data/services";

const ids = (list: { id: string }[]) => list.map((s) => s.id);

describe("services data", () => {
  it("tiene los seis servicios en el orden del diseño", () => {
    expect(ids(services)).toEqual([
      "automatizaciones",
      "webs",
      "shopify",
      "consultoria",
      "mentoria",
      "colaboraciones",
    ]);
  });
});

describe("matchingServices", () => {
  it("devuelve los servicios que encajan, en el orden del escenario", () => {
    expect(ids(matchingServices(["vender"]))).toEqual(["webs", "shopify"]);
    expect(ids(matchingServices(["negocio", "aprender"]))).toEqual([
      "automatizaciones",
      "webs",
      "consultoria",
      "mentoria",
    ]);
    expect(ids(matchingServices(new Set(["marca"] as const)))).toEqual(["colaboraciones"]);
  });

  it("sin selección no encaja nada", () => {
    expect(matchingServices([])).toEqual([]);
  });
});

describe("serviceIndexFromHash", () => {
  it("encuentra el servicio del ancla", () => {
    expect(serviceIndexFromHash("#mentoria")).toBe(4);
    expect(serviceIndexFromHash("#automatizaciones")).toBe(0);
  });

  it("devuelve -1 si el ancla no es de un servicio", () => {
    expect(serviceIndexFromHash("#nada")).toBe(-1);
    expect(serviceIndexFromHash("")).toBe(-1);
    expect(serviceIndexFromHash("#servicios")).toBe(-1);
  });
});

describe("summaryText", () => {
  it("usa singular y plural", () => {
    const one = matchingServices(["marca"]);
    expect(summaryText(one)).toBe("Te encajan 1 servicio: colaboraciones.");
    expect(summaryText(matchingServices(["vender"]))).toBe(
      "Te encajan 2 servicios: webs y tiendas Shopify."
    );
  });
});

describe("summaryText con tres o más", () => {
  it("separa con comas y une el último con «y»", () => {
    expect(summaryText(matchingServices(["vender", "marca"]))).toBe(
      "Te encajan 3 servicios: webs, tiendas Shopify y colaboraciones."
    );
  });
});
