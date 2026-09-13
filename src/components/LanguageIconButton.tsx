import { Icons } from "./Icons";
import { useLanguage, useT } from "../i18n";

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
      className="tool-btn"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid color-mix(in srgb, var(--border) 50%, transparent)",
        background: "var(--card)",
        color: "var(--muted-foreground)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--surface-muted)";
        e.currentTarget.style.color = "var(--foreground)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--card)";
        e.currentTarget.style.color = "var(--muted-foreground)";
      }}
    >
      <Icons.Languages size={20} strokeWidth={1.8} />
    </button>
  );
}
