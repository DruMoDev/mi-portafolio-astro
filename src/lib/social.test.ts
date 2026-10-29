import { describe, expect, it } from "vitest";
import { formatCount, formatViews, getSocial, selectVideoSets, totalFollowers } from "./social";
import type { Video } from "./social";

const video = (i: number, extra: Partial<Video> = {}): Video => ({
  id: `v${i}`,
  network: "tiktok",
  title: `Vídeo ${i}`,
  url: `https://www.tiktok.com/@soydruia/video/${i}`,
  views: i * 1000,
  publishedAt: `2026-10-${String(i + 1).padStart(2, "0")}`,
  ...extra,
});

describe("selectVideoSets", () => {
  it("no hay sección con menos de 5 vídeos válidos", () => {
    expect(selectVideoSets([1, 2, 3, 4].map((i) => video(i)))).toBeNull();
    const withInvalid = [1, 2, 3, 4].map((i) => video(i));
    withInvalid.push(video(5, { url: "javascript:alert(1)" }), video(6, { title: " " }));
    expect(selectVideoSets(withInvalid)).toBeNull();
  });

  it("los más vistos van por vistas y como máximo 8", () => {
    const sets = selectVideoSets([1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => video(i)));
    expect(sets?.top).toHaveLength(8);
    expect(sets?.top[0].id).toBe("v9");
    expect(sets?.top.at(-1)?.id).toBe("v2");
  });

  it("los últimos van por fecha", () => {
    const list = [1, 2, 3, 4, 5].map((i) => video(i, { views: 100 - i }));
    expect(selectVideoSets(list)?.latest.map((v) => v.id)).toEqual(["v5", "v4", "v3", "v2", "v1"]);
  });

  it("sin 5 vídeos con fecha no hay «Últimos»", () => {
    const list = [1, 2, 3, 4, 5].map((i) => video(i, i > 3 ? { publishedAt: undefined } : {}));
    expect(selectVideoSets(list)?.latest).toEqual([]);
    expect(selectVideoSets(list)?.top).toHaveLength(5);
  });
});

describe("formatos", () => {
  it("formatCount agrupa con punto también los de 4 cifras", () => {
    expect(formatCount(5300)).toBe("5.300");
    expect(formatCount(300)).toBe("300");
    expect(formatCount(1234567)).toBe("1.234.567");
  });

  it("formatViews abrevia", () => {
    expect(formatViews(210000)).toBe("210K");
    expect(formatViews(1250000)).toBe("1,3M");
    expect(formatViews(1000000)).toBe("1M");
    expect(formatViews(950)).toBe("950");
    expect(formatViews(12500)).toBe("12,5K");
  });

  it("totalFollowers suma las redes", () => {
    expect(totalFollowers({ facebook: 2400, instagram: 2300, tiktok: 300, youtube: 300 })).toBe(
      5300
    );
  });
});

describe("getSocial", () => {
  it("en producción no hay vídeos de ejemplo", () => {
    const prod = getSocial(false);
    expect(prod.followers.facebook).toBe(2400);
    expect(prod.videos.every((v) => !v.id.startsWith("ejemplo"))).toBe(true);
  });

  it("en desarrollo usa los de ejemplo si no hay reales", () => {
    const dev = getSocial(true);
    expect(dev.videos.length).toBeGreaterThanOrEqual(5);
  });
});
