import type { APIRoute } from "astro";
import { handleVisit } from "../../../lib/leads/handler";
import { createD1LeadStore } from "../../../lib/leads/d1-store";
import { createRateLimiter } from "../../../lib/rate-limit";

export const prerender = false;

// 120 visitas por IP cada 10 minutos (por instancia del Worker): de sobra para leer, corta un bucle.
const limiter = createRateLimiter(120, 10 * 60_000);

export const POST: APIRoute = ({ request, locals }) => {
  const db = locals.runtime.env.LEADS;
  return handleVisit(request, {
    store: db ? createD1LeadStore(db) : undefined,
    limiter,
    now: Date.now,
  });
};
