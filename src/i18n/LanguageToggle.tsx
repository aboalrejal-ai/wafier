import { useLanguage } from "./LanguageProvider";

/** Compact عربي | English switcher used on login and sidebar. */
export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      style={{
        display: "inline-flex",
        borderRadius: 10,
        border: "1px solid hsl(var(--color-gray-200))",
        overflow: "hidden",
        background: "#fff",
        fontSize: compact ? 11 : 12,
        fontFamily: "inherit",
      }}
    >
      <button
        type="button"
        onClick={() => setLang("ar")}
        style={{
          padding: compact ? "6px 10px" : "8px 12px",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: lang === "ar" ? 700 : 500,
          background: lang === "ar" ? "hsl(var(--color-sa-600))" : "transparent",
          color: lang === "ar" ? "#fff" : "hsl(var(--color-gray-600))",
        }}
      >
        {t("common.arabic")}
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        style={{
          padding: compact ? "6px 10px" : "8px 12px",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: lang === "en" ? 700 : 500,
          background: lang === "en" ? "hsl(var(--color-sa-600))" : "transparent",
          color: lang === "en" ? "#fff" : "hsl(var(--color-gray-600))",
        }}
      >
        {t("common.english")}
      </button>
    </div>
  );
}
