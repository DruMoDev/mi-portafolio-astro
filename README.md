# drumorera.com

Web de servicios de Dru Morera (@soydruia), con la sección de guías de los vídeos. Contexto del proyecto, comandos y reglas en [AGENTS.md](AGENTS.md); producto en [PRODUCT.md](PRODUCT.md); diseños y planes en `docs/superpowers/`.

## Desarrollo

```bash
bash scripts/preparar-entorno.sh   # npm ci + hooks
npm run dev
npm run test && npm run lint && npm run typecheck && npm run type-check && npm run build
```

`astro preview` no sirve con el adaptador de Cloudflare: para probar el build con sus bindings, `npm run build && npx wrangler dev`.

## Despliegue

Workers Builds de Cloudflare, conectado a este repo en el Worker `dru-portfolio`:

- Cada push a `main` construye (`npm run build`) y despliega (`npx wrangler deploy`) en producción, drumorera.com. No hay que desplegar a mano.
- Las ramas que no son `main` no se construyen (builds de vista previa desactivados).
- El estado del build sale como check `Workers Builds: dru-portfolio` en cada commit de `main`.

## Guías y leads

- Las guías son Markdown en `src/content/guias/` y se publican en `/guias/<slug>` (enlace corto `/g/<slug>`).
- Los emails del muro van a la D1 propia `dru-web-leads` (binding `LEADS`, jurisdicción UE), con el historial de guías vistas por persona. Esquema en `migrations/`; una migración nueva se aplica con `npx wrangler d1 migrations apply dru-web-leads --remote`.
- Ver los leads: `npm run leads` (añade `-- --json` para exportar).
