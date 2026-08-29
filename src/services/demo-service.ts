import {
  budgetUsagePct,
  calculateRemaining,
  kwhToSar,
} from "../lib/financial-engine";
import {
  generateHistoricalBills,
  predictBill,
  selectSeasonProfile,
} from "../lib/ml-predictor";
import { anonymizeHouseholdId, evaluatePolicy } from "../lib/policy-engine";
import { fetchWeather, simulateMeterReading } from "../lib/weather";
import {
  anonymizeForExport,
  buildDemoSeriesWithGap,
  gapFillDailySeries,
} from "../lib/preprocessor";
import type { AppNotification, DashboardData, Profile } from "../types/database";
import { deliverExternalNotification } from "../lib/notification-distributor";

const STORAGE_KEY = "wafier_demo_state";

export interface AuditEvent {
  id: string;
  at: string;
  action: string;
  detail: string;
}

interface DemoState {
  profile: Profile;
  budgetAmount: number;
  totalKwh: number;
  notifications: AppNotification[];
  chatHistory: {
    role: "user" | "ai";
    content: string;
    sources?: { title: string; source: string; url?: string }[];
  }[];
  consentGiven: boolean;
  alertOverrideUntil: string | null;
  auditLog: AuditEvent[];
  lastSandboxPrediction: number | null;
  lastAnonymizedId: string | null;
}

const DEFAULT_STATE: DemoState = {
  profile: {
    id: "demo-user",
    full_name: "جوري الفلاح",
    email: "jorry@wafier.sa",
    phone: "+966501234567",
    city: "الرياض",
    consent_at: null,
    member_since: "2024-04-01",
    alert_override_until: null,
  },
  budgetAmount: 500,
  totalKwh: 890,
  notifications: [],
  chatHistory: [],
  consentGiven: false,
  alertOverrideUntil: null,
  auditLog: [],
  lastSandboxPrediction: null,
  lastAnonymizedId: null,
};

function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATE, ...parsed, auditLog: parsed.auditLog ?? [] };
    }
  } catch {
    /* ignore */
  }
  return structuredClone(DEFAULT_STATE);
}

