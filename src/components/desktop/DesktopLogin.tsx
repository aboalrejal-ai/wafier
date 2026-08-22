import { useState } from "react";
import ForgotPasswordModal from "../modals/ForgotPasswordModal";
import SignUpModal from "../modals/SignUpModal";
import Toast from "../ui/Toast";

interface DesktopLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onResetPassword: (email: string) => Promise<{ error: Error | null }>;
}

export default function DesktopLogin({ onLogin, onSignUp, onResetPassword }: DesktopLoginProps) {
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
      <div style={{ flex: "0 0 48%", background: "linear-gradient(145deg, hsl(var(--color-sa-800)) 0%, hsl(var(--color-sa-600)) 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px 56px", position: "relative", overflow: "hidden", order: 1 }}>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 360 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" /></svg>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 42, fontWeight: 800, color: "#fff" }}>Wafier</h1>
          <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.65)" }}>إدارة الطاقة والحلول المالية الذكية</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 40 }}>
            {[
              { icon: "⚡", title: "إدارة الطاقة", desc: "تتبع استهلاكك في الوقت الفعلي" },
              { icon: "📊", title: "توقعات الفاتورة", desc: "تنبؤات دقيقة بناءً على الذكاء الاصطناعي" },
              { icon: "💰", title: "ميزانية ذكية", desc: "تحكم كامل في مصاريفك الشهرية" },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "flex-end", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ textAlign: "end" }}>
                  <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600, color: "#fff" }}>{f.title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{f.desc}</p>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{f.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--color-gray-25))", padding: "48px 56px", order: 2 }}>
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
