/**
 * Límite básico por clave (IP) en memoria. Vive por instancia del Worker,
 * así que no es exacto, pero frena los envíos en ráfaga.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now: number): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) hits.delete(hits.keys().next().value!);
    return true;
  };
}

export type RateLimiter = ReturnType<typeof createRateLimiter>;
