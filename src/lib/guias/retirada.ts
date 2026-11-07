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
 * Slugs de las guías retiradas a partir del texto de sus ficheros (nombre → contenido). Lo usa
 * la configuración del sitemap, que corre antes de que exista la colección.
 */
export function slugsRetirados(ficheros: Record<string, string>): string[] {
  return Object.entries(ficheros)
    .filter(([, texto]) => /^retirada:/m.test(texto.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ""))
    .map(([nombre]) => nombre.replace(/\.md$/, ""));
}
