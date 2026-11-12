import { describe, expect, it } from "vitest";
import { llmsTxt } from "./llms";

const guia = (id: string, title: string, description: string) => ({
  id,
  data: { title, description },
});

describe("llmsTxt", () => {
  it("lista cada guía con su enlace absoluto y su descripción", () => {
    const texto = llmsTxt("https://drumorera.com", [
      guia("claude-cowork", "Claude Cowork", "Qué es y cómo usarlo."),
      guia("system-prompts", "System prompts", "Cómo escribirlos."),
    ]);
    expect(texto).toContain(
      "- [Claude Cowork](https://drumorera.com/guias/claude-cowork/): Qué es y cómo usarlo."
    );
    expect(texto).toContain(
      "- [System prompts](https://drumorera.com/guias/system-prompts/): Cómo escribirlos."
    );
  });

  it("mantiene la presentación, los servicios y el contacto", () => {
    const texto = llmsTxt("https://drumorera.com", []);
    expect(texto.startsWith("# Dru Morera (@soydruia)\n")).toBe(true);
    expect(texto).toContain("## Servicios");
    expect(texto).toContain("- [Guías](https://drumorera.com/guias/)");
    expect(texto).toContain("## Contacto");
  });
});
