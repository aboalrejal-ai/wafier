import { useState } from "react";

interface DesktopLoginProps {
  onLogin: () => void;
}

export default function DesktopLogin({ onLogin }: DesktopLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>

      {/* Brand Panel — Right in RTL */}
      <div style={{
        flex: "0 0 48%",
        background: "linear-gradient(145deg, hsl(var(--color-sa-800)) 0%, hsl(var(--color-sa-600)) 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "60px 56px", position: "relative", overflow: "hidden",
        order: 1,
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: -80, insetInlineEnd: -80,
          width: 320, height: 320, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
        }} />
        <div style={{
          position: "absolute", bottom: -120, insetInlineStart: -60,
          width: 400, height: 400, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
        }} />

        {/* Decorative SVG */}
        <div style={{ position: "absolute", bottom: 0, insetInlineStart: 0, width: "70%", opacity: 0.12, pointerEvents: "none" }}>
          <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="155" r="4" fill="white" />
            <rect x="78" y="60" width="4" height="95" fill="white" />
            <line x1="80" y1="63" x2="40" y2="20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="63" x2="120" y2="20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="63" x2="80" y2="15" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <rect x="10" y="155" width="60" height="38" rx="3" fill="white" />
            <line x1="40" y1="155" x2="40" y2="193" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            <line x1="10" y1="174" x2="70" y2="174" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            <rect x="25" y="140" width="75" height="42" rx="3" fill="white" opacity="0.85" transform="rotate(-8,62,161)" />
            <rect x="160" y="130" width="30" height="70" rx="2" fill="white" opacity="0.6" />
            <rect x="195" y="148" width="25" height="52" rx="2" fill="white" opacity="0.5" />
            <rect x="224" y="138" width="35" height="62" rx="2" fill="white" opacity="0.55" />
          </svg>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 360 }}>
          {/* Logo */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <h1 style={{ margin: "0 0 8px", fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>
              Wafier
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,0.65)", fontWeight: 400 }}>
              إدارة الطاقة والحلول المالية الذكية
            </p>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 40 }}>
            {[
              { icon: "⚡", title: "إدارة الطاقة", desc: "تتبع استهلاكك في الوقت الفعلي" },
              { icon: "📊", title: "توقعات الفاتورة", desc: "تنبؤات دقيقة بناءً على الذكاء الاصطناعي" },
              { icon: "💰", title: "ميزانية ذكية", desc: "تحكم كامل في مصاريفك الشهرية" },
            ].map((f) => (
              <div key={f.title} style={{
                display: "flex", alignItems: "center", gap: 14, justifyContent: "flex-end",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, padding: "14px 18px",
              }}>
                <div style={{ textAlign: "end" }}>
                  <p style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600, color: "#fff" }}>{f.title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{f.desc}</p>
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>
                  {f.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom badge */}
          <div style={{
            marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            color: "rgba(255,255,255,0.45)", fontSize: 12,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            بياناتك آمنة ومشفرة بالكامل
          </div>
        </div>
      </div>

      {/* Form Panel — Left in RTL */}
      <div style={{
        flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "hsl(var(--color-gray-25))",
        padding: "48px 56px",
        order: 2,
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, color: "hsl(var(--color-gray-950))" }}>
              مرحباً بك! 👋
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: "hsl(var(--color-gray-500))" }}>
              سجّل دخولك للوصول إلى لوحة التحكم
            </p>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--color-gray-700))", marginBottom: 8 }}>
              البريد الإلكتروني
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                style={{
                  width: "100%", padding: "13px 16px 13px 44px",
                  border: "1.5px solid hsl(var(--color-gray-200))",
                  borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit",
                  background: "#fff", color: "hsl(var(--color-gray-950))", boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
              />
              <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--color-gray-400))" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--color-gray-700))", marginBottom: 8 }}>
              كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                style={{
                  width: "100%", padding: "13px 44px 13px 44px",
                  border: "1.5px solid hsl(var(--color-gray-200))",
                  borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit",
                  background: "#fff", color: "hsl(var(--color-gray-950))", boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
              />
              <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--color-gray-400))" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "hsl(var(--color-gray-400))" }}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 13, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", fontWeight: 500 }}>
              نسيت كلمة المرور؟
            </button>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "hsl(var(--color-gray-700))" }}>
              <span>تذكرني</span>
              <div onClick={() => setRemember(!remember)} style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${remember ? "hsl(var(--color-sa-600))" : "hsl(var(--color-gray-300))"}`, background: remember ? "hsl(var(--color-sa-600))" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", cursor: "pointer" }}>
                {remember && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
            </label>
          </div>

          {/* Login Button */}
          <button
            onClick={onLogin}
            style={{
              width: "100%", padding: "15px",
              background: "#1B8354",
              border: "none", borderRadius: 14, cursor: "pointer",
              color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)",
              transition: "background 0.2s, transform 0.15s", marginBottom: 24,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#166A45"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1B8354"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" /></svg>
            تسجيل الدخول
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: "hsl(var(--color-gray-200))" }} />
            <span style={{ fontSize: 12, color: "hsl(var(--color-gray-400))", whiteSpace: "nowrap" }}>أو تسجيل الدخول باستخدام</span>
            <div style={{ flex: 1, height: 1, background: "hsl(var(--color-gray-200))" }} />
          </div>

          {/* Social */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {[
              {
                label: "Apple",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.78 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" /></svg>,
              },
              {
                label: "Google",
                icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>,
              },
              {
                label: "هاتف",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" /><circle cx="12" cy="18" r="1" fill="hsl(var(--color-sa-600))" /></svg>,
              },
            ].map((s) => (
              <button key={s.label} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: "1.5px solid hsl(var(--color-gray-200))", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-50))")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                {s.icon}
              </button>
            ))}
          </div>

          <p style={{ textAlign: "center", margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
            ليس لديك حساب؟{" "}
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 13, color: "hsl(var(--color-sa-600))", fontWeight: 700, fontFamily: "inherit" }}>
              إنشاء حساب جديد
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
