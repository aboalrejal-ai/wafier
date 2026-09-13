export type PipelineNodeId = "src" | "c" | "pp" | "m" | "p" | "d" | "sink";

export type NodeStatus = "idle" | "active" | "done" | "blocked";

const NODES: { id: PipelineNodeId; label: string; human: string }[] = [
  { id: "src", label: "SRC", human: "المصدر" },
  { id: "c", label: "C", human: "الجامع" },
  { id: "pp", label: "PP", human: "المعالج" },
  { id: "m", label: "M", human: "النموذج" },
  { id: "p", label: "P", human: "السياسة" },
  { id: "d", label: "D", human: "الموزّع" },
  { id: "sink", label: "SINK", human: "الواجهة" },
];

const STATUS_COLOR: Record<NodeStatus, string> = {
  idle: "#E5E7EB",
  active: "hsl(var(--color-sa-500))",
  done: "#10B981",
  blocked: "#EF4444",
};

export default function PipelineRail({
  status,
  latencyMs,
}: {
  status?: Partial<Record<PipelineNodeId, NodeStatus>>;
  latencyMs?: number;
}) {
  const s = status ?? {};
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "flex-start", justifyContent: "center" }}>
        {NODES.map((n, i) => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div
                title={n.human}
                style={{
                  minWidth: 44,
                  padding: "6px 8px",
                  borderRadius: 8,
                  background: STATUS_COLOR[s[n.id] ?? "idle"],
                  color: (s[n.id] ?? "idle") === "idle" ? "#374151" : "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {n.label}
              </div>
              <span style={{ fontSize: 10, color: "#6B7280", fontWeight: 600, lineHeight: 1.2 }}>
                {n.human}
              </span>
            </div>
            {i < NODES.length - 1 && (
              <span style={{ color: "#9CA3AF", fontSize: 10, marginTop: -14 }}>→</span>
            )}
          </div>
        ))}
      </div>
      {latencyMs != null && (
        <p style={{ margin: "8px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))", textAlign: "center" }}>
          قرار السياسة: {latencyMs} ms (قواعد ثابتة — بدون روبوت دردشة)
        </p>
      )}
    </div>
  );
}

export function pipelineStatusFromAudit(actions: string[]): Partial<Record<PipelineNodeId, NodeStatus>> {
  const map: Partial<Record<PipelineNodeId, NodeStatus>> = {};
  const has = (k: string) => actions.some((a) => a.includes(k));
  if (has("src")) map.src = "done";
  if (has("collector")) map.c = "done";
  if (has("preprocessor")) map.pp = "done";
  if (has("sandbox") || has("MLFO")) map.m = "done";
  if (has("policy") || has("kb-policy")) map.p = has("VIOLATION") ? "blocked" : "done";
  if (has("policy") || has("kb-policy")) map.d = "done";
  if (actions.length > 0) map.sink = "active";
  return map;
}
