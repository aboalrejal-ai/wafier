import { useEffect, useState } from "react";
import type { AppNotification } from "../../types/database";
import {
  getDevicePermissionState,
  requestDeviceNotificationPermission,
  type DevicePermissionState,
} from "../../lib/notification-distributor";
import { useT } from "../../i18n";

interface NotificationsPanelProps {
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead?: () => void;
  variant?: "mobile" | "desktop";
}

const typeColor: Record<string, string> = {
  level1: "hsl(var(--color-warning))",
  level1b: "hsl(var(--color-warning))",
  level2: "hsl(var(--color-destructive))",
  info: "hsl(var(--color-info))",
  warning: "hsl(var(--color-warning))",
  success: "hsl(var(--color-success))",
};

export default function NotificationsPanel({ onClose, notifications, onMarkAllRead, variant = "mobile" }: NotificationsPanelProps) {
  const t = useT();
  const unread = notifications.filter((n) => !n.read).length;
  const isDesktop = variant === "desktop";
  const [devicePermission, setDevicePermission] = useState<DevicePermissionState>(() => getDevicePermissionState());
  const [enabling, setEnabling] = useState(false);

  const formatTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return t("notifications.minutesAgo");
    if (hours < 24) return t("notifications.hoursAgo", { hours });
    return t("notifications.yesterday");
  };

  useEffect(() => {
    setDevicePermission(getDevicePermissionState());
  }, []);

  const enableDeviceNotifications = async () => {
    setEnabling(true);
    const next = await requestDeviceNotificationPermission();
    setDevicePermission(next);
    setEnabling(false);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "hsl(var(--color-gray-950) / 0.45)", zIndex: 200, animation: "fadeIn 0.2s ease" }} />
      <div
        style={{
          position: "fixed",
          ...(isDesktop
            ? { top: 0, bottom: 0, insetInlineEnd: 0, width: 380, borderRadius: "0", animation: "slideIn 0.3s ease" }
            : { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0", animation: "slideUp 0.3s ease" }),
          zIndex: 201,
          background: "#fff",
          maxHeight: isDesktop ? "100%" : "80vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: isDesktop ? "-4px 0 24px rgba(0,0,0,0.12)" : "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {!isDesktop && (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
            <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 12px" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {unread > 0 && onMarkAllRead && (
              <button onClick={onMarkAllRead} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", fontWeight: 600 }}>
                {t("notifications.markAllRead")}
              </button>
            )}
            <button onClick={onClose} style={{ background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ✕
            </button>
          </div>
          <div style={{ textAlign: "start" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{t("notifications.title")}</h2>
          </div>
        </div>

        {devicePermission !== "granted" && (
          <div style={{ padding: "0 20px 12px" }}>
            <button type="button" disabled={enabling} onClick={enableDeviceNotifications} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid hsl(var(--color-sa-200))", background: "hsl(var(--color-sa-25))", color: "hsl(var(--color-sa-700))", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
              {t("notifications.enableDevice")}
            </button>
          </div>
        )}
        {devicePermission === "granted" && (
          <p style={{ margin: "0 20px 12px", fontSize: 12, color: "hsl(var(--color-sa-700))", textAlign: "start" }}>{t("notifications.deviceEnabled")}</p>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
          {notifications.length === 0 && (
            <p style={{ textAlign: "center", color: "hsl(var(--color-gray-400))", fontSize: 13, marginTop: 40 }}>{t("notifications.empty")}</p>
          )}
          {notifications.map((n) => (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "14px 12px", borderRadius: 12, background: n.read ? "transparent" : "hsl(var(--color-sa-25))", marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColor[n.level] ?? typeColor.info, marginTop: 6, flexShrink: 0 }} />
              <div style={{ flex: 1, textAlign: "start" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</span>
                  <span style={{ fontSize: 11, color: "hsl(var(--color-gray-400))" }}>{formatTime(n.created_at)}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.5 }}>{n.body}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>
      </div>
    </>
  );
}
