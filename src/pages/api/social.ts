import type { APIRoute } from "astro";
import { getSocial, publicSocial } from "../../lib/social";
import { fetchAnalytics, fromAnalytics } from "../../lib/social-sync";

export const prerender = false;

// La analítica de tiktok-editor se mide unas pocas veces al día: con una hora de caché sobra.
const FRESH_S = 60 * 60;
const KEY_FRESH = "https://drumorera.com/__social/fresh";
// Último resultado bueno, por si DForge no responde. Si tampoco está, lo guardado en el build.
const KEY_LAST = "https://drumorera.com/__social/last";

const json = (body: unknown, source: string) =>
  new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
      "x-social-source": source,
    },
  });

export const GET: APIRoute = async ({ locals }) => {
  const env = locals.runtime?.env ?? {};
  const cache = (globalThis as { caches?: { default?: Cache } }).caches?.default;
  const baked = getSocial();

  const hit = await cache?.match(KEY_FRESH);
  if (hit) return json(await hit.json(), "cache");

  const token = env.DFORGE_ANALYTICS_TOKEN;
  if (token && (env.DFORGE || env.DFORGE_BASE_URL)) {
    try {
      // En Cloudflare, un Worker no puede llamar a otro por su URL workers.dev: va por el binding.
      const fetcher = env.DFORGE ? env.DFORGE.fetch.bind(env.DFORGE) : fetch;
      const base = env.DFORGE ? "https://dforge" : env.DFORGE_BASE_URL!;
      const data = publicSocial(
        fromAnalytics(await fetchAnalytics(base, token, fetcher), baked.followers.facebook)
      );
      if (data) {
        const body = JSON.stringify(data);
        const store = (key: string, ttl: number) =>
          cache?.put(key, new Response(body, { headers: { "cache-control": `max-age=${ttl}` } }));
        await Promise.all([store(KEY_FRESH, FRESH_S), store(KEY_LAST, 60 * 60 * 24 * 365)]);
        return json(data, "dforge");
      }
    } catch (err) {
      console.warn("[social] DForge no respondió:", err);
    }
  }

  const last = await cache?.match(KEY_LAST);
  if (last) return json(await last.json(), "last");
  return json(publicSocial(baked), "build");
};
