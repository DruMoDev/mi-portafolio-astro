import type { APIRoute } from "astro";

export const prerender = false;

// PostHog (región UE) a través del propio dominio: los bloqueadores no cortan drumorera.com/relay
// y el navegador no habla con terceros.
const API_HOST = "eu.i.posthog.com";
const ASSETS_HOST = "eu-assets.i.posthog.com";

export const ALL: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/relay/, "") || "/";
  const host = path.startsWith("/static/") ? ASSETS_HOST : API_HOST;

  const headers = new Headers(request.headers);
  headers.delete("cookie");
  headers.delete("host");
  // Para que PostHog sepa el país del visitante y no el del servidor.
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) headers.set("x-forwarded-for", ip);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const res = await fetch(`https://${host}${path}${url.search}`, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: "manual",
  });
  const out = new Headers(res.headers);
  out.delete("set-cookie");
  return new Response(res.body, { status: res.status, headers: out });
};
