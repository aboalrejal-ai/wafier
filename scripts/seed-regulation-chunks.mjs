#!/usr/bin/env node
/**
 * Seed regulation_chunks metadata for Supabase (text only — embeddings optional).
 * Usage: node scripts/seed-regulation-chunks.mjs > seed-output.sql
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const kb = JSON.parse(readFileSync(join(__dirname, "../kb/records/finance-energy-regulatory.json"), "utf8"));

const verified = kb.records.filter((r) => r.verification === "VERIFIED");
const lines = verified.map(
  (r) =>
    `INSERT INTO regulation_chunks (source, title, content, url) VALUES (${sql(r.authority)}, ${sql(r.title)}, ${sql(r.content)}, ${sql(r.url)}) ON CONFLICT DO NOTHING;`,
);

function sql(s) {
  return `'${String(s).replace(/'/g, "''")}'`;
}

const out = `-- Wafir KB seed (${verified.length} chunks)\n${lines.join("\n")}\n`;
const target = join(__dirname, "../supabase/seed-regulation-chunks.sql");
writeFileSync(target, out);
console.log(`Wrote ${verified.length} INSERT statements to supabase/seed-regulation-chunks.sql`);
