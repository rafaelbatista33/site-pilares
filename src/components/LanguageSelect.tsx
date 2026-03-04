import React from "react";
import { useI18n } from "../i18n/I18nProvider";
import type { Locale } from "../i18n/translations";

interface LanguageSelectProps {
  className?: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ className }) => {
  const { locale, setLocale } = useI18n();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as Locale);
  };

  return (
    <select
      className={className ?? "lang-select"}
      value={locale}
      onChange={handleChange}
    >
      <option value="pt">🇧🇷 PT</option>
      <option value="en">🇬🇧 EN</option>
      <option value="es">🇪🇸 ES</option>
    </select>
  );
};

export default LanguageSelect;
