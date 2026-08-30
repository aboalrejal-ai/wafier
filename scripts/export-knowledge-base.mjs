#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kb = JSON.parse(
  readFileSync(join(root, "kb/records/finance-energy-regulatory.json"), "utf8"),
);
const out = kb.records
  .filter((r) => r.verification === "VERIFIED")
  .map((r) => ({
    document_title: r.title,
    issuing_authority: r.authority,
    policy_category: r.category,
    section_reference: r.section,
    content: r.content,
    source_url: r.url,
    is_verified: true,
    record_id: r.id,
    y3172_node: r.node,
  }));
writeFileSync(
  join(root, "knowledge-base.json"),
  JSON.stringify({ compiled: kb.compiled, track: kb.track, records: out }, null, 2),
);
console.log(`Exported ${out.length} VERIFIED records to knowledge-base.json`);
