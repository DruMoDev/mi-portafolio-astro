/// <reference types="astro/client" />

type CloudflareEnv = {
  SEND_EMAIL?: { send(message: unknown): Promise<void> };
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
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
