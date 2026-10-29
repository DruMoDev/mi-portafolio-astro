import { describe, expect, it } from "vitest";
import { cleanTitle, cleanUrl, fetchAnalytics, fromAnalytics } from "./social-sync";
import type { AnalyticsPayload } from "./social-sync";

const payload: AnalyticsPayload = {
  updated_at: "2026-10-29T12:00:23.135Z",
  profiles: [
    { network: "instagram", stats: [{ label: "Seguidores", value: 2514 }] },
    {
      network: "tiktok",
      stats: [
        { label: "seguidores", value: 249 },
        { label: "views", value: 9 },
      ],
    },
    { network: "youtube", stats: [{ label: "Suscriptores", value: 295 }] },
  ],
  videos: [
    {
      key: "project:duo",
      title: "Dos IAs se revisan #ia #claude",
      thumbnail: "https://i.ytimg.com/vi/abc/maxresdefault.jpg",
      published: "2026-10-19T09:00:00Z",
      state: "published",
      editorial: { kind: "short" },
      networks: {
        instagram: { url: "https://www.instagram.com/reel/X/", metrics: { views: 180000 } },
        tiktok: {
          url: "https://www.tiktok.com/@soydruia/video/1?utm_campaign=tt4d&utm_source=x",
          metrics: { views: 2000 },
        },
        youtube: { url: "https://www.youtube.com/watch?v=abc", metrics: { views: 991 } },
      },
    },
    {
      key: "project:largo",
      title: "Un vídeo largo",
      thumbnail: "https://i.ytimg.com/vi/l/maxresdefault.jpg",
      published: "2026-10-01",
      state: "published",
      editorial: { kind: "long" },
      networks: { youtube: { url: "https://www.youtube.com/watch?v=l", metrics: { views: 500 } } },
    },
    {
      key: "project:tiktok",
      title: "Solo en TikTok",
      thumbnail: "https://p16-common-sign.tiktokcdn-eu.com/firmada.jpg",
      published: "2026-10-02",
      state: "published",
      editorial: { kind: "clip" },
      networks: {
        tiktok: { url: "https://www.tiktok.com/@soydruia/video/2", metrics: { views: null } },
      },
    },
  ],
};

describe("fromAnalytics", () => {
  const data = fromAnalytics(payload, 2400);

  it("suma los seguidores por red y conserva Facebook a mano", () => {
    expect(data.followers).toEqual({ instagram: 2514, tiktok: 249, youtube: 295, facebook: 2400 });
  });

  it("las visualizaciones totales incluyen todas las redes y los vídeos largos", () => {
    expect(data.views).toBe(180000 + 2000 + 991 + 500);
  });

  it("deja fuera los vídeos largos", () => {
    expect(data.videos.map((v) => v.id)).toEqual(["project:duo", "project:tiktok"]);
  });

  it("cada vídeo lleva a su red con más vistas y suma las de todas", () => {
    const [duo] = data.videos;
    expect(duo).toMatchObject({
      network: "instagram",
      url: "https://www.instagram.com/reel/X/",
      title: "Dos IAs se revisan",
      views: 182991,
      publishedAt: "2026-10-19",
      thumbnail: "https://i.ytimg.com/vi/abc/maxresdefault.jpg",
    });
  });

  it("no usa miniaturas firmadas que caducan", () => {
    expect(data.videos[1].thumbnail).toBeUndefined();
    expect(data.videos[1].views).toBe(0);
  });
});

describe("limpieza", () => {
  it("quita los hashtags del título", () => {
    expect(cleanTitle("Qué plan de Claude elegir: Free, Pro o Max #ia  #claude")).toBe(
      "Qué plan de Claude elegir: Free, Pro o Max"
    );
    expect(cleanTitle("Aprende C# fácil #ia")).toBe("Aprende C# fácil");
  });

  it("quita los utm de la URL", () => {
    expect(cleanUrl("https://www.tiktok.com/@soydruia/video/1?utm_campaign=a&utm_source=b")).toBe(
      "https://www.tiktok.com/@soydruia/video/1"
    );
  });
});

describe("fetchAnalytics", () => {
  it("manda el token y desenvuelve `data`", async () => {
    let auth = "";
    const fake = (async (_url: string, init?: RequestInit) => {
      auth = new Headers(init?.headers).get("authorization") ?? "";
      return new Response(JSON.stringify({ data: { profiles: [], videos: [] } }));
    }) as typeof fetch;
    await expect(fetchAnalytics("https://x.dev/", "tok", fake)).resolves.toEqual({
      profiles: [],
      videos: [],
    });
    expect(auth).toBe("Bearer tok");
  });

  it("falla si DForge no responde 200 o el cuerpo no es analítica", async () => {
    const status = (async () => new Response("no", { status: 403 })) as typeof fetch;
    await expect(fetchAnalytics("https://x.dev", "t", status)).rejects.toThrow("403");
    const empty = (async () => new Response("{}")) as typeof fetch;
    await expect(fetchAnalytics("https://x.dev", "t", empty)).rejects.toThrow();
  });
});
