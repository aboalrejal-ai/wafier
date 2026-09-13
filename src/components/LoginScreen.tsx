import { useState } from "react";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import SignUpModal from "./modals/SignUpModal";
import Toast from "./ui/Toast";
import { LanguageToggle, useT } from "../i18n";

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onResetPassword: (email: string) => Promise<{ error: Error | null }>;
  onGoogleLogin?: () => Promise<void>;
}

export default function LoginScreen({ onLogin, onSignUp, onResetPassword, onGoogleLogin }: LoginScreenProps) {
  const t = useT();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", background: "hsl(var(--color-sa-25))", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 16, insetInlineEnd: 16, zIndex: 5 }}>
        <LanguageToggle compact />
      </div>
      <div style={{ position: "relative", padding: "48px 24px 32px", textAlign: "center" }}>
        <div style={{ position: "relative", zIndex: 1, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "hsl(var(--color-sa-600))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px hsla(var(--color-sa-600), 0.35)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="white" strokeLinejoin="round" /></svg>
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>{t("common.wafir")}</h1>
          <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-sa-600))", fontWeight: 500 }}>{t("login.tagline")}</p>
        </div>
      </div>

      <div style={{ flex: 1, background: "#fff", borderRadius: "28px 28px 0 0", padding: "32px 24px 24px", display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 -4px 32px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "start" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>{t("login.welcome")}</h2>
          <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>{t("login.subtitle")}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, textAlign: "start" }}>{t("login.email")}</label>
          <div style={{ position: "relative" }}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("login.emailPlaceholder")}
              style={{ width: "100%", padding: "13px 16px", paddingInlineStart: 44, border: "1.5px solid hsl(var(--color-gray-200))", borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit", background: "hsl(var(--color-gray-25))", direction: "ltr", textAlign: "start", boxSizing: "border-box" }} />
            <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--color-gray-400))" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" /></svg>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 500, textAlign: "start" }}>{t("login.password")}</label>
          <div style={{ position: "relative" }}>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("login.passwordPlaceholder")}
              style={{ width: "100%", padding: "13px 44px", border: "1.5px solid hsl(var(--color-gray-200))", borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit", background: "hsl(var(--color-gray-25))", boxSizing: "border-box" }} />
            <span style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--color-gray-400))" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </span>
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsl(var(--color-gray-400))" }}>👁</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            {t("login.rememberMe")}
          </label>
          <button type="button" onClick={() => setShowForgot(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "hsl(var(--color-sa-600))", fontFamily: "inherit" }}>{t("login.forgotPassword")}</button>
        </div>

        <button type="button" disabled={loading || !email || password.length < 4}
          onClick={async () => { setError(null); setLoading(true); try { await onLogin(email, password); } catch (e) { setError(e instanceof Error ? e.message : t("login.loginFailed")); } finally { setLoading(false); } }}
          style={{ width: "100%", padding: "15px", background: "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))", border: "none", borderRadius: 14, cursor: "pointer", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit" }}>
          {t("login.signIn")}
        </button>
        {error && <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-destructive))", textAlign: "center" }}>{error}</p>}

        <p style={{ textAlign: "center", margin: 0, fontSize: 13, color: "hsl(var(--color-gray-500))" }}>
          {t("login.noAccount")}{" "}
          <button type="button" onClick={() => setShowSignUp(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--color-sa-600))", fontWeight: 600, fontFamily: "inherit" }}>{t("login.createAccount")}</button>
        </p>
        <p style={{ textAlign: "center", margin: 0, fontSize: 12, color: "hsl(var(--color-sa-700))" }}>{t("login.dataSafe")}</p>
      </div>

      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} onReset={onResetPassword} />}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} onSignUp={onSignUp} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
