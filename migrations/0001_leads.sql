-- Leads del muro de las guías y su historial de visitas (D1 propia de la web: dru-web-leads).
-- Fechas en milisegundos desde epoch. El email se guarda normalizado (trim + minúsculas).
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  consent_version TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  first_guide TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

CREATE TABLE visitas (
  lead_id TEXT NOT NULL REFERENCES leads (id),
  guide TEXT NOT NULL,
  first_at INTEGER NOT NULL,
  last_at INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (lead_id, guide)
);
