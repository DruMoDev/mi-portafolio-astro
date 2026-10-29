import { siteConfig } from "../data/site";
import { exampleConfig } from "../data/site.example";
import type { Network, PublicConfig } from "../types";

export function whatsappUrl(number: string, text: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Configuración pública. En desarrollo, lo que falta se rellena con datos de ejemplo. */
export function getPublicConfig(dev: boolean = import.meta.env.DEV): PublicConfig {
  const whatsapp = siteConfig.whatsapp || (dev ? exampleConfig.whatsapp : "");
  const networks = { ...siteConfig.networks };
  if (dev) {
    for (const key of Object.keys(networks) as Network[]) {
      networks[key] ||= exampleConfig.networks[key];
    }
  }
  return {
    ...siteConfig,
    whatsapp,
    networks,
    whatsappUrl: whatsappUrl(whatsapp, siteConfig.whatsappText),
  };
}
