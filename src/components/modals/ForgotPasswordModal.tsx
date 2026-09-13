import { useState } from "react";

interface ForgotPasswordModalProps {
  onClose: () => void;
  onReset: (email: string) => Promise<{ error: Error | null }>;
}

export default function ForgotPasswordModal({ onClose, onReset }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) return;
    await onReset(email);
    setSent(true);
  };

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
          padding: "12px 24px 36px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>

        {!sent ? (
          <>
            <div style={{ textAlign: "start", marginBottom: 24 }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>
                نسيت كلمة المرور؟
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))", lineHeight: 1.6 }}>
                أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة الضبط
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))", textAlign: "start" }}>
                البريد الإلكتروني
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  dir="rtl"
                  style={{
                    width: "100%", padding: "13px 16px 13px 44px",
                    border: "1.5px solid hsl(var(--color-gray-200))",
                    borderRadius: 12, fontSize: 14, outline: "none",
                    fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                    color: "hsl(var(--color-gray-950))",
                    boxSizing: "border-box",
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

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={handleSend}
                style={{
                  width: "100%", padding: "15px",
                  background: "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))",
                  border: "none", borderRadius: 14, cursor: "pointer",
                  color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
                  boxShadow: "0 4px 16px hsla(var(--color-sa-600), 0.35)",
                }}
              >
                إرسال رابط الاسترداد
              </button>
              <button
                onClick={onClose}
                style={{
                  width: "100%", padding: "13px",
                  background: "none", border: "1.5px solid hsl(var(--color-gray-200))",
                  borderRadius: 14, cursor: "pointer",
                  color: "hsl(var(--color-gray-700))", fontSize: 14, fontWeight: 500, fontFamily: "inherit",
                }}
              >
                إلغاء
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "hsl(var(--color-sa-25))",
              border: "2px solid hsl(var(--color-sa-200))",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>تم الإرسال!</h2>
            <p style={{ margin: "0 0 24px", fontSize: 13, color: "hsl(var(--color-gray-500))", lineHeight: 1.6 }}>
              تحقق من بريدك الإلكتروني للحصول على رابط إعادة ضبط كلمة المرور
            </p>
            <button
              onClick={onClose}
              style={{
                width: "100%", padding: "14px",
                background: "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))",
                border: "none", borderRadius: 14, cursor: "pointer",
                color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
              }}
            >
              حسناً
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </>
  );
}
