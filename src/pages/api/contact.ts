import type { APIRoute } from "astro";
import { handleContact } from "../../lib/contact-handler";
import { createRateLimiter } from "../../lib/rate-limit";

export const prerender = false;

// 5 envíos por IP cada 10 minutos (por instancia del Worker).
const limiter = createRateLimiter(5, 10 * 60_000);

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env ?? {};
  const binding = env.SEND_EMAIL;

  const send = binding
    ? async (raw: string, from: string, to: string) => {
        const { EmailMessage } = await import("cloudflare:email");
        await binding.send(new EmailMessage(from, to, raw));
      }
    : undefined;

  return handleContact(request, {
    send,
    from: env.CONTACT_FROM,
    to: env.CONTACT_TO,
    dev: import.meta.env.DEV,
    limiter,
    now: Date.now,
  });
};
