import { describe, expect, it, vi } from "vitest";
import { buildMime, handleContact, type ContactDeps } from "./contact-handler";
import { createRateLimiter } from "./rate-limit";

const body = { name: "Ana", email: "ana@gmail.com", message: "Quiero una web", services: ["webs"] };

const request = (data: unknown, ip = "1.1.1.1") =>
  new Request("https://drumorera.com/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ip },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });

const deps = (over: Partial<ContactDeps> = {}): ContactDeps => ({
  send: vi.fn(async () => {}),
  from: "web@drumorera.com",
  to: "dru@example.com",
  dev: false,
  limiter: createRateLimiter(5, 10 * 60_000),
  now: () => 1_000_000,
  ...over,
});

describe("handleContact", () => {
  it("envía el email con reply-to del visitante", async () => {
    const d = deps();
    const res = await handleContact(request(body), d);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const [raw, from, to] = (d.send as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(from).toBe("web@drumorera.com");
    expect(to).toBe("dru@example.com");
    expect(raw).toMatch(/^Reply-To: ana@gmail\.com$/m);
  });

  it("JSON inválido → 400", async () => {
    expect((await handleContact(request("{no"), deps())).status).toBe(400);
  });

  it("datos que no validan → 400 con el motivo", async () => {
    const res = await handleContact(request({ ...body, email: "x" }), deps());
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Revisa el email, parece que falta algo.");
  });

  it("campo trampa relleno → 200 sin enviar", async () => {
    const d = deps();
    const res = await handleContact(request({ ...body, website: "http://spam" }), d);
    expect(res.status).toBe(200);
    expect(d.send).not.toHaveBeenCalled();
  });

  it("en producción sin destino → 503", async () => {
    const res = await handleContact(request(body), deps({ to: undefined }));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "unavailable" });
  });

  it("en desarrollo sin binding simula el envío", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await handleContact(
      request(body),
      deps({ send: undefined, to: undefined, dev: true })
    );
    expect(res.status).toBe(200);
    log.mockRestore();
  });

  it("más de 5 envíos en 10 minutos desde la misma IP → 429", async () => {
    const d = deps();
    for (let i = 0; i < 5; i++) expect((await handleContact(request(body), d)).status).toBe(200);
    expect((await handleContact(request(body), d)).status).toBe(429);
    expect((await handleContact(request(body, "2.2.2.2"), d)).status).toBe(200);
  });

  it("si el envío falla → 502", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await handleContact(
      request(body),
      deps({ send: vi.fn(async () => Promise.reject(new Error("boom"))) })
    );
    expect(res.status).toBe(502);
    err.mockRestore();
  });
});

describe("buildMime", () => {
  const base = {
    from: "web@drumorera.com",
    to: "dru@example.com",
    replyTo: "ana@gmail.com",
    subject: "Nuevo mensaje de Ana",
    text: "Hola",
    date: new Date("2026-10-29T10:00:00Z"),
    messageId: "<abc@drumorera.com>",
  };

  it("no permite inyectar cabeceras", () => {
    const raw = buildMime({ ...base, subject: "Ana\r\nBcc: x@y.z", replyTo: "a@b.c\nBcc: x@y.z" });
    expect(raw).not.toMatch(/^Bcc:/m);
  });

  it("codifica el asunto con acentos y el cuerpo en base64 UTF-8", () => {
    const raw = buildMime({ ...base, subject: "Mensaje de Begoña", text: "¿Qué tal?" });
    expect(raw).toMatch(/^Subject: =\?UTF-8\?B\?.+\?=$/m);
    expect(raw).toContain("Content-Type: text/plain; charset=utf-8");
    const encoded = raw.split("\r\n\r\n")[1].replace(/\r\n/g, "");
    expect(Buffer.from(encoded, "base64").toString("utf8")).toBe("¿Qué tal?");
  });

  it("lleva Message-ID y Date", () => {
    const raw = buildMime(base);
    expect(raw).toMatch(/^Message-ID: <abc@drumorera\.com>$/m);
    expect(raw).toMatch(/^Date: Thu, 29 Oct 2026 10:00:00 GMT$/m);
  });
});
