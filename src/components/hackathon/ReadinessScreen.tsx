import dimensions from "../../../kb/framework/dimensions.json";
import readiness from "../../../kb/framework/wafir-readiness.json";
import SyntheticNotice from "../SyntheticNotice";

type EvidenceEntry = (typeof readiness.wafir_evidence_by_dimension)[number];

export default function ReadinessScreen({ onBack }: { onBack?: () => void }) {
  const evidenceList = readiness.wafir_evidence_by_dimension as EvidenceEntry[];

  const rows = evidenceList.map((entry) => {
    const official = dimensions.dimensions.find((d) => d.id === entry.id);
    return {
      ...entry,
      name: official?.name ?? `Dimension ${entry.id}`,
      short_name: official?.short_name ?? "",
      description: official?.description ?? "",
    };
  });

  return (
    <div style={{ minHeight: "100dvh", background: "hsl(var(--color-gray-25))", direction: "rtl", padding: "24px 20px 40px" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 16 }}>
          ← رجوع
        </button>
      )}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>جاهزية الذكاء الاصطناعي 2.0</h1>
        <p style={{ fontSize: 13, color: "hsl(var(--color-gray-600))", margin: "0 0 8px" }}>
          {rows.length} أبعاد بأدلة من الكود — أسماء رسمية من ITU Framework {readiness.framework_version}
        </p>
        <p style={{ fontSize: 11, color: "hsl(var(--color-gray-500))", margin: "0 0 16px" }}>
          المصدر:{" "}
          <a href={readiness.upstream_repo} target="_blank" rel="noreferrer" style={{ color: "hsl(var(--color-sa-600))" }}>
            CrashingGuru/ITUAIReadiness
          </a>
          {" · "}
          kb/framework/dimensions.json
        </p>
        <div style={{ marginBottom: 16 }}>
          <SyntheticNotice compact />
        </div>
        {rows.map((d) => (
          <div key={d.id} style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 11, color: "hsl(var(--color-gray-400))", marginBottom: 4 }}>
              D{d.id} · {d.short_name}
            </div>
            <h2 style={{ fontSize: 15, margin: "0 0 6px" }}>{d.name}</h2>
            {d.description && (
              <p style={{ fontSize: 11, color: "hsl(var(--color-gray-500))", margin: "0 0 10px", lineHeight: 1.5 }}>{d.description}</p>
            )}
            {d.itu_metrics && d.itu_metrics.length > 0 && (
              <p style={{ fontSize: 11, margin: "0 0 8px", color: "hsl(var(--color-gray-600))" }}>
                Metrics: {d.itu_metrics.join(" · ")}
              </p>
            )}
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
