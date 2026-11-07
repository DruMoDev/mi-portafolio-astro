import type { APIRoute } from "astro";
import { handleLead } from "../../lib/leads/handler";
import { createD1LeadStore } from "../../lib/leads/d1-store";
import { createRateLimiter } from "../../lib/rate-limit";

export const prerender = false;

// 10 altas por IP cada 10 minutos (por instancia del Worker).
const limiter = createRateLimiter(10, 10 * 60_000);

export const POST: APIRoute = ({ request, locals }) => {
  const db = locals.runtime.env.LEADS;
  return handleLead(request, {
    store: db ? createD1LeadStore(db) : undefined,
    limiter,
    now: Date.now,
    dev: import.meta.env.DEV,
  });
};
