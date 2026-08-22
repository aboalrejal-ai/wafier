import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [city, setCity] = useState(user?.city || "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const result = updateProfile({ name, email, city });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setSaved(true);
    setTimeout(onClose, 1200);
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
          maxHeight: "88vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ textAlign: "start" }}>
              <h2 style={{ margin: "0 0 2px", fontSize: 20, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>تعديل الملف الشخصي</h2>
              <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-500))" }}>حدّث معلوماتك الشخصية</p>
            </div>
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
          </div>

          {/* Avatar */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg, hsl(var(--color-sa-100)), hsl(var(--color-sa-200)))",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "3px solid hsl(var(--color-sa-200))",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="hsl(var(--color-sa-600))">
                  <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                </svg>
              </div>
              <div style={{
                position: "absolute", bottom: 0, insetInlineEnd: 0,
                width: 28, height: 28, borderRadius: "50%",
                background: "hsl(var(--color-sa-600))",
                border: "2px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "الاسم الكامل", value: name, set: setName, type: "text", dir: "rtl" as const },
              { label: "البريد الإلكتروني", value: email, set: setEmail, type: "email", dir: "ltr" as const },
              { label: "المدينة", value: city, set: setCity, type: "text", dir: "rtl" as const },
            ].map(({ label, value, set, type, dir }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--color-gray-700))", textAlign: "start" }}>{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  dir={dir}
                  style={{
                    width: "100%", padding: "13px 16px",
                    border: "1.5px solid hsl(var(--color-gray-200))",
                    borderRadius: 12, fontSize: 14, outline: "none",
                    fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
                    color: "hsl(var(--color-gray-950))", boxSizing: "border-box",
                    textAlign: "start",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-600))")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
                />
              </div>
            ))}

            {error && (
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-danger))", textAlign: "start" }}>{error}</p>
            )}

            <button
              onClick={handleSave}
              style={{
                width: "100%", padding: "15px", marginTop: 8,
                background: saved
                  ? "hsl(var(--color-sa-500))"
                  : "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))",
                border: "none", borderRadius: 14, cursor: "pointer",
                color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.3s",
                boxShadow: "0 4px 16px hsla(var(--color-sa-600), 0.35)",
              }}
            >
              {saved ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  تم الحفظ!
                </>
              ) : "حفظ التغييرات"}
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
