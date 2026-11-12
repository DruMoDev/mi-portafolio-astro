// /llms.txt: generado en el build a partir de src/lib/llms.ts y de las guías vigentes.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../data/site";
import { ordenarIndice } from "../lib/guias/indice";
import { enUso } from "../lib/guias/retirada";
import { llmsTxt } from "../lib/llms";

export const prerender = true;

export const GET: APIRoute = async () => {
  const { destacada, resto } = ordenarIndice((await getCollection("guias")).filter(enUso));
  const guias = destacada ? [destacada, ...resto] : resto;
  return new Response(llmsTxt(siteConfig.url.replace(/\/$/, ""), guias), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
