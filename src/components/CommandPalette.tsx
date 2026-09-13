import { useEffect, useMemo, useState } from "react";
import { useT, type TranslationKey } from "../i18n";

export type AppPage =
  | "dashboard"
  | "forecast"
  | "ai"
  | "profile"
  | "about"
  | "hackathon-kb"
  | "hackathon-gaps"
  | "hackathon-readiness";

type NavItem = {
  id: AppPage;
  labelKey: TranslationKey;
  keywords: string;
};

const NAV: NavItem[] = [
  { id: "dashboard", labelKey: "nav.dashboard", keywords: "dashboard home لوحة" },
  { id: "forecast", labelKey: "nav.forecast", keywords: "forecast prediction توقع" },
  { id: "ai", labelKey: "nav.ai", keywords: "ai assistant مساعد" },
  { id: "profile", labelKey: "nav.profile", keywords: "profile account حساب" },
  { id: "about", labelKey: "nav.about", keywords: "about team عن فريق" },
  { id: "hackathon-kb", labelKey: "nav.hackathonKb", keywords: "knowledge base معرفة" },
  { id: "hackathon-gaps", labelKey: "nav.hackathonGaps", keywords: "gaps فجوات" },
  { id: "hackathon-readiness", labelKey: "nav.hackathonReadiness", keywords: "readiness جاهزية" },
];

export default function CommandPalette({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: AppPage) => void;
}) {
  const t = useT();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.filter((item) => {
      const label = t(item.labelKey).toLowerCase();
      return label.includes(q) || item.keywords.toLowerCase().includes(q) || item.id.includes(q);
    });
  }, [query, t]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("common.search")}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15, 23, 42, 0.45)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12vh 16px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 520,
          borderRadius: 14,
          border: "1px solid var(--border)",
          background: "var(--card)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("common.searchPlaceholder")}
          style={{
            width: "100%",
            border: "none",
            borderBottom: "1px solid var(--border)",
            padding: "14px 16px",
            fontSize: 15,
            fontFamily: "inherit",
            background: "transparent",
            color: "var(--foreground)",
            outline: "none",
          }}
        />
        <div style={{ maxHeight: 320, overflowY: "auto", padding: 8 }}>
          {filtered.length === 0 ? (
            <p style={{ margin: 0, padding: 16, color: "var(--muted-foreground)", fontSize: 13, textAlign: "center" }}>
              {t("common.noResults")}
            </p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  border: "none",
                  borderRadius: 10,
                  background: "transparent",
                  color: "var(--foreground)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {t(item.labelKey)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
