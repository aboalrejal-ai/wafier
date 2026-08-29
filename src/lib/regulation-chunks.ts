import type { RegulationChunk } from "./rag-chat";
import { VERIFIED_RECORDS } from "./kb-data";

/** In-app RAG chunks generated from verified KB records. */
export const REGULATION_CHUNKS: RegulationChunk[] = VERIFIED_RECORDS.map((r) => ({
  id: r.id,
  source: r.authority,
  title: r.title,
  content: r.content,
  url: r.url,
  keywords: buildKeywords(r),
}));

function buildKeywords(r: { title: string; content: string; category: string }): string[] {
  const base = [
    "توفير",
    "فاتورة",
    "كهرباء",
    "مكيف",
    "حر",
    "تعرفة",
    "خصوصية",
    "بيانات",
    "إعلان",
    "ميزانية",
    "توقع",
    "موجة",
    "SEC",
    "PDPL",
    "SDAIA",
    "SAMA",
    "energy",
    "budget",
    "forecast",
    "privacy",
    "ads",
  ];
  const fromText = `${r.title} ${r.content} ${r.category}`
    .split(/[\s،,.؛;]+/)
    .filter((w) => w.length > 2)
    .slice(0, 12);
  return [...new Set([...base, ...fromText])];
}
