// LeadStore sobre la D1 propia de la web (`dru-web-leads`, binding LEADS). Esquema en
// migrations/0001_leads.sql.
import type { D1Database } from "@cloudflare/workers-types";
import type { LeadStore } from "./handler";

// Suma una visita a (lead, guía) solo si el lead existe: sin fila en `leads` no inserta nada.
const VISITA_SQL = `INSERT INTO visitas (lead_id, guide, first_at, last_at, count)
  SELECT id, ?2, ?3, ?3, 1 FROM leads WHERE %WHERE%
  ON CONFLICT (lead_id, guide) DO UPDATE SET last_at = excluded.last_at, count = count + 1`;

export function createD1LeadStore(db: D1Database): LeadStore {
  return {
    async upsertLead(l) {
      const [, fila] = await db.batch<{ id: string }>([
        db
          .prepare(
            `INSERT INTO leads (id, email, created_at, consent_version, consent_text, first_guide,
               utm_source, utm_medium, utm_campaign)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT (email) DO NOTHING`
          )
          .bind(
            crypto.randomUUID(),
            l.email,
            l.now,
            l.consentVersion,
            l.consentText,
            l.guide,
            l.utmSource,
            l.utmMedium,
            l.utmCampaign
          ),
        db.prepare("SELECT id FROM leads WHERE email = ?1").bind(l.email),
        db.prepare(VISITA_SQL.replace("%WHERE%", "email = ?1")).bind(l.email, l.guide, l.now),
      ]);
      const id = fila?.results[0]?.id;
      if (!id) throw new Error("el lead no aparece después de guardarlo");
      return id;
    },
    async recordVisit(id, guide, now) {
      const r = await db
        .prepare(VISITA_SQL.replace("%WHERE%", "id = ?1"))
        .bind(id, guide, now)
        .run();
      return r.meta.changes > 0;
    },
  };
}
