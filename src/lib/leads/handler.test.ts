import { describe, expect, it, vi } from "vitest";
import { createRateLimiter } from "../rate-limit";
import { CONSENT_TEXT, CONSENT_VERSION } from "./consent";
import { handleLead, handleVisit, type LeadStore } from "./handler";

interface Visita {
  first: number;
  last: number;
  count: number;
}

/** Almacén en memoria con las mismas reglas que la D1: email único y visitas por (lead, guía). */
function almacenFalso() {
  const leads = new Map<string, Parameters<LeadStore["upsertLead"]>[0] & { id: string }>();
  const visitas = new Map<string, Visita>();
  let siguiente = 0;
  const store: LeadStore = {
    recordVisit(id, guide, now) {
      if (![...leads.values()].some((l) => l.id === id)) return Promise.resolve(false);
      const clave = `${id}|${guide}`;
      const v = visitas.get(clave);
      if (v) {
        v.last = now;
        v.count++;
      } else visitas.set(clave, { first: now, last: now, count: 1 });
      return Promise.resolve(true);
    },
    async upsertLead(l) {
      let lead = leads.get(l.email);
      if (!lead) {
        lead = { ...l, id: `lead-${String(++siguiente)}` };
        leads.set(l.email, lead);
      }
      await store.recordVisit(lead.id, l.guide, l.now);
      return lead.id;
    },
  };
  return { store, leads, visitas };
}

const body = { email: "ana@gmail.com", guide: "como-crear-una-skill-que-funcione", consent: true };

