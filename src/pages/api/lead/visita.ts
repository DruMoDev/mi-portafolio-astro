import type { APIRoute } from "astro";
import { handleVisit } from "../../../lib/leads/handler";
import { createD1LeadStore } from "../../../lib/leads/d1-store";

export const prerender = false;

export const POST: APIRoute = ({ request, locals }) => {
  const db = locals.runtime.env.LEADS;
  return handleVisit(request, { store: db ? createD1LeadStore(db) : undefined, now: Date.now });
};
