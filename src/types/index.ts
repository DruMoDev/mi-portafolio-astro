// Site configuration types
export interface SiteConfig {
  name: string;
  url: string;
  author: {
    realName: string;
    displayName: string;
    email: string;
    avatar: string;
  };
  social: SocialLink[];
  defaultLocale: Locale;
  locales: Locale[];
}

export type Locale = 'es' | 'en';

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// Resume/Skills types
export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools';

export interface Experience {
  company: string;
  role: {
    es: string;
    en: string;
  };
  location: {
    es: string;
    en: string;
  };
  startDate: string;
  endDate: string | 'present';
  highlights: {
    es: string[];
    en: string[];
  };
  technologies: string[];
}

export interface ResumeData {
  skills: Skill[];
  skillCategories: Record<SkillCategory, string>;
}

// SEO types
export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  locale?: Locale;
}

// i18n types
export interface Translations {
  nav: {
    home: string;
    about: string;
    stack: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    viewProjects: string;
    contact: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio: string;
  };
  stack: {
    title: string;
    subtitle: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewCode: string;
    viewDemo: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
    email: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    rights: string;
    builtWith: string;
  };
  project: {
    backToProjects: string;
    techStack: string;
    links: string;
    viewDemo: string;
    viewCode: string;
  };
  common: {
    switchLang: string;
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
    downloadCV: string;
  };
}
