import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth, setDemoSession } from "./contexts/AuthContext";
import { LanguageProvider, useLanguage, useT, type TranslationKey } from "./i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
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
import Sidebar from "./components/desktop/Sidebar";
import AppTopBar, { navigateToAppPage } from "./components/AppTopBar";
import type { AppPage } from "./components/CommandPalette";
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

function ShellNav() {
  const navigate = useNavigate();
  return (screen: Screen) => {
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
}

function AppShell() {
  const isDesktop = useIsDesktop();
  const nav = ShellNav();
  useDashboard();

  const shellStyle: React.CSSProperties = isDesktop
    ? { height: "100dvh", width: "100%", display: "flex", flexDirection: "column", background: "var(--background)", overflow: "hidden" }
    : { height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--background)" };

  const innerStyle: React.CSSProperties = isDesktop
    ? { flex: 1, overflow: "hidden", display: "flex", width: "100%", height: "100%" }
    : { width: "100%", maxWidth: 430, height: "100%", maxHeight: 900, background: "var(--background)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "var(--shadow-lg)", position: "relative" };

  return (
    <div style={shellStyle}>
      <div style={innerStyle}>
        <Routes>
          <Route path="/dashboard" element={isDesktop ? <DesktopDashboard onNavigate={nav} /> : <DashboardScreen onNavigate={nav} />} />
          <Route path="/forecast" element={isDesktop ? <DesktopForecast onNavigate={nav} /> : <ForecastScreen onNavigate={nav} />} />
          <Route path="/profile" element={isDesktop ? <DesktopProfile onNavigate={nav} /> : <ProfileScreen onNavigate={nav} />} />
          <Route path="/ai" element={isDesktop ? <DesktopAIAssistant onNavigate={nav} /> : <AIAssistantScreen onNavigate={nav} />} />
          <Route
            path="/about"
            element={
              isDesktop ? (
                <DesktopPageShell current="about" onNavigate={nav}>
                  <AboutScreen />
                </DesktopPageShell>
              ) : (
                <AboutScreen />
              )
            }
          />
          <Route
            path="/hackathon/kb"
            element={
              isDesktop ? (
                <DesktopPageShell current="about" onNavigate={nav} titleKey="nav.hackathonKb">
                  <KnowledgeBaseScreen onBack={() => nav("about")} />
                </DesktopPageShell>
              ) : (
                <KnowledgeBaseScreen onBack={() => nav("about")} />
              )
            }
          />
          <Route
            path="/hackathon/gaps"
            element={
              isDesktop ? (
                <DesktopPageShell current="about" onNavigate={nav} titleKey="nav.hackathonGaps">
                  <GapsScreen onBack={() => nav("about")} />
                </DesktopPageShell>
              ) : (
                <GapsScreen onBack={() => nav("about")} />
              )
            }
          />
          <Route
            path="/hackathon/readiness"
            element={
              isDesktop ? (
                <DesktopPageShell current="about" onNavigate={nav} titleKey="nav.hackathonReadiness">
                  <ReadinessScreen onBack={() => nav("about")} />
                </DesktopPageShell>
              ) : (
                <ReadinessScreen onBack={() => nav("about")} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

/** Shared desktop chrome so About / hackathon pages fill the shell (no white screen). */
function DesktopPageShell({
  current,
  onNavigate,
  titleKey = "nav.about",
  children,
}: {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  titleKey?: TranslationKey;
  children: React.ReactNode;
}) {
  const t = useT();
  const navigate = useNavigate();
  const handleAppNavigate = (page: AppPage) => {
    if (page === "dashboard" || page === "forecast" || page === "ai" || page === "profile" || page === "about") {
      onNavigate(page);
      return;
    }
    navigateToAppPage(navigate, page);
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100%", overflow: "hidden" }}>
      <Sidebar current={current} onNavigate={onNavigate} />
      <div style={{ flex: 1, minWidth: 0, height: "100%", display: "flex", flexDirection: "column", background: "var(--background)" }}>
        <AppTopBar title={t(titleKey)} onNavigate={handleAppNavigate} />
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

function AppWithI18nBoundary({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <ErrorBoundary fallbackTitle={t("error.title")} retryLabel={t("error.retry")}>
      {children}
    </ErrorBoundary>
  );
}

export default function AppRouter() {
  useEffect(() => {
    void initPushRegistration();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AppWithI18nBoundary>
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
          </AppWithI18nBoundary>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
