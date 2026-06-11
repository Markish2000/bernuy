import { getRequestConfig } from 'next-intl/server';
import { isLocale, routing } from './routing';

type Messages = { [key: string]: string | Messages };

/** Carga superficial de un diccionario; devuelve {} si no existe. */
async function load(name: string): Promise<Messages> {
  try {
    return (await import(`../../messages/${name}.json`)).default as Messages;
  } catch {
    return {};
  }
}

/** Merge profundo (overrides de país sobre base idiomática). */
function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    if (
      current &&
      typeof current === 'object' &&
      value &&
      typeof value === 'object'
    ) {
      result[key] = deepMerge(current, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : routing.defaultLocale;

  const language = locale.split('-')[0]; // 'es' | 'pt' | 'en'
  const baseName = language === 'es' ? 'es' : locale;

  const base = await load(baseName);
  const variant = baseName === locale ? {} : await load(locale);

  return { locale, messages: deepMerge(base, variant) };
});
