import { afterEach, describe, expect, it, vi } from "vitest";
import {
  captureUtm,
  clearLeadId,
  isValidEmail,
  LEAD_KEY,
  readLeadId,
  readUtm,
  saveLeadId,
  sendVisit,
  unlockGuide,
  UTM_KEY,
} from "./muro";

function memoria() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => {
      m.set(k, v);
    },
    removeItem: (k: string) => {
      m.delete(k);
    },
  };
}
const lanza = {
  getItem: (): string | null => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("QuotaExceededError");
  },
  removeItem: () => {
    throw new Error("SecurityError");
  },
};

describe("id del lead en el navegador", () => {
  it("guarda y lee el id", () => {
    const s = memoria();
    expect(readLeadId(s)).toBeNull();
    saveLeadId(s, "abc");
    expect(s.getItem(LEAD_KEY)).toBe("abc");
    expect(readLeadId(s)).toBe("abc");
    clearLeadId(s);
    expect(readLeadId(s)).toBeNull();
  });

  it("un id vacío cuenta como sin id", () => {
    const s = memoria();
    s.setItem(LEAD_KEY, "");
    expect(readLeadId(s)).toBeNull();
  });

  it("storage que lanza", () => {
    expect(readLeadId(lanza)).toBeNull();
    expect(() => {
      saveLeadId(lanza, "abc");
    }).not.toThrow();
    expect(() => {
      clearLeadId(lanza);
    }).not.toThrow();
  });

  it("storage null", () => {
    expect(readLeadId(null)).toBeNull();
    expect(() => {
      saveLeadId(null, "abc");
    }).not.toThrow();
    expect(() => {
      clearLeadId(null);
    }).not.toThrow();
  });
});

describe("isValidEmail", () => {
  it("acepta emails normales, también con espacios alrededor", () => {
    expect(isValidEmail("ana@gmail.com")).toBe(true);
    expect(isValidEmail(" Ana@Gmail.com ")).toBe(true);
  });

  it("rechaza lo que no es un email", () => {
    for (const v of ["", "ana@", "@gmail.com", "ana gmail.com", "ana@gmail", "a@b.co,c@d.es"]) {
      expect(isValidEmail(v)).toBe(false);
    }
  });
});

describe("utm del aterrizaje", () => {
  it("guarda la utm si la URL la trae y la lee después", () => {
    const s = memoria();
    captureUtm("?utm_source=tiktok&utm_medium=video&utm_campaign=skill&x=1", s);
    expect(readUtm(s)).toEqual({ source: "tiktok", medium: "video", campaign: "skill" });
  });

  it("sin utm en la URL no pisa la que ya había", () => {
    const s = memoria();
    captureUtm("?utm_campaign=skill", s);
    captureUtm("?ref=otra", s);
    expect(readUtm(s)).toEqual({ source: null, medium: null, campaign: "skill" });
  });

  it("storage que lanza, null o con basura → sin utm y sin excepción", () => {
    expect(() => {
      captureUtm("?utm_source=tiktok", lanza);
    }).not.toThrow();
    expect(readUtm(lanza)).toBeNull();
    expect(readUtm(null)).toBeNull();
    const s = memoria();
    s.setItem(UTM_KEY, "{no es json");
    expect(readUtm(s)).toBeNull();
    s.setItem(UTM_KEY, JSON.stringify({ source: 3 }));
    expect(readUtm(s)).toEqual({ source: null, medium: null, campaign: null });
  });
});

type FetchFn = (url: string, init: RequestInit) => Promise<Response>;

const fetchQueDa = (res: () => Response) => vi.fn<FetchFn>(() => Promise.resolve(res()));

/** El JSON que se mandó en la llamada n.º `n` del fetch falso. */
function enviado(f: ReturnType<typeof fetchQueDa>, n = 0): unknown {
  const body = f.mock.calls[n]?.[1].body;
  if (typeof body !== "string") throw new Error("sin cuerpo JSON");
  return JSON.parse(body);
}

function respuesta(status: number, data?: unknown) {
  return new Response(data === undefined ? null : JSON.stringify(data), { status });
}

