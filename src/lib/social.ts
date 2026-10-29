import realData from "../data/social.json";
import exampleData from "../data/social.example.json";
import type { Network } from "../types";

export interface Video {
  id: string;
  network: Network;
  title: string;
  url: string;
  /** Ruta local, p. ej. "src/assets/videos/<id>.jpg". Si no hay, la tarjeta usa un degradado. */
  thumbnail?: string;
  views: number;
  publishedAt?: string;
}

export interface SocialData {
  updatedAt: string;
  followers: Record<Network, number>;
  videos: Video[];
}

export const networkNames: Record<Network, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
};

export const MIN_VIDEOS = 5;
export const MAX_VIDEOS = 8;

/** Datos reales; en desarrollo, si no hay vídeos reales, los de ejemplo. */
export function getSocial(dev: boolean = import.meta.env.DEV): SocialData {
  const real = realData as SocialData;
  if (dev && real.videos.length < MIN_VIDEOS) {
    return { ...real, videos: (exampleData as SocialData).videos };
  }
  return real;
}

const isValid = (v: Video) =>
  typeof v.title === "string" &&
  v.title.trim() !== "" &&
  typeof v.url === "string" &&
  v.url.startsWith("https://") &&
  Number.isFinite(v.views);

/** Conjuntos del anillo, o null si no hay suficientes vídeos para mostrar la sección. */
export function selectVideoSets(videos: Video[]): { top: Video[]; latest: Video[] } | null {
  const valid = videos.filter(isValid);
  if (valid.length < MIN_VIDEOS) return null;
  const top = [...valid].sort((a, b) => b.views - a.views).slice(0, MAX_VIDEOS);
  const dated = valid.filter((v) => v.publishedAt && !Number.isNaN(Date.parse(v.publishedAt)));
  const latest =
    dated.length < MIN_VIDEOS
      ? []
      : dated
          .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!))
          .slice(0, MAX_VIDEOS);
  return { top, latest };
}

export function hasVideoSection(dev: boolean = import.meta.env.DEV): boolean {
  return selectVideoSets(getSocial(dev).videos) !== null;
}

/** 5300 → "5.300" (Intl en español no agrupa los números de 4 cifras). */
export function formatCount(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatViews(n: number): string {
  const short = (value: number, unit: string) =>
    `${(Math.round(value * 10) / 10).toString().replace(".", ",")}${unit}`;
  if (n >= 1_000_000) return short(n / 1_000_000, "M");
  if (n >= 1_000) return short(n / 1_000, "K");
  return String(n);
}

export function totalFollowers(followers: Record<Network, number>): number {
  return Object.values(followers).reduce((sum, n) => sum + n, 0);
}
