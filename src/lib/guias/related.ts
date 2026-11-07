// "Sigue con": las guías que se proponen al final de una guía.

/** Lo mínimo de una entrada de la colección para ordenarla. */
export interface GuiaOrdenable {
  id: string;
  data: { tema: string; updatedAt: Date; orphan: boolean };
}

const masReciente = (a: GuiaOrdenable, b: GuiaOrdenable) =>
  b.data.updatedAt.getTime() - a.data.updatedAt.getTime();

/**
 * Hasta `n` guías relacionadas con `current`: nunca ella misma ni las huérfanas; primero las
 * de su mismo tema y después el resto, en ambos casos de la actualizada más tarde a la que más
 * lleva sin tocarse. Si no hay suficientes, devuelve las que haya.
 */
export function relatedGuides<T extends GuiaOrdenable>(
  all: readonly T[],
  current: GuiaOrdenable,
  n = 3
): T[] {
  const candidatas = all.filter((g) => g.id !== current.id && !g.data.orphan);
  const mismoTema = candidatas.filter((g) => g.data.tema === current.data.tema).sort(masReciente);
  const otras = candidatas.filter((g) => g.data.tema !== current.data.tema).sort(masReciente);
  return [...mismoTema, ...otras].slice(0, n);
}
