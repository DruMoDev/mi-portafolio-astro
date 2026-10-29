import type { Network } from "../types";

// Datos de ejemplo SOLO para desarrollo (`astro dev`). Nunca llegan a producción.
export const exampleConfig: { whatsapp: string; networks: Record<Network, string> } = {
  whatsapp: "34600000000",
  networks: {
    tiktok: "https://www.tiktok.com/@soydruia",
    instagram: "https://www.instagram.com/soydruia",
    facebook: "https://www.facebook.com/soydruia",
    youtube: "https://www.youtube.com/@soydruia",
  },
};
