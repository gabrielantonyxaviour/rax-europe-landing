// i18n configuration for Rax Europe
// Supports all major European languages

export const locales = [
  'en',  // English (default)
  'pl',  // Polish (Poland)
  'de',  // German
  'fr',  // French
  'es',  // Spanish
  'it',  // Italian
  'nl',  // Dutch
  'pt',  // Portuguese
  'cs',  // Czech
  'sk',  // Slovak
  'ro',  // Romanian
  'hu',  // Hungarian
  'sv',  // Swedish
  'da',  // Danish
  'fi',  // Finnish
  'no',  // Norwegian
  'el',  // Greek
  'bg',  // Bulgarian
  'hr',  // Croatian
  'sl',  // Slovenian
  'lt',  // Lithuanian
  'lv',  // Latvian
  'et',  // Estonian
  'uk',  // Ukrainian
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Language names in their native language
export const languageNames: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  nl: 'Nederlands',
  pt: 'Português',
  cs: 'Čeština',
  sk: 'Slovenčina',
  ro: 'Română',
  hu: 'Magyar',
  sv: 'Svenska',
  da: 'Dansk',
  fi: 'Suomi',
  no: 'Norsk',
  el: 'Ελληνικά',
  bg: 'Български',
  hr: 'Hrvatski',
  sl: 'Slovenščina',
  lt: 'Lietuvių',
  lv: 'Latviešu',
  et: 'Eesti',
  uk: 'Українська',
};

// Country code to locale mapping for geo-detection
export const countryToLocale: Record<string, Locale> = {
  // English-speaking countries
  GB: 'en',
  IE: 'en',
  // Poland
  PL: 'pl',
  // Germany, Austria, Switzerland (German)
  DE: 'de',
  AT: 'de',
  CH: 'de',
  // France, Belgium (French), Monaco
  FR: 'fr',
  BE: 'fr',
  MC: 'fr',
  // Spain
  ES: 'es',
  // Italy, San Marino, Vatican
  IT: 'it',
  SM: 'it',
  VA: 'it',
  // Netherlands
  NL: 'nl',
  // Portugal
  PT: 'pt',
  // Czech Republic
  CZ: 'cs',
  // Slovakia
  SK: 'sk',
  // Romania
  RO: 'ro',
  // Hungary
  HU: 'hu',
  // Sweden
  SE: 'sv',
  // Denmark
  DK: 'da',
  // Finland
  FI: 'fi',
  // Norway
  NO: 'no',
  // Greece, Cyprus
  GR: 'el',
  CY: 'el',
  // Bulgaria
  BG: 'bg',
  // Croatia
  HR: 'hr',
  // Slovenia
  SI: 'sl',
  // Lithuania
  LT: 'lt',
  // Latvia
  LV: 'lv',
  // Estonia
  EE: 'et',
  // Ukraine
  UA: 'uk',
};

// Flag emojis for each locale (for visual representation)
export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  pl: '🇵🇱',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
  it: '🇮🇹',
  nl: '🇳🇱',
  pt: '🇵🇹',
  cs: '🇨🇿',
  sk: '🇸🇰',
  ro: '🇷🇴',
  hu: '🇭🇺',
  sv: '🇸🇪',
  da: '🇩🇰',
  fi: '🇫🇮',
  no: '🇳🇴',
  el: '🇬🇷',
  bg: '🇧🇬',
  hr: '🇭🇷',
  sl: '🇸🇮',
  lt: '🇱🇹',
  lv: '🇱🇻',
  et: '🇪🇪',
  uk: '🇺🇦',
};
