import { services } from "../data/services";

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  services: string[];
  /** Campo trampa: las personas lo dejan vacío. */
  website: string;
}

// Una sola dirección ASCII: sin comas, punto y coma, <>, comillas ni espacios (va en Reply-To).
export const EMAIL_RE = /^[^\s@,;<>()"\\]+@[^\s@,;<>()"\\]+\.[^\s@,;<>()"\\]+$/;
const NON_ASCII = /[^\x20-\x7e]/;
const LIMITS = { name: 100, email: 200, message: 5000 };
const SERVICE_IDS = new Set<string>([...services.map((s) => s.id), "otro"]);

const STEP_ERRORS = [
  "Escribe tu nombre para seguir.",
  "Revisa el email, parece que falta algo.",
  "Cuéntame en una frase qué necesitas.",
] as const;

/** Mensaje amable si el valor del paso no vale, o "" si está bien. */
export function validateField(step: 0 | 1 | 2, value: string): string {
  const v = value.trim();
  if (step === 1 && NON_ASCII.test(v)) return "Escribe el email sin acentos ni eñes, por favor.";
  const valid = step === 1 ? EMAIL_RE.test(v) : v !== "";
  return valid ? "" : STEP_ERRORS[step];
}

export function validateContact(
  input: unknown
): { ok: true; data: ContactInput } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "invalid" };
  const raw = input as Record<string, unknown>;
  const text = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : null);
  const name = text("name");
  const email = text("email");
  const message = text("message");
  if (name === null || email === null || message === null) return { ok: false, error: "invalid" };

  const steps: [0 | 1 | 2, string][] = [
    [0, name],
    [1, email],
    [2, message],
  ];
  for (const [step, value] of steps) {
    const error = validateField(step, value);
    if (error) return { ok: false, error };
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return { ok: false, error: "too-long" };
  }

  const list = Array.isArray(raw.services) ? raw.services : [];
  const picked = list.filter((s): s is string => typeof s === "string" && SERVICE_IDS.has(s));
  return {
    ok: true,
    data: { name, email, message, services: [...new Set(picked)], website: text("website") ?? "" },
  };
}

/** Alternativas que se ofrecen si falla el envío: solo las que existen. */
export function contactAlternatives(cfg: {
  email: string;
  whatsappUrl: string | null;
}): { label: string; href: string }[] {
  const alts = [{ label: cfg.email, href: `mailto:${cfg.email}` }];
  if (cfg.whatsappUrl) alts.unshift({ label: "WhatsApp", href: cfg.whatsappUrl });
  return alts;
}
