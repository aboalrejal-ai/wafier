import {
  budgetUsagePct,
  calculateRemaining,
  calculateSpendFromReadings,
  kwhToSar,
  disaggregateDevices,
} from "../lib/financial-engine";
import { predictBill, generateHistoricalBills } from "../lib/ml-predictor";
import { evaluatePolicy } from "../lib/policy-engine";
import { fetchWeather, simulateMeterReading } from "../lib/weather";
import type { DashboardData, Profile, AppNotification } from "../types/database";

const STORAGE_KEY = "wafier_demo_state";

interface DemoState {
  profile: Profile;
  budgetAmount: number;
  totalKwh: number;
  notifications: AppNotification[];
  chatHistory: { role: "user" | "ai"; content: string; sources?: { title: string; source: string }[] }[];
  consentGiven: boolean;
  alertOverrideUntil: string | null;
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
};

function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_STATE };
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

  getProfile() {
    return this.state.profile;
  }

  setConsent() {
    this.state.consentGiven = true;
    this.state.profile.consent_at = new Date().toISOString();
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
    saveState(this.state);
    return this.refreshDashboard();
  }

  setAlertOverride(until: string | null) {
    this.state.alertOverrideUntil = until;
    this.state.profile.alert_override_until = until;
    saveState(this.state);
  }

  async refreshDashboard(): Promise<DashboardData> {
    const weather = await fetchWeather(this.state.profile.city);
    const spend = kwhToSar(this.state.totalKwh);
    const budget = this.state.budgetAmount;
    const remaining = calculateRemaining(budget, spend);
    const usagePct = budgetUsagePct(budget, spend);
    const now = new Date();
    const daysElapsed = now.getDate();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const forecastResult = predictBill({
      currentSpendSar: spend,
      currentKwh: this.state.totalKwh,
      budgetSar: budget,
      temperature: weather.tempC,
      daysElapsed,
      daysInMonth,
    });

    const policyAlerts = evaluatePolicy({
      budgetSar: budget,
      currentSpendSar: spend,
      predictedSar: forecastResult.predictedSar,
      temperature: weather.tempC,
      alertOverrideUntil: this.state.alertOverrideUntil,
    });

    const existingIds = new Set(this.state.notifications.map((n) => n.title));
    for (const alert of policyAlerts) {
      if (!existingIds.has(alert.title)) {
        this.state.notifications.unshift({
          id: uid(),
          user_id: this.state.profile.id,
          level: alert.level,
          title: alert.title,
          body: alert.body,
          read: false,
          created_at: new Date().toISOString(),
        });
      }
    }

    if (this.state.notifications.length === 0) {
      this.state.notifications = [
        {
          id: uid(),
          user_id: this.state.profile.id,
          level: usagePct >= 50 ? "level1" : "info",
          title: usagePct >= 50 ? "تنبيه الميزانية — المستوى 1" : "مرحباً بك في Wafier",
          body:
            usagePct >= 50
              ? `وصلت إلى ${usagePct}% من ميزانيتك (${budget} ر.س). تبقى ${remaining.toFixed(2)} ر.س.`
              : "تم ربط حسابك بنجاح. ميزانيتك الشهرية 500 ر.س.",
          read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: uid(),
          user_id: this.state.profile.id,
          level: "level2",
          title: "موجة حر متوقعة",
          body: "درجات حرارة مرتفعة. MLFO قد ينشّط نموذج الصيف.",
          read: false,
          created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
        },
        {
          id: uid(),
          user_id: this.state.profile.id,
          level: "info",
          title: "تحديث البيانات",
          body: "تم تحديث قراءات الحساسات بنجاح.",
          read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
    }

    saveState(this.state);

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
        model_version: "v1-mlfo",
        season_profile: forecastResult.seasonProfile,
        is_sandbox: false,
        created_at: new Date().toISOString(),
      },
      weather: {
        temp_c: weather.tempC,
        humidity: weather.humidity,
        description: weather.description,
        city: weather.city,
      },
      notifications: this.state.notifications,
      historicalBills: generateHistoricalBills(this.state.totalKwh),
      devices: forecastResult.deviceBreakdown,
      sensors: [
        { icon: "🌡️", label: "عداد الكهرباء الرئيسي", value: this.state.totalKwh.toLocaleString("ar-SA"), unit: "ك.و.س", status: "متصل" },
        { icon: "💧", label: "عداد المياه", value: "18.6", unit: "م³", status: "متصل" },
        { icon: "🔥", label: "مقياس الغاز", value: "32.4", unit: "م³", status: "متصل" },
        { icon: "☀️", label: "الألواح الشمسية", value: "4.8", unit: "ك.و.س", status: "متصل" },
      ],
    };
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

  simulateHeatwave() {
    this.state.totalKwh = simulateMeterReading(this.state.totalKwh, 42, 48);
    saveState(this.state);
    return this.refreshDashboard();
  }

  resetDemo() {
    this.state = { ...DEFAULT_STATE, consentGiven: true, profile: { ...DEFAULT_STATE.profile, consent_at: new Date().toISOString() } };
    saveState(this.state);
    return this.refreshDashboard();
  }
}

export const demoService = new DemoDataService();
