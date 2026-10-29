// Convierte la analítica de tiktok-editor (GET /api/analytics de DForge) en los datos públicos
// de la web. Sin dependencias: lo usan el script `social:sync`, el endpoint /api/social y los tests.
import type { Network } from "../types";

export interface Video {
  id: string;
  /** Red a la que lleva la tarjeta: la que más visualizaciones tiene de ese vídeo. */
  network: Network;
  title: string;
  url: string;
  /** URL de la miniatura (YouTube, estable). Si no hay, la tarjeta usa un degradado. */
  thumbnail?: string;
  /** Visualizaciones sumadas de todas las redes donde está publicado. */
  views: number;
  publishedAt?: string;
}

export interface SocialData {
  updatedAt: string;
  followers: Record<Network, number>;
  /** Visualizaciones totales de todos los vídeos en todas las redes. */
  views: number;
  videos: Video[];
}

interface AnalyticsNetwork {
  url?: string | null;
  published?: string | null;
  metrics?: { views?: number | null } | null;
}

export interface AnalyticsPayload {
  updated_at?: string;
  profiles?: { network: string; stats?: { label?: string; value?: number }[] }[];
  videos?: {
    key?: string;
    title?: string | null;
    thumbnail?: string | null;
    published?: string | null;
    state?: string;
    editorial?: { kind?: string | null } | null;
    networks?: Record<string, AnalyticsNetwork>;
  }[];
}

const NETWORKS: Network[] = ["tiktok", "instagram", "youtube"];
const FOLLOWER_LABELS = /^(seguidores|suscriptores|followers|subscribers)$/i;
// Solo miniaturas de YouTube: las de TikTok e Instagram son URLs firmadas que caducan.
const STABLE_THUMB = /^https:\/\/i\.ytimg\.com\//;

const views = (n?: AnalyticsNetwork) => {
  const v = n?.metrics?.views;
  return typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : 0;
};

/** Quita hashtags y espacios sobrantes del título ("Qué plan elegir #ia #claude" → "Qué plan elegir"). */
export function cleanTitle(title: string): string {
  return title
    .replace(/(^|\s)#[\p{L}\p{N}_]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Quita los parámetros de seguimiento que añade la API de TikTok. */
export function cleanUrl(url: string): string {
  try {
    const u = new URL(url);
    for (const k of [...u.searchParams.keys()]) {
      if (k.startsWith("utm_")) u.searchParams.delete(k);
    }
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Datos públicos a partir de la analítica. `facebookFollowers` va aparte porque Facebook
 * aún no está en la analítica; se conserva el último valor puesto a mano.
 */
export function fromAnalytics(payload: AnalyticsPayload, facebookFollowers: number): SocialData {
  const followers: Record<Network, number> = {
    tiktok: 0,
    instagram: 0,
    youtube: 0,
    facebook: facebookFollowers,
  };
  for (const p of payload.profiles ?? []) {
    if (!NETWORKS.includes(p.network as Network)) continue;
    const stat = p.stats?.find((s) => FOLLOWER_LABELS.test(s.label ?? ""));
    if (typeof stat?.value === "number") followers[p.network as Network] = stat.value;
  }

  let totalViews = 0;
  const videos: Video[] = [];
  for (const v of payload.videos ?? []) {
    const nets = Object.entries(v.networks ?? {}).filter(([n]) =>
      NETWORKS.includes(n as Network)
    ) as [Network, AnalyticsNetwork][];
    const sum = nets.reduce((acc, [, n]) => acc + views(n), 0);
    totalViews += sum;

    // El anillo es de vídeos verticales publicados: fuera los largos de YouTube.
    if (v.state !== "published" || v.editorial?.kind === "long") continue;
    const title = cleanTitle(v.title ?? "");
    const best = nets
      .filter(([, n]) => typeof n.url === "string" && n.url.startsWith("https://"))
      .sort((a, b) => views(b[1]) - views(a[1]))[0];
    if (!title || !best || !v.key) continue;
    const date = (v.published ?? "").slice(0, 10);
    videos.push({
      id: v.key,
      network: best[0],
      title,
      url: cleanUrl(best[1].url!),
      ...(v.thumbnail && STABLE_THUMB.test(v.thumbnail) ? { thumbnail: v.thumbnail } : {}),
      views: sum,
      ...(/^\d{4}-\d{2}-\d{2}$/.test(date) ? { publishedAt: date } : {}),
    });
  }

  return {
    updatedAt: payload.updated_at ?? new Date().toISOString(),
    followers,
    views: totalViews,
    videos,
  };
}

/** Lee la analítica de DForge. `fetcher` permite usar un service binding desde el Worker. */
export async function fetchAnalytics(
  baseUrl: string,
  token: string,
  fetcher: typeof fetch = fetch
): Promise<AnalyticsPayload> {
  const res = await fetcher(`${baseUrl.replace(/\/+$/, "")}/api/analytics`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`DForge respondió ${res.status}`);
  const body = (await res.json()) as { data?: AnalyticsPayload } & AnalyticsPayload;
  const data = body.data ?? body;
  if (!Array.isArray(data.videos) || !Array.isArray(data.profiles)) {
    throw new Error("La analítica no trae perfiles ni vídeos");
  }
  return data;
}
