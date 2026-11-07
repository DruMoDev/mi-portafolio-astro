// Muro de email de las guías: el id anónimo del lead en el navegador y la validación del email.
// Todas las funciones del storage tragan sus excepciones (Safari privado, almacenamiento
// bloqueado o lleno): el muro se desbloquea igual en esa visita.
import { EMAIL_RE } from "../contact-validation";

export const LEAD_KEY = "dru-lead-id";

export function readLeadId(storage: Pick<Storage, "getItem"> | null): string | null {
  try {
    return storage?.getItem(LEAD_KEY) || null;
  } catch {
    return null;
  }
}

export function saveLeadId(storage: Pick<Storage, "setItem"> | null, id: string): void {
  try {
    storage?.setItem(LEAD_KEY, id);
  } catch {
    // Sin almacenamiento: esta visita queda desbloqueada y la próxima se vuelve a pedir.
  }
}

export function clearLeadId(storage: Pick<Storage, "removeItem"> | null): void {
  try {
    storage?.removeItem(LEAD_KEY);
  } catch {
    // Nada que borrar si no hay almacenamiento.
  }
}

/** La misma regla que el formulario de contacto. */
export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

// Origen del lead: la UTM con la que aterriza (los enlaces de los vídeos la llevan). Va en
// sessionStorage y solo sale del navegador junto al email, al desbloquear.
export const UTM_KEY = "dru-utm";

export interface Utm {
  source: string | null;
  medium: string | null;
  campaign: string | null;
}

const texto = (v: unknown) => (typeof v === "string" && v ? v : null);

/** Guarda la UTM de la URL si la trae; si no, deja la que hubiera. */
export function captureUtm(search: string, storage: Pick<Storage, "setItem"> | null): void {
  const q = new URLSearchParams(search);
  const utm: Utm = {
    source: texto(q.get("utm_source")),
    medium: texto(q.get("utm_medium")),
    campaign: texto(q.get("utm_campaign")),
  };
  if (!utm.source && !utm.medium && !utm.campaign) return;
  try {
    storage?.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    // Sin almacenamiento el lead se guarda sin origen.
  }
}

export function readUtm(storage: Pick<Storage, "getItem"> | null): Utm | null {
  try {
    const raw = storage?.getItem(UTM_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    const u = data as Record<string, unknown>;
    return { source: texto(u.source), medium: texto(u.medium), campaign: texto(u.campaign) };
  } catch {
    return null;
  }
}

type FetchFn = (url: string, init: RequestInit) => Promise<Response>;

export interface MuroStorage {
  /** localStorage: el id del lead. */
  local: Pick<Storage, "setItem"> | null;
  /** sessionStorage: la UTM del aterrizaje. */
  session: Pick<Storage, "getItem"> | null;
}

/**
 * Manda el email a /api/lead, guarda el id que devuelve y desbloquea. Si la API falla o tarda
 * más de `timeoutMs`, desbloquea igual (el lead se pierde y queda en consola): el visitante
 * nunca ve un error técnico.
 */
export async function unlockGuide(
  email: string,
  guide: string,
  fetchFn: FetchFn,
  storage: MuroStorage,
  unlock: () => void,
  opciones: { website?: string; timeoutMs?: number } = {}
): Promise<void> {
  const corte = new AbortController();
  let reloj: ReturnType<typeof setTimeout> | undefined;
  const espera = new Promise<never>((_, rechazar) => {
    reloj = setTimeout(() => {
      corte.abort();
      rechazar(new Error("la API de leads no responde"));
    }, opciones.timeoutMs ?? 4000);
  });
  try {
    const res = await Promise.race([
      fetchFn("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          guide,
          consent: true,
          utm: readUtm(storage.session),
          website: opciones.website ?? "",
        }),
        signal: corte.signal,
      }),
      espera,
    ]);
    if (!res.ok) throw new Error(`la API de leads respondió ${String(res.status)}`);
    const data = (await Promise.race([res.json(), espera])) as { id?: unknown };
    if (typeof data.id !== "string" || !data.id) throw new Error("respuesta sin id");
    saveLeadId(storage.local, data.id);
  } catch (error) {
    console.warn("[guias] no se pudo guardar el email; se desbloquea igual", error);
  } finally {
    clearTimeout(reloj);
    unlock();
  }
}

/** Registra la visita de quien ya dejó el email. Si el servidor no conoce el id, se olvida. */
export async function sendVisit(
  id: string,
  guide: string,
  fetchFn: FetchFn,
  storage: Pick<Storage, "removeItem"> | null
): Promise<void> {
  try {
    const res = await fetchFn("/api/lead/visita", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, guide }),
      keepalive: true,
    });
    if (res.status === 404) clearLeadId(storage);
  } catch (error) {
    console.warn("[guias] no se pudo registrar la visita", error);
  }
}
