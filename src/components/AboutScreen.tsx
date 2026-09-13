import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  runScenarioAdsControversy,
  runScenarioCompliantRag,
  runScenarioDataGap,
  runScenarioHeatwave,
  demoService,
} from "../services/data-service";
import PipelineRail, { pipelineStatusFromAudit } from "./hackathon/PipelineRail";
import SyntheticNotice from "./SyntheticNotice";
import { useT } from "../i18n";

/** Canonical team from docs/TECHNICAL-REPORT.md — roles verbatim. */
const TEAM = [
  {
    name: "Mohammed Nadher Aboalrejal",
    role: "Mentor — Technical Lead, System Architect, Technical Report Author",
  },
  {
    name: "Fatima Alsultan",
    role: "Document research, concept ideation, policy gap analysis, report structuring",
  },
  {
    name: "Shahad Alsultan",
    role: "Video production, report drafting",
  },
  {
    name: "Jorry Alfalah",
    role: "App UI design, logo design",
  },
  {
    name: "Noor Alshammari",
    role: "App UI templates, logo design",
  },
];

function ScenarioButton({
  label,
  onRun,
}: {
  label: string;
  onRun: () => Promise<unknown>;
}) {
  const t = useT();
  const queryClient = useQueryClient();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <button
      disabled={running}
      onClick={async () => {
        setRunning(true);
        await onRun();
        await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        setDone(true);
        setRunning(false);
      }}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid hsl(var(--color-sa-200))",
        background: done ? "hsl(var(--color-sa-50))" : "#fff",
        color: "hsl(var(--color-sa-700))",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 12,
        width: "100%",
        textAlign: "start",
      }}
    >
      {running ? t("about.running") : done ? t("about.done") : label}
    </button>
  );
}

export default function AboutScreen({ onBack }: { onBack?: () => void }) {
  const t = useT();
  const navigate = useNavigate();
  const goBack = onBack ?? (() => navigate("/dashboard", { replace: true }));
  const audit = demoService.getAuditLog?.() ?? [];
  const actions = audit.map((e: { action: string; detail: string }) => `${e.action} ${e.detail}`);
  const pipelineStatus = pipelineStatusFromAudit(actions);

  return (
    <div style={{ minHeight: "100%", background: "hsl(var(--color-gray-25))", padding: "24px 20px 40px", boxSizing: "border-box" }}>
      <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "hsl(var(--color-sa-600))", fontFamily: "inherit", marginBottom: 20 }}>
        ← {t("common.back")}
      </button>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 8px", textAlign: "start" }}>{t("about.title")}</h1>
        <p style={{ color: "hsl(var(--color-sa-600))", fontWeight: 600, margin: "0 0 12px", textAlign: "start" }}>
          {t("about.tagline")}
        </p>
        <div style={{ marginBottom: 16 }}>
          <SyntheticNotice />
        </div>

        <div style={{ background: "var(--card)", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 12px", textAlign: "start", color: "var(--foreground)" }}>{t("about.team")}</h2>
          {TEAM.map((m) => (
            <div key={m.name} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", textAlign: "start" }}>
              <div style={{ fontWeight: 700, color: "var(--foreground)", fontSize: 14 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 4, lineHeight: 1.45 }}>{m.role}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px", textAlign: "start" }}>{t("about.pipeline")}</h2>
          <PipelineRail status={pipelineStatus} latencyMs={audit.some((e: { action: string }) => e.action === "kb-policy") ? 12 : undefined} />
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 12px", textAlign: "start" }}>{t("about.hackathonConsole")}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ScenarioButton label={t("about.sc01")} onRun={runScenarioCompliantRag} />
            <ScenarioButton label={t("about.sc02")} onRun={runScenarioDataGap} />
            <ScenarioButton label={t("about.sc03")} onRun={runScenarioAdsControversy} />
            <ScenarioButton label={t("about.heatwave")} onRun={runScenarioHeatwave} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          <Link to="/hackathon/kb" style={{ flex: 1, minWidth: 120, textAlign: "center", padding: "10px 12px", borderRadius: 10, background: "hsl(var(--color-sa-600))", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
            {t("about.kb")}
          </Link>
          <Link to="/hackathon/gaps" style={{ flex: 1, minWidth: 120, textAlign: "center", padding: "10px 12px", borderRadius: 10, background: "#fff", color: "hsl(var(--color-sa-700))", textDecoration: "none", fontSize: 13, fontWeight: 600, border: "1px solid hsl(var(--color-sa-200))" }}>
            {t("about.gaps")}
          </Link>
          <Link to="/hackathon/readiness" style={{ flex: 1, minWidth: 120, textAlign: "center", padding: "10px 12px", borderRadius: 10, background: "#fff", color: "hsl(var(--color-sa-700))", textDecoration: "none", fontSize: 13, fontWeight: 600, border: "1px solid hsl(var(--color-sa-200))" }}>
            {t("about.readiness")}
          </Link>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px", textAlign: "start" }}>{t("about.auditLog")}</h2>
          <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.8, textAlign: "start" }}>
            {audit.slice(0, 10).map((e: { id: string; action: string; detail: string }) => (
              <li key={e.id}>
                <strong>{e.action}</strong>: {e.detail}
              </li>
            ))}
            {audit.length === 0 && <li>{t("about.runScenario")}</li>}
          </ul>
        </div>

        <div style={{ background: "hsl(var(--color-sa-25))", borderRadius: 16, padding: 20, border: "1px solid hsl(var(--color-sa-100))" }}>
          <h2 style={{ fontSize: 16, margin: "0 0 8px", color: "hsl(var(--color-sa-700))", textAlign: "start" }}>{t("about.framework")}</h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "hsl(var(--color-gray-600))", textAlign: "start" }}>
            {t("about.frameworkBody")}
          </p>
        </div>

        <p style={{ marginTop: 20, fontSize: 11, color: "hsl(var(--color-gray-400))", textAlign: "center" }}>
          {t("about.disclaimer")}
        </p>
      </div>
    </div>
  );
}
