import type { Screen } from "../App";
import { useT } from "../i18n";
import { Icons } from "./Icons";

type NavTab = "dashboard" | "forecast" | "ai" | "profile";

interface BottomNavProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  const t = useT();

  const tabs: { id: NavTab; label: string; Icon: typeof Icons.LayoutDashboard }[] = [
    { id: "dashboard", label: t("nav.dashboard"), Icon: Icons.LayoutDashboard },
    { id: "forecast", label: t("nav.forecast"), Icon: Icons.FileText },
    { id: "ai", label: t("nav.ai"), Icon: Icons.Sparkles },
    { id: "profile", label: t("nav.profile"), Icon: Icons.User },
  ];

  return (
    <nav
      style={{
        background: "color-mix(in srgb, var(--card) 85%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 0 12px",
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => {
        const active = current === tab.id;
        const Icon = tab.Icon;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="tool-btn"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 12px",
              color: active ? "hsl(var(--color-sa-600))" : "var(--muted-foreground)",
              fontFamily: "inherit",
              fontSize: 10,
              fontWeight: active ? 600 : 500,
              transition: "color var(--duration-fast) var(--ease-out-expo)",
            }}
          >
            <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
            <span style={{ maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
