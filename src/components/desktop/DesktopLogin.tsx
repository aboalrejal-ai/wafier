import { useState } from "react";
import ForgotPasswordModal from "../modals/ForgotPasswordModal";
import SignUpModal from "../modals/SignUpModal";
import Toast from "../ui/Toast";

interface DesktopLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onResetPassword: (email: string) => Promise<{ error: Error | null }>;
  onGoogleLogin?: () => Promise<void>;
}

export default function DesktopLogin({ onLogin, onSignUp, onResetPassword, onGoogleLogin }: DesktopLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div style={{ flex: "0 0 48%", background: "linear-gradient(145deg, hsl(var(--color-sa-800)) 0%, hsl(var(--color-sa-600)) 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px 56px", position: "relative", overflow: "hidden", order: 2 }}>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 360 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" /></svg>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 42, fontWeight: 800, color: "#fff" }}>Wafir</h1>
          <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.65)" }}>إدارة الطاقة والحلول المالية الذكية</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 40 }}>
            {[
              { icon: "⚡", title: "إدارة الطاقة", desc: "تتبع استهلاكك في الوقت الفعلي" },
              { icon: "📊", title: "توقعات الفاتورة", desc: "تنبؤات دقيقة بناءً على الذكاء الاصطناعي" },
              { icon: "💰", title: "ميزانية ذكية", desc: "تحكم كامل في مصاريفك الشهرية" },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{f.icon}</div>
                <div style={{ textAlign: "start" }}>
                  <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600, color: "#fff" }}>{f.title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--color-gray-25))", padding: "48px 56px", order: 1 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800 }}>مرحباً بك! 👋</h2>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: "hsl(var(--color-gray-500))" }}>سجّل دخولك للوصول إلى لوحة التحكم</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>البريد الإلكتروني</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="أدخل بريدك الإلكتروني"
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid hsl(var(--color-gray-200))", borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>كلمة المرور</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل كلمة المرور"
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid hsl(var(--color-gray-200))", borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <button onClick={() => setShowForgot(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "hsl(var(--color-sa-600))", fontFamily: "inherit" }}>نسيت كلمة المرور؟</button>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
              <span>تذكرني</span>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            </label>
          </div>

          <button onClick={handleLogin} disabled={loading || !email || password.length < 4}
            style={{ width: "100%", padding: "15px", background: "#1B8354", border: "none", borderRadius: 14, cursor: "pointer", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit", marginBottom: 16 }}>
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
          {error && <p style={{ color: "hsl(var(--color-destructive))", fontSize: 12, textAlign: "center" }}>{error}</p>}

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 16px" }}>
            <div style={{ flex: 1, height: 1, background: "hsl(var(--color-gray-200))" }} />
            <span style={{ fontSize: 12, color: "hsl(var(--color-gray-400))" }}>أو تسجيل الدخول باستخدام</span>
            <div style={{ flex: 1, height: 1, background: "hsl(var(--color-gray-200))" }} />
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
            <button type="button" onClick={() => setToast("تسجيل الدخول عبر Apple قريباً")} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))", background: "hsl(var(--color-gray-50))", cursor: "not-allowed", opacity: 0.45 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" /></svg>
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
              style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button type="button" onClick={() => setToast("تسجيل الدخول برقم الهاتف قريباً")} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))", background: "hsl(var(--color-gray-50))", cursor: "not-allowed", opacity: 0.45 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2" /><circle cx="12" cy="18" r="1" fill="hsl(var(--color-sa-600))" /></svg>
            </button>
          </div>

          <p style={{ textAlign: "center", margin: "20px 0 0", fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
            ليس لديك حساب؟{" "}
            <button onClick={() => setShowSignUp(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--color-sa-600))", fontWeight: 700, fontFamily: "inherit" }}>إنشاء حساب جديد</button>
          </p>
        </div>
      </div>

      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} onReset={onResetPassword} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} onSignUp={onSignUp} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
