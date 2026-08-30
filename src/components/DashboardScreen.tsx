import { useState } from "react";
import BottomNav from "./BottomNav";
import NotificationsPanel from "./panels/NotificationsPanel";
import type { Screen } from "../App";
import { useDashboardData } from "../hooks/useDashboardData";
import { demoService } from "../services/data-service";
import { useQueryClient } from "@tanstack/react-query";

interface DashboardScreenProps {
  onNavigate: (screen: Screen) => void;
}

function ProgressBar({ value, color = "hsl(var(--color-sa-400))" }: { value: number; color?: string }) {
  return (
    <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function DeviceBar({ icon, label, pct, color = "hsl(var(--color-sa-500))" }: { icon: React.ReactNode; label: string; pct: number; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: "hsl(var(--color-sa-25))",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        color: "hsl(var(--color-sa-600))",
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-800))" }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--color-sa-600))" }}>{pct}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: "hsl(var(--color-gray-100))", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99 }} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { budget, spend, remaining, usagePct, forecast, weather, devices, notifications, greetingName } = useDashboardData();
  const queryClient = useQueryClient();

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 20px 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, color: "hsl(var(--color-gray-700))" }}>صباح الخير، {greetingName}</span>
            <span style={{ fontSize: 18 }}>☀️</span>
          </div>
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
              borderRadius: "50%", border: "2px solid #fff",
            }} />
          </button>
        </div>

        {/* Logo */}
        <div style={{ textAlign: "center", padding: "4px 0 16px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "hsl(var(--color-sa-600))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>Wafir</span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "hsl(var(--color-gray-500))" }}>
            إدارة الطاقة والحلول المالية
          </p>
        </div>

        {/* Budget Card */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{
            background: "linear-gradient(135deg, hsl(var(--color-sa-800)), hsl(var(--color-sa-600)))",
            borderRadius: 20, padding: "20px 20px 24px",
            color: "#fff",
            boxShadow: "0 8px 32px hsla(var(--color-sa-800), 0.35)",
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.85, textAlign: "end" }}>الميزانية الشهرية</p>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 13, opacity: 0.85 }}>ر.س</span>
              <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px" }}>{budget}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 12, opacity: 0.75 }}>مستخدم {usagePct}%</span>
              <span style={{ fontSize: 12, opacity: 0.85 }}>الميزانية المتاحة</span>
            </div>
            <ProgressBar value={usagePct} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 12 }}>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 8, padding: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div style={{ textAlign: "end" }}>
                  <p style={{ margin: 0, fontSize: 11, opacity: 0.75 }}>المتبقي من الميزانية</p>
                  <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 700 }}>
                    <span dir="ltr">{remaining.toFixed(2)}</span> ر.س
                  </p>
                </div>
              </div>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 8, padding: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
                <div style={{ textAlign: "end" }}>
                  <p style={{ margin: 0, fontSize: 11, opacity: 0.75 }}>المصروف الحالي</p>
                  <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 700 }}>
                    <span dir="ltr">{spend.toFixed(2)}</span> ر.س
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Data */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <button onClick={() => onNavigate("forecast")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>
              عرض الكل
            </button>
            <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>البيانات اللحظية</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "☀️", label: "درجة الحرارة", value: `${weather.temp_c}°C`, sub: weather.description },
              { icon: "💧", label: "الرطوبة الخارجية", value: `${weather.humidity}%`, sub: "" },
              { icon: "⚡", label: "استهلاك الطاقة", value: `${(spend / Math.max(budget, 1) * 1.25).toFixed(2)} kW`, sub: "" },
              { icon: "🌤️", label: "حالة الطقس الخارجية", value: "", sub: weather.description },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 14, padding: "14px 14px 10px",
                border: "1px solid hsl(var(--color-gray-100))",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{item.icon}</div>
                {item.value && (
                  <p style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>
                    <span dir="ltr">{item.value}</span>
                  </p>
                )}
                {item.sub && (
                  <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "hsl(var(--color-gray-800))" }}>
                    {item.sub}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-gray-500))" }}>{item.label}</p>
                <svg width="100%" height="24" viewBox="0 0 80 24" style={{ marginTop: 8 }}>
                  <polyline
                    points={i === 0 ? "0,18 20,12 40,14 60,8 80,10" : i === 1 ? "0,12 20,16 40,10 60,14 80,8" : i === 2 ? "0,14 20,10 40,16 60,8 80,12" : "0,10 20,14 40,8 60,12 80,6"}
                    fill="none"
                    stroke={i < 2 ? "hsl(var(--color-sa-400))" : "hsl(var(--color-sa-500))"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Device Consumption */}
        <div style={{ margin: "0 16px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={() => onNavigate("forecast")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>
              عرض الكل
            </button>
            <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>الاستهلاك التقديري للأجهزة</span>
          </div>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "16px",
            border: "1px solid hsl(var(--color-gray-100))",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            {devices.map((d) => (
              <DeviceBar key={d.type} icon={<span>{d.type === "ac" ? "❄️" : d.type === "lights" ? "💡" : d.type === "tv" ? "📺" : "🗄️"}</span>} label={d.label} pct={d.pct} />
            ))}
          </div>
        </div>

        {/* Bill Forecast Teaser */}
        <div style={{ margin: "0 16px 24px" }}>
          <div style={{
            background: "hsl(var(--color-sa-25))",
            border: "1px solid hsl(var(--color-sa-100))",
            borderRadius: 16, padding: "16px 18px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <button
              onClick={() => onNavigate("forecast")}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              التفاصيل
            </button>
            <div style={{ textAlign: "end" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>توقعات الفاتورة</span>
                <span style={{ fontSize: 18 }}>💡</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-600))" }}>
                يمكنك توقع <strong style={{ color: "hsl(var(--color-sa-700))" }}>{forecast.toFixed(2)} ر.س</strong> هذا الشهر
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))" }}>
                بتقليل استهلاك الأجهزة يمكنك توفير المزيد
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav current="dashboard" onNavigate={onNavigate} />
      {showNotifications && (
        <NotificationsPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAllRead={markAllRead}
        />
      )}
    </div>
  );
}
