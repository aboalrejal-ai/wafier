import type { AppNotification } from "../../types/database";

interface NotificationsPanelProps {
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead?: () => void;
  variant?: "mobile" | "desktop";
}

const typeColor: Record<string, string> = {
  level1: "hsl(var(--color-warning))",
  level1b: "hsl(var(--color-warning))",
  level2: "hsl(var(--color-destructive))",
  info: "hsl(var(--color-info))",
  warning: "hsl(var(--color-warning))",
  success: "hsl(var(--color-success))",
};

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "منذ دقائق";
  if (hours < 24) return `منذ ${hours} ساعة`;
  return "أمس";
}

export default function NotificationsPanel({ onClose, notifications, onMarkAllRead, variant = "mobile" }: NotificationsPanelProps) {
  const unread = notifications.filter((n) => !n.read).length;
  const isDesktop = variant === "desktop";

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "hsl(var(--color-gray-950) / 0.45)", zIndex: 200, animation: "fadeIn 0.2s ease" }} />
      <div
        style={{
          position: "fixed",
          ...(isDesktop
            ? { top: 0, bottom: 0, insetInlineEnd: 0, width: 380, borderRadius: "0", animation: "slideIn 0.3s ease" }
            : { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0", animation: "slideUp 0.3s ease" }),
          zIndex: 201,
          background: "#fff",
          maxHeight: isDesktop ? "100%" : "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: isDesktop ? "-4px 0 24px rgba(0,0,0,0.12)" : "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {!isDesktop && (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 12px" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {unread > 0 && onMarkAllRead && (
              <button onClick={onMarkAllRead} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", fontWeight: 600 }}>
                تعليم الكل كمقروء
              </button>
            )}
            <button onClick={onClose} style={{ background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-700))" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div style={{ textAlign: "end" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>الإشعارات</h2>
            {unread > 0 && <p style={{ margin: "2px 0 0", fontSize: 11, color: "hsl(var(--color-sa-600))", fontWeight: 600 }}>{unread} غير مقروء</p>}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
          {notifications.map((n) => (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid hsl(var(--color-gray-100))", opacity: n.read ? 0.65 : 1 }}>
              <div style={{ paddingTop: 2, flexShrink: 0 }}>{!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(var(--color-sa-500))" }} />}</div>
              <div style={{ flex: 1, textAlign: "end" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginBottom: 4 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{n.title}</p>
                  <div style={{ color: typeColor[n.level] ?? typeColor.warning }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  </div>
                </div>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.5 }}>{n.body}</p>
                <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-gray-400))" }}>{formatTime(n.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}
