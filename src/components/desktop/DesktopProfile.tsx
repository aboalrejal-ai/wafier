import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import NotificationsPanel from "../panels/NotificationsPanel";
import type { Screen } from "../../App";
import { useDashboardData } from "../../hooks/useDashboardData";
import { demoService } from "../../services/data-service";
import { formatMemberSince, resolveDisplayName } from "../../lib/userStorage";

interface DesktopProfileProps {
  onNavigate: (screen: Screen) => void;
}

const chartData = [
  { month: "نوفمبر", value: 185 },
  { month: "ديسمبر", value: 130 },
  { month: "يناير", value: 160 },
  { month: "فبراير", value: 120 },
  { month: "مارس", value: 155 },
  { month: "أبريل", value: 193 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "hsl(var(--color-sa-600))", color: "#fff", padding: "8px 14px", borderRadius: 10, fontSize: 13, fontFamily: "inherit", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
        <div dir="ltr">{payload[0].value} ر.س</div>
      </div>
    );
  }
  return null;
};

export default function DesktopProfile({ onNavigate }: DesktopProfileProps) {
  const [period] = useState("آخر 6 أشهر");
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, profile } = useDashboardData();
  const queryClient = useQueryClient();

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <Sidebar current="profile" onNavigate={onNavigate} />

      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", background: "hsl(var(--color-gray-25))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ textAlign: "start" }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "hsl(var(--color-gray-950))" }}>الملف الشخصي</h1>
            <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>حسابك واستهلاك الطاقة</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              onClick={() => setShowNotifications(true)}
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", border: "1px solid hsl(var(--color-gray-200))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-600))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span style={{ position: "absolute", top: -3, insetInlineEnd: -3, width: 9, height: 9, background: "hsl(var(--color-sa-500))", borderRadius: "50%", border: "2px solid hsl(var(--color-gray-25))" }} />
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 1.4fr)", gap: 20, marginBottom: 20, alignItems: "stretch" }}>
          <div style={{ background: "linear-gradient(135deg, hsl(var(--color-sa-950)), hsl(var(--color-sa-700)))", borderRadius: 20, padding: "28px 24px", textAlign: "center", boxShadow: "0 8px 32px hsla(var(--color-sa-800), 0.3)" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" /></svg>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>✓</span>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>{resolveDisplayName({ fullName: profile?.full_name, email: profile?.email })}</p>
            </div>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{profile?.member_since ? formatMemberSince(profile.member_since) : "عضو جديد"}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => onNavigate("ai")} style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
                🤖 مساعد AI
              </button>
              <button style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500, fontFamily: "inherit", cursor: "pointer" }}>
                ✏️ تعديل
              </button>
            </div>
          </div>

          <div style={{ background: "hsl(var(--color-sa-25))", border: "1px solid hsl(var(--color-sa-100))", borderRadius: 20, padding: "28px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "hsl(var(--color-sa-600))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px hsla(var(--color-sa-600), 0.3)", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <div style={{ textAlign: "start", flex: 1 }}>
              <p style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 700, color: "hsl(var(--color-sa-700))" }}>نصيحة ذكية 💡</p>
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-600))", lineHeight: 1.7 }}>أنت تستخدم طاقتك بذكاء، استمر على هذا النهج لتحقيق المزيد من التوفير.</p>
            </div>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 18, padding: "24px 28px", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "hsl(var(--color-gray-50))", border: "1px solid hsl(var(--color-gray-200))", borderRadius: 8, padding: "7px 12px", cursor: "pointer" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-500))" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
              <span style={{ fontSize: 12, color: "hsl(var(--color-gray-600))", fontFamily: "inherit" }}>{period}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>تطور المصروف خلال الأشهر</h2>
              <span style={{ fontSize: 16 }}>📊</span>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, insetInlineEnd: 60, zIndex: 10, background: "hsl(var(--color-sa-600))", color: "#fff", padding: "7px 12px", borderRadius: 9, fontSize: 12, fontFamily: "inherit", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: 10, opacity: 0.8, marginBottom: 1 }}>أبريل</div>
              <div style={{ fontWeight: 700 }} dir="ltr">193.20 ر.س</div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 36, right: 16, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="desktopBillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152.9, 65.8%, 31%)" stopOpacity={0.14} />
                    <stop offset="95%" stopColor="hsl(152.9, 65.8%, 31%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "IBM Plex Sans Arabic, sans-serif", fill: "hsl(217.9, 8.1%, 46.1%)" }} axisLine={false} tickLine={false} reversed />
                <YAxis tick={{ fontSize: 11, fontFamily: "IBM Plex Sans Arabic, sans-serif", fill: "hsl(217.9, 8.1%, 46.1%)" }} axisLine={false} tickLine={false} domain={[0, 300]} ticks={[0, 100, 200, 300]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="hsl(152.9, 65.8%, 31%)" strokeWidth={2.5} fill="url(#desktopBillGrad)" dot={{ fill: "hsl(152.9, 65.8%, 31%)", strokeWidth: 2, r: 5, stroke: "#fff" }} activeDot={{ r: 7, fill: "hsl(152.9, 65.8%, 31%)", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {showNotifications && (
        <NotificationsPanel variant="desktop" notifications={notifications} onClose={() => setShowNotifications(false)} onMarkAllRead={markAllRead} />
      )}
    </div>
  );
}