describe("unlockGuide", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("manda el lead, guarda el id del servidor y desbloquea", async () => {
    const local = memoria();
    const fetchFn = fetchQueDa(() => respuesta(200, { ok: true, id: "srv-1" }));
    const unlock = vi.fn();
    await unlockGuide(" Ana@Gmail.com ", "mi-guia", fetchFn, { local, session: null }, unlock);
    expect(readLeadId(local)).toBe("srv-1");
    expect(unlock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(url).toBe("/api/lead");
    expect(init?.method).toBe("POST");
    expect(enviado(fetchFn)).toEqual({
      email: "Ana@Gmail.com",
      guide: "mi-guia",
      consent: true,
      utm: null,
      website: "",
    });
  });

  it("unlockGuide envía la utm guardada", async () => {
    const session = memoria();
    captureUtm("?utm_source=tiktok&utm_campaign=skill", session);
    const fetchFn = fetchQueDa(() => respuesta(200, { ok: true, id: "x" }));
    await unlockGuide("ana@gmail.com", "g", fetchFn, { local: memoria(), session }, vi.fn());
    expect(enviado(fetchFn)).toMatchObject({
      utm: { source: "tiktok", medium: null, campaign: "skill" },
    });
  });

  it("manda el campo trampa tal cual", async () => {
    const fetchFn = fetchQueDa(() => respuesta(200, { ok: true, id: "x" }));
    await unlockGuide("a@b.co", "g", fetchFn, { local: null, session: null }, vi.fn(), {
      website: "spam",
    });
    expect(enviado(fetchFn)).toMatchObject({ website: "spam" });
  });

  it("unlockGuide desbloquea aunque la API falle", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fallos = [
      () => Promise.reject(new TypeError("Failed to fetch")),
      () => Promise.resolve(respuesta(500, { ok: false })),
      () => Promise.resolve(new Response("<html>", { status: 200 })),
    ];
    for (const fallo of fallos) {
      const local = memoria();
      const unlock = vi.fn();
      await expect(
        unlockGuide("ana@gmail.com", "g", fallo, { local, session: null }, unlock)
      ).resolves.toBeUndefined();
      expect(readLeadId(local)).toBeNull();
      expect(unlock).toHaveBeenCalledTimes(1);
    }
    expect(warn).toHaveBeenCalledTimes(3);
  });

  it("si la API tarda, desbloquea al vencer la espera", async () => {
    vi.useFakeTimers();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const unlock = vi.fn();
    const local = memoria();
    const espera = unlockGuide(
      "ana@gmail.com",
      "g",
      () => new Promise<Response>(() => {}),
      { local, session: null },
      unlock,
      { timeoutMs: 4000 }
    );
    await vi.advanceTimersByTimeAsync(3999);
    expect(unlock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    await espera;
    expect(unlock).toHaveBeenCalledTimes(1);
    expect(readLeadId(local)).toBeNull();
  });

  it("con storage que lanza desbloquea igual", async () => {
    const fetchFn = () => Promise.resolve(respuesta(200, { ok: true, id: "x" }));
    const unlock = vi.fn();
    await unlockGuide("ana@gmail.com", "g", fetchFn, { local: lanza, session: lanza }, unlock);
    expect(unlock).toHaveBeenCalledTimes(1);
  });
});

describe("sendVisit", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("registra la visita y conserva el id", async () => {
    const local = memoria();
    saveLeadId(local, "abc");
    const fetchFn = fetchQueDa(() => respuesta(204));
    await sendVisit("abc", "mi-guia", fetchFn, local);
    expect(fetchFn.mock.calls[0]?.[0]).toBe("/api/lead/visita");
    expect(enviado(fetchFn)).toEqual({ id: "abc", guide: "mi-guia" });
    expect(readLeadId(local)).toBe("abc");
  });

  it("id desconocido (404) → borra el id guardado", async () => {
    const local = memoria();
    saveLeadId(local, "abc");
    await sendVisit("abc", "g", () => Promise.resolve(respuesta(404)), local);
    expect(readLeadId(local)).toBeNull();
  });

  it("otros fallos no borran el id ni lanzan", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const local = memoria();
    saveLeadId(local, "abc");
    await sendVisit("abc", "g", () => Promise.resolve(respuesta(503)), local);
    await expect(
      sendVisit("abc", "g", () => Promise.reject(new TypeError("offline")), local)
    ).resolves.toBeUndefined();
    expect(readLeadId(local)).toBe("abc");
  });
});
