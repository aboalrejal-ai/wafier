import { useNavigate } from "react-router-dom";
import type { Screen } from "../../App";
import { useAuth } from "../../contexts/AuthContext";
import { useAppStore } from "../../stores/app-store";
import { formatMemberSince, resolveDisplayName } from "../../lib/userStorage";
import { useT } from "../../i18n";
import { Icons } from "../Icons";

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

  const navItems: { id: Screen; label: string; Icon: typeof Icons.LayoutDashboard }[] = [
    { id: "dashboard", label: t("nav.dashboard"), Icon: Icons.LayoutDashboard },
    { id: "forecast", label: t("nav.forecast"), Icon: Icons.FileText },
    { id: "ai", label: t("nav.ai"), Icon: Icons.Sparkles },
    { id: "profile", label: t("nav.profile"), Icon: Icons.User },
    { id: "about", label: t("nav.about"), Icon: Icons.Info },
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
        transition: "background var(--duration-medium) var(--ease-out-expo), border-color var(--duration-medium) var(--ease-out-expo)",
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
            <Icons.Zap size={22} color="white" fill="white" strokeWidth={1.5} />
          </div>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.5px" }}>{t("common.wafir")}</div>
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
            fontFamily: "var(--font-mono)",
          }}
        >
          {t("nav.mainMenu")}
        </p>
        {navItems.map((item) => {
          const active = current === item.id;
          const Icon = item.Icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="tool-btn"
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
              <Icon size={20} strokeWidth={1.8} style={{ color: active ? "var(--primary-soft-text)" : "var(--muted-foreground)", flexShrink: 0 }} />
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
            <Icons.Zap size={18} color="hsl(var(--color-sa-600))" fill="hsl(var(--color-sa-600))" strokeWidth={1.5} />
          </div>
          <div style={{ textAlign: "start" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{profileName}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--muted-foreground)" }}>{memberSince}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="tool-btn"
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
