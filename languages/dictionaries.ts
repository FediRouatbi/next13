import "server-only";

const dictionaries = {
  en: () => import("@/languages/en.json").then((module) => module.default),
  fr: () => import("@/languages/fr.json").then((module) => module.default),
} ;

export const getDictionary = async (locale: keyof typeof dictionaries) =>
  dictionaries[locale]();
