import "server-only";
import en, { type Dictionary } from "./en";
import hi from "./hi";
import mr from "./mr";
import de from "./de";
import es from "./es";
import fr from "./fr";
import ja from "./ja";
import type { Locale } from "../config";
import { getLocale } from "../request";

const dictionaries: Record<Locale, Dictionary> = { en, hi, mr, de, es, fr, ja };

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** Dictionary for the current request (after setLocale). */
export const getT = () => dictionaries[getLocale()];
