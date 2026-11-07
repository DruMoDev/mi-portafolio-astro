import { describe, expect, it } from "vitest";
import {
  leerPasos,
  rehypeGuiaPasos,
  slugPaso,
  type GuiaFile,
  type HastElement,
  type HastNode,
  type HastRoot,
} from "./pasos";

// Árboles hast escritos a mano, con la forma que produce remark-rehype.
const text = (value: string): HastNode => ({ type: "text", value });
const el = (
  tagName: string,
  children: HastNode[] = [],
  properties: Record<string, unknown> = {}
): HastElement => ({ type: "element", tagName, properties, children });
const h2 = (t: string) => el("h2", [text(t)]);
const p = (t: string) => el("p", [text(t)]);
const fence = (lang: string | null, value: string, meta?: string): HastElement => {
  const code = el("code", [text(value)], lang ? { className: [`language-${lang}`] } : {});
  if (meta !== undefined) code.data = { meta };
  return el("pre", [code]);
};

function guia(...children: HastNode[]): HastRoot {
  return { type: "root", children };
}
const fileCon = (frontmatter: Record<string, unknown>): GuiaFile => ({
  data: { astro: { frontmatter } },
});
function run(tree: HastRoot, frontmatter: Record<string, unknown> = {}) {
  const file = fileCon(frontmatter);
  rehypeGuiaPasos()(tree, file);
  return { tree, file };
}

const isEl = (n: HastNode | undefined): n is HastElement => n?.type === "element";
function all(node: HastNode | HastRoot, pred: (e: HastElement) => boolean): HastElement[] {
  const out: HastElement[] = [];
  const kids = node.type === "root" || node.type === "element" ? node.children : [];
  for (const k of kids) {
    if (isEl(k)) {
      if (pred(k)) out.push(k);
      out.push(...all(k, pred));
    }
  }
  return out;
}
const hasClass = (e: HastElement, c: string) =>
  Array.isArray(e.properties.className) && e.properties.className.includes(c);
const pasos = (n: HastNode | HastRoot) =>
  all(n, (e) => e.tagName === "section" && hasClass(e, "paso"));

const tresPasos = () =>
  guia(
    p("Intro de la guía."),
    h2("Qué es una skill"),
    p("Uno."),
    h2("La descripción decide si se usa"),
    p("Dos."),
    h2("Que sea corta"),
    p("Tres.")
  );

describe("slugPaso", () => {
  it("minúsculas, sin acentos ni signos, espacios a guiones", () => {
    expect(slugPaso("¿Qué es una skill?")).toBe("que-es-una-skill");
    expect(slugPaso("  La descripción  decide ")).toBe("la-descripcion-decide");
  });
});

