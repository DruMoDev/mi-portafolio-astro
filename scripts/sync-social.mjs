// Guarda en src/data/social.json la última analítica de tiktok-editor (DForge).
// Es el respaldo de la web: lo que se ve si /api/social no responde.
//
//   npm run social:sync
//
// Credenciales: DFORGE_BASE_URL y DFORGE_ANALYTICS_TOKEN, o si no están, los secretos locales
// de tiktok-editor (TIKTOK_EDITOR_DIR, por defecto ~/Documents/tiktok/tiktok-editor).
import { readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { fetchAnalytics, fromAnalytics } from "../src/lib/social-sync.ts";

const OUT = new URL("../src/data/social.json", import.meta.url);
const MIN_VIDEOS = 5;

async function credentials() {
  if (process.env.DFORGE_BASE_URL && process.env.DFORGE_ANALYTICS_TOKEN) {
    return { base: process.env.DFORGE_BASE_URL, token: process.env.DFORGE_ANALYTICS_TOKEN };
  }
  const dir = process.env.TIKTOK_EDITOR_DIR ?? join(homedir(), "Documents/tiktok/tiktok-editor");
  const read = async (f) => JSON.parse(await readFile(join(dir, "secrets/cloudflare", f), "utf8"));
  const [{ base_url }, { token_cron }] = await Promise.all([
    read("dforge.json"),
    read("analytics-cron.json"),
  ]);
  return { base: base_url, token: token_cron };
}

const previous = JSON.parse(await readFile(OUT, "utf8"));
const { base, token } = await credentials();
const data = fromAnalytics(await fetchAnalytics(base, token), previous.followers?.facebook ?? 0);

if (data.videos.length < MIN_VIDEOS) {
  console.error(`Solo hay ${data.videos.length} vídeos: no sobrescribo social.json.`);
  process.exit(1);
}
await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
console.info(
  `social.json actualizado (${data.updatedAt}): ${data.videos.length} vídeos, ` +
    `${data.views} visualizaciones, seguidores ${JSON.stringify(data.followers)}`
);
