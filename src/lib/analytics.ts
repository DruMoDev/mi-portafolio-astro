// Analítica: los componentes avisan con track() y Analytics.astro lo manda a PostHog.
// Va por un evento de window, no por estado del módulo: Astro puede incrustar cada script por separado.

export type TrackProps = Record<string, string | number | boolean | string[] | undefined>;

export const TRACK_EVENT = "analytics:track";

export function track(event: string, props: TrackProps = {}) {
  dispatchEvent(new CustomEvent(TRACK_EVENT, { detail: { event, props } }));
}

export type LinkKind = "whatsapp" | "email" | "phone" | "social" | "external";

const socialHosts = [
  "tiktok.com",
  "instagram.com",
  "youtube.com",
  "youtu.be",
  "facebook.com",
  "linkedin.com",
  "github.com",
];

/** Qué tipo de salida es un enlace, o null si se queda en la web. */
export function linkKind(href: string, origin: string): LinkKind | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }
  if (url.origin === origin) return null;
  const host = url.hostname.replace(/^www\./, "");
  if (host === "wa.me" || host.endsWith("whatsapp.com")) return "whatsapp";
  if (socialHosts.some((h) => host === h || host.endsWith(`.${h}`))) return "social";
  return "external";
}

/** En qué parte de la página está un elemento: cabecera, servicios, contacto… */
export function sectionOf(el: Element | null): string {
  const s = el?.closest("header, footer, section, [role=dialog]");
  if (!s) return "page";
  return (
    s.id ||
    s.getAttribute("aria-labelledby") ||
    s.classList[0] ||
    s.tagName.toLowerCase()
  ).replace(/^l-/, "");
}

/** Nombre corto de la red de un enlace social (tiktok, instagram…). */
export function networkOf(href: string): string {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return host === "youtu.be" ? "youtube" : host.split(".").slice(-2)[0];
}

/**
 * País del visitante con los nombres que usa PostHog para su GeoIP.
 * Sin cookies, PostHog quita la IP antes del GeoIP y el país llega vacío: se lo damos nosotros
 * a partir de Cloudflare (solo el país, nunca la IP). Código de 2 letras o nada.
 */
export function countryProps(code: unknown): TrackProps {
  if (typeof code !== "string" || !/^[A-Z]{2}$/.test(code) || code === "XX" || code === "T1")
    return {};
  let name: string | undefined;
  try {
    name = new Intl.DisplayNames(["en"], { type: "region" }).of(code);
  } catch {
    name = undefined;
  }
  return { $geoip_country_code: code, $geoip_country_name: name };
}
