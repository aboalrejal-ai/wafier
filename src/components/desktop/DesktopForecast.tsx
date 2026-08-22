import { useState } from "react";
import Sidebar from "./Sidebar";
import NotificationsPanel from "../panels/NotificationsPanel";
import SetBudgetModal from "../modals/SetBudgetModal";
import type { Screen } from "../../App";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useBudgetMutation } from "../../hooks/useDashboard";
import { demoService } from "../../services/data-service";
import { useQueryClient } from "@tanstack/react-query";

interface DesktopForecastProps {
  onNavigate: (screen: Screen) => void;
}

export default function DesktopForecast({ onNavigate }: DesktopForecastProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const { budget, forecast, devices, notifications, seasonProfile } = useDashboardData();
  const saveBudget = useBudgetMutation();
  const queryClient = useQueryClient();

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <Sidebar current="forecast" onNavigate={onNavigate} />

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", background: "hsl(var(--color-gray-25))" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "hsl(var(--color-gray-950))" }}>توقعات الفاتورة</h1>
            <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
              MLFO: {seasonProfile} — توقع {forecast.toFixed(2)} ر.س
            </p>
          </div>
        </div>

        {/* Hero Banner */}
        <div style={{
          background: "linear-gradient(135deg, hsl(var(--color-sa-900)), hsl(var(--color-sa-600)))",
          borderRadius: 20, padding: "28px 32px", marginBottom: 28,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          position: "relative", overflow: "hidden",
          boxShadow: "0 8px 32px hsla(var(--color-sa-800), 0.3)",
        }}>
          {/* Decorative */}
          <div style={{ position: "absolute", insetInlineStart: 0, bottom: 0, width: "35%", opacity: 0.1, pointerEvents: "none" }}>
            <svg viewBox="0 0 200 100"><circle cx="50" cy="80" r="3" fill="white" /><rect x="48" y="20" width="4" height="60" fill="white" /><line x1="50" y1="23" x2="25" y2="3" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="50" y1="23" x2="75" y2="3" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><line x1="50" y1="23" x2="50" y2="0" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><rect x="5" y="75" width="40" height="22" rx="2" fill="white" /><rect x="15" y="64" width="50" height="26" rx="2" fill="white" opacity="0.85" transform="rotate(-8,40,77)" /></svg>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {/* Total bill */}
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "16px 24px", textAlign: "center" }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>إجمالي التوقع</p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#fff" }} dir="ltr">48.45 <span style={{ fontSize: 14, fontWeight: 400 }}>ر.س</span></p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>التكلفة الإجمالية حتى الآن</p>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>التوقع النهائي</p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#fff" }} dir="ltr">{forecast.toFixed(2)} <span style={{ fontSize: 14, fontWeight: 400 }}>ر.س</span></p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>بنهاية الشهر</p>
            </div>
          </div>

          <div style={{ textAlign: "end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}>آخر تحديث: منذ دقيقة</p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </div>
            <button onClick={() => setShowBudget(true)} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
              تحديد الميزانية
            </button>
          </div>
        </div>

        {/* Device Cards Grid 2×2 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>عرض الكل</button>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>استهلاك الأجهزة</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {devices.map((device, i) => (
              <div key={device.type} style={{
                background: "#fff", borderRadius: 18, padding: "24px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Card Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "hsl(var(--color-sa-25))", color: "hsl(var(--color-sa-700))", border: "1px solid hsl(var(--color-sa-100))" }}>
                    {device.pct}%
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{device.label}</h3>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: "hsl(var(--color-sa-25))", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--color-sa-600))" }}>
                      {device.type === "ac" ? "❄️" : "💡"}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "hsl(var(--color-sa-600))" }}>{device.pct}%</span>
                    <span style={{ fontSize: 12, color: "hsl(var(--color-gray-500))" }}>نسبة الاستهلاك</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: "hsl(var(--color-gray-100))", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${device.pct}%`, background: "linear-gradient(90deg, hsl(var(--color-sa-600)), hsl(var(--color-sa-400)))", borderRadius: 99, transition: "width 0.6s ease" }} />
                  </div>
                </div>

                {/* Cost */}
                <div style={{ background: "hsl(var(--color-gray-25))", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "hsl(var(--color-gray-950))" }} dir="ltr">{device.cost.toFixed(2)} <span style={{ fontSize: 12, fontWeight: 500 }}>ر.س</span></span>
                  <span style={{ fontSize: 12, color: "hsl(var(--color-gray-500))" }}>التكلفة حتى الآن</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Card */}
        <div style={{
          background: "hsl(var(--color-sa-25))", border: "1px solid hsl(var(--color-sa-100))",
          borderRadius: 16, padding: "20px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "hsl(var(--color-sa-600))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px hsla(var(--color-sa-600), 0.3)", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
          <div style={{ textAlign: "end" }}>
            <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "hsl(var(--color-sa-700))" }}>كفاءة الاستهلاك ✓</p>
            <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-600))" }}>أنت على المسار الصحيح! استهلاكك ضمن الحدود المثالية.</p>
          </div>
        </div>
      </div>
      {showNotifications && <NotificationsPanel variant="desktop" notifications={notifications} onClose={() => setShowNotifications(false)} onMarkAllRead={markAllRead} />}
      {showBudget && <SetBudgetModal initialAmount={String(budget)} onClose={() => setShowBudget(false)} onSet={async (a) => saveBudget(Number(a))} />}
    </div>
  );
}
