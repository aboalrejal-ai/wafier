Deno.serve(async (req) => {
  const { household_id, kwh, source = "simulated" } = await req.json();
  // In production: insert into meter_readings via service role
  return new Response(JSON.stringify({ ok: true, household_id, kwh, source }), {
    headers: { "Content-Type": "application/json" },
  });
});
