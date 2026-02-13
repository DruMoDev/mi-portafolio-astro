import { describe, it, expect } from "vitest";
import {
  getTranslations,
  getLocalePath,
  getAlternateLocale,
  getProjectsPath,
  getLocaleFromUrl,
  getAlternatePath,
  defaultLocale,
} from "./index";

describe("getTranslations", () => {
  it("should return Spanish translations for 'es' locale", () => {
    const t = getTranslations("es");
    expect(t).toBeDefined();
    expect(t.nav.home).toBe("Inicio");
    expect(t.nav.projects).toBe("Proyectos");
  });

  it("should return English translations for 'en' locale", () => {
    const t = getTranslations("en");
    expect(t).toBeDefined();
    expect(t.nav.home).toBe("Home");
    expect(t.nav.projects).toBe("Projects");
  });

  it("should return default (Spanish) translations for unknown locale", () => {
    const t = getTranslations("fr" as any);
    expect(t.nav.home).toBe("Inicio");
  });
});

describe("getLocalePath", () => {
  it("should return root path for Spanish locale with no path", () => {
    expect(getLocalePath("es")).toBe("/");
  });

  it("should return path without prefix for Spanish locale", () => {
    expect(getLocalePath("es", "about")).toBe("/about");
  });

  it("should handle leading slash in path for Spanish locale", () => {
    expect(getLocalePath("es", "/about")).toBe("/about");
  });

  it("should return prefixed path for English locale", () => {
    expect(getLocalePath("en", "about")).toBe("/en/about");
  });

  it("should return locale-only path for English locale with no path", () => {
    expect(getLocalePath("en")).toBe("/en");
  });

  it("should handle leading slash in path for English locale", () => {
    expect(getLocalePath("en", "/about")).toBe("/en/about");
  });
});

describe("getAlternateLocale", () => {
  it("should return 'en' when given 'es'", () => {
    expect(getAlternateLocale("es")).toBe("en");
  });

  it("should return 'es' when given 'en'", () => {
    expect(getAlternateLocale("en")).toBe("es");
  });
});

describe("getProjectsPath", () => {
  it("should return 'proyectos' for Spanish locale", () => {
    expect(getProjectsPath("es")).toBe("proyectos");
  });

  it("should return 'projects' for English locale", () => {
    expect(getProjectsPath("en")).toBe("projects");
  });
});

describe("getLocaleFromUrl", () => {
  it("should detect English locale from URL with /en/ prefix", () => {
    const url = new URL("https://example.com/en/about");
    expect(getLocaleFromUrl(url)).toBe("en");
  });

  it("should return default locale for URL without locale prefix", () => {
    const url = new URL("https://example.com/about");
    expect(getLocaleFromUrl(url)).toBe("es");
  });

  it("should return default locale for root URL", () => {
    const url = new URL("https://example.com/");
    expect(getLocaleFromUrl(url)).toBe("es");
  });

  it("should return English for URL with just /en", () => {
    const url = new URL("https://example.com/en");
    expect(getLocaleFromUrl(url)).toBe("en");
  });

  it("should not match partial locale segments", () => {
    const url = new URL("https://example.com/enterprise/page");
    expect(getLocaleFromUrl(url)).toBe("es");
  });
});

describe("getAlternatePath", () => {
  it("should switch home from ES to EN", () => {
    expect(getAlternatePath("/", "es")).toBe("/en");
  });

  it("should switch home from EN to ES", () => {
    expect(getAlternatePath("/en", "en")).toBe("/");
    expect(getAlternatePath("/en/", "en")).toBe("/");
  });

  it("should map /proyectos/slug to /en/projects/slug", () => {
    expect(getAlternatePath("/proyectos/datewhen", "es")).toBe("/en/projects/datewhen");
  });

  it("should map /en/projects/slug to /proyectos/slug", () => {
    expect(getAlternatePath("/en/projects/datewhen", "en")).toBe("/proyectos/datewhen");
  });

  it("should handle paths without locale-specific segments", () => {
    expect(getAlternatePath("/about", "es")).toBe("/en/about");
    expect(getAlternatePath("/en/about", "en")).toBe("/about");
  });
});

describe("defaultLocale", () => {
  it("should be 'es'", () => {
    expect(defaultLocale).toBe("es");
  });
});
