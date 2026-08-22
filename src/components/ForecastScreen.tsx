import { useState } from "react";
import BottomNav from "./BottomNav";
import NotificationsPanel from "./panels/NotificationsPanel";
import SetBudgetModal from "./modals/SetBudgetModal";
import type { Screen } from "../App";
import { useDashboardData } from "../hooks/useDashboardData";
import { useBudgetMutation } from "../hooks/useDashboard";
import { demoService } from "../services/data-service";
import { useQueryClient } from "@tanstack/react-query";

interface ForecastScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function ForecastScreen({ onNavigate }: ForecastScreenProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSetBudget, setShowSetBudget] = useState(false);
  const { budget, forecast, devices, notifications, seasonProfile } = useDashboardData();
  const saveBudget = useBudgetMutation();
  const queryClient = useQueryClient();

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 20px 0",
        }}>
          <button
            onClick={() => setShowNotifications(true)}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-700))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span style={{
              position: "absolute", top: 1, insetInlineEnd: 1,
              width: 9, height: 9, background: "hsl(var(--color-sa-500))",
              borderRadius: "50%", border: "2px solid hsl(var(--color-gray-25))",
            }} />
          </button>

          <div style={{ textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>
              توقعات الفاتورة
            </h1>
          </div>

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

        <p style={{ textAlign: "center", margin: "6px 24px 16px", fontSize: 12, color: "hsl(var(--color-gray-500))" }}>
          MLFO: {seasonProfile} — توقع {forecast.toFixed(2)} ر.س (ميزانية {budget} ر.س)
        </p>

        {/* Hero Banner */}
        <div style={{ margin: "0 16px 20px" }}>
          <div style={{
            background: "linear-gradient(135deg, hsl(var(--color-sa-800)), hsl(var(--color-sa-600)))",
            borderRadius: 18, padding: "20px 20px 24px",
            position: "relative", overflow: "hidden",
          }}>
            <svg viewBox="0 0 200 80" style={{ position: "absolute", bottom: 0, insetInlineStart: 0, width: "55%", opacity: 0.18 }}>
              <circle cx="50" cy="60" r="2" fill="white" />
              <rect x="49" y="20" width="2" height="40" fill="white" />
              <line x1="50" y1="22" x2="30" y2="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="50" y1="22" x2="70" y2="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="50" y1="22" x2="50" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="5" y="58" width="30" height="18" rx="1" fill="white" />
              <line x1="20" y1="58" x2="20" y2="76" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
              <line x1="5" y1="67" x2="35" y2="67" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
              <rect x="10" y="52" width="35" height="20" rx="1" fill="rgba(255,255,255,0.8)" transform="rotate(-8,27,62)" />
            </svg>

            <div style={{ position: "relative", textAlign: "end", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginBottom: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span style={{ fontSize: 14, fontWeight: 600 }}>الاثنين، 30 أبريل 2024</span>
              </div>
              <p style={{ margin: 0, fontSize: 11, opacity: 0.7 }}>آخر تحديث: منذ دقيقة</p>
            </div>
          </div>
        </div>

        {/* Devices Section */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button
              onClick={() => setShowSetBudget(true)}
              style={{
                background: "hsl(var(--color-sa-600))", border: "none", cursor: "pointer",
                padding: "8px 16px", borderRadius: 99, color: "#fff",
                fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                boxShadow: "0 2px 8px hsla(var(--color-sa-600), 0.35)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              تحديد الميزانية
            </button>
            <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>استهلاك الأجهزة</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "hsl(var(--color-gray-100))", borderRadius: 16, overflow: "hidden" }}>
            {devices.map((device, i) => (
              <div key={device.type} style={{
                background: "#fff",
                padding: "16px 16px",
                borderBottom: i < devices.length - 1 ? "1px solid hsl(var(--color-gray-100))" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
                      التكلفة حتى الآن: <span dir="ltr" style={{ fontWeight: 600, color: "hsl(var(--color-gray-700))" }}>{device.cost.toFixed(2)}</span> ريال
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--color-gray-900))" }}>{device.label}</span>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "hsl(var(--color-sa-25))", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--color-sa-600))" }}>
                        {device.type === "ac" ? "❄️" : device.type === "lights" ? "💡" : device.type === "tv" ? "📺" : "🗄️"}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--color-sa-600))", minWidth: 36, textAlign: "start" }}>
                    {device.pct}%
                  </span>
                  <div style={{ flex: 1, height: 6, borderRadius: 99, background: "hsl(var(--color-gray-100))", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${device.pct}%`,
                      background: "linear-gradient(90deg, hsl(var(--color-sa-500)), hsl(var(--color-sa-400)))",
                      borderRadius: 99,
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Card */}
        <div style={{ margin: "0 16px 28px" }}>
          <div style={{
            background: "hsl(var(--color-sa-25))",
            border: "1px solid hsl(var(--color-sa-100))",
            borderRadius: 16, padding: "18px",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ textAlign: "end", flex: 1 }}>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "hsl(var(--color-sa-700))" }}>كفاءة الاستهلاك</p>
              <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.5 }}>
                أنت على المسار الصحيح! استهلاكك ضمن الحدود المثالية.
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
                <path d="M13 2L4.5 13.5H11L10 22" stroke="white" strokeWidth="1.5" fill="hsl(var(--color-sa-300))" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <BottomNav current="forecast" onNavigate={onNavigate} />
      {showNotifications && <NotificationsPanel notifications={notifications} onClose={() => setShowNotifications(false)} onMarkAllRead={markAllRead} />}
      {showSetBudget && (
        <SetBudgetModal
          initialAmount={String(budget)}
          onClose={() => setShowSetBudget(false)}
          onSet={async (amount) => { await saveBudget(Number(amount)); }}
        />
      )}
    </div>
  );
}
