import type { RagResponse } from "./rag-chat";
import { ragChat } from "./rag-chat";

/**
 * Optional LLM explanation layer — runs AFTER policy decisions.
 * Policy node stays deterministic; this only enriches RAG replies when API key is set.
 */
export async function explainWithOptionalLlm(
  query: string,
  context?: { spend?: number; budget?: number; forecast?: number },
): Promise<RagResponse> {
  const base = await ragChat(query, context);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || base.insufficientEvidence) return base;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "أنت مساعد Wafier. اشرح فقط بناءً على النص المرجعي. لا تخترع روابط أو مواد قانونية. التوقعات تقديرية وليست ضماناً مالياً.",
          },
          {
            role: "user",
            content: `السؤال: ${query}\n\nالنص المرجعي:\n${base.reply}\n\nأعد صياغة الرد بالعربية مع الحفاظ على الاستشهادات.`,
          },
        ],
        max_tokens: 400,
      }),
    });
    if (!res.ok) return base;
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return base;
    return { ...base, reply: text };
  } catch {
    return base;
  }
}
