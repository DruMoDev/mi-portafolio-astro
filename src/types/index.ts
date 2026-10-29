export type Network = "tiktok" | "instagram" | "facebook" | "youtube";

export interface SiteConfig {
  name: string;
  url: string;
  realName: string;
  handle: string;
  email: string;
  /** Número de WhatsApp con prefijo de país. Vacío = no se muestra WhatsApp. */
  whatsapp: string;
  whatsappText: string;
  /** URL de cada perfil. Vacío = esa red no se muestra. */
  networks: Record<Network, string>;
  extraLinks: { github: string; linkedin: string };
}

export interface PublicConfig extends SiteConfig {
  whatsappUrl: string | null;
}
