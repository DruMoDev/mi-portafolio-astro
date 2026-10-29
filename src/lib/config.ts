import { siteConfig } from "../data/site";
import type { PublicConfig } from "../types";

export function whatsappUrl(number: string, text: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Configuración pública: lo que está vacío en `site.ts` no se muestra. */
export function getPublicConfig(): PublicConfig {
  return {
    ...siteConfig,
    whatsappUrl: whatsappUrl(siteConfig.whatsapp, siteConfig.whatsappText),
  };
}