function saveState(state: DemoState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid() {
  return crypto.randomUUID();
}

export class DemoDataService {
  private state: DemoState;

  constructor() {
    this.state = loadState();
  }

  private audit(action: string, detail: string) {
    this.state.auditLog.unshift({
      id: uid(),
      at: new Date().toISOString(),
      action,
      detail,
    });
    this.state.auditLog = this.state.auditLog.slice(0, 40);
  }

  getProfile() {
    return this.state.profile;
  }

  getAuditLog() {
    return this.state.auditLog;
  }

  setConsent() {
    this.state.consentGiven = true;
    this.state.profile.consent_at = new Date().toISOString();
    this.audit("consent", "منح المستخدم موافقة PDPL صريحة");
    saveState(this.state);
  }

  hasConsent() {
    return this.state.consentGiven;
  }

  updateProfile(data: Partial<Profile>) {
    this.state.profile = { ...this.state.profile, ...data };
    saveState(this.state);
  }

  setBudget(amount: number) {
    this.state.budgetAmount = amount;
    this.audit("collector", `تحديث سقف الميزانية إلى ${amount} ر.س (SRC budget cap)`);
    saveState(this.state);
    return this.refreshDashboard();
  }

  setAlertOverride(until: string | null) {
    this.state.alertOverrideUntil = until;
    this.state.profile.alert_override_until = until;
    this.audit(
      "hitl",
      until
        ? `إيقاف التنبيهات مؤقتاً حتى ${until} (Human-in-the-loop)`
        : "إلغاء إيقاف التنبيهات — استئناف سياسة التنبيه",
    );
    saveState(this.state);
  }

  ingestMeterReading(kwhDelta: number, source = "meter") {
    this.state.totalKwh = Math.round((this.state.totalKwh + kwhDelta) * 100) / 100;
    this.audit("collector", `تجميع قراءة عداد +${kwhDelta} ك.و.س (مصدر: ${source})`);
    saveState(this.state);
  }

  runPreprocessor() {
    const series = buildDemoSeriesWithGap(this.state.totalKwh);
    const filled = gapFillDailySeries(series);
    const anon = anonymizeForExport(this.state.profile.id);
    this.state.lastAnonymizedId = anon;
    this.audit(
      "preprocessor",
      `سد فجوة يومية (${series.filter((p) => p.kwh == null).length} يوم) + إخفاء هوية → ${anon}`,
    );
    saveState(this.state);
    return { filled, anonymizedId: anon };
  }

  markNotificationRead(id: string) {
    this.state.notifications = this.state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    saveState(this.state);
  }

  markAllNotificationsRead() {
    this.state.notifications = this.state.notifications.map((n) => ({ ...n, read: true }));
    saveState(this.state);
  }

  private pushNotification(level: string, title: string, body: string) {
    if (this.state.notifications.some((n) => n.title === title)) return;
    this.state.notifications.unshift({
      id: uid(),
      user_id: this.state.profile.id,
      level,
      title,
      body,
      read: false,
      created_at: new Date().toISOString(),
    });
    void deliverExternalNotification(title, body);
  }

  async refreshDashboard(options?: {
    forceTempC?: number;
    isSandbox?: boolean;
  }): Promise<DashboardData> {
    const weather = await fetchWeather(this.state.profile.city);
    const tempC = options?.forceTempC ?? weather.tempC;
    const spend = kwhToSar(this.state.totalKwh);
    const budget = this.state.budgetAmount;
    const remaining = calculateRemaining(budget, spend);
    const usagePct = budgetUsagePct(budget, spend);
    const now = new Date();
    const daysElapsed = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const isSandbox = options?.isSandbox === true;

    const forecastResult = predictBill({
      currentSpendSar: spend,
      currentKwh: this.state.totalKwh,
      budgetSar: budget,
      temperature: tempC,
      daysElapsed,
      daysInMonth,
      isSandbox,
    });

    if (isSandbox) {
      this.state.lastSandboxPrediction = forecastResult.predictedSar;
      this.audit(
        "sandbox",
        `ML Sandbox: توقع ${forecastResult.predictedSar.toFixed(2)} ر.س بدون توزيع تنبيه (ثقة ${forecastResult.confidence})`,
      );
    } else {
      const policyAlerts = evaluatePolicy({
        budgetSar: budget,
        currentSpendSar: spend,
        predictedSar: forecastResult.predictedSar,
        temperature: tempC,
        alertOverrideUntil: this.state.alertOverrideUntil,
      });

      for (const alert of policyAlerts) {
        this.pushNotification(alert.level, alert.title, alert.body);
        this.audit("policy", `${alert.level}: ${alert.title}`);
      }

      if (this.state.notifications.length === 0) {
        this.pushNotification(
          usagePct >= 50 ? "level1" : "info",
          usagePct >= 50 ? "تنبيه الميزانية — المستوى 1" : "مرحباً بك في Wafier",
          usagePct >= 50
            ? `وصلت إلى ${usagePct}% من ميزانيتك (${budget} ر.س). تبقى ${remaining.toFixed(2)} ر.س.`
            : "تم ربط حسابك بنجاح. ميزانيتك الشهرية 500 ر.س.",
        );
      }
    }

    saveState(this.state);
    const season = selectSeasonProfile(tempC);

    return {
      profile: this.state.profile,
      budget: {
        id: "demo-budget",
        household_id: "demo-household",
        monthly_amount: budget,
        alert_l1_pct: 50,
        alert_l2_pct: 75,
      },
      currentKwh: this.state.totalKwh,
      currentSpendSar: spend,
      remainingSar: remaining,
      usagePct,
      forecast: {
        id: "demo-forecast",
        household_id: "demo-household",
        predicted_sar: forecastResult.predictedSar,
        confidence: forecastResult.confidence,
        model_version: isSandbox ? "v1-mlfo-sandbox" : "v1-mlfo",
        season_profile: forecastResult.seasonProfile ?? season,
        is_sandbox: isSandbox,
        created_at: new Date().toISOString(),
      },
      weather: {
        temp_c: tempC,
        humidity: weather.humidity,
        description: tempC >= 40 ? "موجة حر" : weather.description,
        city: weather.city,
      },
      notifications: this.state.notifications,
      historicalBills: generateHistoricalBills(this.state.totalKwh).map((b) => ({
        month: b.month,
        value: b.value,
      })),
      devices: forecastResult.deviceBreakdown,
      auditLog: this.state.auditLog,
      lastAnonymizedId: this.state.lastAnonymizedId,
    } as DashboardData;
  }

  /** Full evaluation scenario for hackathon demo video */
  async simulateHeatwave() {
    this.state.budgetAmount = 500;
    this.state.notifications = [];
    this.audit("src", "تعيين ميزانية أسرية 500 ر.س + تهيئة SRC");

    await this.refreshDashboard({ forceTempC: 42, isSandbox: true });

    const before = this.state.totalKwh;
    this.state.totalKwh = simulateMeterReading(this.state.totalKwh, 42, 72);
    this.audit(
      "collector",
      `موجة حر: ارتفاع الاستهلاك من ${before} إلى ${this.state.totalKwh} ك.و.س`,
    );

    const { anonymizedId } = this.runPreprocessor();

    const dash = await this.refreshDashboard({ forceTempC: 42, isSandbox: false });

    this.pushNotification(
      "info",
      "حارس سياسة KB — منع الإعلانات",
      "تم رفض استخدام بيانات الاستهلاك للإعلانات المستهدفة (PDPL تحديد الغرض + مبادئ SDAIA). القناة الوحيدة: تنبيهات الميزانية داخل التطبيق.",
    );
    this.audit(
      "kb-policy",
      `رفض إساءة استخدام البيانات للإعلان؛ anon=${anonymizedId}; MLFO=${dash.forecast?.season_profile}`,
    );
    saveState(this.state);
    return this.refreshDashboard({ forceTempC: 42 });
  }

  resetDemo() {
    this.state = {
      ...structuredClone(DEFAULT_STATE),
      consentGiven: true,
      profile: {
        ...structuredClone(DEFAULT_STATE.profile),
        consent_at: new Date().toISOString(),
      },
    };
    this.audit("reset", "إعادة ضبط العرض التوضيحي");
    saveState(this.state);
    return this.refreshDashboard();
  }
}

export const demoService = new DemoDataService();

// referenced for documentation / export path clarity
void anonymizeHouseholdId;
