import { useState, useEffect } from "react";
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import ForecastScreen from "./components/ForecastScreen";
import ProfileScreen from "./components/ProfileScreen";
import AIAssistantScreen from "./components/AIAssistantScreen";
import DesktopLogin from "./components/desktop/DesktopLogin";
import DesktopDashboard from "./components/desktop/DesktopDashboard";
import DesktopForecast from "./components/desktop/DesktopForecast";
import DesktopProfile from "./components/desktop/DesktopProfile";
import DesktopAIAssistant from "./components/desktop/DesktopAIAssistant";

export type Screen = "login" | "dashboard" | "forecast" | "profile" | "ai";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const navigate = (s: Screen) => {
    setScreen(s);
  };

  if (isDesktop) {
    return (
      <div style={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "hsl(var(--color-gray-25))",
        overflow: "hidden",
        direction: "rtl",
      }}>
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          {screen === "login" && <DesktopLogin onLogin={() => setScreen("dashboard")} />}
          {screen === "dashboard" && <DesktopDashboard onNavigate={navigate} />}
          {screen === "forecast" && <DesktopForecast onNavigate={navigate} />}
          {screen === "profile" && <DesktopProfile onNavigate={navigate} />}
          {screen === "ai" && <DesktopAIAssistant onNavigate={navigate} />}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: "100dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "hsl(var(--color-gray-25))",
      direction: "rtl",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 430,
        height: "100%",
        maxHeight: 900,
        background: "hsl(var(--color-gray-25))",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 12px 16px -4px hsl(220 39% 11% / 0.08), 0 4px 6px -2px hsl(220 39% 11% / 0.03)",
        position: "relative",
      }}>
        {screen === "login" && <LoginScreen onLogin={() => setScreen("dashboard")} />}
        {screen === "dashboard" && <DashboardScreen onNavigate={navigate} />}
        {screen === "forecast" && <ForecastScreen onNavigate={navigate} />}
        {screen === "profile" && <ProfileScreen onNavigate={navigate} />}
        {screen === "ai" && <AIAssistantScreen onNavigate={navigate} />}
      </div>
    </div>
  );
}
