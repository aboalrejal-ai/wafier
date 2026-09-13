import { useLanguage, useT } from "../i18n";

function LanguagesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14" />
      <path d="M5 8c0 4.5 3 8 7 9" />
      <path d="M19 8c0 4.5-3 8-7 9" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
      <path d="M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

/** Ghost Languages icon — same idea as aboalrejal LanguageSwitcher. */
export default function LanguageIconButton() {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const tooltip = lang === "en" ? t("common.arabic") : t("common.english");

  return (
    <button
      type="button"
      title={tooltip}
      aria-label={tooltip}
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--muted-foreground)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <LanguagesIcon />
    </button>
  );
}
