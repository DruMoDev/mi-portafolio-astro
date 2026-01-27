import type { ResumeData, Locale, Experience } from '../types';

const skillCategoriesEs: ResumeData['skillCategories'] = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Bases de Datos',
  devops: 'DevOps',
  tools: 'Otras Herramientas',
};

const skillCategoriesEn: ResumeData['skillCategories'] = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  devops: 'DevOps',
  tools: 'Other Tools',
};

export const skillCategories: Record<Locale, ResumeData['skillCategories']> = {
  es: skillCategoriesEs,
  en: skillCategoriesEn,
};

export const resumeData: ResumeData = {
  skillCategories: skillCategoriesEs,
  skills: [
    // Frontend
    { name: 'React', icon: 'Atom', category: 'frontend' },
    { name: 'Next.js', icon: 'Globe', category: 'frontend' },
    { name: 'Angular', icon: 'Triangle', category: 'frontend' },
    { name: 'Astro', icon: 'Rocket', category: 'frontend' },
    { name: 'TypeScript', icon: 'FileCode', category: 'frontend' },
    { name: 'JavaScript', icon: 'Braces', category: 'frontend' },
    { name: 'TailwindCSS', icon: 'Paintbrush', category: 'frontend' },
    { name: 'CSS', icon: 'Palette', category: 'frontend' },
    { name: 'HTML', icon: 'Code', category: 'frontend' },

    // Backend
    { name: 'Node.js', icon: 'Server', category: 'backend' },
    { name: 'Express', icon: 'Layers', category: 'backend' },
    { name: 'REST APIs', icon: 'ArrowRightLeft', category: 'backend' },
    { name: 'GraphQL', icon: 'Share2', category: 'backend' },
    { name: 'Hexagonal Arch', icon: 'Hexagon', category: 'backend' },
    { name: 'Design Patterns', icon: 'Boxes', category: 'backend' },
    { name: 'SOLID', icon: 'CheckSquare', category: 'backend' },

    // Database
    { name: 'PostgreSQL', icon: 'Database', category: 'database' },
    { name: 'MongoDB', icon: 'Leaf', category: 'database' },
    { name: 'MySQL', icon: 'Cylinder', category: 'database' },
    { name: 'SQLite', icon: 'HardDrive', category: 'database' },

    // DevOps
    { name: 'Docker', icon: 'Container', category: 'devops' },
    { name: 'CI/CD', icon: 'GitMerge', category: 'devops' },
    { name: 'Azure', icon: 'Cloud', category: 'devops' },
    { name: 'Git', icon: 'GitBranch', category: 'devops' },
    { name: 'Testing', icon: 'FlaskConical', category: 'devops' },

    // Tools & Other
    { name: 'Shopify', icon: 'ShoppingBag', category: 'tools' },
    { name: 'Liquid', icon: 'Droplet', category: 'tools' },
    { name: 'Polaris', icon: 'Star', category: 'tools' },
    { name: 'Agile/Scrum', icon: 'Users', category: 'tools' },
    { name: 'Pair Programming', icon: 'UsersRound', category: 'tools' },
  ],
};

export const experiences: Experience[] = [
  {
    company: 'Fantasticfy',
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer',
    },
    location: {
      es: 'Barcelona',
      en: 'Barcelona',
    },
    startDate: '2025-04',
    endDate: 'present',
    highlights: {
      es: [
        'Introduje Hexagonal Architecture, mejorando escalabilidad y mantenibilidad del código.',
        'Lideré la adopción de Cursor (IDE con IA), aumentando la productividad del equipo.',
        'Entregué múltiples aplicaciones Shopify end-to-end con CI/CD en Azure y Docker.',
        'Construí módulos internos reutilizables usando OOP y Design Patterns.',
      ],
      en: [
        'Introduced Hexagonal Architecture, improving code scalability and maintainability.',
        'Led Cursor (AI-powered IDE) adoption, increasing team productivity.',
        'Delivered multiple Shopify apps end-to-end with CI/CD on Azure and Docker.',
        'Built reusable internal modules using OOP and Design Patterns.',
      ],
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'Shopify', 'Docker', 'Azure'],
  },
  {
    company: 'Credible',
    role: {
      es: 'Cofundador y Desarrollador Full Stack',
      en: 'Co-founder & Full Stack Developer',
    },
    location: {
      es: 'Barcelona',
      en: 'Barcelona',
    },
    startDate: '2024-12',
    endDate: 'present',
    highlights: {
      es: [
        'Co-construí una plataforma SaaS impulsada por IA para perfiles profesionales dinámicos.',
        'Diseñé la arquitectura frontend con React + TypeScript pensando en escalabilidad.',
        'Seleccionado por EWOR, acelerador europeo de primer nivel para fundadores de alto potencial.',
      ],
      en: [
        'Co-built an AI-powered SaaS platform for dynamic professional profiles.',
        'Designed frontend architecture with React + TypeScript for scalability.',
        'Selected by EWOR, a top European accelerator for high-potential founders.',
      ],
    },
    technologies: ['React', 'TypeScript', 'Python', 'AI/ML'],
  },
  {
    company: 'IMPAKTER',
    role: {
      es: 'Desarrollador Full Stack',
      en: 'Full Stack Developer',
    },
    location: {
      es: 'Londres (Remoto)',
      en: 'London (Remote)',
    },
    startDate: '2024-09',
    endDate: '2025-02',
    highlights: {
      es: [
        'Construí plataforma de sostenibilidad agregando datos de +3.000 empresas.',
        'Creé motor de comparación para análisis de métricas de sostenibilidad.',
        'Automaticé migración de datos, reduciendo procesos manuales y errores.',
        'Implementé diseños Figma con precisión pixel-perfect y accesibilidad.',
      ],
      en: [
        'Built sustainability platform aggregating data from 3,000+ companies.',
        'Created comparison engine for sustainability metrics analysis.',
        'Automated data migration, reducing manual processes and errors.',
        'Implemented Figma designs with pixel-perfect precision and accessibility.',
      ],
    },
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Figma'],
  },
];
