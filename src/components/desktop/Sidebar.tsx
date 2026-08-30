import type { Screen } from "../../App";
import { useAuth } from "../../contexts/AuthContext";
import { useAppStore } from "../../stores/app-store";
import { formatMemberSince, resolveDisplayName } from "../../lib/userStorage";

interface SidebarProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout?: () => void;
}

const navItems: { id: Screen; label: string; icon: React.ReactNode }[] = [
  {
    id: "dashboard",
    label: "الميزانية الشهرية",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="15" rx="2" />
        <path d="M2 10h20M6 15h4M14 15h4" />
      </svg>
    ),
  },
  {
    id: "forecast",
    label: "توقعات الفاتورة",
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
    label: "الوكيل الذكي",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        <path d="M19 14.5l.7 1.9 1.8.7-1.8.7-.7 1.9-.7-1.9-1.8-.7 1.8-.7z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "الملف الشخصي",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function Sidebar({ current, onNavigate, onLogout }: SidebarProps) {
  const dashboard = useAppStore((s) => s.dashboard);
  const { signOut } = useAuth();
  const profileName = resolveDisplayName({
    fullName: dashboard?.profile.full_name,
    email: dashboard?.profile.email,
  });
  const memberSince = dashboard?.profile.member_since
    ? formatMemberSince(dashboard.profile.member_since)
    : "عضو جديد";

  const handleLogout = async () => {
    if (onLogout) onLogout();
    else await signOut();
    window.location.href = "/login";
  };

  return (
    <aside style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", background: "#fff", borderInlineEnd: "1px solid #E5E7EB", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "32px 24px 28px", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#1B8354", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" /></svg>
          </div>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0D121C", letterSpacing: "-0.5px" }}>Wafir</div>
            <div style={{ fontSize: 11, color: "#4D5761", marginTop: 2 }}>إدارة الطاقة والحلول الذكية</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ margin: "0 12px 10px", fontSize: 10, fontWeight: 600, color: "#9DA4AE", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "start" }}>القائمة الرئيسية</p>
        {navItems.map((item) => {
          const active = current === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: active ? "#F3FCF6" : "transparent", color: active ? "#166A45" : "#111927", fontSize: 14, fontWeight: active ? 600 : 400, fontFamily: "inherit", borderInlineStart: active ? "3px solid #1B8354" : "3px solid transparent", textAlign: "start" }}>
              <span style={{ color: active ? "#166A45" : "#4D5761", display: "flex" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
        <button onClick={() => onNavigate("about")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: current === "about" ? "#F3FCF6" : "transparent", color: "#111927", fontSize: 14, fontFamily: "inherit", marginTop: 8, textAlign: "start" }}>
          <span>ℹ️</span>
          <span>عن Wafir</span>
        </button>
      </nav>

      <div style={{ padding: "16px 16px 24px", borderTop: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, background: "hsl(var(--color-sa-600) / 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1B8354"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" /></svg>
          </div>
          <div style={{ textAlign: "start" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0D121C" }}>{profileName}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "#4D5761" }}>{memberSince}</p>
          </div>
        </div>
        <button onClick={handleLogout} style={{ width: "100%", padding: "9px 0", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#6C737F", fontFamily: "inherit" }}>
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
