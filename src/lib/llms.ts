// llms.txt (https://llmstxt.org): resumen en Markdown de la web para ChatGPT, Claude y
// demás IAs. Lo sirve src/pages/llms.txt.ts en el build, con las guías vigentes al día.

interface GuiaLlms {
  id: string;
  data: { title: string; description: string };
}

export function llmsTxt(base: string, guias: readonly GuiaLlms[]): string {
  const lista = guias
    .map((g) => `- [${g.data.title}](${base}/guias/${g.id}/): ${g.data.description}`)
    .join("\n");
  return `# Dru Morera (@soydruia)

> Roger Morera, conocido como Dru, es programador freelance y creador de contenido sobre inteligencia artificial (@soydruia en TikTok, Instagram, Facebook y YouTube). Programa con IA desde hace cuatro años. Construye para negocios, enseña a usar la IA y lo cuenta en vídeo. Trabaja en español, en remoto, desde España.

## Servicios

- [Automatizaciones e IA](${base}/#automatizaciones): apps y herramientas a medida que responden a clientes, organizan datos o generan documentos. Para negocios que repiten tareas cada día, contestan mensajes fuera de horario o pasan datos a mano de un sitio a otro.
- [Webs](${base}/#webs): webs profesionales en días, rápidas, pensadas para el móvil y para Google. Sin mensualidades: se paga una vez y la web es del cliente.
- [Tiendas Shopify](${base}/#shopify): tiendas online listas para vender, con diseño, productos, pagos y envíos configurados. También para negocios con tienda física que quieren vender online.
- [Consultoría](${base}/#consultoria): revisión de procesos y un plan concreto de qué automatizar con IA, con qué herramientas y en qué orden.
- [Mentoría](${base}/#mentoria): aprender a construir con IA y agentes sobre un proyecto real propio, por videollamada. Ahora mismo con lista de espera.
- [Colaboraciones](${base}/#colaboraciones): vídeos cortos (TikTok, Reels, Shorts) y largos (YouTube) para marcas de tecnología, IA o productividad, con un público adulto que trabaja y quiere aprender. Más de 5.000 seguidores entre Instagram, Facebook, YouTube y TikTok.

## Guías

- [Guías](${base}/guias/): guías paso a paso de lo que Dru explica en sus vídeos (Claude Code, skills, prompts, webs con IA), con los comandos y prompts listos para copiar.
${lista}

## Contacto

- Formulario en ${base}/#contacto
- Email: contacto@drumorera.com
- WhatsApp: https://wa.me/34617587034
- TikTok: https://www.tiktok.com/@soydruia
- Instagram: https://www.instagram.com/soydruia
- YouTube: https://www.youtube.com/@soydruia
- GitHub: https://github.com/DruMoDev
- LinkedIn: https://www.linkedin.com/in/roger-morera/
`;
}
