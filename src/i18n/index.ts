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
  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}

export function getProjectsPath(locale: Locale): string {
  return locale === 'es' ? 'proyectos' : 'projects';
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'es' || locale === 'en') {
    return locale;
  }
  return defaultLocale;
}
