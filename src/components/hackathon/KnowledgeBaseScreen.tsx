import { useState } from "react";
import { VERIFIED_RECORDS } from "../../lib/kb-data";
import SyntheticNotice from "../SyntheticNotice";

export default function KnowledgeBaseScreen({ onBack }: { onBack?: () => void }) {
  const [q, setQ] = useState("");
  const filtered = VERIFIED_RECORDS.filter((r) => {
    if (!q.trim()) return true;
    const hay = `${r.title} ${r.content} ${r.authority}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  return (
    <div style={{ minHeight: "100dvh", background: "hsl(var(--color-gray-25))", padding: "24px 20px 40px" }}>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 16 }}>
          ← رجوع
        </button>
      )}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>قاعدة المعرفة</h1>
        <p style={{ fontSize: 13, color: "hsl(var(--color-gray-600))", margin: "0 0 12px" }}>
          {VERIFIED_RECORDS.length} سجل VERIFIED · روابط حكومية/رسمية
        </p>
        <div style={{ marginBottom: 12 }}>
          <SyntheticNotice compact />
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث في المصادر..."
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #E5E7EB", marginBottom: 16, fontFamily: "inherit" }}
        />
        {filtered.map((r) => (
          <div key={r.id} style={{ background: "#fff", borderRadius: 12, padding: 14, marginBottom: 10, border: "1px solid #E5E7EB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
              <strong style={{ fontSize: 13 }}>{r.title}</strong>
              <span style={{ fontSize: 10, background: "#D1FAE5", color: "#065F46", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>VERIFIED</span>
            </div>
            <p style={{ fontSize: 12, color: "hsl(var(--color-gray-600))", margin: "0 0 8px", lineHeight: 1.6 }}>{r.content}</p>
            <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "hsl(var(--color-sa-600))" }}>
              {r.authority} — {r.section}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
