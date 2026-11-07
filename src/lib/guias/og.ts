// Imagen para compartir de cada guía (/guias/<slug>/og.png): árbol de elementos que
// satori convierte en SVG durante el build. Aquí solo la parte pura; el render está en
// src/pages/guias/[slug]/og.png.ts.

export const OG_ANCHO = 1200;
export const OG_ALTO = 630;

/** Familia con la que se registra la fuente en satori. */
export const OG_FUENTE = "Geist";

const TINTA = "#000";
const GRIS = "#6E6E73";
const ACENTO = "#2440FF";

/** Hasta cuántos caracteres cabe cada tamaño en 3 líneas como mucho. */
const ESCALA: readonly (readonly [number, number])[] = [
  [40, 84],
  [60, 74],
  [80, 64],
  [100, 56],
];
const MINIMO = 52;

/** Tamaño del título en px según su longitud: cuanto más largo, más pequeño. */
export function tamanoTitulo(titulo: string): number {
  const largo = titulo.trim().length;
  for (const [hasta, tamano] of ESCALA) {
    if (largo <= hasta) return tamano;
  }
  return MINIMO;
}

export interface OgNodo {
  type: string;
  props: {
    style: Record<string, string | number>;
    children?: string | OgNodo | OgNodo[];
  };
}

function nodo(style: OgNodo["props"]["style"], children?: OgNodo["props"]["children"]): OgNodo {
  return { type: "div", props: children === undefined ? { style } : { style, children } };
}

/** Lienzo blanco: acento mínimo arriba, título grande y pie con dominio y autor. */
export function ogArbol(titulo: string): OgNodo {
  const tamano = tamanoTitulo(titulo);
  return nodo(
    {
      width: OG_ANCHO,
      height: OG_ALTO,
      // Sin esto el padding se suma al ancho y el título se sale por la derecha.
      boxSizing: "border-box",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px 64px",
      fontFamily: OG_FUENTE,
      // La fuente registrada ya es la instancia 550 de Geist; satori solo acepta centenas.
      fontWeight: 500,
      color: TINTA,
    },
    [
      nodo({ width: 56, height: 8, borderRadius: 4, background: ACENTO }),
      nodo(
        {
          display: "flex",
          fontSize: tamano,
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
        },
        titulo.trim()
      ),
      nodo(
        {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 30,
          letterSpacing: "-0.02em",
          color: GRIS,
        },
        [
          nodo({ display: "flex" }, "drumorera.com/guias"),
          nodo({ display: "flex", color: TINTA }, "Dru Morera"),
        ]
      ),
    ]
  );
}
