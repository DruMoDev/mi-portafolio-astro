/// <reference types="astro/client" />

type CloudflareEnv = {
  SEND_EMAIL?: { send(message: unknown): Promise<void> };
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
  /** Service binding al Worker `dforge-api` de tiktok-editor (analítica de redes). */
  DFORGE?: { fetch: typeof fetch };
  /** Solo fuera de Cloudflare (desarrollo): URL de DForge a la que llamar sin binding. */
  DFORGE_BASE_URL?: string;
  DFORGE_ANALYTICS_TOKEN?: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<CloudflareEnv>;

declare namespace App {
  interface Locals extends Runtime {}
}

declare module "cloudflare:email" {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
  }
}
