interface Notification {
  id: number;
  type: "warning" | "info" | "success";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, type: "warning", title: "تنبيه الميزانية", body: "وصلت إلى 69% من ميزانيتك الشهرية. تبقى 347.76 ر.س.", time: "منذ ساعتين", read: false },
  { id: 2, type: "warning", title: "موجة حر متوقعة", body: "درجات حرارة مرتفعة خلال الأسبوع القادم. قد يرتفع استهلاك المكيف.", time: "منذ 5 ساعات", read: false },
  { id: 3, type: "info", title: "تحديث البيانات", body: "تم تحديث قراءات الحساسات بنجاح.", time: "أمس", read: true },
  { id: 4, type: "success", title: "توفير ممتاز!", body: "وفّرت 15% مقارنة بالشهر الماضي. استمر!", time: "منذ يومين", read: true },
];

const typeColor: Record<Notification["type"], string> = {
  warning: "hsl(var(--color-warning))",
  info: "hsl(var(--color-info))",
  success: "hsl(var(--color-success))",
};

const typeIcon: Record<Notification["type"], React.ReactNode> = {
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

interface NotificationsPanelProps {
  onClose: () => void;
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "hsl(var(--color-gray-950) / 0.45)", zIndex: 200,
          animation: "fadeIn 0.2s ease",
        }}
      />
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 12px" }}>
          <button
            onClick={onClose}
            style={{
              background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer",
              width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "hsl(var(--color-gray-700))",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div style={{ textAlign: "end" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>الإشعارات</h2>
            {unread > 0 && (
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "hsl(var(--color-sa-600))", fontWeight: 600 }}>
                {unread} غير مقروء
              </p>
            )}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                display: "flex",
                gap: 12,
                padding: "14px 0",
                borderBottom: "1px solid hsl(var(--color-gray-100))",
                opacity: n.read ? 0.65 : 1,
              }}
            >
              <div style={{ paddingTop: 2, flexShrink: 0 }}>
                {!n.read && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(var(--color-sa-500))", marginBottom: 4 }} />
                )}
              </div>
              <div style={{ flex: 1, textAlign: "end" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, marginBottom: 4 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{n.title}</p>
                  <div style={{ color: typeColor[n.type] }}>{typeIcon[n.type]}</div>
                </div>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.5 }}>{n.body}</p>
                <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-gray-400))" }}>{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </>
  );
}
