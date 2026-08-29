import { disaggregateDevices, kwhToSar } from "./financial-engine";

export type SeasonProfile = "summer" | "winter" | "baseline";

export interface ForecastInput {
  currentSpendSar: number;
  currentKwh: number;
  budgetSar: number;
  temperature: number;
  daysElapsed: number;
  daysInMonth: number;
  isSandbox?: boolean;
}

export interface ForecastResult {
  predictedSar: number;
  confidence: number;
  seasonProfile: SeasonProfile;
  explanation: string;
  deviceBreakdown: ReturnType<typeof import("./financial-engine").disaggregateDevices>;
}

/** MLFO — switches model based on weather telemetry */
export function selectSeasonProfile(tempC: number): SeasonProfile {
  if (tempC >= 38) return "summer";
  if (tempC <= 20) return "winter";
  return "baseline";
}

export const SEASON_MULTIPLIERS: Record<SeasonProfile, number> = {
  summer: 1.35,
  winter: 0.85,
  baseline: 1.0,
};

export function getSeasonCopy(profile: SeasonProfile): { title: string; explanation: string; winterTip?: string } {
  if (profile === "summer") {
    return {
      title: "نموذج الصيف نشط",
      explanation: "MLFO: نموذج الصيف نشط — موجة حر ترفع استهلاك المكيف",
    };
  }
  if (profile === "winter") {
    return {
      title: "ملف الشتاء نشط",
      explanation: "MLFO: نموذج الشتاء نشط — استهلاك منخفض نسبياً",
      winterTip: "التكييف ينخفض في هذا الموسم؛ راقب أجهزة التدفئة حتى تبقى الفاتورة ضمن الميزانية.",
    };
  }
  return {
    title: "النموذج الأساسي",
    explanation: "MLFO: النموذج الأساسي — ظروف معتدلة",
  };
}

export function predictBill(input: ForecastInput): ForecastResult {
  const profile = selectSeasonProfile(input.temperature);
  const multiplier = SEASON_MULTIPLIERS[profile];
  const dailyRate = input.currentKwh / Math.max(1, input.daysElapsed);
  const projectedKwh = dailyRate * input.daysInMonth * multiplier;
  const projectedSar = kwhToSar(projectedKwh);

  const confidence = input.isSandbox ? 0.75 : 0.88;
  const copy = getSeasonCopy(profile);
  const explanation = copy.explanation;

  return {
    predictedSar: Math.round(projectedSar * 100) / 100,
    confidence,
    seasonProfile: profile,
    explanation,
    deviceBreakdown: disaggregateDevices(input.currentSpendSar),
  };
}

/** Generate 6 months historical data from base kWh */
export function generateHistoricalBills(baseKwh: number) {
  const months = ["نوفمبر", "ديسمبر", "يناير", "فبراير", "مارس", "أبريل"];
  const multipliers = [0.95, 0.67, 0.83, 0.62, 0.8, 1.0];
  return months.map((month, i) => ({
    month,
    value: kwhToSar(baseKwh * multipliers[i]),
    kwh: Math.round(baseKwh * multipliers[i]),
  }));
}
