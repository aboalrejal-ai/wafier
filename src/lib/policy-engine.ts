export type AlertLevel = "level1" | "level1b" | "level2" | "info";

export type PolicyVerdict =
  | "COMPLIANT"
  | "VIOLATION"
  | "AMBIGUITY"
  | "CONFLICT"
  | "POTENTIAL_GAP"
  | "INSUFFICIENT_EVIDENCE";

export type PolicyAction = "PROCEED" | "WARN" | "BLOCK_DATA_USE" | "REQUIRE_HITL";

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
  verdict?: PolicyVerdict;
  action?: PolicyAction;
  recordId?: string;
  sourceUrl?: string;
}

export interface PolicyDecision {
  verdict: PolicyVerdict;
  action: PolicyAction;
  recordId: string;
  sourceUrl: string;
  title: string;
  detail: string;
}

export interface AdsPolicyRequest {
  feature: "targeted_ads_from_consumption" | "budget_alerts_only";
  providerName?: string;
}

const KB_ADS_RECORD = {
  id: "PDPL-ADS-001",
  url: "https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL/",
  title: "Wafir policy — no ads from consumption data",
};

const PDPL_PSEUDO_RECORD = {
  id: "PDPL-ANON-001",
  url: "https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PersonalDataDestruction/",
  title: "PDPL — Pseudonymization for ML export",
};

/** Deterministic KB guard — no LLM in decision path. */
export function evaluateKbGuardPolicy(request: AdsPolicyRequest): PolicyDecision {
  if (request.feature === "targeted_ads_from_consumption") {
    return {
      verdict: "VIOLATION",
      action: "BLOCK_DATA_USE",
      recordId: KB_ADS_RECORD.id,
      sourceUrl: KB_ADS_RECORD.url,
      title: "حارس سياسة KB — منع الإعلانات",
      detail: `رفض طلب${request.providerName ? ` من ${request.providerName}` : ""}: سياسة خصوصية Wafir + تحديد الغرض PDPL — لا إعادة استخدام بيانات الاستهلاك للإعلانات دون أساس/موافقة منفصلة.`,
    };
  }
  return {
    verdict: "COMPLIANT",
    action: "PROCEED",
    recordId: KB_ADS_RECORD.id,
    sourceUrl: KB_ADS_RECORD.url,
    title: "قناة الميزانية فقط",
    detail: "تنبيهات الميزانية داخل التطبيق — متوافق مع الغرض المصرّح.",
  };
}

export function evaluateAnonymizationPolicy(exported: boolean): PolicyDecision {
  if (!exported) {
    return {
      verdict: "INSUFFICIENT_EVIDENCE",
      action: "REQUIRE_HITL",
      recordId: PDPL_PSEUDO_RECORD.id,
      sourceUrl: PDPL_PSEUDO_RECORD.url,
      title: "تصدير بدون إخفاء هوية كافٍ",
      detail: "يجب تطبيق pseudonymization (وليس anonymization كاملاً) قبل تصدير بيانات الأسرة لمسار ML.",
    };
  }
  return {
    verdict: "COMPLIANT",
    action: "PROCEED",
    recordId: PDPL_PSEUDO_RECORD.id,
    sourceUrl: PDPL_PSEUDO_RECORD.url,
    title: "Pseudonymization مُطبّق",
    detail: "تم استبدال معرف الأسرة بمعرف مجهول (pseudonymization) قبل المعالجة — لا يُعد anonymization كاملاً.",
  };
}

/** Budget alerting policy (graduated L1/L1b/L2). */
export function evaluateBudgetPolicy(input: PolicyInput): PolicyAlert[] {
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
      verdict: "COMPLIANT",
      action: "WARN",
      recordId: "SDAIA-AI-ETHICS-PDF-001",
      sourceUrl: "https://dgp.sdaia.gov.sa/wps/wcm/connect/4c56ed1c-1b82-447d-ac29-638f5f99c12e/ai-principles-EN.pdf",
    });
  }

  if (usagePct >= l2) {
    alerts.push({
      level: "level1b",
      title: `تحذير الميزانية — ${l2}%`,
      body: `وصلت إلى ${Math.round(usagePct)}% من ميزانيتك. تبقى ${remaining.toFixed(2)} ر.س فقط.`,
      type: "warning",
      verdict: "COMPLIANT",
      action: "WARN",
      recordId: "SDAIA-AI-ETHICS-PDF-001",
      sourceUrl: "https://dgp.sdaia.gov.sa/wps/wcm/connect/4c56ed1c-1b82-447d-ac29-638f5f99c12e/ai-principles-EN.pdf",
    });
  }

  if (input.predictedSar > input.budgetSar) {
    alerts.push({
      level: "level2",
      title: "تحذير استباقي — المستوى 2",
      body: `توقعنا ارتفاع فاتورتك إلى ${input.predictedSar.toFixed(2)} ر.س — يتجاوز ميزانيتك ${input.budgetSar} ر.س.`,
      type: "warning",
      verdict: "COMPLIANT",
      action: "WARN",
      recordId: "SDAIA-AI-ETHICS-PDF-001",
      sourceUrl: "https://dgp.sdaia.gov.sa/wps/wcm/connect/4c56ed1c-1b82-447d-ac29-638f5f99c12e/ai-principles-EN.pdf",
    });
  }

  if (input.temperature >= 40) {
    alerts.push({
      level: "level2",
      title: "موجة حر متوقعة",
      body: "درجات حرارة مرتفعة (≥40°C). MLFO ينشّط نموذج الصيف — قد يرتفع استهلاك المكيف.",
      type: "warning",
      verdict: "COMPLIANT",
      action: "WARN",
      recordId: "MDPI-FORECAST-001",
      sourceUrl: "https://www.mdpi.com/1996-1073/16/4/2035",
    });
  }

  return alerts;
}

/** Combined policy evaluation for demo pipeline. */
export function evaluatePolicy(input: PolicyInput): PolicyAlert[] {
  return evaluateBudgetPolicy(input);
}

/** PDPL pseudonymization — hash household id for ML export (not full anonymization). */
export function anonymizeHouseholdId(householdId: string): string {
  let hash = 0;
  for (let i = 0; i < householdId.length; i++) {
    hash = (hash << 5) - hash + householdId.charCodeAt(i);
    hash |= 0;
  }
  return `anon_${Math.abs(hash).toString(16)}`;
}
