import { useState } from "react";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import SignUpModal from "./modals/SignUpModal";
import Toast from "./ui/Toast";

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onResetPassword: (email: string) => Promise<{ error: Error | null }>;
  onGoogleLogin?: () => Promise<void>;
}

export default function LoginScreen({ onLogin, onSignUp, onResetPassword, onGoogleLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        background: "hsl(var(--color-sa-25))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <div style={{ position: "relative", padding: "48px 24px 32px", textAlign: "center" }}>
        <div style={{
          position: "absolute", top: 0, insetInlineStart: 0, width: "100%", height: "100%",
          overflow: "hidden", pointerEvents: "none",
        }}>
          <svg viewBox="0 0 375 220" style={{ position: "absolute", bottom: 0, insetInlineStart: 0, width: "55%", opacity: 0.18 }}>
            <circle cx="70" cy="160" r="3" fill="#1B8354" />
            <rect x="69" y="80" width="2" height="80" fill="#1B8354" />
            <line x1="70" y1="82" x2="40" y2="50" stroke="#1B8354" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="82" x2="100" y2="50" stroke="#1B8354" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="82" x2="70" y2="45" stroke="#1B8354" strokeWidth="2" strokeLinecap="round" />
            <rect x="10" y="160" width="50" height="30" rx="2" fill="#1B8354" />
            <line x1="35" y1="160" x2="35" y2="190" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="10" y1="175" x2="60" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="20" y="150" width="60" height="32" rx="2" fill="#25935F" transform="rotate(-8,50,166)" />
            <line x1="50" y1="150" x2="47" y2="182" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <rect x="140" y="140" width="20" height="60" rx="1" fill="#1B8354" opacity="0.6" />
            <rect x="165" y="155" width="16" height="45" rx="1" fill="#166A45" opacity="0.5" />
            <rect x="185" y="148" width="22" height="52" rx="1" fill="#1B8354" opacity="0.55" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "hsl(var(--color-sa-600))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px hsla(var(--color-sa-600), 0.35)",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "hsl(var(--color-gray-950))", letterSpacing: "-0.5px" }}>
            Wafier
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-sa-600))", fontWeight: 500 }}>
            إدارة الطاقة والحلول الذكية
          </p>
        </div>
      </div>

      {/* Card */}
      <div style={{
        flex: 1,
        background: "#fff",
        borderRadius: "28px 28px 0 0",
        padding: "32px 24px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxShadow: "0 -4px 32px rgba(0,0,0,0.06)",
      }}>
        <div>
          <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>
            مرحباً بك!
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
            سجّل دخولك للوصول إلى حسابك ومتابعة استهلاكك
          </p>
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))" }}>
            البريد الإلكتروني
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              style={{
                width: "100%", padding: "13px 16px", paddingInlineStart: 44,
                border: "1.5px solid hsl(var(--color-gray-200))",
                borderRadius: 12, fontSize: 14, outline: "none",
                fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                color: "hsl(var(--color-gray-950))", direction: "ltr", textAlign: "start",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
            />
            <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--color-gray-400))" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 8l10 6 10-6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))" }}>
            كلمة المرور
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              style={{
                width: "100%", padding: "13px 44px",
                border: "1.5px solid hsl(var(--color-gray-200))",
                borderRadius: 12, fontSize: 14, outline: "none",
                fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                color: "hsl(var(--color-gray-950))", direction: "rtl",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
              onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
            />
            <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--color-gray-400))" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
                color: "hsl(var(--color-gray-400))",
              }}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={() => setShowForgot(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 13, color: "hsl(var(--color-sa-600))", fontFamily: "inherit" }}
          >
            نسيت كلمة المرور؟
          </button>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "hsl(var(--color-gray-700))" }}>
            <span>تذكرني</span>
            <div
              onClick={() => setRemember(!remember)}
              style={{
                width: 18, height: 18, borderRadius: 4,
                border: `2px solid ${remember ? "hsl(var(--color-sa-600))" : "hsl(var(--color-gray-300))"}`,
                background: remember ? "hsl(var(--color-sa-600))" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", cursor: "pointer",
              }}
            >
              {remember && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </label>
        </div>

        {/* Login Button */}
        <button
          onClick={async () => {
            setError(null);
            setLoading(true);
            try {
              await onLogin(email, password);
            } catch (e) {
              setError(e instanceof Error ? e.message : "فشل تسجيل الدخول");
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading || !email || password.length < 4}
          style={{
            width: "100%", padding: "15px",
            background: "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))",
            border: "none", borderRadius: 14, cursor: "pointer",
            color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 4px 16px hsla(var(--color-sa-600), 0.4)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
          </svg>
          تسجيل الدخول
        </button>
        {error && <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-destructive))", textAlign: "center" }}>{error}</p>}

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "hsl(var(--color-gray-200))" }} />
          <span style={{ fontSize: 12, color: "hsl(var(--color-gray-400))" }}>أو تسجيل الدخول باستخدام</span>
          <div style={{ flex: 1, height: 1, background: "hsl(var(--color-gray-200))" }} />
        </div>

        {/* Social Login */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={() => showToast("تسجيل الدخول عبر Apple قريباً")}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))",
              background: "hsl(var(--color-gray-50))", cursor: "not-allowed", opacity: 0.45,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={async () => {
              setError(null);
              setLoading(true);
              try {
                await onGoogleLogin?.();
              } catch (e) {
                setError(e instanceof Error ? e.message : "تعذر تسجيل الدخول عبر Google");
              } finally {
                setLoading(false);
              }
            }}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))",
              background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-50))")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => showToast("تسجيل الدخول برقم الهاتف قريباً")}
            style={{
              flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))",
              background: "hsl(var(--color-gray-50))", cursor: "not-allowed", opacity: 0.45,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <circle cx="12" cy="18" r="1" fill="hsl(var(--color-sa-600))" />
            </svg>
          </button>
        </div>

        {/* Sign up */}
        <p style={{ textAlign: "center", margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
          ليس لديك حساب؟{" "}
          <button
            onClick={() => setShowSignUp(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 13, color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit" }}
          >
            إنشاء حساب جديد
          </button>
        </p>

        {/* Security Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "10px 16px", borderRadius: 10,
          background: "hsl(var(--color-sa-25))",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontSize: 12, color: "hsl(var(--color-sa-700))", fontWeight: 500 }}>بياناتك آمنة 100%</span>
        </div>
      </div>

      {/* Overlays */}
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} onReset={onResetPassword} />}
      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSignUp={onSignUp}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
