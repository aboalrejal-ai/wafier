import readiness from "../../../kb/framework/wafier-readiness.json";
import SyntheticNotice from "../SyntheticNotice";

export default function ReadinessScreen({ onBack }: { onBack?: () => void }) {
  const dims = readiness.wafier_claimed_dimensions;

  return (
    <div style={{ minHeight: "100dvh", background: "hsl(var(--color-gray-25))", direction: "rtl", padding: "24px 20px 40px" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 16 }}>
          ← رجوع
        </button>
      )}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>جاهزية الذكاء الاصطناعي 2.0</h1>
        <p style={{ fontSize: 13, color: "hsl(var(--color-gray-600))", margin: "0 0 16px" }}>
          {dims.length} أبعاد مُختارة بأدلة من الكود — ITU AI Readiness {readiness.framework_version}
        </p>
        <div style={{ marginBottom: 16 }}>
          <SyntheticNotice compact />
        </div>
        {dims.map((d) => (
          <div key={d.id} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 11, color: "hsl(var(--color-gray-400))", marginBottom: 4 }}>D{d.id} · {d.short_name}</div>
            <h2 style={{ fontSize: 15, margin: "0 0 10px" }}>{d.name}</h2>
            <ul style={{ margin: "0 0 10px", paddingInlineStart: 18, fontSize: 12, lineHeight: 1.7, color: "hsl(var(--color-gray-700))" }}>
              {d.evidence.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p style={{ fontSize: 11, margin: 0, color: "hsl(var(--color-gray-500))" }}>
              كود: {d.code_refs.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
