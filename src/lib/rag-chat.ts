import { REGULATION_CHUNKS } from "./regulation-chunks";

export interface RegulationChunk {
  id: string;
  source: string;
  title: string;
  content: string;
  url: string;
  keywords?: string[];
}

const CANNED: Record<string, string> = {
  "كيف أوفر في فاتورة الكهرباء؟":
    "بناءً على تعرفة SERA وKAPSARC/KBEAT:\n\n• ارفع درجة حرارة المكيف إلى 24-26°C\n• استخدم إضاءة LED\n• افصل الأجهزة عن الكهرباء\n• شغّل الأجهزة الثقيلة في ساعات الليل\n\nيمكن توفير 20-30% شهرياً.",
  "ما هي أسباب ارتفاع استهلاك المكيف؟":
    "وفق KBEAT:\n\n• درجة حرارة منخفضة (<22°C)\n• فلتر متسخ\n• عزل حراري ضعيف\n• نوافذ مفتوحة أثناء التشغيل",
  "نصائح للموجة الحارة القادمة":
    "MLFO ينشّط نموذج الصيف عند ≥38°C:\n\n• اضبط المكيف على 26°C\n• استخدم الستائر العاكسة 10ص-4م\n• شغّل الأجهزة الثقيلة مساءً",
  "تحليل استهلاكي مقارنة بالشهر الماضي":
    "بناءً على بياناتك الحالية — راجع لوحة الميزانية للأرقام المحدثة.",
};

const AR_KEYWORDS = ["مكيف", "توفير", "فاتورة", "حر", "تعرفة", "خصوصية", "بيانات", "إعلان", "ميزانية", "توقع", "موجة", "كهرباء"];
const EN_KEYWORDS = ["energy", "budget", "forecast", "privacy", "ads", "tariff", "SEC", "PDPL", "SAMA", "SDAIA"];

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

function scoreChunk(chunk: RegulationChunk, query: string): number {
  const q = normalizeQuery(query);
  let score = 0;
  const hay = `${chunk.title} ${chunk.content} ${chunk.source}`.toLowerCase();
  for (const k of [...AR_KEYWORDS, ...EN_KEYWORDS, ...(chunk.keywords ?? [])]) {
    const key = k.toLowerCase();
    if (q.includes(key) || hay.includes(key)) score += 1;
  }
  if (hay.split(/\s+/).some((w) => w.length > 3 && q.includes(w))) score += 0.5;
  return score;
}

function retrieveRelevant(query: string): RegulationChunk[] {
  const ranked = REGULATION_CHUNKS.map((c) => ({ c, score: scoreChunk(c, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return ranked.slice(0, 3).map((x) => x.c);
}

export interface RagResponse {
  reply: string;
  sources: { title: string; source: string; url: string }[];
  insufficientEvidence?: boolean;
}

export async function ragChat(
  query: string,
  context?: { spend?: number; budget?: number; forecast?: number },
): Promise<RagResponse> {
  const trimmed = query.trim();
  const canned = CANNED[trimmed];
  const chunks = retrieveRelevant(trimmed);

  const mapSources = (list: RegulationChunk[]) =>
    list.map((c) => ({ title: c.title, source: c.source, url: c.url }));

  if (canned) {
    return {
      reply:
        canned + (context?.spend ? `\n\n• استهلاكك الحالي: ${context.spend.toFixed(2)} ر.س` : ""),
      sources: mapSources(chunks.length ? chunks : REGULATION_CHUNKS.slice(0, 2)),
      insufficientEvidence: false,
    };
  }

  if (chunks.length === 0) {
    return {
      reply:
        "لا توجد أدلة كافية في قاعدة المعرفة للإجابة على هذا السؤال.\n\nيرجى صياغة سؤال متعلق بتوفير الطاقة، التعرفة، الخصوصية، أو الميزانية — أو مراجعة صفحة قاعدة المعرفة.",
      sources: [],
      insufficientEvidence: true,
    };
  }

  const contextLine = context
    ? `\n\nبياناتك: مصروف ${context.spend?.toFixed(2) ?? "—"} ر.س من ${context.budget ?? 500} ر.س، توقع ${context.forecast?.toFixed(2) ?? "—"} ر.س.`
    : "";

  const retrieved = chunks.map((c) => `[${c.source}] ${c.content}`).join("\n\n");

  return {
    reply: `بناءً على اللوائح السعودية المعتمدة:\n\n${retrieved}${contextLine}\n\n⚠️ هذه توصيات تقديرية وليست ضماناً مالياً (SDAIA Ethics).`,
    sources: mapSources(chunks),
    insufficientEvidence: false,
  };
}

export { REGULATION_CHUNKS };
