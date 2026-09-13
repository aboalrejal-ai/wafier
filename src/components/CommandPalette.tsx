import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useT, type TranslationKey } from "../i18n";
import { Icons, type IconName } from "./Icons";

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
  icon: IconName;
};

const NAV: NavItem[] = [
  { id: "dashboard", labelKey: "nav.dashboard", keywords: "dashboard home لوحة", icon: "LayoutDashboard" },
  { id: "forecast", labelKey: "nav.forecast", keywords: "forecast prediction توقع", icon: "FileText" },
  { id: "ai", labelKey: "nav.ai", keywords: "ai assistant مساعد", icon: "Sparkles" },
  { id: "profile", labelKey: "nav.profile", keywords: "profile account حساب", icon: "User" },
  { id: "about", labelKey: "nav.about", keywords: "about team عن فريق", icon: "Info" },
  { id: "hackathon-kb", labelKey: "nav.hackathonKb", keywords: "knowledge base معرفة", icon: "FileText" },
  { id: "hackathon-gaps", labelKey: "nav.hackathonGaps", keywords: "gaps فجوات", icon: "AlertTriangle" },
  { id: "hackathon-readiness", labelKey: "nav.hackathonReadiness", keywords: "readiness جاهزية", icon: "Check" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

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
  const reduceMotion = useReducedMotion();
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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t("common.search")}
          onClick={onClose}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE }}
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
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", borderBottom: "1px solid var(--border)" }}>
              <Icons.Search size={18} strokeWidth={2} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.searchPlaceholder")}
                style={{
                  flex: 1,
                  border: "none",
                  padding: "14px 0",
                  fontSize: 15,
                  fontFamily: "inherit",
                  background: "transparent",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ maxHeight: 320, overflowY: "auto", padding: 8 }}>
              {filtered.length === 0 ? (
                <p style={{ margin: 0, padding: 16, color: "var(--muted-foreground)", fontSize: 13, textAlign: "center" }}>
                  {t("common.noResults")}
                </p>
              ) : (
                filtered.map((item) => {
                  const Icon = Icons[item.icon];
                  return (
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
                        gap: 12,
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
                        transition: "background var(--duration-fast) var(--ease-out-expo)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--surface-muted)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Icon size={18} strokeWidth={1.8} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
                      {t(item.labelKey)}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
