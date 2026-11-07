// Datos estructurados de una guía: HowTo (o Article) con la marca de contenido con muro que
// documenta Google (isAccessibleForFree + hasPart con el selector de la parte cerrada), más las
// migas. Sin esa marca, enseñar a Google lo que el lector ve difuminado sería cloaking.
import { siteConfig } from "../../data/site";

export interface GuiaSchema {
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt: Date;
  howTo: boolean;
  /** Si la guía tiene parte cerrada por el muro. */
  cerrada: boolean;
  pasos: { id: string; titulo: string }[];
}

export function guideJsonLd(guia: GuiaSchema, url: string): Record<string, unknown>[] {
  const base = siteConfig.url;
  const principal: Record<string, unknown> = {
    "@type": guia.howTo ? "HowTo" : "Article",
    "@id": `${url}#guia`,
    url,
    mainEntityOfPage: url,
    name: guia.title,
    headline: guia.title,
    description: guia.description,
    datePublished: guia.publishedAt.toISOString(),
    dateModified: guia.updatedAt.toISOString(),
    author: { "@id": `${base}/#person` },
    publisher: { "@id": `${base}/#person` },
    inLanguage: "es",
    isAccessibleForFree: !guia.cerrada,
  };
  if (guia.cerrada) {
    principal.hasPart = {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".guia-cerrada",
    };
  }
  if (guia.howTo) {
    principal.step = guia.pasos.map((p, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: p.titulo,
      url: `${url}#${p.id}`,
    }));
  }

  const migas = [
    { name: "Inicio", item: `${base}/` },
    { name: "Guías", item: `${base}/guias` },
    { name: guia.title, item: url },
  ];
  return [
    principal,
    {
      "@type": "BreadcrumbList",
      itemListElement: migas.map((m, i) => ({ "@type": "ListItem", position: i + 1, ...m })),
    },
  ];
}
