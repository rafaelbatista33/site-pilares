// src/i18n/I18nProvider.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, defaultLocale, type Locale } from "./translations";

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale | string) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nCtx>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (k) => k,
});

const SUPPORTED: readonly Locale[] = ["pt", "en", "es"] as const;

function resolveLocale(raw?: string | null): Locale {
  const base = (raw ?? defaultLocale).split("-")[0] as Locale;
  return (SUPPORTED as readonly string[]).includes(base) ? base : defaultLocale;
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() =>
    resolveLocale(localStorage.getItem("lang") || navigator.language)
  );

  useEffect(() => {
    localStorage.setItem("lang", locale);
  }, [locale]);

  const dict = translations[locale] ?? translations[defaultLocale];

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      // navega pelas chaves: "header.home" etc.
      const value = key
        .split(".")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce<any>(
          (acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined),
          dict
        );

      let out = (value ?? key) as string;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replaceAll(`{{${k}}}`, String(v));
        }
      }
      return out;
    },
    [dict]
  );

  const setLocale = (l: Locale | string) => setLocaleState(resolveLocale(l));

  const ctx = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={ctx}>{children}</I18nContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = () => useContext(I18nContext);
