import { translations, type Locale } from './translations.js';

/**
 * Get translation function for a specific locale
 */
export function useTranslations(locale: Locale) {
  const t = translations[locale] || translations.fr;
  
  return function(key: string): string {
    const keys = key.split('.');
    let value: any = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale ${locale}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}

/**
 * Get current locale from URL pathname
 */
export function getLocaleFromUrl(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  
  if (locale === 'en') {
    return 'en';
  }
  
  return 'fr'; // Default locale
}

/**
 * Remove locale prefix from pathname
 */
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en') {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

/**
 * Add locale prefix to pathname
 */
export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (locale === 'fr') {
    return pathname; // French is the default locale, no prefix needed
  }
  
  const cleanPath = removeLocaleFromPath(pathname);
  return `/${locale}${cleanPath}`;
}

/**
 * Get alternate language URLs
 */
export function getAlternateUrls(pathname: string) {
  const cleanPath = removeLocaleFromPath(pathname);
  
  return {
    fr: cleanPath,
    en: `/en${cleanPath}`
  };
}