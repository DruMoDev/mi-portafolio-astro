---
name: analiticas
description: Informe de analítica de drumorera.com (PostHog y, si está conectado, Search Console) en un HTML local temporal. Úsala cuando Dru pida ver las analíticas, cómo va la web, las visitas, los contactos, de dónde viene la gente, qué guías se leen o escriba "analiticas".
---

# Informe de analítica de drumorera.com

Saca los datos, rellena `datos.json` y lo pinta `render.mjs` con un diseño fijo. No escribas HTML a mano.

**Periodo por defecto:** desde el principio (`2026-11-02`) hasta hoy. Si Dru pide otro ("esta semana", "octubre"), cambia `DESDE`/`HASTA` en todas las consultas.

## 1. Datos de PostHog (MCP `posthog`, proyecto 331193, región UE)

Lanza en paralelo, con `filterTestAccounts: true` en las consultas tipadas:

| Para        | Llamada                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Resumen     | `query-web-overview` `{"kind":"WebOverviewQuery","dateRange":{"date_from":DESDE,"date_to":HASTA},"filterTestAccounts":true}`            |
| Páginas     | `query-web-stats` con `breakdownBy:"Page"`, `includeBounceRate:true`, `limit:15`                                                        |
| Fuentes     | `query-web-stats` con `breakdownBy:"InitialReferringDomain"`, `limit:15`                                                                |
| Campañas    | `query-web-stats` con `breakdownBy:"InitialUTMSourceMediumCampaign"`, `limit:15` (quédate solo con las que no empiezan por `referrer:`) |
| País        | `query-web-stats` con `breakdownBy:"Country"`, `limit:10` (las filas `null` no cuentan)                                                 |
| Dispositivo | `query-web-stats` con `breakdownBy:"DeviceType"`, `limit:5` (Mobile → Móvil, Desktop → Ordenador, Tablet → Tablet)                      |

Y dos SQL con `execute-sql`. Los filtros `$host`/`prueba` replican el filtro de cuentas internas.

**Eventos** (contacto, servicios, secciones, «¿Qué te trae?», guías):

```sql
SELECT * FROM (
  SELECT 'salida' AS tipo, toString(properties.kind) AS clave, coalesce(toString(properties.network), '') AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = 'outbound_click'
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com') AND coalesce(properties.utm_source, '') NOT ILIKE '%prueba%'
  GROUP BY clave, extra
  UNION ALL
  SELECT 'salida_desde' AS tipo, toString(properties.kind) AS clave, properties.$pathname AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = 'outbound_click' AND properties.kind IN ('whatsapp', 'email', 'phone')
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com') AND coalesce(properties.utm_source, '') NOT ILIKE '%prueba%'
  GROUP BY clave, extra
  UNION ALL
  SELECT 'form' AS tipo, event AS clave, coalesce(toString(properties.step), '') AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event IN ('contact_opened', 'contact_step', 'contact_sent', 'contact_failed', 'contact_closed')
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com')
  GROUP BY clave, extra
  UNION ALL
  SELECT 'form_desde' AS tipo, toString(properties.from) AS clave, coalesce(toString(properties.service), '') AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = 'contact_opened'
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com')
  GROUP BY clave, extra
  UNION ALL
  SELECT 'servicio' AS tipo, toString(properties.service) AS clave, coalesce(toString(properties.via), '') AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = 'service_viewed'
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com')
  GROUP BY clave, extra
  UNION ALL
  SELECT 'seccion' AS tipo, properties.$pathname AS clave, toString(properties.section) AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = 'section_viewed'
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com') AND coalesce(properties.utm_source, '') NOT ILIKE '%prueba%'
  GROUP BY clave, extra
  UNION ALL
  SELECT 'who' AS tipo, arrayJoin(JSONExtractArrayRaw(coalesce(toString(properties.picked), '[]'))) AS clave, '' AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = 'who_picked'
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com')
  GROUP BY clave, extra
  UNION ALL
  SELECT 'guia' AS tipo, properties.$pathname AS clave, '' AS extra, count() AS veces, uniq(person_id) AS personas
  FROM events WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59') AND event = '$pageview' AND properties.$pathname LIKE '/guias/%'
    AND properties.$host IN ('drumorera.com', 'www.drumorera.com')
  GROUP BY clave, extra
) ORDER BY tipo, personas DESC
```

**Embudo y cookies** (personas únicas):

```sql
SELECT
  uniqIf(person_id, event = '$pageview') AS llegan,
  uniqIf(person_id, event = 'section_viewed' AND toString(properties.section) IN ('servicios', 'services')) AS ven_servicios,
  uniqIf(person_id, event IN ('service_viewed', 'contact_opened') OR (event = 'outbound_click' AND toString(properties.kind) IN ('whatsapp', 'email', 'phone'))) AS muestran_interes,
  uniqIf(person_id, event = 'contact_sent' OR (event = 'outbound_click' AND toString(properties.kind) IN ('whatsapp', 'email', 'phone'))) AS contactan,
  uniqIf(person_id, event = 'cookies_choice' AND toString(properties.choice) = 'si') AS cookies_si,
  uniqIf(person_id, event = 'cookies_choice' AND toString(properties.choice) = 'no') AS cookies_no
FROM events
WHERE timestamp >= toDateTime('DESDE 00:00:00') AND timestamp < toDateTime('HASTA 23:59:59')
  AND properties.$host IN ('drumorera.com', 'www.drumorera.com')
  AND coalesce(properties.utm_source, '') NOT ILIKE '%prueba%'
  AND event NOT LIKE 'prueba%'
```

