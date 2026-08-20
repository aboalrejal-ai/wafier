import { useState } from "react";

interface SignUpModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function SignUpModal({ onClose, onSuccess }: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agree, setAgree] = useState(false);

  const valid = name.trim() && email.trim() && password.length >= 6 && agree;

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "hsl(var(--color-gray-950) / 0.45)", zIndex: 300, animation: "fadeIn 0.2s ease" }}
      />
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 301,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          maxHeight: "92vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 36px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <button
              onClick={onClose}
              style={{
                background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer",
                width: 32, height: 32, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-700))" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div style={{ textAlign: "end" }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>إنشاء حساب جديد</h2>
              <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-500))" }}>انضم إلى Wafier وابدأ التوفير</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))", textAlign: "end" }}>الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                dir="rtl"
                style={{
                  width: "100%", padding: "13px 16px",
                  border: "1.5px solid hsl(var(--color-gray-200))",
                  borderRadius: 12, fontSize: 14, outline: "none",
                  fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                  color: "hsl(var(--color-gray-950))", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
              />
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))", textAlign: "end" }}>البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                dir="rtl"
                style={{
                  width: "100%", padding: "13px 16px",
                  border: "1.5px solid hsl(var(--color-gray-200))",
                  borderRadius: 12, fontSize: 14, outline: "none",
                  fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                  color: "hsl(var(--color-gray-950))", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))", textAlign: "end" }}>كلمة المرور</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 أحرف على الأقل"
                  dir="rtl"
                  style={{
                    width: "100%", padding: "13px 16px 13px 44px",
                    border: "1.5px solid hsl(var(--color-gray-200))",
                    borderRadius: 12, fontSize: 14, outline: "none",
                    fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                    color: "hsl(var(--color-gray-950))", boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    color: "hsl(var(--color-gray-400))",
                  }}
                >
                  {showPass ? (
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

            {/* Terms */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.5, textAlign: "end", flex: 1 }}>
                أوافق على <span style={{ color: "hsl(var(--color-sa-600))", fontWeight: 600 }}>شروط الاستخدام</span> و
                <span style={{ color: "hsl(var(--color-sa-600))", fontWeight: 600 }}> سياسة الخصوصية</span>
              </p>
              <div
                onClick={() => setAgree(!agree)}
                style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 2,
                  border: `2px solid ${agree ? "hsl(var(--color-sa-600))" : "hsl(var(--color-gray-300))"}`,
                  background: agree ? "hsl(var(--color-sa-600))" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s", cursor: "pointer",
                }}
              >
                {agree && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </label>

            <button
              onClick={valid ? onSuccess : undefined}
              style={{
                width: "100%", padding: "15px",
                background: valid
                  ? "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))"
                  : "hsl(var(--color-gray-200))",
                border: "none", borderRadius: 14,
                cursor: valid ? "pointer" : "default",
                color: valid ? "#fff" : "hsl(var(--color-gray-400))",
                fontSize: 16, fontWeight: 700, fontFamily: "inherit",
                transition: "background 0.2s",
                boxShadow: valid ? "0 4px 16px hsla(var(--color-sa-600), 0.35)" : "none",
              }}
            >
              إنشاء الحساب
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </>
  );
}
