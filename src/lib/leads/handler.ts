// Alta de leads del muro de las guías y registro de visitas. Lógica pura con el almacén
// inyectado (la D1 en producción, un falso en los tests), como `contact-handler.ts`.
import { EMAIL_RE } from "../contact-validation";
import type { RateLimiter } from "../rate-limit";
import { CONSENT_TEXT, CONSENT_VERSION } from "./consent";

export interface LeadStore {
  upsertLead(l: {
    email: string;
    guide: string;
    consentVersion: string;
    consentText: string;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    now: number;
  }): Promise<string>; // id
  recordVisit(id: string, guide: string, now: number): Promise<boolean>; // false si el id no existe
}

export interface LeadDeps {
  /** El almacén de leads. Sin él (desarrollo sin D1) el alta se simula. */
  store?: LeadStore | undefined;
  limiter: RateLimiter;
  now: () => number;
  dev: boolean;
}

export interface VisitDeps {
  store?: LeadStore | undefined;
  now: () => number;
}

const LIMITS = { email: 200, guide: 120, id: 64, utm: 200 };
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

async function leerCuerpo(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

const esGuia = (v: unknown): v is string =>
  typeof v === "string" && v.length <= LIMITS.guide && SLUG_RE.test(v);

/** Un valor de UTM limpio, o null si falta, está vacío o no es texto razonable. */
function utmValor(raw: unknown, key: string): string | null {
  if (!raw || typeof raw !== "object") return null;
  const v = (raw as Record<string, unknown>)[key];
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t && t.length <= LIMITS.utm ? t : null;
}

export async function handleLead(request: Request, deps: LeadDeps): Promise<Response> {
  const body = await leerCuerpo(request);
  if (!body) return json(400, { ok: false, error: "invalid" });

  if (body.consent !== true) return json(400, { ok: false, error: "consent" });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return json(400, { ok: false, error: "email" });
  }
  if (!esGuia(body.guide)) return json(400, { ok: false, error: "guide" });
  const guide = body.guide;

  // Campo trampa: respondemos como si todo fuera bien, con un id que no existe.
  if (typeof body.website === "string" && body.website.trim()) {
    return json(200, { ok: true, id: crypto.randomUUID() });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "local";
  const now = deps.now();
  if (!deps.limiter(ip, now)) return json(429, { ok: false, error: "rate-limited" });

  if (!deps.store) {
    if (deps.dev) {
      console.info(`[leads] alta simulada en desarrollo: ${email} en ${guide}`);
      return json(200, { ok: true, id: crypto.randomUUID() });
    }
    return json(503, { ok: false, error: "unavailable" });
  }

  try {
    const id = await deps.store.upsertLead({
      email,
      guide,
      consentVersion: CONSENT_VERSION,
      consentText: CONSENT_TEXT,
      utmSource: utmValor(body.utm, "source"),
      utmMedium: utmValor(body.utm, "medium"),
      utmCampaign: utmValor(body.utm, "campaign"),
      now,
    });
    return json(200, { ok: true, id });
  } catch (error) {
    console.error("[leads] no se pudo guardar el lead", error);
    return json(502, { ok: false, error: "store-failed" });
  }
}

export async function handleVisit(request: Request, deps: VisitDeps): Promise<Response> {
  const body = await leerCuerpo(request);
  const id = body?.id;
  const guide = body?.guide;
  if (typeof id !== "string" || !id || id.length > LIMITS.id || !esGuia(guide)) {
    return json(400, { ok: false, error: "invalid" });
  }
  if (!deps.store) return json(503, { ok: false, error: "unavailable" });

  try {
    const existe = await deps.store.recordVisit(id, guide, deps.now());
    return existe
      ? new Response(null, { status: 204 })
      : json(404, { ok: false, error: "unknown" });
  } catch (error) {
    console.error("[leads] no se pudo registrar la visita", error);
    return json(502, { ok: false, error: "store-failed" });
  }
}
