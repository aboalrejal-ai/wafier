import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { setConsent } from "../services/data-service";
import LanguageIconButton from "./LanguageIconButton";
import ThemeToggle from "./ThemeToggle";
import { useT } from "../i18n";

export default function ConsentScreen() {
  const t = useT();
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
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)", padding: 24 }}>
      <div style={{ maxWidth: 480, width: "100%", background: "var(--card)", borderRadius: 20, padding: "32px 28px", boxShadow: "var(--shadow-md)", position: "relative" }}>
        <div style={{ position: "absolute", top: 16, insetInlineEnd: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <LanguageIconButton />
          <ThemeToggle compact />
        </div>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "hsl(var(--color-sa-600))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>{t("consent.title")}</h1>
          <p style={{ margin: 0, fontSize: 14, color: "hsl(var(--color-gray-500))", lineHeight: 1.6 }}>
            {t("consent.intro")}
          </p>
        </div>

        <div style={{ background: "hsl(var(--color-sa-25))", borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, lineHeight: 1.7, color: "hsl(var(--color-gray-700))", textAlign: "start" }}>
          <p style={{ margin: "0 0 8px", fontWeight: 600 }}>{t("consent.collectTitle")}</p>
          <ul style={{ margin: 0, paddingInlineStart: 20 }}>
            <li>{t("consent.collectMeter")}</li>
            <li>{t("consent.collectBudget")}</li>
            <li>{t("consent.collectChat")}</li>
          </ul>
          <p style={{ margin: "12px 0 0", fontSize: 12, color: "hsl(var(--color-gray-500))" }}>
            {t("consent.encrypted")}
          </p>
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, cursor: "pointer", textAlign: "start" }}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 4 }} />
          <span style={{ fontSize: 13 }}>{t("consent.agreeProcess")}</span>
        </label>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24, cursor: "pointer", textAlign: "start" }}>
          <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} style={{ marginTop: 4 }} />
          <span style={{ fontSize: 13 }}>
            {t("consent.readPrivacy")}{" "}
            <button type="button" onClick={() => navigate("/privacy")} style={{ background: "none", border: "none", color: "hsl(var(--color-sa-600))", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, padding: 0 }}>
              {t("consent.privacyPolicy")}
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
          {t("consent.continue")}
        </button>
      </div>
    </div>
  );
}
