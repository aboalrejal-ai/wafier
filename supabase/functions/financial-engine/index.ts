import { kwhToSar, calculateSpendFromReadings } from "../../../src/lib/financial-engine.ts";

Deno.serve(async (req) => {
  const { kwh, readings } = await req.json();
  const spend = readings ? calculateSpendFromReadings(readings) : kwhToSar(kwh ?? 0);
  return new Response(JSON.stringify({ spend_sar: spend }), {
    headers: { "Content-Type": "application/json" },
  });
});
