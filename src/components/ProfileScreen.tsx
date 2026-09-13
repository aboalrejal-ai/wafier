import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BottomNav from "./BottomNav";
import NotificationsPanel from "./panels/NotificationsPanel";
import EditProfileModal from "./modals/EditProfileModal";
import PeriodPicker from "./ui/PeriodPicker";
import type { Screen } from "../App";
import { useDashboardData } from "../hooks/useDashboardData";
import { useAppStore, getFilteredChartData } from "../stores/app-store";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "../services/data-service";
import { demoService } from "../services/data-service";
import { formatMemberSince, resolveDisplayName } from "../lib/userStorage";
import { LanguageToggle, useT } from "../i18n";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileScreenProps {
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


export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const navigate = useNavigate();
  const t = useT();
  const period = useAppStore((s) => s.period);
  const setPeriodStore = useAppStore((s) => s.setPeriod);
  const { profile, notifications, historicalBills } = useDashboardData();
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const displayName = resolveDisplayName({ fullName: profile?.full_name, email: profile?.email });
  const memberSince = profile?.member_since ? formatMemberSince(profile.member_since) : t("profile.memberNew");
  const chartDataFiltered = getFilteredChartData(historicalBills.length ? historicalBills : chartData, period);

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: "hsl(var(--color-sa-600))", color: "#fff", padding: "8px 12px", borderRadius: 10, fontSize: 13, fontFamily: "inherit", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
          <div dir="ltr">{payload[0].value} ر.س</div>
        </div>
      );
    }
    return null;
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 20px 0",
        }}>
          {/* Spacer to balance centered title */}
          <div style={{ width: 36 }} />

          <div style={{ textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>
              {t("profile.title")}
            </h1>
            <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-gray-500))" }}>
              {t("profile.subtitle")}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => onNavigate("dashboard")}
              style={{
                background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer",
                width: 36, height: 36, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "hsl(var(--color-gray-700))",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Notification Bell */}
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "8px 20px 16px" }}>
          <button
            onClick={() => setShowNotifications(true)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-700))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span style={{
              position: "absolute", top: -3, insetInlineEnd: -3,
              width: 9, height: 9, background: "hsl(var(--color-sa-500))",
              borderRadius: "50%", border: "2px solid hsl(var(--color-gray-25))",
            }} />
          </button>
        </div>

        {/* User Card */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{
            background: "#fff", borderRadius: 18, padding: "18px",
            border: "1px solid hsl(var(--color-gray-100))",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                <button
                  onClick={() => setShowEditProfile(true)}
                  style={{
                    background: "none",
                    border: "1.5px solid hsl(var(--color-sa-200))", cursor: "pointer",
                    padding: "7px 14px", borderRadius: 8, color: "hsl(var(--color-sa-600))",
                    fontSize: 11, fontWeight: 600, fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 4,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-sa-25))")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  تعديل الملف
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-start" }}>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>{displayName}</p>
                    <span style={{ color: "hsl(var(--color-sa-600))", fontSize: 14 }}>✓</span>
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))" }}>{memberSince}</p>
                </div>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: "linear-gradient(135deg, hsl(var(--color-sa-100)), hsl(var(--color-sa-200)))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid hsl(var(--color-sa-200))",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(var(--color-sa-600))">
                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Chart */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{
            background: "#fff", borderRadius: 18, padding: "18px",
            border: "1px solid hsl(var(--color-gray-100))",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <PeriodPicker value={period} onChange={setPeriodStore} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>توقعات الفاتورة</h2>
                <span style={{ fontSize: 16 }}>📊</span>
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, insetInlineEnd: 20, zIndex: 10,
                background: "hsl(var(--color-sa-600))", color: "#fff",
                padding: "6px 10px", borderRadius: 8, fontSize: 12, fontFamily: "inherit",
              }}>
                <div style={{ fontSize: 10, opacity: 0.8 }}>التوقف القادم</div>
                <div style={{ fontWeight: 700 }} dir="ltr">198.00 ر.س</div>
              </div>

              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={chartDataFiltered} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152.9, 65.8%, 31%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(152.9, 65.8%, 31%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fontFamily: "IBM Plex Sans Arabic, sans-serif", fill: "hsl(217.9, 8.1%, 46.1%)" }}
                    axisLine={false} tickLine={false}
                    reversed={true}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fontFamily: "IBM Plex Sans Arabic, sans-serif", fill: "hsl(217.9, 8.1%, 46.1%)" }}
                    axisLine={false} tickLine={false}
                    domain={[0, 500]}
                    ticks={[0, 125, 250, 375, 500]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone" dataKey="value"
                    stroke="hsl(152.9, 65.8%, 31%)" strokeWidth={2.5}
                    fill="url(#colorBill)"
                    dot={{ fill: "hsl(152.9, 65.8%, 31%)", strokeWidth: 2, r: 4, stroke: "#fff" }}
                    activeDot={{ r: 6, fill: "hsl(152.9, 65.8%, 31%)", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Smart Tip */}
        <div style={{ margin: "0 16px 28px" }}>
          <div style={{
            background: "hsl(var(--color-sa-25))",
            border: "1px solid hsl(var(--color-sa-100))",
            borderRadius: 16, padding: "18px",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ textAlign: "start", flex: 1 }}>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "hsl(var(--color-sa-700))" }}>نصيحة ذكية 💡</p>
              <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.6 }}>
                أنت تستخدم طاقتك بذكاء، استمر على هذا النهج لتحقيق المزيد من التوفير.
              </p>
            </div>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "hsl(var(--color-sa-600))",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px hsla(var(--color-sa-600), 0.3)",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <BottomNav current="profile" onNavigate={onNavigate} />

      {showNotifications && <NotificationsPanel notifications={notifications} onClose={() => setShowNotifications(false)} onMarkAllRead={markAllRead} />}
      {showEditProfile && (
        <EditProfileModal
          onClose={() => setShowEditProfile(false)}
          initial={{ name: profile?.full_name ?? "", email: profile?.email ?? "", city: profile?.city ?? "الرياض" }}
          onSave={async (data) => { await updateProfile(data); queryClient.invalidateQueries({ queryKey: ["dashboard"] }); }}
        />
      )}
      <div style={{ padding: "8px 16px 12px", display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
        <LanguageToggle compact />
        <button
          onClick={() => {
            const until = new Date(Date.now() + 2 * 3600 * 1000).toISOString();
            demoService.setAlertOverride(until);
            alert(t("profile.hitlDone"));
          }}
          style={{ background: "none", border: "1px solid hsl(var(--color-sa-200))", borderRadius: 10, padding: "8px 12px", color: "hsl(var(--color-sa-700))", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}
        >
          {t("profile.hitl")}
        </button>

        <button onClick={() => onNavigate("about")} style={{ background: "none", border: "none", color: "hsl(var(--color-sa-600))", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t("nav.about")}</button>
        <button onClick={async () => { await signOut(); navigate("/login", { replace: true }); }} style={{ background: "none", border: "none", color: "hsl(var(--color-gray-500))", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{t("common.logout")}</button>
      </div>
    </div>
  );
}
