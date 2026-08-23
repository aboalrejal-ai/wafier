import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { runEvaluationScenario, demoService } from "../services/data-service";

function DemoScenarioButton() {
  const queryClient = useQueryClient();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <button
      disabled={running}
      onClick={async () => {
        setRunning(true);
        await runEvaluationScenario();
        await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        setDone(true);
        setRunning(false);
      }}
      style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "hsl(var(--color-sa-600))", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
    >
      {running ? "جاري المحاكاة..." : done ? "✓ تم — راجع الإشعارات" : "تشغيل سينario موجة الحر"}
    </button>
  );
}

const TEAM = [
  { name: "Fatima Alsultan", role: "Team Lead" },
  { name: "Jorry Alfalah", role: "ML & Backend" },
  { name: "Noor Alshammari", role: "UI/UX & Frontend" },
  { name: "Shahad Alsultan", role: "Data & Policy" },
];

export default function AboutScreen({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  const goBack = onBack ?? (() => navigate(-1));

  return (
    <div style={{ minHeight: "100dvh", background: "hsl(var(--color-gray-25))", direction: "rtl", padding: "24px 20px 40px" }}>
      <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 20 }}>
        ← رجوع
      </button>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>Wafier</h1>
        <p style={{ color: "hsl(var(--color-sa-600))", fontWeight: 600, margin: "0 0 24px" }}>
          Proactive Bill Prediction and Budget Planning
        </p>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 12px" }}>فريق wafier team</h2>
          {TEAM.map((m) => (
            <div key={m.name} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid hsl(var(--color-gray-100))" }}>
              <span style={{ fontSize: 12, color: "hsl(var(--color-gray-500))" }}>{m.role}</span>
              <span style={{ fontWeight: 600 }}>{m.name}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px" }}>سينario التقييم</h2>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "hsl(var(--color-gray-600))" }}>
            Step 1: ميزانية 500 ر.س · Step 2: موجة حر · Step 3: MLFO + Level 2 alert
          </p>
          <DemoScenarioButton />
        </div>

        
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px" }}>سينario الجدل (Controversy)</h2>
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "hsl(var(--color-gray-600))", lineHeight: 1.7 }}>
            بعد موجة الحر، يرفض النظام استخدام بيانات الاستهلاك للإعلانات المستهدفة وفق PDPL (تحديد الغرض) ومبادئ SDAIA.
            الإجراء يُسجّل في سجل التدقيق ويظهر كإشعار سياسة من قاعدة المعرفة.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px" }}>سجل التدقيق (Demo)</h2>
          <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.8 }}>
            {(demoService.getAuditLog?.() ?? []).slice(0, 8).map((e: any) => (
              <li key={e.id}><strong>{e.action}</strong>: {e.detail}</li>
            ))}
            {(demoService.getAuditLog?.() ?? []).length === 0 && <li>شغّل سيناريو موجة الحر لعرض أحداث SRC→C→PP→M→P→D</li>}
          </ul>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px" }}>جهة الاتصال</h2>
          <p style={{ margin: 0, fontSize: 14, color: "hsl(var(--color-gray-700))" }}>King Faisal Budget Planning</p>
        </div>

        <div style={{ background: "hsl(var(--color-sa-25))", borderRadius: 16, padding: 20, border: "1px solid hsl(var(--color-sa-100))" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px", color: "hsl(var(--color-sa-700))" }}>الإطار التقني</h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "hsl(var(--color-gray-600))" }}>
            ITU-T Y.3172 · SDAIA AI Ethics · Saudi PDPL · Smart Financial Engine · MLFO · RAG Assistant · Graduated Alerting (L1: 50%, L2: proactive)
          </p>
        </div>

        <p style={{ marginTop: 20, fontSize: 11, color: "hsl(var(--color-gray-400))", textAlign: "center" }}>
          ⚠️ توقعات الفاتورة تقديرية وليست ضماناً مالياً
        </p>
      </div>
    </div>
  );
}