const request = (data: unknown, ip = "1.1.1.1", path = "/api/lead") =>
  new Request(`https://drumorera.com${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ip },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });

const deps = (over: Partial<Parameters<typeof handleLead>[1]> = {}) => ({
  store: almacenFalso().store,
  limiter: createRateLimiter(10, 10 * 60_000),
  now: () => 1_000_000,
  dev: false,
  ...over,
});

async function idDe(res: Response): Promise<string> {
  const data = (await res.json()) as { ok: boolean; id: string };
  expect(data.ok).toBe(true);
  return data.id;
}

describe("handleLead", () => {
  it("guarda el lead con el consentimiento y la utm, y devuelve su id", async () => {
    const f = almacenFalso();
    const utm = { source: "tiktok", medium: "video", campaign: "skill-que-funciona" };
    const res = await handleLead(request({ ...body, utm }), deps({ store: f.store }));
    expect(res.status).toBe(200);
    const id = await idDe(res);
    expect(f.leads.get("ana@gmail.com")).toEqual({
      id,
      email: "ana@gmail.com",
      guide: body.guide,
      consentVersion: CONSENT_VERSION,
      consentText: CONSENT_TEXT,
      utmSource: "tiktok",
      utmMedium: "video",
      utmCampaign: "skill-que-funciona",
      now: 1_000_000,
    });
    expect(f.visitas.get(`${id}|${body.guide}`)?.count).toBe(1);
  });

  it("normaliza y reutiliza el lead", async () => {
    const f = almacenFalso();
    const d = deps({ store: f.store });
    const a = await idDe(await handleLead(request({ ...body, email: "Ana@Gmail.com " }), d));
    const b = await idDe(await handleLead(request({ ...body, guide: "otra-guia" }), d));
    expect(a).toBe(b);
    expect(f.leads.size).toBe(1);
    expect([...f.leads.keys()]).toEqual(["ana@gmail.com"]);
    expect(f.visitas.size).toBe(2);
  });

  it("utm ausente o con basura se guarda como null", async () => {
    const f = almacenFalso();
    const utm = { source: 42, medium: "  ", campaign: "x".repeat(500) };
    await handleLead(request({ ...body, utm }), deps({ store: f.store }));
    const lead = f.leads.get("ana@gmail.com");
    expect(lead?.utmSource).toBeNull();
    expect(lead?.utmMedium).toBeNull();
    expect(lead?.utmCampaign).toBeNull();
  });

  it("sin consentimiento → 400", async () => {
    const f = almacenFalso();
    for (const consent of [undefined, false, "true", 1]) {
      const res = await handleLead(request({ ...body, consent }), deps({ store: f.store }));
      expect(res.status).toBe(400);
    }
    expect(f.leads.size).toBe(0);
  });

  it("email inválido → 400", async () => {
    for (const email of ["", "ana@", "ana gmail.com", 7, `${"a".repeat(200)}@gmail.com`]) {
      expect((await handleLead(request({ ...body, email }), deps())).status).toBe(400);
    }
  });

  it("guía que no es un slug → 400", async () => {
    for (const guide of ["", "../etc", "Con Espacios", 3]) {
      expect((await handleLead(request({ ...body, guide }), deps())).status).toBe(400);
    }
  });

  it("JSON inválido → 400", async () => {
    expect((await handleLead(request("{no"), deps())).status).toBe(400);
    expect((await handleLead(request("null"), deps())).status).toBe(400);
  });

  it("campo trampa → 200 sin guardar", async () => {
    const f = almacenFalso();
    const res = await handleLead(
      request({ ...body, website: "http://spam" }),
      deps({ store: f.store })
    );
    expect(res.status).toBe(200);
    expect(await idDe(res)).toMatch(/^[0-9a-f-]{36}$/);
    expect(f.leads.size).toBe(0);
  });

  it("límite por IP → 429 al 11.º", async () => {
    const d = deps();
    for (let i = 0; i < 10; i++) expect((await handleLead(request(body), d)).status).toBe(200);
    expect((await handleLead(request(body), d)).status).toBe(429);
    expect((await handleLead(request(body, "2.2.2.2"), d)).status).toBe(200);
  });

  it("sin store fuera de dev → 503", async () => {
    const res = await handleLead(request(body), deps({ store: undefined }));
    expect(res.status).toBe(503);
  });

  it("sin store en dev → id falso y log", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await handleLead(request(body), deps({ store: undefined, dev: true }));
    expect(res.status).toBe(200);
    expect(await idDe(res)).toMatch(/^[0-9a-f-]{36}$/);
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });

  it("si la base falla → 502", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const store: LeadStore = {
      upsertLead: () => Promise.reject(new Error("D1 caída")),
      recordVisit: () => Promise.resolve(true),
    };
    expect((await handleLead(request(body), deps({ store }))).status).toBe(502);
    err.mockRestore();
  });
});

describe("handleVisit", () => {
  const visita = (data: unknown) => request(data, "1.1.1.1", "/api/lead/visita");

  it("visita de id desconocido → 404", async () => {
    const res = await handleVisit(visita({ id: "no-existe", guide: body.guide }), {
      store: almacenFalso().store,
      now: () => 1,
    });
    expect(res.status).toBe(404);
  });

  it("visita de id conocido → 204 y suma count", async () => {
    const f = almacenFalso();
    const id = await idDe(await handleLead(request(body), deps({ store: f.store })));
    const res = await handleVisit(visita({ id, guide: body.guide }), {
      store: f.store,
      now: () => 2_000_000,
    });
    expect(res.status).toBe(204);
    expect(f.visitas.get(`${id}|${body.guide}`)).toEqual({
      first: 1_000_000,
      last: 2_000_000,
      count: 2,
    });
  });

  it("datos que no valen → 400", async () => {
    const d = { store: almacenFalso().store, now: () => 1 };
    expect((await handleVisit(visita("{no"), d)).status).toBe(400);
    expect((await handleVisit(visita({ id: "", guide: body.guide }), d)).status).toBe(400);
    expect((await handleVisit(visita({ id: "x".repeat(100), guide: "a" }), d)).status).toBe(400);
    expect((await handleVisit(visita({ id: "abc", guide: "../x" }), d)).status).toBe(400);
  });

  it("sin store → 503", async () => {
    const res = await handleVisit(visita({ id: "abc", guide: body.guide }), { now: () => 1 });
    expect(res.status).toBe(503);
  });

  it("si la base falla → 502", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const store: LeadStore = {
      upsertLead: () => Promise.resolve("x"),
      recordVisit: () => Promise.reject(new Error("D1 caída")),
    };
    const res = await handleVisit(visita({ id: "abc", guide: body.guide }), {
      store,
      now: () => 1,
    });
    expect(res.status).toBe(502);
    err.mockRestore();
  });
});
