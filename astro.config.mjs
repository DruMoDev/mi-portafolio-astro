// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import { rehypeGuiaPasos } from "./src/lib/guias/pasos.ts";

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
  },

  integrations: [sitemap({ filter: (page) => !page.includes("/links") })],

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