describe("rehypeGuiaPasos", () => {
  it("envuelve cada h2 en una sección con id y data-step", () => {
    const { tree } = run(tresPasos());
    const secs = pasos(tree);
    expect(secs.map((s) => s.properties.dataStep)).toEqual(["0", "1", "2"]);
    expect(secs.map((s) => s.properties.id)).toEqual([
      "que-es-una-skill",
      "la-descripcion-decide-si-se-usa",
      "que-sea-corta",
    ]);
    // El h2 va dentro de su sección, con su propio id para no duplicar el de la sección.
    const [primera] = secs;
    if (!primera) throw new Error("falta la primera sección");
    const [titulo] = all(primera, (e) => e.tagName === "h2");
    expect(titulo?.properties.id).toBe("que-es-una-skill-titulo");
    expect(primera.properties.ariaLabelledBy).toBe("que-es-una-skill-titulo");
    expect(all(primera, (e) => e.tagName === "p")).toHaveLength(1);
  });

  it("la intro queda fuera de los pasos", () => {
    const { tree } = run(tresPasos());
    const [primero] = tree.children;
    expect(isEl(primero) && primero.tagName).toBe("p");
  });

  it("gateAfter 1 deja el primer paso fuera y el resto en .guia-cerrada", () => {
    const { tree, file } = run(tresPasos(), { gateAfter: 1 });
    const cerradas = all(tree, (e) => e.tagName === "div" && hasClass(e, "guia-cerrada"));
    expect(cerradas).toHaveLength(1);
    const [cerrada] = cerradas;
    if (!cerrada) throw new Error("falta la parte cerrada");
    expect(pasos(cerrada).map((s) => s.properties.dataStep)).toEqual(["1", "2"]);
    // El primer paso es hijo directo de la raíz, fuera del muro.
    expect(tree.children.filter((n) => isEl(n) && hasClass(n, "paso"))).toHaveLength(1);
    expect(leerPasos(file.data.astro?.frontmatter)).toEqual([
      { id: "que-es-una-skill", titulo: "Qué es una skill", cerrado: false },
      {
        id: "la-descripcion-decide-si-se-usa",
        titulo: "La descripción decide si se usa",
        cerrado: true,
      },
      { id: "que-sea-corta", titulo: "Que sea corta", cerrado: true },
    ]);
  });

  it("sin gateAfter usa 1", () => {
    const { tree } = run(tresPasos());
    const [cerrada] = all(tree, (e) => hasClass(e, "guia-cerrada"));
    expect(cerrada && pasos(cerrada)).toHaveLength(2);
  });

  it("sin pasos suficientes no hay parte cerrada", () => {
    const { tree, file } = run(tresPasos(), { gateAfter: 5 });
    expect(all(tree, (e) => hasClass(e, "guia-cerrada"))).toHaveLength(0);
    expect(pasos(tree)).toHaveLength(3);
    expect(file.data.astro?.frontmatter?.cerrada).toBe(false);

    const sinPasos = guia(p("Solo texto."), el("ul", [el("li", [text("a")])]));
    const antes = structuredClone(sinPasos);
    run(sinPasos, { gateAfter: 1 });
    expect(sinPasos).toEqual(antes);
  });

  it("checklist y fuentes cierran la guía sin contar como pasos", () => {
    const tree = guia(
      h2("Uno"),
      p("a"),
      h2("Dos"),
      p("b"),
      h2("Checklist rápido"),
      el("ul"),
      h2("Fuentes"),
      el("ul")
    );
    const { file } = run(tree, { gateAfter: 1 });
    expect(pasos(tree).map((s) => s.properties.dataStep)).toEqual(["0", "1"]);
    const cierres = all(tree, (e) => e.tagName === "section" && hasClass(e, "cierre"));
    expect(cierres.map((s) => s.properties.id)).toEqual(["checklist-rapido", "fuentes"]);
    expect(cierres[0] && hasClass(cierres[0], "checklist")).toBe(true);
    expect(cierres[0]?.properties.dataStep).toBeUndefined();
    // Van dentro de la parte cerrada, detrás del último paso.
    const [cerrada] = all(tree, (e) => hasClass(e, "guia-cerrada"));
    expect(cerrada && all(cerrada, (e) => hasClass(e, "cierre"))).toHaveLength(2);
    expect(leerPasos(file.data.astro?.frontmatter)).toHaveLength(2);
  });

  it("ids repetidos se numeran", () => {
    const { tree } = run(guia(h2("Paso"), h2("Paso")), { gateAfter: 9 });
    expect(pasos(tree).map((s) => s.properties.id)).toEqual(["paso", "paso-1"]);
  });

  it("marca los bloques copiables", () => {
    const tree = guia(
      h2("Uno"),
      fence("prompt", "Conviértelo en una skill.", 'title="Prompt para copiar"'),
      fence("bash", "claude --debug")
    );
    run(tree, { gateAfter: 9 });
    const bloques = all(tree, (e) => e.tagName === "div" && hasClass(e, "code"));
    expect(bloques).toHaveLength(2);
    const [prompt, bash] = bloques;
    if (!prompt || !bash) throw new Error("faltan bloques");
    expect(hasClass(prompt, "prompt")).toBe(true);
    expect(prompt.properties.dataLabel).toBe("Prompt para copiar");
    expect(all(prompt, (e) => e.tagName === "pre")).toHaveLength(1);
    expect(all(prompt, (e) => e.tagName === "code")).toHaveLength(1);
    expect(hasClass(bash, "prompt")).toBe(false);
    expect(bash.properties.dataLabel).toBe("");
  });
});

describe("leerPasos", () => {
  it("devuelve [] con datos que no son pasos", () => {
    expect(leerPasos(undefined)).toEqual([]);
    expect(leerPasos({ pasos: "x" })).toEqual([]);
    expect(leerPasos({ pasos: [{ id: 1 }] })).toEqual([]);
  });
});
