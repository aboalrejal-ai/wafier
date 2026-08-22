/** SEC residential tariff tiers (SAR per kWh) — simplified for demo */
export const TARIFF_TIERS = [
  { maxKwh: 6000, rate: 0.18 },
  { maxKwh: Infinity, rate: 0.3 },
] as const;

export const VAT_RATE = 0.15;
export const FIXED_FEE_SAR = 10;

export function kwhToSar(kwh: number): number {
  let remaining = kwh;
  let cost = FIXED_FEE_SAR;
  let prevMax = 0;

  for (const tier of TARIFF_TIERS) {
    const tierKwh = Math.min(remaining, tier.maxKwh - prevMax);
    if (tierKwh <= 0) break;
    cost += tierKwh * tier.rate;
    remaining -= tierKwh;
    prevMax = tier.maxKwh;
  }

  return Math.round((cost * (1 + VAT_RATE)) * 100) / 100;
}

export function calculateSpendFromReadings(readings: { kwh: number }[]): number {
  const totalKwh = readings.reduce((sum, r) => sum + r.kwh, 0);
  return kwhToSar(totalKwh);
}

export function calculateRemaining(budget: number, spend: number): number {
  return Math.max(0, Math.round((budget - spend) * 100) / 100);
}

export function budgetUsagePct(budget: number, spend: number): number {
  if (budget <= 0) return 0;
  return Math.min(100, Math.round((spend / budget) * 1000) / 10);
}

export function disaggregateDevices(totalSar: number) {
  const pcts = { ac: 50, lights: 20, tv: 15, fridge: 10 };
  return [
    { type: "ac", label: "المكيف", pct: pcts.ac, cost: Math.round(totalSar * pcts.ac / 100 * 100) / 100 },
    { type: "lights", label: "الإضاءة", pct: pcts.lights, cost: Math.round(totalSar * pcts.lights / 100 * 100) / 100 },
    { type: "tv", label: "التلفزيون", pct: pcts.tv, cost: Math.round(totalSar * pcts.tv / 100 * 100) / 100 },
    { type: "fridge", label: "الثلاجة", pct: pcts.fridge, cost: Math.round(totalSar * pcts.fridge / 100 * 100) / 100 },
  ];
}
