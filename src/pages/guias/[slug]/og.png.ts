// /guias/<slug>/og.png: imagen para compartir de cada guía, generada en el build.
// satori y resvg (binario nativo) solo corren aquí, en Node durante `astro build`;
// la ruta está prerenderizada y no entra en el Worker.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { OG_ALTO, OG_ANCHO, OG_FUENTE, ogArbol } from "../../../lib/guias/og";

export const prerender = true;

// satori no lee woff2 ni ejes variables: Geist-550-latin.ttf es la instancia estática a
// peso 550 del woff2 latino de @fontsource-variable/geist 5.3.0 (licencia OFL en OFL.txt),
// sacada con `fonttools varLib.instancer <woff2> wght=550` y guardada como TTF.
const FUENTE = resolve("src/assets/fonts/Geist-550-latin.ttf");

export const getStaticPaths = (async () => {
  const guias = await getCollection("guias");
  return guias.map((guia) => ({ params: { slug: guia.id }, props: { guia } }));
}) satisfies GetStaticPaths;

interface Props {
  guia: CollectionEntry<"guias">;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const fuente = await readFile(FUENTE);
  const svg = await satori(ogArbol(props.guia.data.title), {
    width: OG_ANCHO,
    height: OG_ALTO,
    fonts: [{ name: OG_FUENTE, data: fuente, weight: 500, style: "normal" }],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: OG_ANCHO } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
