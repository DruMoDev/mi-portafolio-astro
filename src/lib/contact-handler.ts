import { services } from "../data/services";
import { validateContact, type ContactInput } from "./contact-validation";
import type { RateLimiter } from "./rate-limit";

export interface ContactDeps {
  /** Envía el email ya montado. Sin él (desarrollo) el envío se simula. */
  send?: (raw: string, from: string, to: string) => Promise<void>;
  from?: string;
  to?: string;
  dev: boolean;
  limiter: RateLimiter;
  now: () => number;
}

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function base64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

export function buildMime(m: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  date: Date;
  messageId: string;
}): string {
  const headers = [
    `From: Web de Dru Morera <${oneLine(m.from)}>`,
    `To: ${oneLine(m.to)}`,
    `Reply-To: ${oneLine(m.replyTo)}`,
    `Subject: =?UTF-8?B?${base64(oneLine(m.subject))}?=`,
    `Date: ${m.date.toUTCString()}`,
    `Message-ID: ${oneLine(m.messageId)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: base64",
  ];
  const body = base64(m.text).replace(/.{1,76}/g, "$&\r\n");
  return `${headers.join("\r\n")}\r\n\r\n${body}`;
}

function emailText(data: ContactInput): string {
  const names = data.services.map((id) =>
    id === "otro" ? "Otra cosa" : (services.find((s) => s.id === id)?.name ?? id)
  );
  return [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Servicios: ${names.length ? names.join(", ") : "Sin marcar"}`,
    "",
    data.message,
    "",
    "—",
    "Enviado desde el formulario de drumorera.com. Responde a este email para contestar.",
  ].join("\n");
}

export async function handleContact(request: Request, deps: ContactDeps): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid" });
  }

  const result = validateContact(body);
  if (!result.ok) return json(400, { ok: false, error: result.error });
  const data = result.data;

  // Campo trampa: respondemos como si todo fuera bien para no dar pistas.
  if (data.website) return json(200, { ok: true });

  const ip = request.headers.get("cf-connecting-ip") ?? "local";
  if (!deps.limiter(ip, deps.now())) return json(429, { ok: false, error: "rate-limited" });

  const text = emailText(data);
  if (!deps.send || !deps.to || !deps.from) {
    if (deps.dev) {
      console.info(`[contacto] envío simulado en desarrollo:\n${text}`);
      return json(200, { ok: true });
    }
    return json(503, { ok: false, error: "unavailable" });
  }

  const raw = buildMime({
    from: deps.from,
    to: deps.to,
    replyTo: data.email,
    subject: `Nuevo mensaje de ${data.name} desde la web`,
    text,
    date: new Date(deps.now()),
    messageId: `<${crypto.randomUUID()}@${deps.from.split("@")[1] ?? "drumorera.com"}>`,
  });

  try {
    await deps.send(raw, deps.from, deps.to);
  } catch (error) {
    console.error("[contacto] no se pudo enviar", error);
    return json(502, { ok: false, error: "send-failed" });
  }
  return json(200, { ok: true });
}
