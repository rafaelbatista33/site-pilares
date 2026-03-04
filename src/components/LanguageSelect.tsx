// src/components/LanguageSelect.tsx
import React from "react";
import { useI18n } from "../i18n/I18nProvider";
import type { Lang } from "../i18n/translations";

interface LanguageSelectProps {
  className?: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ className }) => {
  const { lang, setLang } = useI18n();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value as Lang);
  };

  return (
    <select
      className={className ?? "lang-select"}
      value={lang}
      onChange={handleChange}
    >
      <option value="pt-BR">🇧🇷 PT</option>
      <option value="en-US">🇬🇧 EN</option>
      <option value="es">🇪🇸 ES</option>
    </select>
  );
};

export default LanguageSelect;
