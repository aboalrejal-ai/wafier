import type { Screen } from "../App";

type NavTab = "dashboard" | "forecast" | "ai" | "profile";

interface BottomNavProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "profile",
      label: "الملف الشخصي",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      id: "ai",
      label: "الوكيل الذكي",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
          <path d="M19 14.5l.7 1.9 1.8.7-1.8.7-.7 1.9-.7-1.9-1.8-.7 1.8-.7z" />
        </svg>
      ),
    },
    {
      id: "forecast",
      label: "توقعات الفاتورة",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
          <path d="M7 13h2M7 17h2M13 13h4M13 17h4" />
        </svg>
      ),
    },
    {
      id: "dashboard",
      label: "الميزانية الشهرية",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="15" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 15h4M14 15h4" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      style={{
        background: "hsl(0 0% 100% / 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid hsl(var(--color-gray-200))",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 0 12px",
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => {
        const active = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: active ? "hsl(var(--color-sa-600) / 0.15)" : "none",
              border: active ? "1px solid hsl(var(--color-sa-600) / 0.2)" : "1px solid transparent",
              borderRadius: 999,
              cursor: "pointer",
              padding: "4px 12px",
              color: active ? "hsl(var(--color-sa-600))" : "hsl(var(--color-gray-600))",
              transition: "color 0.2s, background 0.2s",
              minWidth: 72,
            }}
          >
            {tab.icon}
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, fontFamily: "inherit" }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
