import type { CapacitorConfig } from "@capacitor/cli";

// iOS: run `pnpm exec cap add ios` on macOS. Linux cannot generate the Xcode project.

const config: CapacitorConfig = {
  appId: "sa.wafier.app",
  appName: "Wafir",
  webDir: "dist",
  android: {
    allowMixedContent: true,
  },
  server: {
    androidScheme: "https",
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: {
      iconColor: "#1B8354",
    },
  },
};

export default config;
