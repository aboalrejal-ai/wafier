export interface RegulationChunk {
  id: string;
  source: string;
  title: string;
  content: string;
  url: string;
}

/** Knowledge-base chunks — URLs from the team technical report (authentic public sources). */
export const REGULATION_CHUNKS: RegulationChunk[] = [
  {
    id: "sec-tariff-1",
    source: "SEC — Saudi Electricity Company / KAUST-SEC",
    title: "تعرفة الكهرباء السكنية وكفاءة الشبكة",
    content:
      "التعرفة السكنية تتدرج حسب الاستهلاك: الشريحة الأولى حتى 6000 ك.و.س/شهر بـ 0.18 ر.س/ك.و.س، والشريحة التالية 0.30 ر.س/ك.و.س. يُضاف ضريبة القيمة المضافة 15%.",
    url: "https://www.kaust.edu.sa/news/kaust-helps-slash-sec-profit-losses-using-ml",
  },
  {
    id: "sdaia-ethics-1",
    source: "SDAIA — National AI Ethics",
    title: "مبادئ أخلاقيات الذكاء الاصطناعي",
    content:
      "يجب أن تكون توقعات الذكاء الاصطناعي دقيقة وشفافة وقابلة للتفسير. المستخدم له الحق في معرفة أن النتائج تقديرية وليست ضماناً مالياً. يُحظر استخدام البيانات الشخصية لأغراض إعلانية دون موافقة وغرض واضح.",
    url: "https://sdaia.gov.sa/",
  },
  {
    id: "pdpl-1",
    source: "Saudi PDPL",
    title: "حماية بيانات الاستهلاك",
    content:
      "بيانات العداد المنزلية بيانات شخصية. يجب الحصول على موافقة صريحة قبل المعالجة، وتطبيق إخفاء الهوية عند تصدير البيانات للتحليل. تحديد الغرض يمنع استخدام بيانات الاستهلاك للإعلانات المستهدفة.",
    url: "https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx",
  },
  {
    id: "energy-saving-1",
    source: "KAPSARC / KBEAT",
    title: "توفير الطاقة في المنازل السعودية",
    content:
      "رفع درجة حرارة المكيف إلى 24-26°C يوفر 10-20% من استهلاك التبريد. العزل الحراري والستائر العاكسة يقللان الحمل على المكيف في موجات الحر.",
    url: "https://apps.kapsarc.org/appboard/kbeat/en",
  },
];

const CANNED: Record<string, string> = {
  "كيف أوفر في فاتورة الكهرباء؟":
    "بناءً على لوائح SEC وKAPSARC:\n\n• ارفع درجة حرارة المكيف إلى 24-26°C\n• استخدم إضاءة LED\n• افصل الأجهزة عن الكهرباء\n• شغّل الأجهزة الثقيلة في ساعات الليل\n\nيمكن توفير 20-30% شهرياً.",
  "ما هي أسباب ارتفاع استهلاك المكيف؟":
    "وفق KBEAT:\n\n• درجة حرارة منخفضة (<22°C)\n• فلتر متسخ\n• عزل حراري ضعيف\n• نوافذ مفتوحة أثناء التشغيل",
  "نصائح للموجة الحارة القادمة":
    "MLFO ينشّط نموذج الصيف عند ≥38°C:\n\n• اضبط المكيف على 26°C\n• استخدم الستائر العاكسة 10ص-4م\n• شغّل الأجهزة الثقيلة مساءً",
  "تحليل استهلاكي مقارنة بالشهر الماضي":
    "بناءً على بياناتك الحالية — راجع لوحة الميزانية للأرقام المحدثة.",
};

function retrieveRelevant(query: string): RegulationChunk[] {
  const keywords = ["مكيف", "توفير", "فاتورة", "حر", "تعرفة", "خصوصية", "بيانات", "إعلان"];
  return REGULATION_CHUNKS.filter(
    (c) => keywords.some((k) => query.includes(k) || c.content.includes(k) || c.title.includes(k)),
  ).slice(0, 2);
}

export interface RagResponse {
  reply: string;
  sources: { title: string; source: string; url: string }[];
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
    };
  }

  const contextLine = context
    ? `\n\nبياناتك: مصروف ${context.spend?.toFixed(2) ?? "—"} ر.س من ${context.budget ?? 500} ر.س، توقع ${context.forecast?.toFixed(2) ?? "—"} ر.س.`
    : "";

  const retrieved = chunks.length
    ? chunks.map((c) => `[${c.source}] ${c.content}`).join("\n\n")
    : REGULATION_CHUNKS[0].content;

  return {
    reply: `بناءً على اللوائح السعودية المعتمدة:\n\n${retrieved}${contextLine}\n\n⚠️ هذه توصيات تقديرية وليست ضماناً مالياً (SDAIA Ethics).`,
    sources: mapSources(chunks.length ? chunks : [REGULATION_CHUNKS[0]]),
  };
}
