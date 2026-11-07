import type { APIRoute } from "astro";

export const prerender = false;

// País del visitante según Cloudflare, para la analítica (ver countryProps en lib/analytics).
// Solo el código de país: la IP no sale de aquí.
export const GET: APIRoute = ({ locals, request }) => {
  const cf = (locals.runtime as { cf?: { country?: string } } | undefined)?.cf;
  const country = cf?.country ?? request.headers.get("cf-ipcountry") ?? null;
  return new Response(JSON.stringify({ country }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store",
    },
  });
};
