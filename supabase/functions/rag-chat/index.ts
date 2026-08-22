import { REGULATION_CHUNKS } from "../../../src/lib/rag-chat.ts";

Deno.serve(async (req) => {
  const { query } = await req.json();
  const chunks = REGULATION_CHUNKS.filter((c) => c.content.includes("طاقة") || query.includes("فاتورة"));
  return new Response(JSON.stringify({ chunks: chunks.slice(0, 3) }), {
    headers: { "Content-Type": "application/json" },
  });
});
