import { useState } from "react";
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

const sensors = [
  { icon: "🌡️", label: "عداد الكهرباء الرئيسي", value: "1,245", unit: "ك.و.س" },
  { icon: "💧", label: "عداد المياه", value: "18.6", unit: "م³" },
  { icon: "🔥", label: "مقياس الغاز", value: "32.4", unit: "م³" },
  { icon: "☀️", label: "الألواح الشمسية", value: "4.8", unit: "ك.و.س" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "hsl(var(--color-sa-600))", color: "#fff",
        padding: "8px 12px", borderRadius: 10, fontSize: 13, fontFamily: "inherit",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
        <div dir="ltr">{payload[0].value} ر.س</div>
      </div>
    );
  }
  return null;
};

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [period, setPeriod] = useState("آخر 6 أشهر");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

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
              الملف الشخصي
            </h1>
            <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-gray-500))" }}>
              معلوماتك المالية واستهلاكك للطاقة
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
                <div style={{ textAlign: "end" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>مستخدم Wafier</p>
                    <span style={{ color: "hsl(var(--color-sa-600))", fontSize: 14 }}>✓</span>
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))" }}>عضو منذ أبريل 2024</p>
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

        {/* Financial Summary */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{
            background: "#fff", borderRadius: 18, padding: "18px",
            border: "1px solid hsl(var(--color-gray-100))",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>ملخص حسابك المالي</h2>
              <span style={{ fontSize: 16 }}>💰</span>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 11, color: "hsl(var(--color-gray-500))", textAlign: "end" }}>
              إدارة الطاقة والحلول المالية (وفير) نظام الميزانية الشخصية
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "الميزانية الشهرية", value: "500", sub: "الحد الأقصى", color: "hsl(var(--color-sa-600))", bg: "hsl(var(--color-sa-25))" },
                { label: "المصروف الحالي", value: "193.20", sub: "38.6% الميزانية", color: "hsl(var(--color-sa-600))", bg: "hsl(var(--color-sa-25))" },
                { label: "المتبقي من الميزانية", value: "347.76", sub: "69.4% من الميزانية", color: "hsl(var(--color-warning))", bg: "hsl(var(--color-warning) / 0.1)" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.bg, borderRadius: 12, padding: "12px 10px", textAlign: "center",
                  border: `1px solid ${i === 2 ? "hsl(var(--color-warning) / 0.3)" : "hsl(var(--color-sa-100))"}`,
                }}>
                  <div style={{ fontSize: 11, color: "hsl(var(--color-gray-600))", marginBottom: 6, lineHeight: 1.3 }}>{item.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "hsl(var(--color-gray-950))", marginBottom: 4 }} dir="ltr">{item.value}</div>
                  <div style={{ fontSize: 10, color: i === 2 ? "hsl(var(--color-warning-text))" : "hsl(var(--color-sa-600))", fontWeight: 600 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sensors */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{
            background: "#fff", borderRadius: 18, padding: "18px",
            border: "1px solid hsl(var(--color-gray-100))",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>مكان قراءة الحساسات</h2>
              <span style={{ fontSize: 16 }}>📡</span>
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 11, color: "hsl(var(--color-gray-500))", textAlign: "end" }}>
              حالة أجهزتك واستهلاكك الفعلي للطاقة
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {sensors.map((s, i) => (
                <div key={i} style={{
                  background: "hsl(var(--color-gray-25))", borderRadius: 12, padding: "12px",
                  border: "1px solid hsl(var(--color-gray-100))", textAlign: "end",
                }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, color: "hsl(var(--color-gray-600))", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "hsl(var(--color-gray-950))" }} dir="ltr">{s.value}</div>
                  <div style={{ fontSize: 11, color: "hsl(var(--color-gray-500))", marginBottom: 8 }}>{s.unit}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                    <span style={{ fontSize: 11, color: "hsl(var(--color-sa-600))", fontWeight: 600 }}>متصل</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "hsl(var(--color-sa-500))", display: "inline-block" }} />
                  </div>
                </div>
              ))}
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
              <PeriodPicker value={period} onChange={setPeriod} />
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
                <AreaChart data={chartData} margin={{ top: 30, right: 10, left: -20, bottom: 0 }}>
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
            <div style={{ textAlign: "end", flex: 1 }}>
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

      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      {showEditProfile && <EditProfileModal onClose={() => setShowEditProfile(false)} />}
    </div>
  );
}
