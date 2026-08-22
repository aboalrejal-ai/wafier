import { predictBill } from "../../../src/lib/ml-predictor.ts";

Deno.serve(async (req) => {
  const body = await req.json();
  const result = predictBill(body);
  return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
});
