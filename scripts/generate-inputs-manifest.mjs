#!/usr/bin/env node
/**
 * Generate kb/InputDocs/Inputs.md from kb/records/finance-energy-regulatory.json
 * Manifest style aligned with ITUAIReadiness simulation/server/knowledge/InputDocs/Inputs.md
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kb = JSON.parse(
  readFileSync(join(root, "kb/records/finance-energy-regulatory.json"), "utf8"),
);

const verified = kb.records.filter((r) =>
  ["VERIFIED", "VERIFIED_BENCHMARK"].includes(r.verification),
);

const byCategory = {};
for (const r of verified) {
  const cat = r.category || "other";
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(r);
}

const categoryLabels = {
  national_strategy: "Saudi_Strategy",
  data_governance: "Saudi_Regulatory",
  ai_ethics: "Saudi_Regulatory",
  finance: "Saudi_Regulatory",
  energy_utility: "Saudi_Regulatory",
  efficiency: "Saudi_Regulatory",
  liability: "Saudi_Regulatory",
  standards: "ITU_References",
};

const sections = new Map();
for (const r of verified) {
  const folder = categoryLabels[r.category] || "Saudi_Regulatory";
  if (!sections.has(folder)) sections.set(folder, []);
  sections.get(folder).push(r);
}

let md = `# Input Documents Manifest — Wafir

This file lists verified documents in the Wafir Knowledge Base for the ITU AI Readiness Hackathon — KSA (Finance track).

**Upstream framework reference:** [CrashingGuru/ITUAIReadiness](https://github.com/CrashingGuru/ITUAIReadiness) — see \`docs/ITU-FRAMEWORK-SOURCE.md\`.

**Submission export:** \`knowledge-base.json\` (${verified.length} VERIFIED records, compiled ${kb.compiled}).

Documents are grouped by folder (aligned with ITU InputDocs style):

`;

for (const [folder, records] of sections) {
  md += `---\n\n## ${folder}/ (${records.length} files)\n\n`;
  md += `| # | record_id | Title | Type | source_url |\n`;
  md += `|---|-----------|-------|------|------------|\n`;
  records.forEach((r, i) => {
    md += `| ${i + 1} | \`${r.id}\` | ${r.title.replace(/\|/g, "\\|")} | \`${r.category}\` | ${r.url} |\n`;
  });
  md += "\n";
}

md += `---\n\n## Folder Structure\n\n\`\`\`\nkb/InputDocs/\n├── Inputs.md                              ← this manifest\n├── ITU_References/\n│   └── ITU-T_Y.3172_summary.txt           ← from ITUAIReadiness\n└── (records exported in knowledge-base.json)\n\`\`\`\n\n## Notes\n\n- Use-case meter data is **synthetic**; KB documents are **real** public sources.\n- Regenerate export: \`node scripts/export-knowledge-base.mjs\`\n- ITU primary framework PDF (\`AI_Ready_Framework_2025.pdf\`) lives in ITUAIReadiness InputDocs.\n`;

writeFileSync(join(root, "kb/InputDocs/Inputs.md"), md);
console.log(`Wrote kb/InputDocs/Inputs.md (${verified.length} records)`);
