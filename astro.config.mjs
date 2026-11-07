// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import { readdirSync, readFileSync } from "node:fs";
import { rehypeGuiaPasos } from "./src/lib/guias/pasos.ts";
import { slugsRetirados } from "./src/lib/guias/retirada.ts";

// Las guías retiradas siguen publicadas, pero no van al sitemap.
const DIR_GUIAS = "./src/content/guias";
const retiradas = slugsRetirados(
  Object.fromEntries(
    readdirSync(DIR_GUIAS)
      .filter((f) => f.endsWith(".md"))
      .map((f) => [f, readFileSync(`${DIR_GUIAS}/${f}`, "utf8")])
  )
);

// https://astro.build/config
export default defineConfig({
  site: "https://drumorera.com",
  // Todo se prerenderiza salvo las rutas con `prerender = false` (/api/contact).
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  // No usamos sesiones: así el adaptador no exige un KV.
  session: { driver: "memory" },

  markdown: {
    // Los bloques de código de las guías se pintan con su propio CSS (sin resaltado) y el
    // plugin parte cada guía en pasos y marca la parte cerrada por el muro.
    syntaxHighlight: false,
    rehypePlugins: [rehypeGuiaPasos],
  },

  vite: {
    plugins: [tailwindcss()],
    // resvg es un binario nativo: solo lo usa /guias/<slug>/og.png (prerenderizada) en Node
    // durante el build. Externo para que Vite no intente empaquetar el .node.
    ssr: { external: ["@resvg/resvg-js"] },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/links") && !retiradas.some((slug) => page.includes(`/guias/${slug}/`)),
    }),
  ],

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
