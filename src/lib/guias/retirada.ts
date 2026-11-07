// Guías retiradas: nunca se borran (los vídeos y comentarios viejos enlazan a ellas), pero
// salen del índice, de «Sigue con», del sitemap y de Google, con un aviso arriba.

export interface Retirada {
  fecha: Date;
  motivo: string;
  /** Slug de la guía que la sustituye, si la hay. */
  sustituta?: string | undefined;
}

interface ConRetirada {
  id: string;
  data: { retirada?: Retirada | undefined };
}

/** La guía sigue vigente: va al índice, a «Sigue con» y al sitemap. */
export const enUso = (g: { data: { retirada?: Retirada | undefined } }): boolean =>
  !g.data.retirada;

/** Rompe el build si alguna retirada apunta a una sustituta que no existe, a sí misma o a otra retirada. */
export function comprobarSustitutas(guias: readonly ConRetirada[]): void {
  const porId = new Map(guias.map((g) => [g.id, g]));
  for (const g of guias) {
    const sustituta = g.data.retirada?.sustituta;
    if (sustituta === undefined) continue;
    const destino = porId.get(sustituta);
    if (sustituta === g.id || !destino || !enUso(destino)) {
      throw new Error(
        `La guía "${g.id}" está retirada con sustituta "${sustituta}", que no existe, es ella misma o también está retirada.`
      );
    }
  }
}

/**
 * Rompe el build si la lista de retiradas que usa el sitemap (leída del texto de los ficheros)
 * no coincide con la de la colección: así una forma rara de escribir `retirada` no se cuela.
 */
export function comprobarSitemap(guias: readonly ConRetirada[], delTexto: readonly string[]): void {
  const deColeccion = guias
    .filter((g) => !enUso(g))
    .map((g) => g.id)
    .sort();
  const leidas = [...delTexto].sort();
  if (deColeccion.join() !== leidas.join()) {
    throw new Error(
      `Retiradas de la colección (${deColeccion.join(", ")}) y del sitemap (${leidas.join(", ")}) no coinciden: revisa cómo está escrito \`retirada\` en el frontmatter.`
    );
  }
}

/**
 * Slugs de las guías retiradas a partir del texto de sus ficheros (nombre → contenido). Lo usa
 * la configuración del sitemap, que corre antes de que exista la colección.
 */
export function slugsRetirados(ficheros: Record<string, string>): string[] {
  return Object.entries(ficheros)
    .filter(([, texto]) =>
      /^["']?retirada["']?\s*:/m.test(texto.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "")
    )
    .map(([nombre]) => nombre.replace(/\.md$/, ""));
}
