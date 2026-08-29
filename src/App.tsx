import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth, setDemoSession } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ConsentScreen from "./components/ConsentScreen";
import AboutScreen from "./components/AboutScreen";
import GapsScreen from "./components/hackathon/GapsScreen";
import KnowledgeBaseScreen from "./components/hackathon/KnowledgeBaseScreen";
import ReadinessScreen from "./components/hackathon/ReadinessScreen";
import PrivacyScreen from "./components/PrivacyScreen";
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
import { signIn, signUp, resetPassword, signInWithGoogle, isSupabaseConfigured, getSession } from "./services/data-service";
import { useDashboard } from "./hooks/useDashboard";
import { initPushRegistration } from "./lib/notification-distributor";

export type Screen = "login" | "dashboard" | "forecast" | "profile" | "ai" | "about";

const queryClient = new QueryClient();

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isDesktop;
}

function LoginRoute() {
  const navigate = useNavigate();
  const { refreshSession, user, loading, hasConsent } = useAuth();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (loading || !user) return;
    navigate(hasConsent ? "/dashboard" : "/consent", { replace: true });
  }, [loading, user, hasConsent, navigate]);

  const handleLogin = async (email: string, password: string) => {
    const { user: signedIn, error } = await signIn(email, password);
    if (error) throw error;
    if (signedIn) {
      if (!isSupabaseConfigured) setDemoSession(email);
      await refreshSession();
      navigate("/consent");
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    const { error } = await signUp(email, password, name);
    if (error) throw error;
    if (!isSupabaseConfigured) setDemoSession(email);
    await refreshSession();
    const session = await getSession();
    if (!session?.user) {
      throw new Error("تم إنشاء الحساب. افتح بريدك لتأكيد الإيميل ثم سجّل الدخول.");
    }
    navigate("/consent");
  };

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) throw error;
  };

  if (isDesktop) {
    return (
      <DesktopLogin
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onResetPassword={resetPassword}
        onGoogleLogin={handleGoogle}
      />
    );
  }
  return (
    <LoginScreen
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      onResetPassword={resetPassword}
      onGoogleLogin={handleGoogle}
    />
  );
}

function AppShell() {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  useDashboard();

  const nav = (screen: Screen) => {
    const map: Record<Screen, string> = {
      login: "/login",
      dashboard: "/dashboard",
      forecast: "/forecast",
      profile: "/profile",
      ai: "/ai",
      about: "/about",
    };
    navigate(map[screen]);
  };

  const shellStyle: React.CSSProperties = isDesktop
    ? { height: "100dvh", width: "100%", display: "flex", flexDirection: "column", background: "hsl(var(--color-gray-25))", overflow: "hidden", direction: "rtl" }
    : { height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center", background: "hsl(var(--color-gray-25))", direction: "rtl" };

  const innerStyle: React.CSSProperties = isDesktop
    ? { flex: 1, overflow: "hidden", display: "flex" }
    : { width: "100%", maxWidth: 430, height: "100%", maxHeight: 900, background: "hsl(var(--color-gray-25))", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 12px 16px -4px hsl(220 39% 11% / 0.08)", position: "relative" };

  return (
    <div style={shellStyle}>
      <div style={innerStyle}>
        <Routes>
          <Route path="/dashboard" element={isDesktop ? <DesktopDashboard onNavigate={nav} /> : <DashboardScreen onNavigate={nav} />} />
          <Route path="/forecast" element={isDesktop ? <DesktopForecast onNavigate={nav} /> : <ForecastScreen onNavigate={nav} />} />
          <Route path="/profile" element={isDesktop ? <DesktopProfile onNavigate={nav} /> : <ProfileScreen onNavigate={nav} />} />
          <Route path="/ai" element={isDesktop ? <DesktopAIAssistant onNavigate={nav} /> : <AIAssistantScreen onNavigate={nav} />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/hackathon/kb" element={<KnowledgeBaseScreen onBack={() => navigate(-1)} />} />
          <Route path="/hackathon/gaps" element={<GapsScreen onBack={() => navigate(-1)} />} />
          <Route path="/hackathon/readiness" element={<ReadinessScreen onBack={() => navigate(-1)} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function AppRouter() {
  useEffect(() => {
    void initPushRegistration();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/consent" element={<ConsentScreen />} />
            <Route path="/privacy" element={<PrivacyScreen />} />
            <Route path="/*" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
