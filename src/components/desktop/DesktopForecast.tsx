import Sidebar from "./Sidebar";
import type { Screen } from "../../App";

interface DesktopForecastProps {
  onNavigate: (screen: Screen) => void;
}

const devices = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5z" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    ),
    label: "المكيف",
    pct: 50,
    cost: "25.50",
    trend: "+3%",
    trendUp: true,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    label: "الإضاءة",
    pct: 20,
    cost: "10.20",
    trend: "-2%",
    trendUp: false,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M17 7V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    label: "التلفزيون",
    pct: 15,
    cost: "7.65",
    trend: "0%",
    trendUp: false,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="4" y1="10" x2="20" y2="10" />
      </svg>
    ),
    label: "الثلاجة",
    pct: 10,
    cost: "5.10",
    trend: "-1%",
    trendUp: false,
  },
];

export default function DesktopForecast({ onNavigate }: DesktopForecastProps) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <Sidebar current="forecast" onNavigate={onNavigate} />

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", background: "hsl(var(--color-gray-25))" }}>
        {/* Header: title at start (right), bell at end (left) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ textAlign: "start" }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "hsl(var(--color-gray-950))" }}>توقعات الفاتورة</h1>
            <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
              توزيع تقريري لاستهلاك أجهزتك بناءً على الذكاء الاصطناعي — الاثنين، 30 أبريل 2024
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", border: "1px solid hsl(var(--color-gray-200))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-600))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span style={{ position: "absolute", top: -3, insetInlineEnd: -3, width: 9, height: 9, background: "hsl(var(--color-sa-500))", borderRadius: "50%", border: "2px solid hsl(var(--color-gray-25))" }} />
            </div>
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

          <div style={{ textAlign: "start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}>آخر تحديث: منذ دقيقة</p>
            </div>
            <button style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
              تحديد الميزانية
            </button>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "16px 24px", textAlign: "center" }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>إجمالي التوقع</p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#fff" }} dir="ltr">48.45 <span style={{ fontSize: 14, fontWeight: 400 }}>ر.س</span></p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>التكلفة الإجمالية حتى الآن</p>
            </div>
            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>التوقع النهائي</p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#fff" }} dir="ltr">410 <span style={{ fontSize: 14, fontWeight: 400 }}>ر.س</span></p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>بنهاية الشهر</p>
            </div>
          </div>
        </div>

        {/* Device Cards Grid 2×2 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>استهلاك الأجهزة</h2>
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>عرض الكل</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {devices.map((device, i) => (
              <div key={i} style={{
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
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: "hsl(var(--color-sa-25))", display: "flex", alignItems: "center", justifyContent: "center", color: "hsl(var(--color-sa-600))" }}>
                      {device.icon}
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{device.label}</h3>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                    background: device.trendUp ? "hsl(var(--color-sa-25))" : (device.trend === "0%" ? "hsl(var(--color-gray-100))" : "hsl(var(--color-warning) / 0.1)"),
                    color: device.trendUp ? "hsl(var(--color-sa-700))" : (device.trend === "0%" ? "hsl(var(--color-gray-500))" : "hsl(var(--color-warning-text))"),
                    border: `1px solid ${device.trendUp ? "hsl(var(--color-sa-100))" : (device.trend === "0%" ? "hsl(var(--color-gray-200))" : "#FEDF89")}`,
                  }}>
                    {device.trendUp ? "▲" : device.trend === "0%" ? "─" : "▼"} {device.trend}
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "hsl(var(--color-gray-500))" }}>نسبة الاستهلاك</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "hsl(var(--color-sa-600))" }}>{device.pct}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: "hsl(var(--color-gray-100))", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${device.pct}%`, background: "linear-gradient(90deg, hsl(var(--color-sa-600)), hsl(var(--color-sa-400)))", borderRadius: 99, transition: "width 0.6s ease" }} />
                  </div>
                </div>

                {/* Cost */}
                <div style={{ background: "hsl(var(--color-gray-25))", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "hsl(var(--color-gray-500))" }}>التكلفة حتى الآن</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "hsl(var(--color-gray-950))" }} dir="ltr">{device.cost} <span style={{ fontSize: 12, fontWeight: 500 }}>ر.س</span></span>
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
            <div style={{ textAlign: "start" }}>
              <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "hsl(var(--color-sa-700))" }}>كفاءة الاستهلاك ✓</p>
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-600))" }}>أنت على المسار الصحيح! استهلاكك ضمن الحدود المثالية.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
