// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://drumorera.com",
  // Todo se prerenderiza salvo las rutas con `prerender = false` (/api/contact).
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  // No usamos sesiones: así el adaptador no exige un KV.
  session: { driver: "memory" },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap({ filter: (page) => !page.includes("/links") })],

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
