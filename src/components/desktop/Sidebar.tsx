import { useNavigate } from "react-router-dom";
import type { Screen } from "../../App";
import { useAuth } from "../../contexts/AuthContext";
import { useAppStore } from "../../stores/app-store";
import { formatMemberSince, resolveDisplayName } from "../../lib/userStorage";
import { useT } from "../../i18n";

interface SidebarProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout?: () => void;
}

export default function Sidebar({ current, onNavigate, onLogout }: SidebarProps) {
  const t = useT();
  const navigate = useNavigate();
  const dashboard = useAppStore((s) => s.dashboard);
  const { signOut } = useAuth();
  const profileName = resolveDisplayName({
    fullName: dashboard?.profile.full_name,
    email: dashboard?.profile.email,
  });
  const memberSince = dashboard?.profile.member_since
    ? formatMemberSince(dashboard.profile.member_since)
    : t("profile.memberNew");

  const navItems: { id: Screen; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: t("nav.dashboard"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="15" rx="2" />
          <path d="M2 10h20M6 15h4M14 15h4" />
        </svg>
      ),
    },
    {
      id: "forecast",
      label: t("nav.forecast"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: "ai",
      label: t("nav.ai"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
          <path d="M19 14.5l.7 1.9 1.8.7-1.8.7-.7 1.9-.7-1.9-1.8-.7 1.8-.7z" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: t("nav.profile"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      id: "about",
      label: t("nav.about"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    if (onLogout) onLogout();
    else await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      style={{
        width: 280,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--card)",
        borderInlineEnd: "1px solid var(--border)",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "32px 24px 28px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "hsl(var(--color-sa-600))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
            </svg>
          </div>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.5px" }}>{t("common.wafir")}</div>
            <div style={{ fontSize: 11, color: "var(--muted-foreground)", marginTop: 2 }}>{t("sidebar.tagline")}</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <p
          style={{
            margin: "0 12px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: "var(--muted-foreground)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textAlign: "start",
          }}
        >
          {t("nav.mainMenu")}
        </p>
        {navItems.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: active ? "var(--primary-soft)" : "transparent",
                color: active ? "var(--primary-soft-text)" : "var(--foreground)",
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                fontFamily: "inherit",
                borderInlineStart: active ? "3px solid hsl(var(--color-sa-600))" : "3px solid transparent",
                textAlign: "start",
              }}
            >
              <span style={{ color: active ? "var(--primary-soft-text)" : "var(--muted-foreground)", display: "flex" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 16px 24px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: "hsl(var(--color-sa-600) / 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="hsl(var(--color-sa-600))">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
            </svg>
          </div>
          <div style={{ textAlign: "start" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{profileName}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--muted-foreground)" }}>{memberSince}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "9px 0",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--card)",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--muted-foreground)",
            fontFamily: "inherit",
          }}
        >
          {t("common.logout")}
        </button>
      </div>
    </aside>
  );
}
