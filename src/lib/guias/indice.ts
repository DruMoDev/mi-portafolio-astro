// Índice /guias: qué guía se destaca, en qué orden va el resto, los temas del filtro y sus
// datos estructurados.
import { siteConfig } from "../../data/site";

export interface GuiaIndice {
  id: string;
  data: { title: string; tema: string; publishedAt: Date; updatedAt: Date; orphan: boolean };
}

/** La publicada más tarde primero; a igual fecha, la actualizada más tarde. */
const masNueva = (a: GuiaIndice, b: GuiaIndice) =>
  b.data.publishedAt.getTime() - a.data.publishedAt.getTime() ||
  b.data.updatedAt.getTime() - a.data.updatedAt.getTime();

/**
 * La destacada es la más nueva que no es huérfana; el resto va de la más nueva a la más vieja,
 * con las huérfanas al final. La destacada no se repite en el resto.
 */
export function ordenarIndice<T extends GuiaIndice>(
  guias: readonly T[]
): { destacada: T | undefined; resto: T[] } {
  const vivas = guias.filter((g) => !g.data.orphan).sort(masNueva);
  const huerfanas = guias.filter((g) => g.data.orphan).sort(masNueva);
  const [destacada, ...otras] = vivas;
  return { destacada, resto: [...otras, ...huerfanas] };
}

/** Temas para las píldoras del filtro, sin repetir y en el orden en que aparecen. */
export function temasDe(guias: readonly GuiaIndice[]): string[] {
  return [...new Set(guias.map((g) => g.data.tema))];
}

/** CollectionPage con la lista de guías (en el orden de la página) y las migas. */
export function indexJsonLd(guias: readonly GuiaIndice[], url: string): Record<string, unknown>[] {
  const base = siteConfig.url;
  return [
    {
      "@type": "CollectionPage",
      "@id": `${url}#coleccion`,
      url,
      name: "Guías",
      inLanguage: "es",
      author: { "@id": `${base}/#person` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: guias.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}/guias/${g.id}`,
          name: g.data.title,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "Guías", item: url },
      ],
    },
  ];
}
