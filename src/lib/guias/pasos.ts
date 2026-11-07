// Plugin rehype de las guías: parte el HTML en pasos (un `<section>` por cada `##`), envuelve
// la parte cerrada por el muro en `.guia-cerrada` y marca los bloques de código copiables.
//
// Convenciones del Markdown de una guía:
// - Cada `##` es un paso numerado, salvo los de cierre ("Checklist…" y "Fuentes"), que cierran
//   la guía sin número ni entrada en el índice.
// - Lo que va antes del primer `##` es la intro y queda siempre visible.
// - `gateAfter` (frontmatter, por defecto 1) dice cuántos pasos se ven antes del muro.
// - Los bloques de código llevan su etiqueta en la meta: ```bash title="Estructura de una skill"
//   y el lenguaje `prompt` los pinta como prompt para copiar.
//
// Tipos hast mínimos propios: así no dependemos de paquetes que solo vienen de rebote.

export interface HastText {
  type: "text";
  value: string;
}
export interface HastElement {
  type: "element";
  tagName: string;
  properties: Record<string, unknown>;
  children: HastNode[];
  data?: { meta?: string | null | undefined } | undefined;
}
export interface HastOther {
  type: "comment" | "doctype" | "raw";
  value?: string;
}
export type HastNode = HastElement | HastText | HastOther;
export interface HastRoot {
  type: "root";
  children: HastNode[];
}
export interface GuiaFile {
  data: { astro?: { frontmatter?: Record<string, unknown> } };
}

/** Un paso tal y como lo necesita el índice lateral. */
export interface PasoIndice {
  id: string;
  titulo: string;
  cerrado: boolean;
}

const CIERRE = /^(checklist|fuentes)\b/i;

/** Los `##` que cierran la guía (checklist y fuentes) no cuentan como pasos. */
export function esCierre(titulo: string): boolean {
  return CIERRE.test(titulo.trim());
}

/** Id de un paso: minúsculas, sin acentos ni signos, espacios a guiones. */
export function slugPaso(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

const isEl = (n: HastNode | undefined): n is HastElement => n?.type === "element";

function textoDe(n: HastNode): string {
  if (n.type === "text") return n.value;
  if (n.type === "element") return n.children.map(textoDe).join("");
  return "";
}

function clases(e: HastElement): string[] {
  const c = e.properties.className;
  return Array.isArray(c) ? c.filter((x): x is string => typeof x === "string") : [];
}

const el = (
  tagName: string,
  properties: Record<string, unknown>,
  children: HastNode[]
): HastElement => ({ type: "element", tagName, properties, children });

/** `pre > code` pasa a `div.code[data-label]` con su barra (etiqueta) y el `pre` dentro. */
function marcarCodigo(nodos: HastNode[]): HastNode[] {
  return nodos.map((n) => {
    if (!isEl(n)) return n;
    const [code] = n.children.filter(isEl);
    if (n.tagName === "pre" && code?.tagName === "code") {
      const meta = code.data?.meta ?? "";
      const label = /title="([^"]*)"/.exec(meta)?.[1] ?? "";
      const esPrompt = clases(code).includes("language-prompt");
      return el("div", { className: esPrompt ? ["code", "prompt"] : ["code"], dataLabel: label }, [
        el("div", { className: ["bar"] }, [el("span", {}, [{ type: "text", value: label }])]),
        n,
      ]);
    }
    n.children = marcarCodigo(n.children);
    return n;
  });
}

function gateAfterDe(fm: Record<string, unknown> | undefined): number {
  const g = fm?.gateAfter;
  return typeof g === "number" && Number.isInteger(g) && g >= 0 ? g : 1;
}

export function rehypeGuiaPasos() {
  return (tree: HastRoot, file: GuiaFile): void => {
    const fm = file.data.astro?.frontmatter;
    const gateAfter = gateAfterDe(fm);
    const hijos = marcarCodigo(tree.children);

    const indice = hijos.findIndex((n) => isEl(n) && n.tagName === "h2");
    if (indice === -1) {
      tree.children = hijos;
      if (fm) {
        fm.pasos = [];
        fm.cerrada = false;
      }
      return;
    }

    const usados = new Map<string, number>();
    const idUnico = (base: string) => {
      const n = usados.get(base) ?? 0;
      usados.set(base, n + 1);
      return n ? `${base}-${String(n)}` : base;
    };

    const intro = hijos.slice(0, indice);
    const abiertos: HastNode[] = [];
    const cerrados: HastNode[] = [];
    const pasos: PasoIndice[] = [];
    let actual: HastElement | null = null;
    let numero = 0;

    for (const n of hijos.slice(indice)) {
      if (isEl(n) && n.tagName === "h2") {
        const titulo = textoDe(n).trim();
        const id = idUnico(slugPaso(titulo) || "paso");
        n.properties.id = `${id}-titulo`;
        const cierre = esCierre(titulo);
        const cerrado = cierre ? cerrados.length > 0 : numero >= gateAfter;
        const props: Record<string, unknown> = { id, ariaLabelledBy: `${id}-titulo` };
        if (cierre) {
          props.className = /^checklist/i.test(titulo) ? ["cierre", "checklist"] : ["cierre"];
          actual = el("section", props, [n]);
        } else {
          props.className = ["paso"];
          props.dataStep = String(numero);
          const num = el("span", { className: ["paso-num"], ariaHidden: "true" }, [
            { type: "text", value: String(numero + 1) },
          ]);
          actual = el("section", props, [el("header", { className: ["paso-cab"] }, [num, n])]);
          pasos.push({ id, titulo, cerrado });
          numero++;
        }
        (cerrado ? cerrados : abiertos).push(actual);
      } else if (actual) {
        actual.children.push(n);
      }
    }

    const cerrada =
      cerrados.length > 0
        ? [
            el("div", { className: ["guia-cerrada"] }, [
              el("div", { className: ["veil"] }, cerrados),
            ]),
          ]
        : [];
    tree.children = [...intro, ...abiertos, ...cerrada];
    if (fm) {
      fm.pasos = pasos;
      fm.cerrada = cerrados.length > 0;
    }
  };
}

/** Lee los pasos que el plugin deja en el frontmatter (`remarkPluginFrontmatter`). */
export function leerPasos(fm: unknown): PasoIndice[] {
  if (!fm || typeof fm !== "object" || !("pasos" in fm) || !Array.isArray(fm.pasos)) return [];
  const lista: unknown[] = fm.pasos;
  const esPaso = (p: unknown): p is PasoIndice =>
    typeof p === "object" &&
    p !== null &&
    "id" in p &&
    typeof p.id === "string" &&
    "titulo" in p &&
    typeof p.titulo === "string" &&
    "cerrado" in p &&
    typeof p.cerrado === "boolean";
  return lista.every(esPaso) ? lista : [];
}
