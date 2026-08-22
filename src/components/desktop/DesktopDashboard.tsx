import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import NotificationsPanel from "../panels/NotificationsPanel";
import type { Screen } from "../../App";
import { useDashboardData } from "../../hooks/useDashboardData";
import { demoService } from "../../services/data-service";

interface DesktopDashboardProps {
  onNavigate: (screen: Screen) => void;
}

function StatCard({ icon, label, value, sub, accent = false }: { icon: string; label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))" : "#fff",
      borderRadius: 14, padding: "18px 20px",
      border: accent ? "none" : "1px solid #E5E7EB",
      boxShadow: accent ? "0 4px 20px hsla(var(--color-sa-600), 0.28)" : "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)",
    }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: accent ? "#fff" : "hsl(var(--color-gray-950))", marginBottom: 4 }} dir="ltr">{value}</div>
      <div style={{ fontSize: 12, color: accent ? "rgba(255,255,255,0.7)" : "hsl(var(--color-gray-500))" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: accent ? "rgba(255,255,255,0.55)" : "hsl(var(--color-gray-400))", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function DeviceRow({ icon, label, pct }: { icon: React.ReactNode; label: string; pct: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "hsl(var(--color-sa-25))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "hsl(var(--color-sa-600))" }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--color-sa-600))" }}>{pct}%</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-800))" }}>{label}</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: "hsl(var(--color-gray-100))", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, hsl(var(--color-sa-500)), hsl(var(--color-sa-400)))", borderRadius: 99 }} />
        </div>
      </div>
    </div>
  );
}

