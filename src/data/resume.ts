import type { ResumeData, Locale, Experience } from "../types";

const skillCategoriesEs: ResumeData["skillCategories"] = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Bases de Datos",
  devops: "DevOps",
  ai: "IA & Agentes",
  tools: "Otras Herramientas",
};

const skillCategoriesEn: ResumeData["skillCategories"] = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  devops: "DevOps",
  ai: "AI & Agents",
  tools: "Other Tools",
};

export const skillCategories: Record<Locale, ResumeData["skillCategories"]> = {
  es: skillCategoriesEs,
  en: skillCategoriesEn,
};

export const resumeData: ResumeData = {
  skillCategories: skillCategoriesEs,
  skills: [
    // Frontend
    { name: "React", icon: "logos:react", category: "frontend" },
    { name: "Next.js", icon: "logos:nextjs-icon", category: "frontend" },
    {
      name: "TypeScript",
      icon: "logos:typescript-icon",
      category: "frontend",
    },
    {
      name: "JavaScript",
      icon: "logos:javascript",
      category: "frontend",
    },
    {
      name: "TailwindCSS",
      icon: "logos:tailwindcss-icon",
      category: "frontend",
    },
    { name: "CSS", icon: "logos:css-3", category: "frontend" },
    { name: "HTML", icon: "logos:html-5", category: "frontend" },
    { name: "Liquid", icon: "logos:shopify", category: "frontend" },
    { name: "Polaris", icon: "logos:shopify", category: "frontend" },

    // Backend
    { name: "Node.js", icon: "logos:nodejs-icon", category: "backend" },
    {
      name: "Express",
      icon: "devicon:express",
      category: "backend",
    },
    { name: "Python", icon: "logos:python", category: "backend" },
    { name: "REST APIs", icon: "ArrowRightLeft", category: "backend" },
    { name: "GraphQL", icon: "logos:graphql", category: "backend" },
    { name: "OOP", icon: "Box", category: "backend" },
    { name: "Hexagonal Arch", icon: "Hexagon", category: "backend" },
    { name: "Clean Arch", icon: "ShieldCheck", category: "backend" },
    { name: "DDD", icon: "Boxes", category: "backend" },
    { name: "Design Patterns", icon: "LayoutTemplate", category: "backend" },
    { name: "SOLID", icon: "CheckSquare", category: "backend" },

    // DevOps
    { name: "Docker", icon: "logos:docker-icon", category: "devops" },
    { name: "CI/CD", icon: "GitMerge", category: "devops" },
    { name: "Git", icon: "logos:git-icon", category: "devops" },
    { name: "Testing", icon: "FlaskConical", category: "devops" },
    { name: "Agile/Scrum", icon: "Users", category: "devops" },

    // Database
    {
      name: "PostgreSQL",
      icon: "logos:postgresql",
      category: "database",
    },
    { name: "MongoDB", icon: "logos:mongodb-icon", category: "database" },
    { name: "MySQL", icon: "logos:mysql-icon", category: "database" },
    { name: "SQLite", icon: "logos:sqlite", category: "database" },

    // AI & Agents
    { name: "Claude", icon: "logos:claude-icon", category: "ai" },
    { name: "Cursor IDE", icon: "Terminal", category: "ai" },
    { name: "GitHub Copilot", icon: "logos:github-copilot", category: "ai" },
    { name: "Antigravity", icon: "Rocket", category: "ai" },
    { name: "Prompt Eng.", icon: "MessageSquare", category: "ai" },
    { name: "AI Agents", icon: "Bot", category: "ai" },
    { name: "Context Mgmt", icon: "Brain", category: "ai" },
    { name: "Skills & Workflows", icon: "Workflow", category: "ai" },
  ],
};

export const experiences: Experience[] = [
  {
    company: "Fantasticfy",
    role: {
      es: "Desarrollador Full Stack",
      en: "Full Stack Developer",
    },
    location: {
      es: "Barcelona",
      en: "Barcelona",
    },
    startDate: "2025-04",
    endDate: "present",
    highlights: {
      es: [
        "Lidero la adopción de herramientas IA (Claude, Cursor) formando a un equipo de 5 personas, mejorando la eficiencia en un 50%.",
        "Desarrollo aplicaciones Shopify end-to-end (frontend y backend) con CI/CD en Azure y Docker.",
        "Implemento Arquitectura Hexagonal y DDD, facilitando el trabajo en equipo y mejorando la escalabilidad.",
        "Actúo como punto de contacto con clientes, traduciendo requisitos de negocio en soluciones técnicas.",
        "Construyo componentes personalizados con Liquid, Polaris y React para experiencias de comerciante únicas.",
      ],
      en: [
        "Lead the adoption of AI tools (Claude, Cursor) training a team of 5, improving efficiency by 50%.",
        "Develop Shopify applications end-to-end (frontend and backend) with CI/CD on Azure and Docker.",
        "Implement Hexagonal Architecture and DDD, enabling better team collaboration and improving scalability.",
        "Act as the main contact point with clients, translating business requirements into technical solutions.",
        "Build custom components with Liquid, Polaris and React for unique merchant experiences.",
      ],
    },
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Shopify",
      "Azure",
      "Docker",
      "Hexagonal Arch",
    ],
  },
  {
    company: "Credible",
    role: {
      es: "Cofundador y Desarrollador Full Stack",
      en: "Co-founder & Full Stack Developer",
    },
    location: {
      es: "Barcelona (Remoto)",
      en: "Barcelona (Remote)",
    },
    startDate: "2024-12",
    endDate: "2026-01",
    highlights: {
      es: [
        "Cofundé una startup SaaS con equipo internacional (100% en inglés), participando en estrategia y desarrollo.",
        "Diseñé e implementé arquitectura frontend con React, TypeScript y Clean Architecture.",
        "Colaboré con backend en Python para integrar modelos de IA y asegurar una experiencia fluida.",
        "Seleccionado por EWOR, acelerador europeo de primer nivel para fundadores de alto potencial.",
      ],
      en: [
        "Co-founded a SaaS startup with an international team (100% English), contributing to strategy and development.",
        "Designed and implemented frontend architecture with React, TypeScript and Clean Architecture.",
        "Collaborated with Python backend to integrate AI models and ensure a seamless user experience.",
        "Selected by EWOR, a top-tier European accelerator for high-potential founders.",
      ],
    },
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "Clean Architecture",
      "SaaS",
      "AI",
    ],
  },
  {
    company: "IMPAKTER",
    role: {
      es: "Desarrollador Full Stack",
      en: "Full Stack Developer",
    },
    location: {
      es: "Londres (Remoto)",
      en: "London (Remote)",
    },
    startDate: "2024-09",
    endDate: "2025-04",
    highlights: {
      es: [
        "Lideré el desarrollo de plataforma de sostenibilidad con datos de +3.000 empresas, usando Next.js y TypeScript.",
        "Diseñé un motor de comparación para análisis de métricas ESG entre empresas.",
        "Automaticé la migración de datos y gestioné el flujo de información con el equipo de analistas.",
        "Implementación pixel-perfect de diseños en Figma con buenas prácticas de accesibilidad.",
      ],
      en: [
        "Led full development of sustainability platform with data from 3,000+ companies, using Next.js and TypeScript.",
        "Designed a comparison engine for ESG metrics analysis across companies.",
        "Automated data migration and managed information flow with the analyst team.",
        "Pixel-perfect implementation of Figma designs with accessibility best practices.",
      ],
    },
    technologies: ["Next.js", "TypeScript", "Figma", "ESG", "Data Automation"],
  },
];
