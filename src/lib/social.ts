import data from "../data/social.json";
import type { Network } from "../types";
import type { SocialData, Video } from "./social-sync";

export type { SocialData, Video };

export const networkNames: Record<Network, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
};

export const MIN_VIDEOS = 5;
export const MAX_VIDEOS = 8;

/** Último resultado guardado por `npm run social:sync`. En producción se refresca con /api/social. */
export function getSocial(): SocialData {
  return data as SocialData;
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

export function hasVideoSection(): boolean {
  return selectVideoSets(getSocial().videos) !== null;
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

/** "Instagram, TikTok, YouTube y Facebook": solo las redes con seguidores, de más a menos. */
export function followedOn(followers: Record<Network, number>): string {
  const names = (Object.keys(followers) as Network[])
    .filter((n) => followers[n] > 0)
    .sort((a, b) => followers[b] - followers[a])
    .map((n) => networkNames[n]);
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} y ${names.at(-1)}` : (names[0] ?? "");
}

export interface PublicSocial {
  updatedAt: string;
  followers: number;
  followedOn: string;
  views: number;
  top: Video[];
  latest: Video[];
}

/** Lo que necesita la página: sin la lista entera de vídeos. Null si no da para la sección. */
export function publicSocial(data: SocialData): PublicSocial | null {
  const sets = selectVideoSets(data.videos);
  if (!sets) return null;
  return {
    updatedAt: data.updatedAt,
    followers: totalFollowers(data.followers),
    followedOn: followedOn(data.followers),
    views: data.views,
    ...sets,
  };
}