export default function DesktopDashboard({ onNavigate }: DesktopDashboardProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { budget, spend, remaining, usagePct, forecast, weather, devices, notifications, historicalBills, greetingName } = useDashboardData();
  const queryClient = useQueryClient();
  const miniChartData = historicalBills.slice(-6).map((b) => ({ month: b.month.slice(0, 3), value: b.value }));

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <Sidebar current="dashboard" onNavigate={onNavigate} />

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", background: "hsl(var(--color-gray-25))" }}>
        {/* Page Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Notification */}
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setShowNotifications(true)}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", border: "1px solid hsl(var(--color-gray-200))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-600))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span style={{ position: "absolute", top: -3, insetInlineEnd: -3, width: 9, height: 9, background: "hsl(var(--color-sa-500))", borderRadius: "50%", border: "2px solid hsl(var(--color-gray-25))" }} />
            </div>
          </div>
          <div style={{ textAlign: "end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "hsl(var(--color-gray-950))" }}>الميزانية الشهرية</h1>
              <span style={{ fontSize: 22 }}>☀️</span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "hsl(var(--color-gray-500))" }}>صباح الخير، {greetingName} — {new Date().toLocaleDateString("ar-SA", { month: "long", year: "numeric" })}</p>
          </div>
        </div>

        {/* Row 1: Budget Card + Real-time Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

          {/* Budget Card */}
          <div style={{
            background: "linear-gradient(135deg, hsl(var(--color-sa-900)), hsl(var(--color-sa-600)))",
            borderRadius: 20, padding: "28px 28px 24px",
            boxShadow: "0 8px 32px hsla(var(--color-sa-800), 0.35)",
            gridColumn: "1",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "6px 12px", fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                {usagePct}% مستخدم
              </div>
              <div style={{ textAlign: "end" }}>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>الميزانية الشهرية</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>ر.س</span>
                  <span style={{ fontSize: 44, fontWeight: 800, color: "#fff", letterSpacing: "-1.5px" }}>{budget}</span>
                </div>
              </div>
            </div>
            {/* Progress */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${usagePct}%`, background: "rgba(255,255,255,0.8)", borderRadius: 99 }} />
              </div>
            </div>
            {/* Two stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "المتبقي من الميزانية", value: remaining.toFixed(2), icon: "💳" },
                { label: "المصروف الحالي", value: spend.toFixed(2), icon: "📉" },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", textAlign: "end" }}>
                  <div style={{ fontSize: 16, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }} dir="ltr">{s.value} <span style={{ fontSize: 12, fontWeight: 400 }}>ر.س</span></div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Stats 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "☀️", label: "درجة الحرارة", value: `${weather.temp_c}°C`, sub: weather.description },
              { icon: "💧", label: "الرطوبة الخارجية", value: `${weather.humidity}%`, sub: "" },
              { icon: "⚡", label: "استهلاك الطاقة", value: `${(spend / Math.max(budget, 1)).toFixed(2)} kW`, sub: "" },
              { icon: "🌤️", label: "حالة الطقس", value: "", sub: weather.description },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "18px 16px", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)" }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
                {item.value && <div style={{ fontSize: 20, fontWeight: 800, color: "hsl(var(--color-gray-950))", marginBottom: 2 }} dir="ltr">{item.value}</div>}
                {item.sub && <div style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--color-gray-800))", marginBottom: 2 }}>{item.sub}</div>}
                <div style={{ fontSize: 11, color: "hsl(var(--color-gray-500))" }}>{item.label}</div>
                <svg width="100%" height="22" viewBox="0 0 80 22" style={{ marginTop: 8 }}>
                  <polyline points={i === 0 ? "0,16 20,10 40,12 60,6 80,8" : i === 1 ? "0,10 20,14 40,8 60,12 80,6" : i === 2 ? "0,12 20,8 40,14 60,6 80,10" : "0,8 20,12 40,6 60,10 80,4"} fill="none" stroke="hsl(var(--color-sa-400))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Devices + Bill Forecast */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Device Consumption */}
          <div style={{ background: "#fff", borderRadius: 18, padding: "24px", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <button onClick={() => onNavigate("forecast")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>عرض الكل</button>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>الاستهلاك التقديري للأجهزة</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {devices.map((d) => (
                <DeviceRow key={d.type} pct={d.pct} label={d.label} icon={<span>{d.type === "ac" ? "❄️" : "💡"}</span>} />
              ))}
            </div>
          </div>

          {/* Bill Forecast with mini chart */}
          <div style={{ background: "#fff", borderRadius: 18, padding: "24px", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <button onClick={() => onNavigate("forecast")} style={{ background: "hsl(var(--color-sa-600))", border: "none", cursor: "pointer", padding: "7px 14px", borderRadius: 8, color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
                عرض التفاصيل
              </button>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>توقعات الفاتورة 💡</h2>
            </div>

            {/* Forecast amount */}
            <div style={{ background: "hsl(var(--color-sa-25))", borderRadius: 12, padding: "16px 20px", marginBottom: 16, textAlign: "end", border: "1px solid hsl(var(--color-sa-100))" }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: "hsl(var(--color-gray-500))" }}>التوقع لهذا الشهر</p>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "hsl(var(--color-sa-700))" }} dir="ltr">{forecast.toFixed(2)} <span style={{ fontSize: 14 }}>ر.س</span></p>
              <p style={{ margin: "6px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))" }}>بتقليل استهلاك الأجهزة يمكنك توفير المزيد</p>
            </div>

            {/* Mini chart */}
            <div style={{ flex: 1, minHeight: 100 }}>
              <ResponsiveContainer width="100%" height={110}>
                <AreaChart data={miniChartData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(152.9, 65.8%, 31%)" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="hsl(152.9, 65.8%, 31%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 9, fontFamily: "IBM Plex Sans Arabic, sans-serif", fill: "hsl(217.9, 8.1%, 46.1%)" }} axisLine={false} tickLine={false} reversed />
                  <YAxis hide domain={[80, 220]} />
                  <Tooltip contentStyle={{ fontFamily: "IBM Plex Sans Arabic, sans-serif", fontSize: 12, borderRadius: 8, background: "hsl(152.9, 65.8%, 31%)", border: "none", color: "#fff" }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(152.9, 65.8%, 31%)" strokeWidth={2} fill="url(#miniGrad)" dot={{ r: 3, fill: "hsl(152.9, 65.8%, 31%)", stroke: "#fff", strokeWidth: 1.5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {showNotifications && (
        <NotificationsPanel variant="desktop" notifications={notifications} onClose={() => setShowNotifications(false)} onMarkAllRead={markAllRead} />
      )}
    </div>
  );
}
