export type ServiceId =
  | "automatizaciones"
  | "webs"
  | "shopify"
  | "consultoria"
  | "mentoria"
  | "colaboraciones";

export type WhoId = "negocio" | "vender" | "aprender" | "marca";

export type ServiceIcon = "zap" | "window" | "bag" | "compass" | "users" | "clapper";
export type WhoIcon = "store" | "cart" | "cap" | "megaphone";

export interface Service {
  id: ServiceId;
  /** Nombre de la pestaña. */
  name: string;
  /** Nombre dentro de una frase ("Te encajan 2 servicios: webs y …"). */
  inline: string;
  icon: ServiceIcon;
  who: WhoId[];
  title: string;
  one: string;
  fit: string[];
  cta: string;
  /** Lista de espera: botón secundario y etiqueta "Sin plazas ahora mismo". */
  waitlist?: boolean;
  /** Muestra el enlace "Ver mis vídeos". */
  moreVideos?: boolean;
  /** Forma del objeto que se transforma y tono del escenario. */
  shape: { w: number; h: number; r: number; bg: string; ob: string; tilt: string; ms: number };
}

export const services: Service[] = [
  {
    id: "automatizaciones",
    name: "Automatizaciones e IA",
    inline: "automatizaciones e IA",
    icon: "zap",
    who: ["negocio"],
    title: "Que tu negocio haga solo lo repetitivo.",
    one: "Apps y herramientas a medida que responden a clientes, organizan datos o generan documentos por ti.",
    fit: [
      "Haces las mismas tareas cada día",
      "Contestas mensajes fuera de horario",
      "Pierdes horas pasando datos de un sitio a otro",
    ],
    cta: "Cuéntame tu caso",
    shape: { w: 270, h: 520, r: 38, bg: "#EEF3F1", ob: "#ECE5DD", tilt: "-2deg", ms: 0.62 },
  },
  {
    id: "webs",
    name: "Webs",
    inline: "webs",
    icon: "window",
    who: ["negocio", "vender"],
    title: "Una web profesional, en días.",
    one: "Rápida, pensada para el móvil y para Google. El dominio y el hosting van a tu nombre.",
    fit: [
      "No tienes web o tienes una antigua",
      "Quieres que te encuentren en Google",
      "Necesitas algo bonito sin pagar una agencia",
    ],
    cta: "Pedir presupuesto",
    shape: { w: 520, h: 360, r: 14, bg: "#EFF1F5", ob: "#FFFFFF", tilt: "1.5deg", ms: 0.6 },
  },
  {
    id: "shopify",
    name: "Tiendas Shopify",
    inline: "tiendas Shopify",
    icon: "bag",
    who: ["vender"],
    title: "Una tienda online lista para vender.",
    one: "Diseño, productos, pagos y envíos configurados. Los pedidos llegan solos y ya pagados.",
    fit: [
      "Vendes por Instagram o WhatsApp",
      "Apuntas los pedidos a mano",
      "Quieres dar el salto a vender online",
    ],
    cta: "Pedir presupuesto",
    shape: { w: 470, h: 400, r: 22, bg: "#F5F1EC", ob: "#FFFFFF", tilt: "-1.5deg", ms: 0.62 },
  },
  {
    id: "consultoria",
    name: "Consultoría",
    inline: "consultoría",
    icon: "compass",
    who: ["negocio", "aprender"],
    title: "Saber dónde te ayuda la IA, de verdad.",
    one: "Revisamos tus procesos y sales con un plan concreto: qué automatizar, con qué herramientas y en qué orden.",
    fit: [
      "Sabes que la IA te ayudaría, pero no por dónde empezar",
      "Hay demasiadas herramientas y no sabes cuál",
      "Quieres un plan antes de invertir",
    ],
    cta: "Reservar una llamada",
    shape: { w: 380, h: 470, r: 6, bg: "#F2F2F4", ob: "#FFFFFF", tilt: "2deg", ms: 0.64 },
  },
  {
    id: "mentoria",
    name: "Mentoría",
    inline: "mentoría",
    icon: "users",
    who: ["aprender"],
    title: "Aprende a construir con IA tú mismo.",
    one: "Construyes un proyecto real tuyo y yo te guío, sesión a sesión, por videollamada.",
    fit: [
      "Quieres usar agentes de IA para programar",
      "Tienes una idea y quieres sacarla tú",
      "Aprendes mejor haciendo que viendo cursos",
    ],
    cta: "Apuntarme a la lista",
    waitlist: true,
    shape: { w: 520, h: 320, r: 18, bg: "#EDEEF4", ob: "#1C1D22", tilt: "-1deg", ms: 0.6 },
  },
  {
    id: "colaboraciones",
    name: "Colaboraciones",
    inline: "colaboraciones",
    icon: "clapper",
    who: ["marca"],
    title: "Tu producto, contado por alguien que lo usa.",
    one: "Vídeos cortos en TikTok, Reels y Shorts, y vídeos largos en YouTube. Con métricas reales.",
    fit: [
      "Tu producto tiene que ver con IA, tecnología o productividad",
      "Buscas un público que quiere aprender",
      "Prefieres contenido honesto a un anuncio",
    ],
    cta: "Pedir el media kit",
    moreVideos: true,
    shape: { w: 260, h: 462, r: 22, bg: "#ECEFFC", ob: "#0B1240", tilt: "1deg", ms: 0.68 },
  },
];

export const whoOptions: { id: WhoId; title: string; sub: string; icon: WhoIcon }[] = [
  {
    id: "negocio",
    title: "Tengo un negocio",
    sub: "Quiero ahorrar tiempo o atraer clientes",
    icon: "store",
  },
  {
    id: "vender",
    title: "Quiero vender online",
    sub: "Tengo productos y quiero una tienda",
    icon: "cart",
  },
  {
    id: "aprender",
    title: "Quiero aprender IA",
    sub: "Para mi trabajo o mis proyectos",
    icon: "cap",
  },
  {
    id: "marca",
    title: "Tengo una marca",
    sub: "Busco creadores que la cuenten",
    icon: "megaphone",
  },
];