Avisos de taxonomía sobre eventos que aún no existen (`contact_sent`, `who_picked`…) son normales: nadie los ha disparado todavía. Antes de dar el informe por bueno, mira con `read-data-schema` (`kind: events`) si han aparecido eventos nuevos (por ejemplo de las guías o de leads) que no estén en estas consultas: si los hay, cuéntalos en `notas` y propón añadirlos a esta skill.

## 2. Search Console (si hay acceso)

Si hay credenciales con el permiso `webmasters.readonly` (`gcloud auth application-default print-access-token` y una llamada a `https://www.googleapis.com/webmasters/v3/sites` que no dé 403), consulta `searchAnalytics/query` de `sc-domain:drumorera.com` (o `https://drumorera.com/`) por `query` y por `page`. Si no, deja `"google": null` y no insistas: el informe ya explica cómo conectarlo.

## 3. Guías y leads

- Visitas por guía: filas `guia` de la SQL de eventos.
- Leads (cuando exista la D1 `dru-web-leads` de las guías): solo **recuentos**, nunca emails. Por ejemplo `npx wrangler d1 execute dru-web-leads --remote --json --command "SELECT count(*) AS n FROM leads"`. Mira el esquema real antes (`.schema`). Si la base no existe o falla, `leads_total` se queda sin poner.

## 4. Montar `datos.json`

Escríbelo en `/tmp/drumorera-analitica/datos.json` con esta forma (cualquier bloque puede faltar o ir vacío: el render pone un estado vacío útil):

```json
{
  "periodo": { "desde": "2026-11-02", "hasta": "2026-11-07" },
  "generado": "ISO con zona",
  "resumen": { "visitantes": 0, "vistas": 0, "sesiones": 0, "duracion_s": 0, "rebote": 0.3 },
  "respuestas": {
    "contactos": "",
    "origen": "",
    "web": "",
    "atasco": "",
    "google": "",
    "guias": ""
  },
  "contactos": {
    "salidas": [
      { "tipo": "whatsapp|email|phone", "personas": 0, "veces": 0, "desde": ["/links/"] }
    ],
    "formulario": {
      "abiertos": 0,
      "paso2": 0,
      "paso3": 0,
      "enviados": 0,
      "fallidos": 0,
      "desde": [{ "nombre": "contacto", "personas": 0 }]
    }
  },
  "origen": {
    "fuentes": [{ "nombre": "l.instagram.com", "visitantes": 0 }],
    "campanas": [{ "nombre": "ig / social", "visitantes": 0 }],
    "paises": [{ "nombre": "España", "visitantes": 0 }],
    "dispositivos": [{ "nombre": "Móvil", "visitantes": 0 }]
  },
  "web": {
    "paginas": [{ "ruta": "/", "visitantes": 0, "vistas": 0, "rebote": 0.5 }],
    "secciones": [{ "pagina": "/", "seccion": "servicios", "personas": 0 }],
    "servicios": [{ "nombre": "Webs", "personas": 0 }],
    "redes": [{ "nombre": "YouTube", "personas": 0 }],
    "who": [{ "nombre": "…", "personas": 0 }]
  },
  "embudo": [
    { "paso": "Llegan", "personas": 0 },
    { "paso": "Ven los servicios", "personas": 0 },
    {
      "paso": "Muestran interés",
      "personas": 0,
      "detalle": "abren un servicio, el formulario o WhatsApp"
    },
    { "paso": "Contactan", "personas": 0, "detalle": "WhatsApp, email o formulario enviado" }
  ],
  "google": null,
  "guias": null,
  "notas": []
}
```

- `fuentes`: pasa los dominios tal cual (`$direct` incluido); el render los agrupa por red.
- `formulario.paso2` = personas con `contact_step` paso 2; `paso3` = paso 3; `enviados` = `contact_sent`.
- `guias`: `{"lista": [{"guia": "/guias/slug/", "titulo": "", "visitantes": 0, "vistas": 0, "desbloqueos": null}], "leads_total": 0}` o `null` si no hay visitas a guías.
- Nombres de servicios y países en español y con mayúscula (`webs` → `Webs`, `ES` → `España`).

**`respuestas`** es lo más importante: una o dos frases por pregunta que respondan de verdad, con cifras concretas, en el idioma de Dru (sin jerga: "se van sin hacer nada", no "bounce rate"; sin rayas largas). Reglas:

- Con menos de 30 visitantes no afirmes dónde se atascan ni compares porcentajes: di qué se ve y que aún es poco (el render ya pone el aviso de muestra pequeña).
- No inventes causas. Si algo no se puede saber con estos datos, dilo.
- `google` y `guias` vacíos cuando no hay datos (el estado vacío ya lo explica).

## 5. Pintar y entregar

```bash
node .claude/skills/analiticas/render.mjs /tmp/drumorera-analitica/datos.json /tmp/drumorera-analitica/informe.html
```

Da el enlace clicable `[informe](file:///tmp/drumorera-analitica/informe.html)` y, en el chat, 3 o 4 líneas con lo más relevante (no repitas el informe entero). No lo abras salvo que Dru lo pida.

## Cosas que saber

- Las visitas de Dru no cuentan si abrió `drumorera.com/?sin-analitica` en ese navegador (también hay que hacerlo dentro del navegador de Instagram, que guarda los datos aparte).
- El país se registra desde el 7 de noviembre de 2026 (`/api/pais`, Cloudflare). Antes, las visitas sin cookies no tienen país.
- El proyecto de PostHog tiene un filtro de cuentas internas que quita localhost, `?analitica-prueba` y `utm_source=prueba…`.
