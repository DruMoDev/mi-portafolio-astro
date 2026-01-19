import type { ResumeData, Locale } from '../types';

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
