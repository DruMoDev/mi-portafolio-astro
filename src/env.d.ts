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
  /** D1 propia de la web (`dru-web-leads`): leads del muro de las guías y sus visitas. */
  LEADS?: import("@cloudflare/workers-types").D1Database;
};

type Runtime = import("@astrojs/cloudflare").Runtime<CloudflareEnv>;

declare namespace App {
  interface Locals {
    runtime: Runtime["runtime"];
  }
}

declare module "cloudflare:email" {
  export class EmailMessage {
    readonly from: string;
    readonly to: string;
    constructor(from: string, to: string, raw: string);
  }
}
