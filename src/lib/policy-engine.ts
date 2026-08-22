export type AlertLevel = "level1" | "level1b" | "level2" | "info";

export interface PolicyInput {
  budgetSar: number;
  currentSpendSar: number;
  predictedSar: number;
  temperature: number;
  alertOverrideUntil?: string | null;
  alertL1Pct?: number;
  alertL2Pct?: number;
}

export interface PolicyAlert {
  level: AlertLevel;
  title: string;
  body: string;
  type: "warning" | "info" | "success";
}

export function evaluatePolicy(input: PolicyInput): PolicyAlert[] {
  if (input.alertOverrideUntil && new Date(input.alertOverrideUntil) > new Date()) {
    return [];
  }

  const l1 = input.alertL1Pct ?? 50;
  const l2 = input.alertL2Pct ?? 75;
  const usagePct = (input.currentSpendSar / input.budgetSar) * 100;
  const remaining = input.budgetSar - input.currentSpendSar;
  const alerts: PolicyAlert[] = [];

  if (usagePct >= l1 && usagePct < l2) {
    alerts.push({
      level: "level1",
      title: "تنبيه الميزانية — المستوى 1",
      body: `وصلت إلى ${Math.round(usagePct)}% من ميزانيتك الشهرية (${l1}% عتبة). تبقى ${remaining.toFixed(2)} ر.س.`,
      type: "warning",
    });
  }

  if (usagePct >= l2) {
    alerts.push({
      level: "level1b",
      title: `تحذير الميزانية — ${l2}%`,
      body: `وصلت إلى ${Math.round(usagePct)}% من ميزانيتك. تبقى ${remaining.toFixed(2)} ر.س فقط.`,
      type: "warning",
    });
  }

  if (input.predictedSar > input.budgetSar) {
    alerts.push({
      level: "level2",
      title: "تحذير استباقي — المستوى 2",
      body: `توقعنا ارتفاع فاتورتك إلى ${input.predictedSar.toFixed(2)} ر.س — يتجاوز ميزانيتك ${input.budgetSar} ر.س.`,
      type: "warning",
    });
  }

  if (input.temperature >= 40) {
    alerts.push({
      level: "level2",
      title: "موجة حر متوقعة",
      body: "درجات حرارة مرتفعة (≥40°C). MLFO ينشّط نموذج الصيف — قد يرتفع استهلاك المكيف.",
      type: "warning",
    });
  }

  return alerts;
}

/** PDPL anonymization — hash household id for ML export */
export function anonymizeHouseholdId(householdId: string): string {
  let hash = 0;
  for (let i = 0; i < householdId.length; i++) {
    hash = (hash << 5) - hash + householdId.charCodeAt(i);
    hash |= 0;
  }
  return `anon_${Math.abs(hash).toString(16)}`;
}
