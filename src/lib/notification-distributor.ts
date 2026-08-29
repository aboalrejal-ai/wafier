import { Capacitor } from "@capacitor/core";

const TOKEN_KEY = "wafier_push_token";
const NATIVE_PERMISSION_KEY = "wafier_native_notify";

let pushListenersBound = false;

export type DevicePermissionState = "prompt" | "granted" | "denied" | "unsupported";

export function getDevicePermissionState(): DevicePermissionState {
  if (typeof window === "undefined") return "unsupported";

  if (Capacitor.isNativePlatform()) {
    const stored = localStorage.getItem(NATIVE_PERMISSION_KEY);
    if (stored === "granted" || stored === "denied" || stored === "prompt") return stored;
    return "prompt";
  }

  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return "prompt";
}

export async function requestDeviceNotificationPermission(): Promise<DevicePermissionState> {
  if (Capacitor.isNativePlatform()) {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    const local = await LocalNotifications.requestPermissions();
    const granted = local.display === "granted";

    try {
      const { PushNotifications } = await import("@capacitor/push-notifications");
      const push = await PushNotifications.requestPermissions();
      if (push.receive === "granted") {
        await PushNotifications.register();
      }
    } catch (err) {
      console.warn("تسجيل Push تُخطّي — أضف google-services.json لاحقاً", err);
    }

    const state: DevicePermissionState = granted ? "granted" : "denied";
    localStorage.setItem(NATIVE_PERMISSION_KEY, state);
    return state;
  }

  if (!("Notification" in window)) return "unsupported";
  const result = await Notification.requestPermission();
  if (result === "granted") return "granted";
  if (result === "denied") return "denied";
  return "prompt";
}

export async function deliverExternalNotification(title: string, body: string): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { LocalNotifications } = await import("@capacitor/local-notifications");
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Date.now() % 2147483647),
            title,
            body,
            schedule: { at: new Date(Date.now() + 250) },
          },
        ],
      });
      return;
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, dir: "rtl", lang: "ar", tag: `wafier-${title}` });
    }
  } catch (err) {
    console.warn("فشل إرسال إشعار الجهاز", err);
  }
}

export async function initPushRegistration(): Promise<void> {
  if (!Capacitor.isNativePlatform() || pushListenersBound) return;
  pushListenersBound = true;

  const { PushNotifications } = await import("@capacitor/push-notifications");

  await PushNotifications.addListener("registration", (token) => {
    localStorage.setItem(TOKEN_KEY, token.value);
  });

  await PushNotifications.addListener("registrationError", (err) => {
    console.warn("خطأ تسجيل Push", err);
  });

  await PushNotifications.addListener("pushNotificationReceived", (notification) => {
    void deliverExternalNotification(notification.title ?? "Wafier", notification.body ?? "");
  });
}

export function getStoredPushToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
