// Texto en bruto de las guías (nombre del fichero → contenido), para lo que corre antes de que
// exista la colección (la configuración del sitemap) y para contrastarlo con ella en el build.
import { readdirSync, readFileSync } from "node:fs";

const DIR_GUIAS = "./src/content/guias";

export function leerGuiasEnBruto(dir = DIR_GUIAS): Record<string, string> {
  return Object.fromEntries(
    readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => [f, readFileSync(`${dir}/${f}`, "utf8")])
  );
}
