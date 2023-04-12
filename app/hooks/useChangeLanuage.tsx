// core
import { useEffect } from "react";

// i18n
import { useTranslation } from "react-i18next";

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}
