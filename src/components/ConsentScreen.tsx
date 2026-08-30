import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { setConsent } from "../services/data-service";

export default function ConsentScreen() {
  const [accepted, setAccepted] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const { setHasConsent } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!accepted || !privacy) return;
    await setConsent();
    setHasConsent(true);
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--color-gray-25))", direction: "rtl", padding: 24 }}>
      <div style={{ maxWidth: 480, width: "100%", background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "hsl(var(--color-sa-600))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>موافقة PDPL</h1>
          <p style={{ margin: 0, fontSize: 14, color: "hsl(var(--color-gray-500))", lineHeight: 1.6 }}>
            وفق نظام حماية البيانات الشخصية (PDPL)، نحتاج موافقتك قبل معالجة بيانات استهلاك الطاقة.
          </p>
        </div>

        <div style={{ background: "hsl(var(--color-sa-25))", borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, lineHeight: 1.7, color: "hsl(var(--color-gray-700))" }}>
          <p style={{ margin: "0 0 8px", fontWeight: 600 }}>ما الذي نجمعه:</p>
          <ul style={{ margin: 0, paddingInlineStart: 20 }}>
            <li>قراءات العداد (kWh) والطقس</li>
            <li>ميزانيتك الشهرية وتفضيلات التنبيه</li>
            <li>محادثات الوكيل الذكي (للتحسين)</li>
          </ul>
          <p style={{ margin: "12px 0 0", fontSize: 12, color: "hsl(var(--color-gray-500))" }}>
            البيانات مشفرة ومخفية الهوية عند التحليل (Preprocessor Node — PP).
          </p>
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, cursor: "pointer" }}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 4 }} />
          <span style={{ fontSize: 13 }}>أوافق على معالجة بيانات استهلاك الطاقة لأغراض التوقع والتنبيه</span>
        </label>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, cursor: "pointer" }}>
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} style={{ marginTop: 4 }} />
          <span style={{ fontSize: 13 }}>
            قرأت{" "}
            <button type="button" onClick={() => navigate("/privacy")} style={{ background: "none", border: "none", color: "hsl(var(--color-sa-600))", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, padding: 0 }}>
              سياسة الخصوصية
            </button>
          </span>
        </label>

        <button
          onClick={handleContinue}
          disabled={!accepted || !privacy}
          style={{
            width: "100%", padding: 14, borderRadius: 12, border: "none",
            background: accepted && privacy ? "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))" : "hsl(var(--color-gray-200))",
            color: accepted && privacy ? "#fff" : "hsl(var(--color-gray-500))",
            fontSize: 15, fontWeight: 700, cursor: accepted && privacy ? "pointer" : "not-allowed", fontFamily: "inherit",
          }}
        >
          متابعة إلى Wafir
        </button>
      </div>
    </div>
  );
}
