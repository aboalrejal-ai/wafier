import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import AppTopBar, { navigateToAppPage } from "./AppTopBar";
import type { AppPage } from "./CommandPalette";
import type { Screen } from "../App";
import { useDashboardData } from "../hooks/useDashboardData";
import { useT } from "../i18n";

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
  const t = useT();
  const navigate = useNavigate();
  const { budget, spend, remaining, usagePct, forecast, weather, devices, greetingName } = useDashboardData();

  const handleAppNavigate = (page: AppPage) => {
    if (page === "dashboard" || page === "forecast" || page === "ai" || page === "profile" || page === "about") {
      onNavigate(page);
      return;
    }
    navigateToAppPage(navigate, page);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppTopBar
        compact
        notificationsVariant="mobile"
        title={t("dashboard.goodMorning", { name: greetingName })}
        onNavigate={handleAppNavigate}
      />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 8px" }}>
        <div style={{ textAlign: "center", padding: "12px 0 16px" }}>
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
            <span style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)" }}>{t("common.wafir")}</span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted-foreground)" }}>
            {t("dashboard.tagline")}
          </p>
        </div>

        <div style={{ margin: "0 16px 16px" }}>
          <div style={{
            background: "linear-gradient(135deg, hsl(var(--color-sa-800)), hsl(var(--color-sa-600)))",
            borderRadius: 20, padding: "20px 20px 24px",
            color: "#fff",
            boxShadow: "0 8px 32px hsla(var(--color-sa-800), 0.35)",
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.85, textAlign: "start" }}>{t("dashboard.monthlyBudget")}</p>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-1px" }} dir="ltr">{budget}</span>
              <span style={{ fontSize: 13, opacity: 0.85 }}>{t("common.sar")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 12, opacity: 0.85 }}>{t("dashboard.availableBudget")}</span>
              <span style={{ fontSize: 12, opacity: 0.75 }}>{t("dashboard.used", { pct: usagePct })}</span>
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
                <div style={{ textAlign: "start" }}>
                  <p style={{ margin: 0, fontSize: 11, opacity: 0.75 }}>{t("dashboard.remaining")}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 700 }}>
                    <span dir="ltr">{remaining.toFixed(2)}</span> {t("common.sar")}
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
                <div style={{ textAlign: "start" }}>
                  <p style={{ margin: 0, fontSize: 11, opacity: 0.75 }}>{t("dashboard.currentSpend")}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 700 }}>
                    <span dir="ltr">{spend.toFixed(2)}</span> {t("common.sar")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: "0 16px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{t("dashboard.realtime")}</span>
            <button onClick={() => onNavigate("forecast")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>
              {t("common.viewAll")}
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "☀️", label: t("dashboard.temperature"), value: `${weather.temp_c}°C`, sub: weather.description },
              { icon: "💧", label: t("dashboard.humidity"), value: `${weather.humidity}%`, sub: "" },
              { icon: "⚡", label: t("dashboard.energyUse"), value: `${(spend / Math.max(budget, 1) * 1.25).toFixed(2)} kW`, sub: "" },
              { icon: "🌤️", label: t("dashboard.weatherStatus"), value: "", sub: weather.description },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 14, padding: "14px 14px 10px",
                border: "1px solid hsl(var(--color-gray-100))",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                textAlign: "start",
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
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: "0 16px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{t("dashboard.deviceEstimate")}</span>
            <button onClick={() => onNavigate("forecast")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>
              {t("common.viewAll")}
            </button>
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

        <div style={{ margin: "0 16px 24px" }}>
          <div style={{
            background: "hsl(var(--color-sa-25))",
            border: "1px solid hsl(var(--color-sa-100))",
            borderRadius: 16, padding: "16px 18px",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          }}>
            <div style={{ textAlign: "start", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>💡</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--color-gray-900))" }}>{t("dashboard.billForecast")}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-600))" }}>
                {t("dashboard.canExpect", { amount: forecast.toFixed(2) })}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))" }}>
                {t("dashboard.saveMore")}
              </p>
            </div>
            <button
              onClick={() => onNavigate("forecast")}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontSize: 12, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit",
                flexShrink: 0,
              }}
            >
              {t("common.details")}
            </button>
          </div>
        </div>
      </div>

      <BottomNav current="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
