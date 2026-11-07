// Datos de la cabecera de una guía: tiempo de lectura y fecha de actualización.

const POR_MINUTO = 200;

export function minutosDeLectura(texto: string): number {
  const palabras = texto.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(palabras / POR_MINUTO));
}

const FECHA = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "7 nov 2026". Las fechas del frontmatter llegan a medianoche UTC. */
export function fechaCorta(fecha: Date): string {
  return FECHA.format(fecha).replace(/\./g, "");
}
