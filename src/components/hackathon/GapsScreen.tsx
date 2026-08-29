import { POLICY_GAPS } from "../../lib/kb-data";
import SyntheticNotice from "../SyntheticNotice";

export default function GapsScreen({ onBack }: { onBack?: () => void }) {
  return (
    <div style={{ minHeight: "100dvh", background: "hsl(var(--color-gray-25))", direction: "rtl", padding: "24px 20px 40px" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 16 }}>
          ← رجوع
        </button>
      )}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>فجوات السياسات</h1>
        <p style={{ fontSize: 13, color: "hsl(var(--color-gray-600))", margin: "0 0 16px" }}>
          Policy Gap Matrix — مسار المالية / الطاقة
        </p>
        <div style={{ marginBottom: 16 }}>
          <SyntheticNotice />
        </div>
        {POLICY_GAPS.map((g) => (
          <div key={g.id} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, border: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong style={{ fontSize: 15 }}>{g.id}</strong>
              <span style={{ fontSize: 11, background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: 6 }}>{g.type}</span>
            </div>
            <h2 style={{ fontSize: 14, margin: "0 0 8px" }}>{g.title}</h2>
            <p style={{ fontSize: 13, color: "hsl(var(--color-gray-600))", margin: "0 0 8px", lineHeight: 1.6 }}>{g.description}</p>
            <p style={{ fontSize: 12, margin: 0, color: "hsl(var(--color-sa-700))" }}>
              <strong>التوصية:</strong> {g.recommendation}
            </p>
            <p style={{ fontSize: 11, margin: "8px 0 0", color: "hsl(var(--color-gray-400))" }}>
              عقدة Y.3172: {g.node} · سجلات: {g.related_records.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
