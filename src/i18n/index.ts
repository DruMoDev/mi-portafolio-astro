import type { Locale, Translations } from '../types';
import { es } from './es';
import { en } from './en';

export const translations: Record<Locale, Translations> = {
  es,
  en,
};

export const defaultLocale: Locale = 'es';

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[defaultLocale];
}

export function getLocalePath(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Spanish is the default locale, no prefix needed
  if (locale === 'es') {
    return cleanPath ? `/${cleanPath}` : '/';
  }
  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}

export function getProjectsPath(locale: Locale): string {
  return locale === 'es' ? 'proyectos' : 'projects';
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  // Only 'en' has prefix, everything else is Spanish
  if (segment === 'en') {
    return 'en';
  }
  return defaultLocale;
}
