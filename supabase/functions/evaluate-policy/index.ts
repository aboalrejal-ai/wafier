import { evaluatePolicy } from "../../../src/lib/policy-engine.ts";

Deno.serve(async (req) => {
  const body = await req.json();
  const alerts = evaluatePolicy(body);
  return new Response(JSON.stringify({ alerts }), { headers: { "Content-Type": "application/json" } });
});
