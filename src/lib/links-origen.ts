// De qué red llega una visita a /links (?from=tiktok en la bio de TikTok).
// Se decide en el navegador antes de pintar: /links es estática.

export type OrigenLinks = "tiktok";

/** Origen de la visita según la query string, o null si no es uno conocido. */
export function origenLinks(search: string): OrigenLinks | null {
  const from = new URLSearchParams(search).get("from")?.trim().toLowerCase();
  return from === "tiktok" ? from : null;
}

/**
 * Script para un <script is:inline> en <head>: marca <html data-from> antes de que se pinte
 * el body, así el CSS enseña u oculta lo propio de cada origen sin salto visual.
 * Lleva origenLinks serializada, sin imports, para que la lógica testeada sea la que corre.
 */
export function scriptOrigenLinks(): string {
  return `var o=(${origenLinks.toString()})(location.search);if(o)document.documentElement.dataset.from=o;`;
}
